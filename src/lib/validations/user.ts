import { z } from "zod";

export const UserRole = z.enum(["USER", "ADMIN"]);

export const UserSchemaZod = z.object({
  name: z.string(),
  firstname: z.string().optional().nullable(),
  lastname: z.string().optional().nullable(),
  email: z.email(),
  password: z.string().optional(),
  avatar: z.url().optional(),
  role: UserRole.default("USER"),
});

export type UserInput = z.infer<typeof UserSchemaZod>;
