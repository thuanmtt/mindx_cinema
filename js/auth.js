const KHOA_NGUOI_DUNG = "nguoi_dung";
const KHOA_DANG_NHAP = "dang_nhap";

function lay_danh_sach_nguoi_dung() {
  return JSON.parse(localStorage.getItem(KHOA_NGUOI_DUNG)) || [];
}

function luu_danh_sach_nguoi_dung(danh_sach) {
  localStorage.setItem(KHOA_NGUOI_DUNG, JSON.stringify(danh_sach));
}

function lay_nguoi_dang_nhap() {
  return JSON.parse(localStorage.getItem(KHOA_DANG_NHAP));
}

function dang_ky(ho_ten, email, ten_dang_nhap, mat_khau) {
  const danh_sach = lay_danh_sach_nguoi_dung();
  const bi_trung = danh_sach.some(nguoi => nguoi.ten_dang_nhap === ten_dang_nhap);
  if (bi_trung) {
    return { thanh_cong: false, thong_bao: "Tên đăng nhập đã có người dùng, em chọn tên khác nhé." };
  }
  danh_sach.push({ ho_ten, email, ten_dang_nhap, mat_khau });
  luu_danh_sach_nguoi_dung(danh_sach);
  return { thanh_cong: true, thong_bao: "Đăng ký thành công! Đang chuyển sang trang đăng nhập…" };
}

function dang_nhap(ten_dang_nhap, mat_khau) {
  const nguoi = lay_danh_sach_nguoi_dung()
    .find(n => n.ten_dang_nhap === ten_dang_nhap && n.mat_khau === mat_khau);
  if (!nguoi) {
    return { thanh_cong: false, thong_bao: "Sai tên đăng nhập hoặc mật khẩu." };
  }
  localStorage.setItem(KHOA_DANG_NHAP, JSON.stringify({ ho_ten: nguoi.ho_ten, ten_dang_nhap: nguoi.ten_dang_nhap }));
  return { thanh_cong: true, thong_bao: "Xin chào " + nguoi.ho_ten + "! Đang về trang chủ…" };
}

function dang_xuat() {
  localStorage.removeItem(KHOA_DANG_NHAP);
  window.location.href = "index.html";
}

function cap_nhat_navbar() {
  const khu_vuc = document.getElementById("khu_vuc_tai_khoan");
  if (!khu_vuc) return;
  const nguoi = lay_nguoi_dang_nhap();
  if (nguoi) {
    khu_vuc.innerHTML = `
      <li class="nav-item"><span class="nav-link text-warning">👋 ${nguoi.ho_ten}</span></li>
      <li class="nav-item"><button class="btn btn-outline-light btn-sm ms-lg-2 mt-2 mt-lg-0" onclick="dang_xuat()">Đăng xuất</button></li>`;
  } else {
    khu_vuc.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="dang_nhap.html">Đăng nhập</a></li>
      <li class="nav-item"><a class="btn btn-danger btn-sm ms-lg-2 mt-2 mt-lg-0" href="dang_ky.html">Đăng ký</a></li>`;
  }
}

function hien_thong_bao(loai, noi_dung) {
  const o = document.getElementById("thong_bao");
  if (!o) return;
  o.className = "alert alert-" + loai;
  o.textContent = noi_dung;
}

function xu_ly_dang_ky(su_kien) {
  su_kien.preventDefault();
  const ho_ten = document.getElementById("ho_ten").value.trim();
  const email = document.getElementById("email").value.trim();
  const ten_dang_nhap = document.getElementById("ten_dang_nhap").value.trim();
  const mat_khau = document.getElementById("mat_khau").value;
  const xac_nhan = document.getElementById("xac_nhan_mat_khau").value;

  if (!ho_ten || !ten_dang_nhap || !mat_khau) {
    hien_thong_bao("warning", "Em điền đủ họ tên, tên đăng nhập và mật khẩu nhé.");
    return;
  }
  if (mat_khau !== xac_nhan) {
    hien_thong_bao("danger", "Mật khẩu nhập lại chưa khớp.");
    return;
  }
  const ket_qua = dang_ky(ho_ten, email, ten_dang_nhap, mat_khau);
  hien_thong_bao(ket_qua.thanh_cong ? "success" : "danger", ket_qua.thong_bao);
  if (ket_qua.thanh_cong) {
    setTimeout(() => { window.location.href = "dang_nhap.html"; }, 1200);
  }
}

function xu_ly_dang_nhap(su_kien) {
  su_kien.preventDefault();
  const ten_dang_nhap = document.getElementById("ten_dang_nhap").value.trim();
  const mat_khau = document.getElementById("mat_khau").value;
  const ket_qua = dang_nhap(ten_dang_nhap, mat_khau);
  hien_thong_bao(ket_qua.thanh_cong ? "success" : "danger", ket_qua.thong_bao);
  if (ket_qua.thanh_cong) {
    setTimeout(() => { window.location.href = "index.html"; }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cap_nhat_navbar();
  const form_dang_ky = document.getElementById("form_dang_ky");
  if (form_dang_ky) form_dang_ky.addEventListener("submit", xu_ly_dang_ky);
  const form_dang_nhap = document.getElementById("form_dang_nhap");
  if (form_dang_nhap) form_dang_nhap.addEventListener("submit", xu_ly_dang_nhap);
});
