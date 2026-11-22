function ten_the_loai(phim) {
  if (phim.genres) return phim.genres.map(tl => tl.name);
  if (phim.genre_ids) return phim.genre_ids.map(id => THE_LOAI[id] || "Khác");
  return [];
}

function ve_chi_tiet(phim) {
  const the_loai_html = ten_the_loai(phim)
    .map(ten => `<span class="badge text-bg-secondary me-1">${ten}</span>`).join("");
  const thoi_luong = phim.runtime ? ` · ${phim.runtime} phút` : "";

  document.getElementById("noi_dung_chi_tiet").innerHTML = `
    <div class="col-md-4 col-lg-3">
      <img src="${lay_anh_poster(phim)}" class="img-fluid rounded poster" alt="${phim.title}"
           onerror="this.onerror=null; this.src='${ANH_PLACEHOLDER}Khong+co+anh'">
    </div>
    <div class="col-md-8 col-lg-9">
      <h1 class="h2">${phim.title}</h1>
      <p class="text-secondary">${lay_nam(phim)}${thoi_luong} · ⭐ ${(phim.vote_average || 0).toFixed(1)}/10</p>
      <p class="mb-3">${the_loai_html}</p>
      <h2 class="h5">Nội dung</h2>
      <p>${phim.overview || "Chưa có mô tả tiếng Việt cho phim này."}</p>
      <div class="d-flex gap-2 mt-4">
        <a href="xem_phim.html?id=${phim.id}" class="btn btn-danger btn-lg">▶ Xem ngay</a>
        <a href="index.html" class="btn btn-outline-light btn-lg">← Trang chủ</a>
      </div>
    </div>`;
  document.title = "MindX Cinema — " + phim.title;
}

function bao_khong_tim_thay(ly_do) {
  document.getElementById("noi_dung_chi_tiet").innerHTML = `
    <div class="col-12">
      <div class="alert alert-warning">${ly_do}</div>
      <a href="index.html" class="btn btn-outline-light">← Về trang chủ</a>
    </div>`;
}

async function tai_chi_tiet() {
  const id = lay_id_tu_url();
  if (!id) {
    bao_khong_tim_thay("Thiếu mã phim trên địa chỉ. Hãy mở trang này từ một card phim (chi_tiet.html?id=…).");
    return;
  }
  const phim = await lay_chi_tiet_phim(id);
  if (!phim) {
    bao_khong_tim_thay(`Không tìm thấy phim có id = ${id}.`);
    return;
  }
  ve_chi_tiet(phim);
}

tai_chi_tiet();
