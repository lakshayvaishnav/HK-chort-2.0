"use server";
import client from "@/db";

export async function signup(username: string, password: string) {
    console.log("server action called !!!")
  try {
    await client.user.create({
      data: {
        username: username,
        password: password,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}
