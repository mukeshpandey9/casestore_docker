"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/helpers";

import { sendVerificationEmail } from "@/lib/nodemailer";

import { loginSchema } from "@/schemas";
import { z } from "zod";

export const Login = async (values: z.infer<typeof loginSchema>) => {
  try {
    const existingUser = await getUserByEmail(values.email);
    if (!existingUser) {
      throw new Error("Email not Registered");
    }
    if (!existingUser.emailVerified) {
      await sendVerificationEmail(existingUser.email);
      return { success: true, message: "Verification email sent,verify!" };
    }
    await signIn("credentials", values, { redirectTo: "/profile" });
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
