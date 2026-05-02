(function() {
    // Fungsi utama untuk mengubah logo
    function gantiLogoWeb() {
        // Mencari elemen gambar logo di kiri atas
        const logoImg = document.querySelector('.header-mdl__logo img');
        
        if (logoImg) {
            // HANYA mengganti sumber gambar (src), tanpa mengubah style/ukurannya sama sekali
            logoImg.src = 'https://cdn.jsdelivr.net/gh/dewasijicare/karo789@73ab9931ef42ecaaafe861e2fe38f66699ad74d3/logo_karo789.webp';
            return true; // Berhasil diganti
        }
        return false; // Elemen logo belum ketemu
    }

    // 1. Coba jalankan fungsi ganti logo secara langsung
    if (!gantiLogoWeb()) {
        // 2. Jika web agak lambat loadingnya, script akan mengecek setiap 0.5 detik
        let cekLogoBerulang = setInterval(function() {
            if (gantiLogoWeb()) {
                clearInterval(cekLogoBerulang); // Hentikan pengecekan jika logo sudah berhasil diganti
            }
        }, 500);

        // 3. Batas waktu pengecekan: berhenti mencari setelah 10 detik
        setTimeout(function() {
            clearInterval(cekLogoBerulang);
        }, 10000);
    }
})();
