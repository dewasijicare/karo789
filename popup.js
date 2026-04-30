<script type="text/javascript">
(function() {
    // --- FITUR KHUSUS HOMEPAGE ---
    const currentPath = window.location.pathname;
    if (currentPath !== "/" && currentPath !== "/index.html") {
        return; 
    }

    setTimeout(function() {
        
        // 1. Menyuntikkan CSS Animasi
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes floatGoldInner {
                0% { 
                    transform: translateY(0px) translateX(0px) scale(0); 
                    opacity: 0; 
                }
                20% { 
                    opacity: 1; 
                    transform: translateY(-50px) translateX(15px) scale(1.2);
                }
                80% { 
                    opacity: 0.9; 
                }
                100% { 
                    /* Bergerak ke atas sejauh 400px (melewati tinggi gambar) */
                    transform: translateY(-400px) translateX(-25px) scale(0.5); 
                    opacity: 0; 
                }
            }
            .gold-particle-inner {
                position: absolute;
                background: radial-gradient(circle, #ffffff 0%, #ffd700 40%, #ff8c00 100%);
                border-radius: 50%;
                pointer-events: none; 
                box-shadow: 0 0 8px #ffd700, 0 0 15px #ffaa00;
                z-index: 5; /* Memastikan debu ada di atas gambar */
            }
        `;
        document.head.appendChild(style);

        // 2. Membuat Layar Gelap (Backdrop)
        const backdrop = document.createElement('div');
        backdrop.id = 'custom-promo-backdrop';
        Object.assign(backdrop.style, {
            position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: '2147483647', 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            opacity: '0', transition: 'opacity 0.3s ease-in-out'
        });

        // 3. Membuat Wadah Utama (Modal)
        const modal = document.createElement('div');
        Object.assign(modal.style, {
            position: 'relative', width: '90%', maxWidth: '450px',
            transform: 'scale(0.8)', transition: 'transform 0.3s ease-in-out',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)' // Pindahkan shadow ke modal
        });

        // 4. Membuat Wadah Gambar & Link (KUNCI UTAMA ADA DI SINI)
        const link = document.createElement('a');
        link.href = '/promotion/detail/2026/event-mahjong-ways-1-2'; 
        Object.assign(link.style, {
            display: 'block',
            position: 'relative', // Wajib agar partikel bisa diletakkan di dalamnya
            overflow: 'hidden',   // KUNCI: Memotong debu yang keluar dari area gambar
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px'
        });

        const img = document.createElement('img');
        img.src = 'https://cdn.jsdelivr.net/gh/dewasijicare/karo789@ea5760cb2a7df42cdda2bdf1848e0d558e6b14c3/popup_karo789_27april_rev.png';
        img.alt = 'Promo Event Karo789';
        Object.assign(img.style, {
            width: '100%', height: 'auto', display: 'block',
            position: 'relative', zIndex: '1'
        });
        link.appendChild(img);

        // --- SISTEM GENERATOR DEBU EMAS (HANYA DI DALAM GAMBAR) ---
        // Membuat 30 partikel (dikurangi sedikit agar tidak menutupi teks gambar)
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'gold-particle-inner';
            
            // Ukuran debu sedikit lebih kecil agar proporsional dengan gambar
            const size = Math.random() * 4 + 2; 
            
            Object.assign(particle.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`, // Posisi acak menyamping
                bottom: `-10px`, // Mulai tepat di bawah gambar
                // Durasi animasi lebih cepat karena jarak tempuhnya lebih pendek
                animation: `floatGoldInner ${Math.random() * 2.5 + 2}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`
            });
            
            // Masukkan partikel ke dalam wadah LINK, bukan backdrop
            link.appendChild(particle);
        }

        // 5. Membuat Tombol OK
        const footer = document.createElement('div');
        Object.assign(footer.style, {
            backgroundColor: '#1b1b1b', padding: '12px',
            borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', display: 'grid'
        });

        const btnOk = document.createElement('button');
        btnOk.innerText = 'OK, SAYA MENGERTI';
        Object.assign(btnOk.style, {
            backgroundColor: '#3b82f6', color: '#ffffff', border: 'none', // Diubah menjadi Biru
            padding: '12px', borderRadius: '6px', fontSize: '16px', 
            fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px'
        });
        
        btnOk.onmouseover = function() { this.style.backgroundColor = '#2563eb'; } // Biru lebih gelap saat disentuh/dihover
        btnOk.onmouseout = function() { this.style.backgroundColor = '#3b82f6'; }  // Kembali ke biru semula
        
        footer.appendChild(btnOk);

        // 6. Menyuntikkan Semua Elemen
        modal.appendChild(link);
        modal.appendChild(footer);
        backdrop.appendChild(modal);
        document.body.appendChild(backdrop);
        
        document.body.style.overflow = 'hidden';

        // 7. Animasi Muncul
        setTimeout(function() {
            backdrop.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 50);

        // 8. Fungsi Tutup
        function closePopup() {
            backdrop.style.opacity = '0';
            modal.style.transform = 'scale(0.8)';
            
            setTimeout(function() {
                backdrop.remove();
                document.body.style.overflow = ''; 
                if (style.parentNode) style.parentNode.removeChild(style);
            }, 300);
        }

        btnOk.addEventListener('click', closePopup);
        backdrop.addEventListener('click', function(e) {
            if (e.target === backdrop) closePopup();
        });

    }, 1500); 
})();
</script>