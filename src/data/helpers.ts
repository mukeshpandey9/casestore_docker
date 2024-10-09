import { db } from "@/db";

export const getUserById = async (userId: string) => {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (user) return user;
  return null;
};

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (user) return user;
  return null;
};
