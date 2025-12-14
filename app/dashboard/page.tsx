"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {useEffect, useState} from "react";
interface IUser {
    _id: string;
    name: string;
    email: string;
    pass?: string;
}
export default function DashboardPage() {

    const [users, setUsers] = useState<IUser[]>([]);
    const [editing, setEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ name: "", email: "", pass: "" });

    // Load all users
    const getUsers = async () => {
        const res = await fetch("/api/users");
        setUsers(await res.json());
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
        <div className="min-h-screen bg-gray-100 p-6 text-black">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">LIST USER</h1>

                <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/login")}
                >
                    Logout
                </Button>
            </div>

            {/* TABLE */}
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {users.map((u) => (
                                <TableRow key={u._id}>
                                    <TableCell>{u.name}</TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setEditing(u._id);
                                                setEditForm({
                                                    name: u.name,
                                                    email: u.email,
                                                    pass: "",
                                                });
                                            }}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => deleteUser(u._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-3">
                        <Input
                            value={editForm.name}
                            onChange={(e) =>
                                setEditForm({ ...editForm, name: e.target.value })
                            }
                        />

                        <Input
                            value={editForm.email}
                            onChange={(e) =>
                                setEditForm({ ...editForm, email: e.target.value })
                            }
                        />

                        <Input
                            type="password"
                            value={editForm.pass}
                            onChange={(e) =>
                                setEditForm({ ...editForm, pass: e.target.value })
                            }
                        />

                        <div className="flex justify-end gap-3">
                            <Button
                                variant="secondary"
                                onClick={() => setEditing(null)}
                            >
                                Cancel
                            </Button>

                            <Button onClick={() => updateUser(editing!)}>
                                Save
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
