"use client";
import { useState } from "react"; // <-- Cần import useState

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, pass: password }), // Dùng 'pass' theo Model
        });

        if (res.ok) {
            // Server đã thiết lập cookie 'loggedIn', chỉ cần chuyển hướng
            window.location.href = "/users";
        } else {
            const data = await res.json();
            alert(data.message || "Đăng nhập thất bại");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow w-80 space-y-3 text-black">
                <h2 className="text-xl font-bold text-center">Đăng nhập</h2>

                <input
                    className="w-full border p-2 rounded"
                    placeholder="Email"
                    value={email} // <-- Gán giá trị
                    onChange={(e) => setEmail(e.target.value)} // <-- Cập nhật state
                />
                <input
                    className="w-full border p-2 rounded"
                    placeholder="Mật khẩu"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                >
                    Login
                </button>
            </div>
        </div>
    );
}