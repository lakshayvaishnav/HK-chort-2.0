import { z } from "@hono/zod-openapi";

// inputs from the user on the route...
export const ParamsSchema = z.object({
  id: z
    .string()
    .min(4)
    .max(20)
    .openapi({ param: { name: "id", in: "path" }, example: "123" }),
});
