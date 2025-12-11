"use client";
import { useEffect, useState } from "react";
interface IUser {
    _id: string;
    name: string;
    email: string;
}
export default function UsersPage() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [form, setForm] = useState({ name: "", email: "" });
    const [editing, setEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ name: "", email: "" });

    // Load all users
    const getUsers = async () => {
        const res = await fetch("/api/users");
        setUsers(await res.json());
    };

    // Create user
    const createUser = async () => {
        await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setForm({ name: "", email: "" });
        getUsers();
    };

    // Update user
    const updateUser = async (id: string) => {
        await fetch(`/api/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editForm),
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
        <div className="max-w-2xl mx-auto p-6 space-y-6 text-gray-900">
            <h1 className="text-3xl font-bold">User CRUD (Next.js + MongoDB)</h1>

            {/* ADD USER FORM */}
            <div className="bg-white shadow p-4 rounded-xl space-y-3">
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
                    onChange={(e) => {
                        let val = e.target.value;
                        if (!val.includes("@")) val = val + "@gmail.com";
                        setForm({ ...form, email: val });
                    }}
                />
                <button
                    onClick={createUser}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Add
                </button>
            </div>

            {/* USER LIST */}
            <div className="bg-white shadow rounded-xl p-4">
                <h2 className="text-xl font-semibold mb-3">User List</h2>

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
                                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                                    onClick={() => {
                                        setEditing(u._id);
                                        setEditForm({ name: u.name, email: u.email });
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-3 py-1 bg-red-600 text-white rounded"
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

            {/* EDIT POPUP */}
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
                            onChange={(e) => {
                                let val = e.target.value;
                                if (!val.includes("@")) val = val + "@gmail.com";
                                setEditForm({ ...editForm, email: val });
                            }}
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
