import { NextResponse } from "next/server";
import { getAllUsers, createUser } from "@/lib/services/user.service";

export async function GET() {
    const users = await getAllUsers();
    return NextResponse.json(users);
}

export async function POST(req: Request) {
    const body = await req.json();
    const user = await createUser(body);
    return NextResponse.json(user);
}
