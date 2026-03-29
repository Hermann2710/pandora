"use server";

import { ApiResponse } from "@/lib/utils/api";
import { RegisterType, registerSchema } from "@/lib/validations/auth";
import User from "@/models/user";
import connectDB from "@/lib/db";

export async function registerUser(data: RegisterType) {
  try {
    await connectDB();

    const validated = registerSchema.safeParse(data);
    if (!validated.success) {
      return new ApiResponse("Données invalides", 400, false);
    }

    const { email, name, password } = validated.data;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return new ApiResponse("Cet email est déjà utilisé", 409, false);
    }

    const existingName = await User.findOne({ name });
    if (existingName) {
      return new ApiResponse("Ce nom est deja utilisé", 409, false);
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    return new ApiResponse("Votre compte a été créé avec succès", 201, true);
  } catch (error) {
    return new ApiResponse("Erreur interne du serveur", 500, false);
  }
}
