import Profile from '../models/profile.model.js';

export const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Hồ sơ không tồn tại" });
        }
        // Chỉ cho phép xem nếu người dùng đăng nhập
        res.status(200).json({ profile });
    } catch (error) {
        console.error("Lỗi khi lấy thông tin hồ sơ:", error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi lấy thông tin hồ sơ." });
    }
};

// Cập nhật thông tin hồ sơ cá nhân
export const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Hồ sơ không tồn tại" });
        }
        // Kiểm tra xem người dùng có phải là chủ sở hữu của hồ sơ không
        if (req.user._id.toString() !== profile.userId.toString()) {
            return res.status(403).json({ message: "Bạn không có quyền cập nhật hồ sơ này" });
        }
        // Thực hiện cập nhật thông tin hồ sơ
        // Ví dụ: profile.name = req.body.name; profile.save();
        res.status(200).json({ message: "Cập nhật hồ sơ thành công" });
    } catch (error) {
        console.error("Lỗi khi cập nhật hồ sơ:", error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật hồ sơ." });
    }
};

// Xóa hồ sơ cá nhân
export const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({ message: "Hồ sơ không tồn tại" });
        }
        // Kiểm tra xem người dùng có phải là chủ sở hữu của hồ sơ không
        if (req.user._id.toString() !== profile.userId.toString()) {
            return res.status(403).json({ message: "Bạn không có quyền xóa hồ sơ này" });
        }
        // Thực hiện xóa hồ sơ
        await profile.remove();
        res.status(200).json({ message: "Xóa hồ sơ thành công" });
    } catch (error) {
        console.error("Lỗi khi xóa hồ sơ:", error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi xóa hồ sơ." });
    }
};