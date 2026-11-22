function dinh_dang_ngay(chuoi) {
  if (!chuoi) return "Chưa rõ ngày";
  const [nam, thang, ngay] = chuoi.split("-");
  return `${ngay}/${thang}/${nam}`;
}

function the_tin(phim) {
  const mo_ta = phim.overview ? phim.overview.slice(0, 160) + "…" : "Chưa có mô tả.";
  return `
    <div class="col-12 col-lg-6">
      <a href="chi_tiet.html?id=${phim.id}" class="text-decoration-none">
        <div class="card the-phim h-100">
          <div class="row g-0">
            <div class="col-4">
              <img src="${lay_anh_poster(phim)}" class="img-fluid rounded-start poster" alt="${phim.title}"
                   onerror="this.onerror=null; this.src='${ANH_PLACEHOLDER}Khong+co+anh'">
            </div>
            <div class="col-8">
              <div class="card-body">
                <span class="badge text-bg-danger mb-2">Khởi chiếu ${dinh_dang_ngay(phim.release_date)}</span>
                <h5 class="card-title text-light">${phim.title}</h5>
                <p class="card-text small text-secondary">${mo_ta}</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>`;
}

async function tai_tin_tuc() {
  hien_dang_tai("danh_sach_tin_tuc");
  const danh_sach = await lay_phim_sap_chieu();
  document.getElementById("danh_sach_tin_tuc").innerHTML = danh_sach.map(the_tin).join("");
  hien_nguon_du_lieu("nguon_du_lieu");
}

tai_tin_tuc();
