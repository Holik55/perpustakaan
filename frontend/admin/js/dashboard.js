document.getElementById("menu-toggle").addEventListener("click", function () {
  document.getElementById("wrapper").classList.toggle("toggled");
});

const mainContent = document.getElementById("mainContent");
const menuItems = document.querySelectorAll("[data-page]");
let isEditMode = false; // Flag untuk mode tambah atau edit
let editBookId = null; // Simpan ID buku yang sedang diedit

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    const page = item.getAttribute("data-page");
    renderPage(page);
  });
});

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


    default:
      mainContent.innerHTML = `<p>Halaman tidak ditemukan.</p>`;
  }
}

async function handleFormSubmit(event) {
  event.preventDefault(); // Mencegah reload halaman
  const formData = new FormData(event.target);
  const bookData = {
    isbn: formData.get("isbn"),
    title: formData.get("title"),
    pengarang: formData.get("pengarang"),
    penerbit: formData.get("penerbit"),
    thnterbit: parseInt(formData.get("thnterbit")),
    kategori: formData.get("kategori"),
    bahasa: formData.get("bahasa"),
    halaman: parseInt(formData.get("halaman")),
    no_rak: formData.get("no_rak"),
    cover_image_url: formData.get("cover_image_url"),
  };

  const submitBtn = event.target.querySelector("button[type=submit]");
  submitBtn.disabled = true;
  submitBtn.textContent = isEditMode ? "Menyimpan..." : "Mengirim...";

  try {
    const url = isEditMode
      ? `http://localhost:3000/api/books/${editBookId}`
      : "http://localhost:3000/api/books";
    const method = isEditMode ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || `Gagal ${isEditMode ? 'mengedit' : 'menambahkan'} buku`);
    }
    alert(`Buku berhasil ${isEditMode ? 'diperbarui' : 'ditambahkan'}!`);
    event.target.reset(); // Reset form
    if (isEditMode) cancelEdit(); // Kembali ke mode tambah
    loadBooks(); // Perbarui tabel buku
  } catch (error) {
    console.error("Error:", error);
    alert(`Terjadi kesalahan: ${error.message}`);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = isEditMode ? "Simpan Perubahan" : "Tambah Buku";
  }
}

async function loadBooks() {
  try {
    const response = await fetch("http://localhost:3000/api/books");
    const books = await response.json();
    const tabelBuku = document.getElementById("tabelBuku");
    tabelBuku.innerHTML = books.map((book) => `
      <tr>
        <td>${book.id}</td>
        <td>${book.isbn}</td>
        <td>${book.title}</td>
        <td>${book.pengarang}</td>
        <td>${book.penerbit}</td>
        <td>${book.thnterbit}</td>
        <td>${book.kategori}</td>
        <td>${book.bahasa}</td>
        <td>${book.halaman}</td>
        <td>${book.no_rak}</td>
        <td><img src="${book.cover_image_url}" alt="Cover" width="50"></td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editBook(${book.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">Hapus</button>
        </td>
      </tr>
    `).join("");
  } catch (error) {
    console.error("Gagal memuat buku:", error);
    alert("Gagal memuat daftar buku.");
  }
}

async function editBook(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/books/${id}`);
    const book = await response.json();
    if (!response.ok) throw new Error(book.message || "Gagal mengambil data buku");

    // Aktifkan mode edit
    isEditMode = true;
    editBookId = id;

    // Render ulang halaman untuk memperbarui judul form dan tombol
    renderPage("tambah");

    // Isi form dengan data buku
    const form = document.getElementById("formTambahBuku");
    form.querySelector("#isbn").value = book.isbn;
    form.querySelector("#title").value = book.title;
    form.querySelector("#pengarang").value = book.pengarang;
    form.querySelector("#penerbit").value = book.penerbit;
    form.querySelector("#thnterbit").value = book.thnterbit;
    form.querySelector("#kategori").value = book.kategori;
    form.querySelector("#bahasa").value = book.bahasa;
    form.querySelector("#halaman").value = book.halaman;
    form.querySelector("#no_rak").value = book.no_rak;
    form.querySelector("#cover_image_url").value = book.cover_image_url;

    // Scroll ke form untuk UX yang lebih baik
    form.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("Error:", error);
    alert(`Gagal memuat data buku: ${error.message}`);
  }
}

function cancelEdit() {
  isEditMode = false;
  editBookId = null;
  const form = document.getElementById("formTambahBuku");
  form.reset();
  renderPage("tambah"); // Render ulang untuk kembali ke mode tambah
}

async function deleteBook(id) {
  if (confirm("Yakin ingin menghapus buku ini?")) {
    try {
      const response = await fetch(`http://localhost:3000/api/books/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Gagal menghapus buku");
      alert("Buku berhasil dihapus!");
      loadBooks();
    } catch (error) {
      console.error("Error:", error);
      alert(`Gagal menghapus buku: ${error.message}`);
    }
  }
}