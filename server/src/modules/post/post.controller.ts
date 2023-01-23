import { FastifyReply } from "fastify";
import { createPost, deletePost, findPost, findPosts } from "./post.service";

export async function createNewPostHandler(request: any, reply: FastifyReply) {
  const body = request.body;

  try {
    await request.jwtVerify();
    const tokenUsername = request?.user.username;

    if (tokenUsername !== body?.username) {
      return reply.code(401).send("Unauthorized.");
    }
    const post = await createPost(body);
    return reply.code(201).send(post);
  } catch (e) {
    console.error(e);
    return reply.code(401).send("Unauthorized.");
  }
}

export async function deletePostHandler(request: any, reply: FastifyReply) {
  const body = request.body;
  try {
    await request.jwtVerify();
    const tokenUsername = request?.user.username;
    const post = await findPost(body);
    if (tokenUsername !== post?.usersId) {
      return reply.code(401).send("Unauthorized.");
    }
    await deletePost(body);
    return reply.code(200).send("Post deleted successfully");
  } catch (e) {
    console.error(e);
    return reply.code(401).send("Unauthorized.");
  }
}

export async function getPostsHandler() {
  const posts = await findPosts();

  return { posts };
}
