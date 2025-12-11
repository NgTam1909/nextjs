import { NextResponse } from "next/server";
import { getUserById, updateUser, deleteUser } from "@/lib/services/user.service";

interface ParamsPromise {
    params: Promise<{ id: string }>;
}

// GET: /api/users/:id
export async function GET(req: Request, context: ParamsPromise) {
    const { id } = await context.params;
    const user = await getUserById(id);
    return NextResponse.json(user);
}

// PUT: /api/users/:id
export async function PUT(req: Request, context: ParamsPromise) {
    const { id } = await context.params;
    const body = await req.json();
    const updated = await updateUser(id, body);
    return NextResponse.json(updated);
}

// DELETE: /api/users/:id
export async function DELETE(req: Request, context: ParamsPromise) {
    const { id } = await context.params;
    await deleteUser(id);
    return NextResponse.json({ success: true });
}
