import { FastifyInstance } from "fastify";
import { createNewPostHandler, deletePostHandler } from "./post.controller";
import {
  createPostSchema,
  createPostResponseSchema,
  deletePostSchema,
  deletePostResponseSchema,
} from "./post.schema";

async function postRoutes(server: FastifyInstance) {
  server.post(
    "/post",
    {
      schema: {
        body: createPostSchema,
        response: { 201: createPostResponseSchema },
      },
    },
    createNewPostHandler
  );

  server.delete(
    "/deletepost",
    {
      schema: {
        body: deletePostSchema,
        response: { 201: deletePostResponseSchema },
      },
    },
    deletePostHandler
  );
}

export default postRoutes;
