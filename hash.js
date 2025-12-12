// hash_password.js
import bcrypt from 'bcryptjs';
async function hashAndLog() {
    const rawPassword = '123456'; // <-- Mật khẩu bạn muốn sử dụng
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);
    console.log("Mật khẩu thô: ", rawPassword);
    console.log("Mật khẩu đã băm (Sử dụng chuỗi này): ", hashedPassword);
}

hashAndLog();