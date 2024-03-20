import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const checkAuth = async (req, res, next) => {
    try {
        // Lấy token từ header Authorization
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed: No token provided');
        }

        // Giải mã token và kiểm tra người dùng
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Gán thông tin người dùng vào request và chuyển tiếp
        req.user = user;
        next();
    } catch (error) {
        // Xử lý lỗi và trả về response 401
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};
