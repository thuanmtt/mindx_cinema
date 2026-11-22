async function tai_trang_xem() {
  if (!yeu_cau_dang_nhap()) return;

  const id = lay_id_tu_url();
  if (!id) {
    document.getElementById("khung_xem").innerHTML = `<div class="alert alert-warning">Thiếu mã phim trên địa chỉ.</div>`;
    return;
  }

  document.getElementById("khung_xem").innerHTML = `
    <div class="ratio ratio-16x9 rounded overflow-hidden bg-black">
      <iframe src="${EMBED_BASE}${id}" allowfullscreen allow="autoplay; fullscreen" title="Trình phát phim"></iframe>
    </div>`;

  const phim = await lay_chi_tiet_phim(id);
  if (phim) {
    document.getElementById("ten_phim_dang_xem").textContent = phim.title;
    document.getElementById("link_chi_tiet").href = "chi_tiet.html?id=" + phim.id;
    document.title = "MindX Cinema — Đang xem " + phim.title;
  }
}

tai_trang_xem();
