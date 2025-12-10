import { NextResponse } from "next/server";
import User from "@/models/user.model";
import { connectDB } from "@/lib/mongoose.lib";

export async function GET() {
    await connectDB();
    const users = await User.find();
    return NextResponse.json(users);
}

export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();
    const user = await User.create(body);
    return NextResponse.json(user);
}