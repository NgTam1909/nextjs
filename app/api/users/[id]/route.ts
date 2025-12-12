import { NextResponse } from "next/server";
import { getUserById, updateUser, deleteUser, IUser } from "@/lib/services/user.service";
import bcrypt from 'bcryptjs';

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
    const originalBody : Partial<IUser> = await req.json();

    // 2. Tạo một bản sao có thể thay đổi thuộc tính
    const body = { ...originalBody };

    // 3. XỬ LÝ MẬT KHẨU
    // Kiểm tra nếu có mật khẩu mới và không phải là chuỗi rỗng
    if (body.pass && body.pass.length > 0) {
        const salt = await bcrypt.genSalt(10);
        // Gán trực tiếp lên thuộc tính của bản sao 'body'
        body.pass = await bcrypt.hash(body.pass, salt);
    } else {
        // Nếu pass rỗng hoặc không tồn tại, xóa trường 'pass'
        delete body.pass;
    }
    const updated = await updateUser(id, body);

    const updatedResponse = updated.toObject();
    delete updatedResponse.pass;

    return NextResponse.json(updated);
}

// DELETE: /api/users/:id
export async function DELETE(req: Request, context: ParamsPromise) {
    const { id } = await context.params;
    await deleteUser(id);
    return NextResponse.json({ success: true });
}
