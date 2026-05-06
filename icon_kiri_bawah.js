(function() {
    // 1. Fitur Pembersih: Menyembunyikan icon WA bawaan yang lama
    setTimeout(function() {
        const waLinks = document.querySelectorAll('a[href*="whatsapp"], a[href*="wa.me"]');
        waLinks.forEach(link => {
            // Abaikan icon WA baru yang kita buat ini
            if (link.closest('#custom-floating-widget')) return; 
            
            // Cari pembungkus (parent) dari icon WA lama yang posisinya fixed/melayang
            let parent = link.parentElement;
            while(parent && parent !== document.body) {
                let style = window.getComputedStyle(parent);
                if(style.position === 'fixed') {
                    parent.style.display = 'none'; // Sembunyikan
                    break;
                }
                parent = parent.parentElement;
            }
            // Sembunyikan juga jika linknya sendiri yang diatur fixed
            if (window.getComputedStyle(link).position === 'fixed') {
                link.style.display = 'none';
            }
        });
    }, 1000);

    // 2. Menyuntikkan CSS Animasi & Styling Baru
    const style = document.createElement('style');
    style.innerHTML = `
        /* Wadah untuk kedua tombol di kiri bawah */
        #custom-floating-widget {
            position: fixed;
            bottom: 85px;
            left: 25px;
            display: flex;
            flex-direction: column;
            gap: 15px; /* Jarak antara tombol RTP dan WA */
            z-index: 2147483647;
        }
        
        /* Desain dasar wadah tombol */
        .widget-btn {
            display: block;
            width: 75px; /* Sesuaikan ukuran gambar di sini */
            height: auto;
            transition: transform 0.3s ease-in-out;
            position: relative;
            cursor: pointer;
        }

        /* Desain gambar mengikuti bentuk aslinya (tanpa pemotong bulat) */
        .widget-btn img {
            width: 100%;
            height: auto;
            display: block;
        }

        /* Efek saat kursor diarahkan ke tombol */
        .widget-btn:hover {
            transform: translateY(-5px) scale(1.05);
        }

        /* Animasi cahaya (drop-shadow) yang mengikuti bentuk lekukan gambar */
        .btn-rtp img {
            animation: pulse-drop-rtp 2s infinite;
        }

        @keyframes pulse-drop-rtp {
            0% { filter: drop-shadow(0 0 0 rgba(239, 68, 68, 0.8)); }
            70% { filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0)); }
            100% { filter: drop-shadow(0 0 0 rgba(239, 68, 68, 0)); }
        }
    `;
    document.head.appendChild(style);

    // 3. Membuat Wadah (Container)
    const container = document.createElement('div');
    container.id = 'custom-floating-widget';

    // 4. Membuat Tombol RTP
    const btnRtp = document.createElement('a');
    btnRtp.href = '/slots'; 
    btnRtp.className = 'widget-btn btn-rtp';
    btnRtp.title = 'RTP Slots';
    
    const imgRtp = document.createElement('img');
    imgRtp.src = 'https://cdn.jsdelivr.net/gh/dewasijicare/karo789@4ce3d060d66b0544a3234a7f9f23e5a82508b0a1/rtp_karo789.webp';
    imgRtp.alt = 'RTP Slots';
    btnRtp.appendChild(imgRtp);

    // 5. Membuat Tombol WhatsApp
    const btnWa = document.createElement('a');
    btnWa.href = 'https://api.whatsapp.com/send?phone=+628139923775'; 
    btnWa.target = '_blank'; 
    btnWa.className = 'widget-btn btn-wa';
    btnWa.title = 'WhatsApp';
    
    const imgWa = document.createElement('img');
    imgWa.src = 'https://cdn.jsdelivr.net/gh/dewasijicare/karo789@4ce3d060d66b0544a3234a7f9f23e5a82508b0a1/whatsapp_karo789.webp';
    imgWa.alt = 'WhatsApp';
    btnWa.appendChild(imgWa);

    // 6. Memasukkan elemen ke Body web
    container.appendChild(btnRtp);
    container.appendChild(btnWa);
    document.body.appendChild(container);
    
})();
