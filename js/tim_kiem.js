async function thuc_hien_tim_kiem(tu_khoa) {
  const thong_bao = document.getElementById("thong_bao_tim_kiem");
  tu_khoa = tu_khoa.trim();
  const hop_le = ap_dung_ket_qua_kiem_tra([
    ["tu_khoa", kiem_tra_rong(tu_khoa, "Từ khoá") || kiem_tra_do_dai(tu_khoa, 2, "Từ khoá")]
  ]);
  if (!hop_le) {
    thong_bao.textContent = "";
    document.getElementById("ket_qua_tim_kiem").innerHTML = "";
    return;
  }
  hien_dang_tai("ket_qua_tim_kiem");
  const ket_qua = await tim_phim(tu_khoa);
  hien_thi_danh_sach_phim(ket_qua, "ket_qua_tim_kiem");
  thong_bao.textContent = ket_qua.length === 0
    ? `Không tìm thấy phim nào có tên chứa "${tu_khoa}".`
    : `Tìm thấy ${ket_qua.length} phim cho "${tu_khoa}".`;
}

document.getElementById("form_tim_kiem").addEventListener("submit", function (su_kien) {
  su_kien.preventDefault();
  thuc_hien_tim_kiem(document.getElementById("tu_khoa").value);
});

const tu_khoa_tren_url = new URLSearchParams(window.location.search).get("q");
if (tu_khoa_tren_url) {
  document.getElementById("tu_khoa").value = tu_khoa_tren_url;
  thuc_hien_tim_kiem(tu_khoa_tren_url);
}
