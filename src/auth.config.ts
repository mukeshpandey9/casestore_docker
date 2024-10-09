import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import { CredentialsSignin } from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { loginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/helpers";
import type { NextAuthConfig } from "next-auth";
import { sendVerificationEmail } from "@/lib/nodemailer";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const existingUser = await getUserByEmail(email);
          if (!existingUser) {
            throw new CredentialsSignin("User not found.");
          }
          const isMatch = await bcrypt.compare(
            password,
            existingUser?.password || ""
          );

          if (!isMatch) {
            throw new CredentialsSignin("Invalid Email or Password");
          }

          if (!existingUser.emailVerified) {
            throw new CredentialsSignin("Email not verified");
          }

          const user = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
          };

          return user;
        } catch (error: any) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          throw new CredentialsSignin(error.message);
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
} satisfies NextAuthConfig;
