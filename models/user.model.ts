import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
    { timestamps: true }
);

// kiểm tra nếu model đã tồn tại -> dùng lại (tránh lỗi hot reload)
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
