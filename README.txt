MindX Cinema — bản sau BUỔI 6 (Phần 1)

Mở bằng cách double-click index.html (không cần server). Cần có mạng để tải Bootstrap
từ CDN và ảnh poster từ TMDB; không có mạng thì ảnh thay bằng ô placeholder.

CÂY THƯ MỤC
mindx_cinema/
├── index.html          Home — hiển thị 12 phim mẫu dạng card           [xong buổi 6]
├── dang_ky.html        Register — lưu tài khoản vào localStorage        [xong buổi 6]
├── dang_nhap.html      Login — so khớp tài khoản, lưu người đang đăng nhập [xong buổi 6]
├── css/
│   └── style.css       màu rạp phim, card poster, khung form
└── js/
    ├── config.js       hằng số: TMDB_API_KEY (buổi 7 mới dán), TMDB_BASE, TMDB_ANH, EMBED_BASE
    ├── du_lieu_mau.js  mảng PHIM_MAU (12 phim, cấu trúc giống TMDB) + bảng THE_LOAI
    ├── auth.js         dang_ky(), dang_nhap(), dang_xuat(), cap_nhat_navbar() + xử lý 2 form
    └── home.js         lay_anh_poster(), the_phim(), hien_thi_danh_sach_phim()

THỨ TỰ NẠP SCRIPT ở cuối mỗi trang: bootstrap.bundle → config.js → du_lieu_mau.js
→ auth.js → <file riêng của trang>. Đảo thứ tự là lỗi "X is not defined".

DỮ LIỆU TRONG localStorage (F12 → Application → Local Storage)
- nguoi_dung : mảng tài khoản [{ho_ten, email, ten_dang_nhap, mat_khau}]
- dang_nhap  : {ho_ten, ten_dang_nhap} của người đang đăng nhập (xoá khi đăng xuất)

TRANG NÀO XONG Ở BUỔI NÀO
- Buổi 6: index.html (chưa gọi API), dang_ky.html, dang_nhap.html
- Buổi 7: api.js, chi_tiet.html, tim_kiem.html, tin_tuc.html, xem_phim.html (menu Tìm kiếm /
  Tin tức hiện đang tắt, buổi 7 bật lên)
- Buổi 8: validate.js, binh_luan.js, chatbot, responsive, deploy
