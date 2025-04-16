import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
const router = Router();

// @ts-ignore
router.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "incorrect credentials",
    });
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data?.username,
    },
  });

  if (userExists) {
    res.status(403).json({
      message: "user already exists",
    });
  }

  await prismaClient.user.create({
    data: {
      email: parsedData.data.username,
      // TODO : hash the passwords
      password: parsedData.data.password,
      name: parsedData.data.name,
    },
  });

  // await send email().

  return res.json({
    message: "Please verify your account check your email.",
  });
});

// @ts-ignore
router.post("/signin", async (req, res) => {
  const body = req.body;
  const parsedData = SigninSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "incorrect credentials",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    return res.status(403).json({
      message: "sorry incorrect credentials",
    });
  }

  //sign the jwt
  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD
  );

  res.json({
    token: token,
  });
});

// @ts-ignore
router.get("/user", authMiddleware, async(req, res) => {
  // TODO: Fix the type
  // @ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return res.json({
    user
  })

});

export const userRouter = router;
