"use server";

import { getUserByEmail } from "@/data/helpers";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/db";

export const EmailVerify = async (token: string) => {
  console.log(token);

  const verificationData = await getVerificationTokenByToken(token);
  if (!verificationData) {
    return { error: "Invalid verification token" };
  }
  if (new Date(verificationData?.expires) < new Date()) {
    return { error: "Verification token expired" };
  }
  const existingUser = getUserByEmail(verificationData.email);
  if (!existingUser) {
    return { error: "User not found" };
  }

  await db.user.update({
    where: { email: verificationData.email },
    data: { emailVerified: new Date(), email: verificationData.email },
  });

  await db.verificationToken.delete({
    where: {
      id: verificationData.id,
    },
  });

  return { success: "Email verified" };
};
