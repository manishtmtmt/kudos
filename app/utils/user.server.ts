import bcrypt from "bcryptjs";

import type { RegisterForm } from "./types.server";
import { db } from "./prisma.server";

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10);
  const newUser = await db.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
  });

  return { id: newUser.id, email: user.email };
};

export const getOtherUsers = async (userId: string) => {
  return db.user.findMany({
    where: {
      id: { not: userId },
    },
    orderBy: {
      profile: {
        firstName: "asc",
      },
    },
  });
};
