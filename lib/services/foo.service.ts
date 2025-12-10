import User from "@/models/user.model";
import { connectDB } from "@/lib/mongoose.lib";

export const foo = async () => {
    await connectDB();

    // Giả lập gọi API bất kỳ
    const fakeApiData = {
        name: "John",
        email: "memm" + Math.floor(Math.random() * 1000) + "@gmail.com",
    };
    // Insert vào MongoDB với { new: true }
    const newUser = await User.create(fakeApiData);
    return newUser;
};
