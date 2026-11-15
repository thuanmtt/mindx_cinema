function lay_anh_poster(phim) {
  if (phim.poster_path) return TMDB_ANH + phim.poster_path;
  return ANH_PLACEHOLDER + encodeURIComponent(phim.title);
}

function lay_nam(phim) {
  return phim.release_date ? phim.release_date.slice(0, 4) : "—";
}

function the_phim(phim) {
  const diem = (phim.vote_average || 0).toFixed(1);
  return `
    <div class="col">
      <div class="card h-100 the-phim">
        <img src="${lay_anh_poster(phim)}" class="card-img-top poster" alt="${phim.title}"
             onerror="this.onerror=null; this.src='${ANH_PLACEHOLDER}Khong+co+anh'">
        <div class="card-body p-2">
          <h6 class="card-title mb-1 text-truncate" title="${phim.title}">${phim.title}</h6>
          <p class="card-text small text-secondary mb-0">${lay_nam(phim)} · ⭐ ${diem}</p>
        </div>
      </div>
    </div>`;
}

function hien_thi_danh_sach_phim(danh_sach, id_vung) {
  const vung = document.getElementById(id_vung);
  if (danh_sach.length === 0) {
    vung.innerHTML = `<p class="text-secondary">Chưa có phim nào để hiển thị.</p>`;
    return;
  }
  vung.innerHTML = danh_sach.map(the_phim).join("");
}

hien_thi_danh_sach_phim(PHIM_MAU, "danh_sach_phim");
document.getElementById("so_luong_phim").textContent = PHIM_MAU.length;
