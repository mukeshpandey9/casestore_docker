"use server";

import { db } from "@/db";
import { registerSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/nodemailer";

export const Register = async (values: z.infer<typeof registerSchema>) => {
  try {
    const existingUser = await db.user.findFirst({
      where: { email: values.email },
    });
    if (existingUser?.id) {
      const error = new Error("User already exists");
      throw error;
    }
    const hashedPassword = await bcrypt.hash(values.password, 10);

    const user = await db.user.create({
      data: {
        name: values.name,
        email: values.email,
        password: hashedPassword,
      },
    });

    await sendVerificationEmail(user.email);

    return { success: true };
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
