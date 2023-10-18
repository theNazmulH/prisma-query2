import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prismaClient = new PrismaClient();
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function POST(req, res) {
  try {
    const requestBody = await req.json();
    const id = requestBody.id ? requestBody.id : 0;
    const upsertCart = prismaClient.cart.upsert({
      where: { id: id },
      update: requestBody,
      create: requestBody,
    });

    const result = await prismaClient.$transaction([upsertCart]);

    return await NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.toString() });
  }
}
