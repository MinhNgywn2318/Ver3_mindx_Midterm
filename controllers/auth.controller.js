import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Mã hóa password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        // Trả về thông tin người dùng mới
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "An error occurred while registering user" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm user trong database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }

        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }

        // Tạo và trả về token JWT cho người dùng
        const token = createJwtToken(user._id);

        // Đăng nhập thành công, trả về token
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "An error occurred while logging in" });
    }
};

function createJwtToken(userId) {
    // Tạo token với userId và JWT_SECRET từ biến môi trường
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}