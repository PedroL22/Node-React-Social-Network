import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "../../app";
import { verifyPassword } from "../../utils/hash";
import { CreateUserInput, LoginInput } from "./user.schema";
import { createUser, findUserByUsername, findUsers } from "./user.service";

export async function registerUserHandler(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (e) {
    console.error(e);

    return reply.code(500).send();
  }
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) {
  const body = request.body;

  // find user by username
  const user = await findUserByUsername(body.username);

  if (!user) {
    return reply.code(401).send("Invalid username or password.");
  }

  // verify password
  const correctPassword = await verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  if (correctPassword) {
    const { password, salt, ...rest } = user;

    const username = await findUserByUsername(body.username);

    return { accessToken: server.jwt.sign(rest), user: username?.username };
  }

  return reply.code(401).send("Invalid username or password.");
}

export async function getUsersHandler() {
  const users = await findUsers();

  return users;
}
