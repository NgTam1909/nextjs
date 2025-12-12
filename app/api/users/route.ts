import { NextResponse } from "next/server";
import { getAllUsers, createUser } from "@/lib/services/user.service";
import bcrypt from 'bcryptjs';

export async function GET() {
    const users = await getAllUsers();
    return NextResponse.json(users);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, pass } = body; // Lấy mật khẩu thô
    if (!pass) {
        return NextResponse.json({ message: "Missing password" }, { status: 400 });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    const user = await createUser({ name, email, pass: hashedPassword });
    const userResponse = user.toObject();
    delete userResponse.pass;
    return NextResponse.json(userResponse);
}
