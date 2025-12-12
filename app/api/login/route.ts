// app/api/login/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongoose.lib';
import UserModel from '@/models/user.model';

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const { email, pass } = body;

        if (!email || !pass) {
            return NextResponse.json(
                { message: 'Vui lòng cung cấp đầy đủ email và mật khẩu.' },
                { status: 400 }
            );
        }

        // Tìm kiếm Người dùng theo Email
        // Cần .select('+pass') nếu bạn đã đặt select: false trong model
        const user = await UserModel.findOne({ email }).select('+pass');

        if (!user) {
            return NextResponse.json(
                { message: 'Email hoặc mật khẩu không chính xác.' },
                { status: 401 }
            );
        }

        // So sánh Mật khẩu (Sử dụng mật khẩu đã băm trong DB)
        const isMatch = await bcrypt.compare(pass, user.pass);

        if (!isMatch) {
            return NextResponse.json(
                { message: 'Email hoặc mật khẩu không chính xác.' },
                { status: 401 }
            );
        }

        // Xóa mật khẩu trước khi trả về
        // const userResponse = user.toObject();
        // delete userResponse.pass;

        // 6. Trả về Phản hồi
        const response = NextResponse.json({
            message: 'Đăng nhập thành công (Session-based)',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });

        // Thiết lập một cookie đơn giản để đánh dấu người dùng đã đăng nhập (DÙNG CHO PHIÊN LÀM VIỆC ĐƠN GIẢN)
        response.cookies.set('loggedIn', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 ngày
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        return NextResponse.json(
            { message: 'Đã xảy ra lỗi server.' },
            { status: 500 }
        );
    }
}