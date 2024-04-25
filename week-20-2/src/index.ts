import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ParamsSchema } from "./inputs";
import { UserSchema } from "./outputs";
import { swaggerUI } from "@hono/swagger-ui";

const app = new OpenAPIHono();

const getUserRoute = createRoute({
  method: "get",
  path: "/user/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "get the users details",
    },
  },
});

app.openapi(getUserRoute, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    age: 20,
    name: "utlra man",
  });
});

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "my api",
  },
});

app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;
