document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("wrapper").classList.toggle("toggled");
});

const mainContent = document.getElementById("mainContent");
const menuItems = document.querySelectorAll("[data-page]");

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    const page = item.getAttribute("data-page");
    renderPage(page);
  });
});

function renderPage(page) {
  switch (page) {
    case "crud":
      mainContent.innerHTML = `
        <h4>📚 CRUD Buku</h4>
        <p>Form tambah/edit/hapus buku akan ditampilkan di sini.</p>
      `;
      break;
    case "stok":
      mainContent.innerHTML = `
        <h4>📦 Stok Buku</h4>
        <p>Daftar buku dan jumlah stok tersedia.</p>
      `;
      break;
    case "peminjaman":
      mainContent.innerHTML = `
        <h4>🔄 Peminjaman</h4>
        <p>Daftar peminjaman, status, dan pengembalian.</p>
      `;
      break;
    default:
      mainContent.innerHTML = `<p>Halaman tidak ditemukan.</p>`;
  }
}
