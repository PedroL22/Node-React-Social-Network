export const postCore = {
  type: "object",
  properties: {
    username: { type: "string" },
    text: { type: "string" },
  },
  required: ["username", "text"],
};

export const createPostSchema = {
  type: "object",
  properties: {
    ...postCore.properties,
  },
  required: postCore.required,
};

export const createPostResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    ...postCore.properties,
  },
};

export const deletePostSchema = {
  type: "object",
  properties: {
    postId: { type: "string" },
  },
  required: ["postId"],
};

export const deletePostResponseSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    deletePostSchema,
  },
  required: ["id", "deletePostSchema"],
};

const postSchemas = {
  createPostSchema,
  createPostResponseSchema,
  deletePostSchema,
  deletePostResponseSchema,
};

export { postSchemas };
