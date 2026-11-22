function co_api_key() {
  return TMDB_API_KEY !== "" && TMDB_API_KEY !== "DAN_API_KEY_CUA_EM_VAO_DAY";
}

async function goi_tmdb(duong_dan, tham_so = {}) {
  const url = new URL(TMDB_BASE + duong_dan);
  url.searchParams.set("api_key", TMDB_API_KEY);
  url.searchParams.set("language", "vi-VN");
  for (const ten in tham_so) url.searchParams.set(ten, tham_so[ten]);

  const phan_hoi = await fetch(url);
  if (!phan_hoi.ok) throw new Error("TMDB trả về mã lỗi " + phan_hoi.status);
  return await phan_hoi.json();
}

async function lay_phim_pho_bien() {
  if (!co_api_key()) return PHIM_MAU;
  try {
    const du_lieu = await goi_tmdb("/movie/popular");
    return du_lieu.results;
  } catch (loi) {
    console.warn("Không gọi được TMDB, dùng dữ liệu mẫu:", loi.message);
    return PHIM_MAU;
  }
}

async function lay_chi_tiet_phim(id) {
  if (!co_api_key()) return PHIM_MAU.find(phim => phim.id === Number(id)) || null;
  try {
    return await goi_tmdb("/movie/" + id);
  } catch (loi) {
    console.warn("Không lấy được chi tiết phim " + id + ":", loi.message);
    return PHIM_MAU.find(phim => phim.id === Number(id)) || null;
  }
}

function tim_trong_du_lieu_mau(tu_khoa) {
  const tu_khoa_thuong = tu_khoa.toLowerCase();
  return PHIM_MAU.filter(phim =>
    phim.title.toLowerCase().includes(tu_khoa_thuong) ||
    (phim.original_title || "").toLowerCase().includes(tu_khoa_thuong));
}

async function tim_phim(tu_khoa) {
  if (!co_api_key()) return tim_trong_du_lieu_mau(tu_khoa);
  try {
    const du_lieu = await goi_tmdb("/search/movie", { query: tu_khoa });
    return du_lieu.results;
  } catch (loi) {
    console.warn("Không tìm được trên TMDB, tìm trong dữ liệu mẫu:", loi.message);
    return tim_trong_du_lieu_mau(tu_khoa);
  }
}

async function lay_phim_sap_chieu() {
  const mau = [...PHIM_MAU].sort((a, b) => b.release_date.localeCompare(a.release_date));
  if (!co_api_key()) return mau;
  try {
    const du_lieu = await goi_tmdb("/movie/upcoming", { region: "VN" });
    return du_lieu.results;
  } catch (loi) {
    console.warn("Không lấy được phim sắp chiếu:", loi.message);
    return mau;
  }
}

function lay_anh_poster(phim) {
  if (phim.poster_path) return TMDB_ANH + phim.poster_path;
  return ANH_PLACEHOLDER + encodeURIComponent(phim.title || "Phim");
}

function lay_nam(phim) {
  return phim.release_date ? phim.release_date.slice(0, 4) : "—";
}

function lay_id_tu_url() {
  const tham_so = new URLSearchParams(window.location.search);
  return tham_so.get("id");
}

function the_phim(phim) {
  const diem = (phim.vote_average || 0).toFixed(1);
  return `
    <div class="col">
      <a href="chi_tiet.html?id=${phim.id}" class="text-decoration-none">
        <div class="card h-100 the-phim">
          <img src="${lay_anh_poster(phim)}" class="card-img-top poster" alt="${phim.title}"
               onerror="this.onerror=null; this.src='${ANH_PLACEHOLDER}Khong+co+anh'">
          <div class="card-body p-2">
            <h6 class="card-title mb-1 text-truncate text-light" title="${phim.title}">${phim.title}</h6>
            <p class="card-text small text-secondary mb-0">${lay_nam(phim)} · ⭐ ${diem}</p>
          </div>
        </div>
      </a>
    </div>`;
}

function hien_dang_tai(id_vung) {
  document.getElementById(id_vung).innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-danger" role="status"></div>
      <p class="text-secondary mt-2">Đang tải phim…</p>
    </div>`;
}

function hien_thi_danh_sach_phim(danh_sach, id_vung) {
  const vung = document.getElementById(id_vung);
  if (!danh_sach || danh_sach.length === 0) {
    vung.innerHTML = `<p class="col-12 text-secondary">Chưa có phim nào để hiển thị.</p>`;
    return;
  }
  vung.innerHTML = danh_sach.map(the_phim).join("");
}

function hien_nguon_du_lieu(id_the) {
  const the = document.getElementById(id_the);
  if (!the) return;
  the.textContent = co_api_key() ? "Nguồn: TMDB" : "Dữ liệu mẫu — dán API key vào js/config.js để lấy phim thật";
}
