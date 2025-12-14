"use client";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function UsersPage() {
    const [form, setForm] = useState({ name: "", email: "", pass: "" });
    // Create user
    const createUser = async () => {
        let email = form.email;
        if (!email.includes("@")) {
            email = email + "@gmail.com";
        }

       const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: form.name, email, pass: form.pass }),
        });

        setForm({ name: "", email: "" , pass: "" });
        if (res.ok) {
            window.location.href = "/login";
        } else {
            alert("Tạo user thất bại");
        }
    };
    return (
        <Card className="max-w-3xl mx-auto mt-10">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                    User CRUD (Next.js + MongoDB)
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Add User</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <Input
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />

                        <Input
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />

                        {form.email && !form.email.includes("@") && (
                            <p className="text-sm text-muted-foreground">
                                Email sẽ tự thêm <b>@gmail.com</b>
                            </p>
                        )}

                        <Input
                            placeholder="Password"
                            type="password"
                            value={form.pass}
                            onChange={(e) => setForm({ ...form, pass: e.target.value })}
                        />
                        <div className="flex justify-end " >
                            <Button variant="outline"
                                    onClick={() => (window.location.href = "/login")}>Cancel</Button>
                            <Button onClick={createUser}>Add</Button>
                        </div>

                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
