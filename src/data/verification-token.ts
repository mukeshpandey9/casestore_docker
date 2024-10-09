import { db } from "@/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationData = await db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationData;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationData = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return verificationData;
  } catch (error) {
    return null;
  }
};
