"use client";
import { useEffect, useState } from "react";
interface IUser {
    _id: string;
    name: string;
    email: string;
    pass?: string;
}
export default function UsersPage() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [form, setForm] = useState({ name: "", email: "", pass: "" });
    const [editing, setEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ name: "", email: "", pass: "" });

    // Load all users
    const getUsers = async () => {
        const res = await fetch("/api/users");
        setUsers(await res.json());
    };

    // Create user
    const createUser = async () => {
        let email = form.email;
        if (!email.includes("@")) {
            email = email + "@gmail.com";
        }

        await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: form.name, email, pass: form.pass }),
        });

        setForm({ name: "", email: "" , pass: "" });
        getUsers();
    };


    // Update user
    const updateUser = async (id: string) => {
        let email = editForm.email;
        if (!email.includes("@")) {
            email = email + "@gmail.com";
        }

        await fetch(`/api/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: editForm.name,
                email,
                pass: editForm.pass
            }),
        });

        setEditing(null);
        getUsers();
    };


    // Delete user
    const deleteUser = async (id: string) => {
        if (!confirm("Xác nhận xóa?")) return;
        await fetch(`/api/users/${id}`, { method: "DELETE" });
        getUsers();
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch("/api/users");
            const data: IUser[] = await res.json();
            setUsers(data);
        };

        fetchUsers();
    }, []);


    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6 text-gray-900 bg-white">
            <button className= "bg-blue-300 text-white px-4 py-2 rounded-lg hover:bg-blue-700 float-right"
                    onClick={() => {
                        // Điều hướng về trang đăng nhập
                        window.location.href = "/login";
                    }}>LOGOUT</button>
            <h1 className="text-3xl font-bold text-center">User CRUD (Next.js + MongoDB)</h1>
            {/* ADD USER FORM */}
            <div className="bg-white shadow p-4 rounded-xl space-y-3 text-black">
                <h2 className="text-xl font-semibold">Add User</h2>
                <input
                    className="w-full border p-2 rounded"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    className="w-full border p-2 rounded"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })
                    }
                />
                <input
                    className="w-full border p-2 rounded"
                    placeholder="password"
                    value={form.pass}
                    onChange={(e) => setForm({ ...form, pass: e.target.value })}
                />
                <button
                    onClick={createUser}
                    className="bg-blue-300 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Add
                </button>
            </div>

            {/* LIST */}
            <div className="bg-white shadow rounded-xl p-4">
                <h2 className="text-xl font-semibold mb-3">List</h2>

                <table className="w-full border">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Name</th>
                        <th className="border p-2 text-left">Email</th>
                        <th className="border p-2 text-center w-40">Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map((u) => (
                        <tr key={u._id} className="border">
                            <td className="p-2">{u.name}</td>
                            <td className="p-2">{u.email}</td>
                            <td className="p-2 text-center space-x-2">
                                <button
                                    className="px-3 py-1 bg-yellow-200 text-white rounded hover:bg-yellow-500"
                                    onClick={() => {
                                        setEditing(u._id);
                                        setEditForm({ name: u.name, email: u.email, pass: "" });
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-3 py-1 bg-red-300 text-white rounded hover:bg-red-700"
                                    onClick={() => deleteUser(u._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* EDIT */}
            {editing && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-80 space-y-3">
                        <h2 className="text-xl font-semibold">Edit User</h2>

                        <input
                            className="w-full border p-2 rounded"
                            value={editForm.name}
                            onChange={(e) =>
                                setEditForm({ ...editForm, name: e.target.value })
                            }
                        />
                        <input
                            className="w-full border p-2 rounded"
                            value={editForm.email}
                            onChange={(e) =>
                                setEditForm({ ...editForm, email: e.target.value })
                            }
                        />
                        <input
                            className="w-full border p-2 rounded"
                            value={editForm.pass}
                            onChange={(e) =>
                                setEditForm({ ...editForm, pass: e.target.value })
                            }
                        />

                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setEditing(null)}
                                className="px-3 py-1 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => updateUser(editing)}
                                className="px-3 py-1 bg-blue-600 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
