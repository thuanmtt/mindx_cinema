const ID_PHIM_BINH_LUAN = lay_id_tu_url();
const KHOA_BINH_LUAN = "binh_luan_" + ID_PHIM_BINH_LUAN;
let so_sao_dang_chon = 0;

function lay_binh_luan() {
  return JSON.parse(localStorage.getItem(KHOA_BINH_LUAN)) || [];
}

function luu_binh_luan(danh_sach) {
  localStorage.setItem(KHOA_BINH_LUAN, JSON.stringify(danh_sach));
}

function thoat_html(chuoi) {
  return String(chuoi)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function chuoi_sao(so) {
  return "★".repeat(so) + "☆".repeat(5 - so);
}

function dinh_dang_thoi_gian(iso) {
  const d = new Date(iso);
  return d.toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" });
}

function hien_diem_trung_binh(danh_sach) {
  const o = document.getElementById("diem_trung_binh");
  if (danh_sach.length === 0) { o.textContent = "Chưa có đánh giá"; return; }
  const tong = danh_sach.reduce((cong_don, bl) => cong_don + bl.sao, 0);
  const trung_binh = tong / danh_sach.length;
  o.textContent = `${chuoi_sao(Math.round(trung_binh))} ${trung_binh.toFixed(1)}/5 · ${danh_sach.length} đánh giá`;
}

function hien_danh_sach_binh_luan() {
  const danh_sach = lay_binh_luan();
  hien_diem_trung_binh(danh_sach);
  const vung = document.getElementById("danh_sach_binh_luan");
  if (danh_sach.length === 0) {
    vung.innerHTML = `<p class="text-secondary">Chưa có bình luận nào. Hãy là người đầu tiên!</p>`;
    return;
  }
  vung.innerHTML = [...danh_sach].reverse().map((bl, i) => `
    <div class="card card-body py-2">
      <div class="d-flex justify-content-between flex-wrap gap-2">
        <strong>${thoat_html(bl.ten)}</strong>
        <span class="text-warning">${chuoi_sao(bl.sao)}</span>
      </div>
      <p class="mb-1">${thoat_html(bl.noi_dung)}</p>
      <small class="text-secondary">${dinh_dang_thoi_gian(bl.thoi_gian)}</small>
    </div>`).join("");
}

function to_sao(so) {
  document.querySelectorAll("#chon_sao .btn-sao").forEach(nut => {
    nut.classList.toggle("sang", Number(nut.dataset.sao) <= so);
  });
  document.getElementById("nhan_sao").textContent = so ? `${so}/5` : "Chưa chọn";
  document.getElementById("so_sao").value = so;
}

function xu_ly_gui_binh_luan(su_kien) {
  su_kien.preventDefault();
  const noi_dung = document.getElementById("noi_dung_binh_luan").value;
  const thong_bao = document.getElementById("thong_bao_binh_luan");

  const hop_le = ap_dung_ket_qua_kiem_tra([
    ["noi_dung_binh_luan", kiem_tra_rong(noi_dung, "Bình luận") || kiem_tra_do_dai(noi_dung.trim(), 5, "Bình luận")]
  ]);
  if (so_sao_dang_chon === 0) {
    thong_bao.textContent = "Em chọn số sao trước nhé.";
    return;
  }
  if (!hop_le) { thong_bao.textContent = ""; return; }

  const nguoi = lay_nguoi_dang_nhap();
  const danh_sach = lay_binh_luan();
  danh_sach.push({ ten: nguoi.ho_ten, sao: so_sao_dang_chon, noi_dung: noi_dung.trim(), thoi_gian: new Date().toISOString() });
  luu_binh_luan(danh_sach);

  su_kien.target.reset();
  so_sao_dang_chon = 0;
  to_sao(0);
  thong_bao.textContent = "Đã gửi, cảm ơn em!";
  hien_danh_sach_binh_luan();
}

function khoi_dong_binh_luan() {
  if (!ID_PHIM_BINH_LUAN) return;
  hien_danh_sach_binh_luan();

  const form = document.getElementById("form_binh_luan");
  const moi = document.getElementById("moi_dang_nhap");
  if (lay_nguoi_dang_nhap()) form.classList.remove("d-none");
  else moi.classList.remove("d-none");

  document.querySelectorAll("#chon_sao .btn-sao").forEach(nut => {
    nut.addEventListener("click", () => { so_sao_dang_chon = Number(nut.dataset.sao); to_sao(so_sao_dang_chon); });
  });
  form.addEventListener("submit", xu_ly_gui_binh_luan);
}

document.addEventListener("DOMContentLoaded", khoi_dong_binh_luan);
