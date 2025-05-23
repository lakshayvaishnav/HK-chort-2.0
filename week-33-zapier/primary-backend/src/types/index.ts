import { z } from "zod";

export const SignupSchema = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
});

export const SigninSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const ZapCreateSchema = z.object({
  availableTriggerId: z.string(),
  tirggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});
