"use client";
import { useState } from "react"; //
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
            window.location.href = "/dashboard";
        } else {
            const data = await res.json();
            alert(data.message || "Đăng nhập thất bại");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted">
            <Button
                variant="outline"
                className="absolute top-6 right-6"
                onClick={() => window.location.href = "/users"}
            >
                Đăng ký
            </Button>
            <Card className="w-[360px]">
                <CardHeader>
                    <CardTitle className="text-center">
                        Đăng nhập
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            placeholder="email@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}