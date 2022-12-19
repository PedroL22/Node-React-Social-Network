import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userCore = {
  username: z.string({
    required_error: "Username is required.",
    invalid_type_error: "Username must be a string.",
  }),
};

const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: "Password is required.",
    invalid_type_error: "Password must be a string.",
  }),
});

const createUserResponseSchema = z.object({ id: z.string(), ...userCore });

const loginSchema = z.object({
  username: z.string({
    required_error: "Username is required.",
    invalid_type_error: "Username must be a string.",
  }),
  password: z.string({
    required_error: "Password is required.",
    invalid_type_error: "Password must be a string.",
  }),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
  user: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema,
});
