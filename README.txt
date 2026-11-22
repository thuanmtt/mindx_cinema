MindX Cinema — bản HOÀN CHỈNH sau BUỔI 8 (Phần 3)

Mở bằng cách double-click index.html. Không có API key / không có chatbot id vẫn chạy đủ
mọi trang (dữ liệu mẫu, không chatbot, console không đỏ). Dán key TMDB và id Chatbase vào
js/config.js là bật đủ tính năng. Deploy: HUONG_DAN_DEPLOY.txt; kiểm thử: KIEM_THU.txt.

CÂY THƯ MỤC
mindx_cinema/
├── index.html          Home — phim phổ biến (API hoặc mẫu)                      [buổi 6 → 7]
├── dang_ky.html        Register — validate từng ô (is-invalid)                   [buổi 6 → 8]
├── dang_nhap.html      Login — validate, nhận ?thong_bao=&quay_lai=              [buổi 6 → 8]
├── chi_tiet.html       Chi tiết phim + BÌNH LUẬN / CHẤM SAO                      [buổi 7 → 8]
├── tim_kiem.html       Tìm kiếm — validate ô rỗng/quá ngắn                       [buổi 7 → 8]
├── tin_tuc.html        Tin tức — phim sắp chiếu                                  [buổi 7]
├── xem_phim.html       Xem phim — yêu cầu đăng nhập, iframe                      [buổi 7]
├── css/
│   └── style.css       + .btn-sao, media queries (xs/md/xl)                      [buổi 8]
└── js/
    ├── config.js       TMDB_API_KEY, TMDB_BASE, TMDB_ANH, EMBED_BASE, ANH_PLACEHOLDER, CHATBASE_ID
    ├── du_lieu_mau.js  PHIM_MAU (12 phim) + THE_LOAI
    ├── api.js          gọi TMDB có fallback + hàm hiển thị dùng chung
    ├── auth.js         đăng ký / đăng nhập / đăng xuất / yeu_cau_dang_nhap / navbar — dùng validate.js
    ├── validate.js     kiem_tra_rong / do_dai / khop / email / ten_dang_nhap, hien_loi, xoa_loi,
    │                   ap_dung_ket_qua_kiem_tra                                   [buổi 8]
    ├── binh_luan.js    bình luận + sao theo khóa binh_luan_<id>, điểm trung bình   [buổi 8]
    ├── chatbot.js      nhúng Chatbase khi có CHATBASE_ID                           [buổi 8]
    ├── home.js · chi_tiet.js · tim_kiem.js · tin_tuc.js · xem_phim.js

THỨ TỰ NẠP SCRIPT (cuối mỗi trang): bootstrap.bundle → config → du_lieu_mau → api →
[validate] → auth → <file trang> → chatbot. Trang nào dùng kiem_tra_* thì validate.js phải
đứng TRƯỚC file gọi nó (dang_ky, dang_nhap: trước auth.js; tim_kiem: trước tim_kiem.js;
chi_tiet: trước binh_luan.js).

DỮ LIỆU TRONG localStorage
- nguoi_dung        : mảng tài khoản
- dang_nhap         : người đang đăng nhập {ho_ten, ten_dang_nhap}
- binh_luan_<id>    : mảng bình luận của phim <id> [{ten, sao, noi_dung, thoi_gian}]

TRANG NÀO XONG Ở BUỔI NÀO
- Buổi 6: index, dang_ky, dang_nhap (dữ liệu mẫu)
- Buổi 7: api.js, chi_tiet, tim_kiem, tin_tuc, xem_phim
- Buổi 8: validate.js, binh_luan.js, chatbot.js, media queries, deploy GitHub Pages
