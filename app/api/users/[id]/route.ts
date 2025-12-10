import { NextResponse } from "next/server";
import User from "@/models/user.model";
import { connectDB } from "@/lib/mongoose.lib";

export async function GET(request: Request, context: any) {
    const { params } = await context;
    await connectDB();
    const user = await User.findById(params.id);
    return NextResponse.json(user);
}

export async function PUT(request: Request, context: any) {
    const { params } = await context;
    await connectDB();

    const body = await request.json();
    const updated = await User.findByIdAndUpdate(params.id, body, { new: true });

    return NextResponse.json(updated);
}

export async function DELETE(request: Request, context: any) {
    const { params } = await context;
    await connectDB();

    await User.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true });
}
