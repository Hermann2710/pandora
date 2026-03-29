import NextAuth from "next-auth";
import client from "./lib";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./validations/auth";
import User from "@/models/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  providers: [
    Google,
    GitHub,
    Credentials({
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;
        const user = await User.findOne({ email }).select("+password");

        if (!user || !user.password) return null;

        const isValid = await user.comparePassword(password);

        if (isValid) {
          return {
            id: user._id.toString(),
            name: user.name,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            image: user.avatar,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
        session.user.firstname = token.firstname as string;
        session.user.lastname = token.lastname as string;
      }
      return session;
    },
  },
});
