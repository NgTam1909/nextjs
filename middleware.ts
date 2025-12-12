// middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/users"];

export function middleware(req: NextRequest) {
    const loggedIn = req.cookies.get("loggedIn")?.value;
    const { pathname } = req.nextUrl;
    // Kiểm tra xem người dùng đang cố gắng truy cập một route bảo vệ hay không.
    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

    // 2. Nếu là route bảo vệ VÀ người dùng CHƯA ĐĂNG NHẬP
    // Kiểm tra: loggedIn không tồn tại hoặc giá trị không phải là 'true'
    if (isProtectedRoute && !loggedIn) {
        // Chuyển hướng về /login
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // 3. Nếu đã có cookie loggedIn HOẶC không phải là route bảo vệ, cho phép đi tiếp.
    return NextResponse.next();
}

// Cấu hình matcher nên được giữ nguyên
export const config = {
    // Chỉ chạy middleware cho các đường dẫn bắt đầu bằng /users
    matcher: ["/users/:path*"],
};