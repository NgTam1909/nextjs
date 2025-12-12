import User from "@/models/user.model";
import { connectDB } from "@/lib/mongoose.lib";

export interface IUser {
    name: string;
    email: string;
    pass: string;
}
export async function getAllUsers() {
    await connectDB();
    return User.find();
}

export async function getUserById(id: string) {
    await connectDB();
    return User.findById(id);
}

export async function createUser(data: IUser) {
    await connectDB();
    return User.create(data);
}
export async function updateUser(id: string, data: Partial<IUser>) {
    await connectDB();
    return User.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteUser(id: string) {
    await connectDB();
    return User.findByIdAndDelete(id);
}
