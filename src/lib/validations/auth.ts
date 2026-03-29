import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Veuillez entrer une adresse email valide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)/,
      "Le mot de passe doit contenir au moins une majuscule et un chiffre",
    ),
});

export type LoginType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(3, "Le nom d'affichage est trop court"),
    email: z.email("Veuillez entrer une adresse email valide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[A-Z])(?=.*\d)/,
        "Le mot de passe doit contenir au moins une majuscule et un chiffre",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type RegisterType = z.infer<typeof registerSchema>;
