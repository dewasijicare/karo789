(function() {
    // --- FITUR KHUSUS HOMEPAGE / INDEX ---
    const currentPath = window.location.pathname;
    
    // Mengecek apakah halaman saat ini adalah halaman index
    // Kamu bisa menambahkan nama file atau path lain di sini jika diperlukan
    if (currentPath !== "/" && currentPath !== "/index.html" && currentPath !== "/index.php") {
        return; // Jika bukan halaman index, hentikan script di sini
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
                z-index: 5; 
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
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)' 
        });

        // 4. Membuat Wadah Gambar & Link
        const link = document.createElement('a');
        link.href = '/promotions'; 
        Object.assign(link.style, {
            display: 'block',
            position: 'relative', 
            overflow: 'hidden',   
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

        // --- SISTEM GENERATOR DEBU EMAS ---
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'gold-particle-inner';
            
            const size = Math.random() * 4 + 2; 
            
            Object.assign(particle.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`, 
                bottom: `-10px`, 
                animation: `floatGoldInner ${Math.random() * 2.5 + 2}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`
            });
            
            link.appendChild(particle);
        }

        // 5. Membuat Tombol OK (Warna Merah)
        const footer = document.createElement('div');
        Object.assign(footer.style, {
            backgroundColor: '#1b1b1b', padding: '12px',
            borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', display: 'grid'
        });

        const btnOk = document.createElement('button');
        btnOk.innerText = 'OK, SAYA MENGERTI';
        Object.assign(btnOk.style, {
            backgroundColor: '#ef4444', color: '#ffffff', border: 'none', 
            padding: '12px', borderRadius: '6px', fontSize: '16px', 
            fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px'
        });
        
        btnOk.onmouseover = function() { this.style.backgroundColor = '#dc2626'; } 
        btnOk.onmouseout = function() { this.style.backgroundColor = '#ef4444'; }  
        
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
