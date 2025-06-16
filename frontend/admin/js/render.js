function renderPage(page) {
  switch (page) {
    case "tambah":
      mainContent.innerHTML = `
        <div class="container py-5">
          <h2 class="mb-4">${isEditMode ? 'Edit Buku' : 'Tambah Buku'}</h2>
          <form id="formTambahBuku" class="mb-5">
            <div class="row g-3">
              <div class="col-md-6">
                <label for="isbn" class="form-label">ISBN</label>
                <input type="text" class="form-control" id="isbn" name="isbn" required>
              </div>
              <div class="col-md-6">
                <label for="title" class="form-label">Judul</label>
                <input type="text" class="form-control" id="title" name="title" required>
              </div>
              <div class="col-md-6">
                <label for="pengarang" class="form-label">Pengarang</label>
                <input type="text" class="form-control" id="pengarang" name="pengarang" required>
              </div>
              <div class="col-md-6">
                <label for="penerbit" class="form-label">Penerbit</label>
                <input type="text" class="form-control" id="penerbit" name="penerbit" required>
              </div>
              <div class="col-md-4">
                <label for="thnterbit" class="form-label">Tahun Terbit</label>
                <input type="number" class="form-control" id="thnterbit" name="thnterbit" required>
              </div>
              <div class="col-md-4">
                <label for="kategori" class="form-label">Kategori</label>
                <input type="text" class="form-control" id="kategori" name="kategori" required>
              </div>
              <div class="col-md-4">
                <label for="bahasa" class="form-label">Bahasa</label>
                <input type="text" class="form-control" id="bahasa" name="bahasa" required>
              </div>
              <div class="col-md-4">
                <label for="halaman" class="form-label">Halaman</label>
                <input type="number" class="form-control" id="halaman" name="halaman" required>
              </div>
              <div class="col-md-4">
                <label for="no_rak" class="form-label">Nomor Rak</label>
                <input type="text" class="form-control" id="no_rak" name="no_rak" required>
              </div>
              <div class="col-md-4">
                <label for="cover_image_url" class="form-label">Cover Image URL</label>
                <input type="url" class="form-control" id="cover_image_url" name="cover_image_url" required>
              </div>
            </div>
            <button type="submit" class="btn btn-primary mt-4">${isEditMode ? 'Simpan Perubahan' : 'Tambah Buku'}</button>
            ${isEditMode ? '<button type="button" class="btn btn-secondary mt-4 ms-2" onclick="cancelEdit()">Batal</button>' : ''}
          </form>

        </div>
      `;
      // Tambahkan event listener untuk form
      const form = document.getElementById("formTambahBuku");
      form.addEventListener("submit", handleFormSubmit);
      // Muat data buku ke tabel
      loadBooks();
      break;

    case "peminjaman":
      mainContent.innerHTML = `
        <h4>🔄 Peminjaman Buku</h4>
        <p>Di sini akan ditampilkan daftar peminjaman dan form input peminjaman baru.</p>
      `;
      break;

    case "daftar":
       mainContent.innerHTML = `
     <div class="container py-5">
      <h2 class="mb-3">📚 Daftar Buku</h2>
      <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>ISBN</th>
              <th>Judul</th>
              <th>Pengarang</th>
              <th>Penerbit</th>
              <th>Tahun</th>
              <th>Kategori</th>
              <th>Bahasa</th>
              <th>Halaman</th>
              <th>Rak</th>
              <th>Cover</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody id="tabelBuku">
            <!-- Data buku akan dimuat di sini -->
          </tbody>
        </table>
      </div>
    </div>
  `;
  loadBooks();
  break;

      case "kategori":
  mainContent.innerHTML = `
    <div class="container py-5">
      <h2 class="mb-3">🏷️ Kategori Buku</h2>
      <p>Fitur kategori masih dalam pengembangan.</p>
    </div>
  `;
  break;

  case "dashboard":
  mainContent.innerHTML = `
    <div class="container py-4">
      <h2 class="mb-3">📊 Dashboard</h2>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Total Buku</h5>
              <p class="card-text fs-4" id="totalBuku">...</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Total Peminjaman</h5>
              <p class="card-text fs-4" id="totalPeminjaman">...</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Kategori Tersedia</h5>
              <p class="card-text fs-4" id="totalKategori">...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  loadDashboardStats();
  break;



    default:
      mainContent.innerHTML = `<p>Halaman tidak ditemukan.</p>`;
  }
}