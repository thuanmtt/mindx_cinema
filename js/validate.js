function kiem_tra_rong(gia_tri, ten_truong) {
  if (gia_tri.trim() === "") return ten_truong + " không được để trống.";
  return "";
}

function kiem_tra_do_dai(gia_tri, toi_thieu, ten_truong) {
  if (gia_tri.length < toi_thieu) return ten_truong + " phải có ít nhất " + toi_thieu + " ký tự.";
  return "";
}

function kiem_tra_khop(gia_tri_1, gia_tri_2, thong_bao) {
  if (gia_tri_1 !== gia_tri_2) return thong_bao;
  return "";
}

function kiem_tra_email(email) {
  const mau = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!mau.test(email.trim())) return "Email chưa đúng dạng ten@tenmien.com.";
  return "";
}

function kiem_tra_ten_dang_nhap(ten) {
  const mau = /^[a-z0-9_]{3,20}$/;
  if (!mau.test(ten)) return "Tên đăng nhập 3–20 ký tự, chỉ gồm chữ thường, số và dấu _.";
  return "";
}

function hien_loi(id_o, thong_bao) {
  const o = document.getElementById(id_o);
  o.classList.add("is-invalid");
  const o_loi = o.parentElement.querySelector(".invalid-feedback");
  if (o_loi) o_loi.textContent = thong_bao;
}

function xoa_loi(id_o) {
  const o = document.getElementById(id_o);
  o.classList.remove("is-invalid");
}

function ap_dung_ket_qua_kiem_tra(danh_sach) {
  let hop_le = true;
  for (const [id_o, loi] of danh_sach) {
    if (loi) { hien_loi(id_o, loi); hop_le = false; }
    else xoa_loi(id_o);
  }
  return hop_le;
}
