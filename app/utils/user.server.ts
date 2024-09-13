import { Profile } from "@prisma/client";
import bcrypt from "bcryptjs";

import { db } from "./prisma.server";
import type { RegisterForm } from "./types.server";

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

export const getUserById = async (userId: string) => {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const updateUser = async (userId: string, profile: Partial<Profile>) => {
  console.log("updating user")
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      profile: {
        update: profile,
      },
    },
  });
};

export const deleteUser = async (id: string) => {
  await db.user.delete({ where: { id } });
};
