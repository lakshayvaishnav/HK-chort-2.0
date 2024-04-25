// output from the route...
import { z } from "@hono/zod-openapi";
export const UserSchema = z
  .object({
    id: z.string().openapi({
      example: "123",
    }),
  })
  .openapi("User");
