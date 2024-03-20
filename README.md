< --- >  Đề giữa kỳ WFS

1. Thực hiện thiết kế cơ sở dữ liệu để đáp ứng những thông tin sau:
Thông tin cá nhân bao gồm các trường dữ liệu:
Email (dạng String, unique)
Họ và tên (dạng String)
Ngày tháng năm sinh (dạng String)
Nơi sinh (dạng String)
Quốc tịch (dạng String)
Password đã mã hóa (dạng String)
Thông tin hồ sơ cá nhân bao gồm các trường dữ liệu: 
userId ( dạng mongoose.Schema.Types.ObjectId) tham chiếu tới id của collection thông tin cá nhân
Các kỹ năng cá nhân (dạng mảng với mỗi item là dạng String String array)
Các sở thích (dạng String)
Các mục tiêu cá nhân (dạng mảng với mỗi item là dạng String String array)
Chi tiết:
Collection users: lưu trữ thông tin cá nhân.
Collection profile: lưu trữ thông tin hồ sơ cá nhân.

2. Từ dữ liệu vừa thiết kế hãy thiết kế API có thể đáp ứng các yêu cầu sau:
Từ bảng user tạo API để đăng ký tài khoản và đăng nhập.
Viết middleware kiểm tra phiên người dùng đăng nhập
Với các trường yêu cầu phải thiết kế API C.R.U.D cho tất cả các thông tin trên cơ sở dữ liệu.
Đối với hồ sơ cá nhân gắn với tài khoản chỉ có chủ sở hữu mới có thể sửa và xóa (update/delete) còn các hồ sơ khác chỉ có thể xem. Nếu không login không sửa và xóa được các hồ sơ.
Mọi API đều yêu cầu người dùng đăng nhập chỉ trừ API đăng ký tài khoản và đăng nhập

	Gợi ý:
Đối với chức năng tạo tài khoản: 
Người dùng gửi dữ liệu lên api dạng HTTP POST với payload (HTTP BODY) gồm các thông tin email, password, vv. Mã hóa password dùng thư viện Bcrypt rồi lưu vào CSDL.
Đối với chức năng login: 
Người dùng gửi dữ liệu lên api dạng HTTP POST với payload (HTTP BODY) gồm các thông tin email, password. Kiểm tra xác thực thông tin đăng nhập với CSDL.
Nếu đúng thì dùng khái niệm JWT để tạo JWT token thiết lập phiên đăng nhập cho người dùng với thư viện jsonwebtoken
Trong JWT token trả về cho người dùng phần payload của JWT thêm vào trường userId để xác định JWT token đó là của user nào
Đối với chức năng viết middleware kiểm tra phiên đăng nhập:
Viết Middleware chứa logic lấy và kiểm tra request của người dùng có đính kèm JWT token trong HTTP HEADER hay không sử dụng thư viện jsonwebtoken kiểm tra JWT token có valid hay không. 
Nếu JWT token valid thì load thông tin người dùng từ CSDL với thông tin userId gắn trong payload của JWT token nhưng trừ trường password, sau đó gán vào trong object HTTP request (req.user = userService.getUserById) nhằm giúp cho các middleware tiếp theo sẽ dựa trên thông tin này để biết người dùng đó có đăng nhập hay chưa và kiểm tra được request đó là của người dùng nào
Đối với chức năng sửa và xóa (update/delete) hồ sơ cá nhân:
Người dùng gửi request HTTP PUT để cập nhật hồ sơ, lúc này lấy thông tin đăng nhập của người dùng từ object req.user được gán từ middleware kiểm tra phiên đăng nhập so sánh với userId của hồ sơ cá nhân đó xem có thuộc về cùng 1 người dùng hay không nếu không hãy quăng lỗi để báo cho người dùng biết không có quyền sửa hay xóa thông tin hồ sơ này.
Yêu cầu:
Ứng dụng mô hình MVC
Thêm validation đơn giản để kiểm tra dữ liệu
Không cần phải mapping dữ liệu trả về từ database vào DTO (trả thẳng dữ liệu từ model cho người dùng)
