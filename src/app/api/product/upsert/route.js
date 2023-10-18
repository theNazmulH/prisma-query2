import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prismaClient = new PrismaClient({
  log: ['warn']
});

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function POST(request, response) {
  try {
    const requestBody = await request.json();
    const id = requestBody.id ? requestBody.id : 0;
    const upsertProduct = prismaClient.product.upsert({
      where: { id: id },
      update: requestBody,
      create: requestBody,
    });

    const result = await prismaClient.$transaction([upsertProduct]);

    return await NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.toString() });
  }
}
