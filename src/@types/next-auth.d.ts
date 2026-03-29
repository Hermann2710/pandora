import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    firstname?: string;
    lastname?: string;
  }
  interface Session {
    user: {
      role?: string;
      firstname?: string;
      lastname?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    role?: string;
    firstname?: string;
    lastname?: string;
  }
}
