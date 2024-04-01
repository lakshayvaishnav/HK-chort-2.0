import { NextRequest, NextResponse } from "next/server";

import client from "@/db";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const user = await client.user.create({
    data: {
      username: body.username,
      password: body.password,
    },
  });

  console.log("user id : ", user.id, " username : ", user.username);

  return Response.json({
    message: "signup successfull ho gaya ab maa chuda.  ",
  });
}
