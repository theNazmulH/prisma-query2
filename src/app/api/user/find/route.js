import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prismaClient = new PrismaClient();

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  let id = searchParams.get("id");
  try {
    const findUser = prismaClient.user.findUnique({
      where: { id: id },
    });

    const result = await prismaClient.$transaction([findUser]);

    return await NextResponse.json({ status: "success", data: result });
  } catch (error) {
    return NextResponse.json({ status: "failed", data: error.toString() });
  }
}
