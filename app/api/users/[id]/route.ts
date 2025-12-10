import { NextResponse } from "next/server";
import { getUserById, updateUser, deleteUser } from "@/lib/services/user.service";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
    const user = await getUserById(params.id);
    return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const data = await req.json();
    const updated = await updateUser(params.id, data);
    return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
    await deleteUser(params.id);
    return NextResponse.json({ success: true });
}
