(function() {
    // 1. Menyuntikkan CSS Animasi & Styling
    const style = document.createElement('style');
    style.innerHTML = `
        /* Wadah untuk kedua tombol di kiri bawah */
        #custom-floating-widget {
            position: fixed;
            bottom: 25px;
            left: 25px;
            display: flex;
            flex-direction: column;
            gap: 15px; /* Jarak antara tombol RTP dan WA */
            z-index: 2147483647;
        }
        
        /* Desain dasar ukuran tombol */
        .widget-btn {
            display: block;
            width: 60px;  /* Sesuaikan ukuran lebar ikon di sini */
            height: 60px; /* Sesuaikan ukuran tinggi ikon di sini */
            transition: all 0.3s ease-in-out;
            position: relative;
            border-radius: 50%;
        }

        /* Desain gambar ikon agar proporsional */
        .widget-btn img {
            width: 100%;
            height: 100%;
            object-fit: contain; /* Memastikan gambar tidak gepeng */
            border-radius: 50%;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5); /* Memberikan bayangan pada gambar */
            transition: transform 0.3s ease-in-out;
        }

        /* Efek saat kursor diarahkan ke tombol */
        .widget-btn:hover img {
            transform: translateY(-5px) scale(1.05);
        }

        /* Animasi denyut khusus untuk ikon RTP */
        .btn-rtp img {
            animation: pulse-rtp 2s infinite;
        }

        @keyframes pulse-rtp {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
    `;
    document.head.appendChild(style);

    // 2. Membuat Wadah (Container)
    const container = document.createElement('div');
    container.id = 'custom-floating-widget';

    // 3. Membuat Tombol RTP menggunakan gambar dari GitHub
    const btnRtp = document.createElement('a');
    btnRtp.href = '/slots'; 
    btnRtp.className = 'widget-btn btn-rtp';
    btnRtp.title = 'Lihat RTP Slots';
    
    const imgRtp = document.createElement('img');
    imgRtp.src = 'https://cdn.jsdelivr.net/gh/dewasijicare/karo789@4ce3d060d66b0544a3234a7f9f23e5a82508b0a1/rtp_karo789.webp';
    imgRtp.alt = 'RTP Slots';
    btnRtp.appendChild(imgRtp);

    // 4. Membuat Tombol WhatsApp menggunakan gambar dari GitHub
    const btnWa = document.createElement('a');
    btnWa.href = 'https://api.whatsapp.com/send?phone=+628139923775'; 
    btnWa.target = '_blank'; 
    btnWa.className = 'widget-btn btn-wa';
    btnWa.title = 'Hubungi WhatsApp';
    
    const imgWa = document.createElement('img');
    imgWa.src = 'https://cdn.jsdelivr.net/gh/dewasijicare/karo789@4ce3d060d66b0544a3234a7f9f23e5a82508b0a1/whatsapp_karo789.webp';
    imgWa.alt = 'WhatsApp Kami';
    btnWa.appendChild(imgWa);

    // 5. Memasukkan tombol ke dalam wadah, lalu merender ke Body web
    container.appendChild(btnRtp);
    container.appendChild(btnWa);
    document.body.appendChild(container);
    
})();