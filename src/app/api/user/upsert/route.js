import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";


const prismaClient = new PrismaClient()

BigInt.prototype.toJSON = function (){
    return this.toString();
}
export async function POST(req, res) {

    try {
        // const requestBody = JSON.parse(req.body);
        const requestBody = await req.json();
        const id = requestBody.id ? requestBody.id : 0;

        const user = prismaClient.user.upsert({
            where: { id },
            update: requestBody,
            create: requestBody,
        })
        const result = await prismaClient.$transaction([user]);

        return NextResponse.json({ status: "success", data: result });

    }
    catch (error) {
        return NextResponse.json({ status: "failed", data: error.toString() });
    }
}
