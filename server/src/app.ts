import Fastify, { fastify, FastifyReply, FastifyRequest } from "fastify";
import fjwt from "@fastify/jwt";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

export const server = Fastify();

declare module "fastify" {
  export interface FastifyInstance {
    auth: any;
  }
}

dotenv.config();

server.register(fjwt, {
  secret: process.env.SECRET as string,
});

server.register(cors, {
  origin: true,
});

server.decorate(
  "auth",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  }
);

server.get("/healthcheck", async function (request, response) {
  return { status: "OK" };
});

async function main() {
  for (const schema of userSchemas) {
    server.addSchema(schema);
  }
  server.register(userRoutes);

  try {
    await server.listen({ port: process.env.PORT as any });
    console.log(`Server ready at http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
