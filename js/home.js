async function tai_trang_chu() {
  hien_dang_tai("danh_sach_phim");
  const danh_sach = await lay_phim_pho_bien();
  hien_thi_danh_sach_phim(danh_sach, "danh_sach_phim");
  document.getElementById("so_luong_phim").textContent = danh_sach.length;
  hien_nguon_du_lieu("nguon_du_lieu");
}

tai_trang_chu();
