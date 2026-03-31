# HGPT Steel Core Value - Thông tin Dự án

Tài liệu này tổng hợp các công nghệ lõi và các tính năng chính của dự án **Bảng tin Văn hóa HGPT Steel** đã được xây dựng và tối ưu hoàn chỉnh.

## 1. Công nghệ & Framework Lõi (Tech Stack)

*   **Next.js 16 (App Router):** Framework React mạnh mẽ cung cấp kiến trúc Hybrid (Server & Client Components), xử lý Server Actions và định tuyến API nội bộ.
*   **React 18+:** Xây dựng giao diện tương tác tức thì với các Hooks nâng cao (`useState`, `useEffect`, `useMemo`).
*   **Tailwind CSS:** Hệ thống CSS Utility-first giúp xây dựng nhanh giao diện "Industrial-Tech", chuyên nghiệp, tối ưu Dark/Light Mode và tương thích mọi kích thước màn hình (Responsive Design).
*   **Google Sheets API (`google-spreadsheet`):** Hoạt động như một cơ sở dữ liệu (Database) thời gian thực, lưu trữ toàn bộ nội dung bài viết và lượt thả tim siêu gọn nhẹ, dễ quản lý.
*   **Google Gemini AI (`@google/genai`):** Trái tim của hệ thống. Sử dụng model **Gemini 3.1 Flash-Lite** để tự động biên tập, phân tích và viết lại câu chuyện thô của nhân viên thành một bài đăng văn hóa chuyên nghiệp, có cấu trúc.
*   **Lucide React:** Bộ thư viện Icon chuẩn mực, sắc nét dùng cho các thành phần UI.

## 2. Các Tính năng Chính đã Phát triển (Key Features)

*   **AI Story Forge (Form Tạo Cốt truyện với AI):** 
    *   Form nhập liệu cao cấp (High-Prestige UI) yêu cầu đầy đủ Họ tên, Bộ phận và Giá trị cốt lõi.
    *   Tích hợp trực tiếp hệ thống Prompt System của doanh nghiệp. Nút "TỔNG HỢP CÂU CHUYỆN VỚI AI" sẽ gửi data thô cho Gemini để viết lại thành văn bản chuyên nghiệp trước khi đăng.
*   **Live Culture Feed (Bảng tin Văn hóa Mượt mà):**
    *   Hiển thị dạng lưới thẻ (Grid Cards) với các thông tin chi tiết: Tên, Phòng ban, Giá trị cốt lõi (Tag) và nội dung.
    *   Thuật toán tính toán thời gian động (Relative Time) thông minh: *Vừa xong, 5 phút trước, 2 giờ trước...*
*   **Hệ thống Tương tác (Like/Thả tim):**
    *   Cho phép người dùng thả tim các nội dung hay. 
    *   Giao diện phản hồi ngay lập tức (Optimistic UI) và đồng bộ/lưu trữ Background trực tiếp xuống cột `likes` trong Google Sheets.
*   **Dashboard Thống kê Thời gian thực:**
    *   Panel trên cùng hiển thị tổng quan: Tổng số lượng bài viết (Câu chuyện Văn hóa) và **Tổng lượt Tương tác** (Cộng dồn tất cả các lượt thả tim của toàn hệ thống).
*   **Bộ lọc Đa luồng (Multi-Filter System):**
    *   Thanh Filter Sticky điều hướng nhanh với 2 chế độ lọc chéo: Theo Thời gian (Hôm nay, Tuần này, Tháng này) và Theo Giá trị cốt lõi.
*   **Tối ưu hóa Giao diện Di động (Mobile-First & Touch Config):**
    *   Giao diện tương thích hoàn hảo thiết bị di động.
    *   Tăng hit-area cho nút, sử dụng `touch-action: manipulation`, sửa lỗi xếp lớp z-index chống chập chờn khi vuốt ngang (iOS/Android Safari Support).
*   **Bảo mật & Máy chủ Cục bộ (LAN Hosting):**
    *   Tùy chỉnh chặn/mở Cross-Origin của `next.config.ts` cho phép ứng dụng vượt màng lọc bảo mật của Next 16 để chạy mượt mà trên thiết bị di động dùng chung mạng nội bộ WiFi (192.168.x.x).
