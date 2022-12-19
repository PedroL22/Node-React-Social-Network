import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  const { hash, salt } = hashPassword(password);

  const user = await prisma.users.create({
    data: { ...rest, salt, password: hash },
  });

  return user;
}

export async function findUserByUsername(username: string) {
  return prisma.users.findUnique({
    where: {
      username,
    },
  });
}

export async function findUsers() {
  return prisma.users.findMany({
    select: { id: true, username: true },
  });
}
