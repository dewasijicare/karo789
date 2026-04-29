// --- 1. INJECT CSS POSISI (Kiri-Kanan) ---
var cssInject = document.createElement('style');
cssInject.innerHTML = `
    ul.depo-select {
        display: flex !important;
        flex-wrap: wrap !important;
    }
    ul.depo-select > li {
        float: none !important;
    }
    ul.depo-select > li.depocepat {
        order: -1 !important;
    }
`;
document.head.appendChild(cssInject);


// --- 2. GANTI TEKS SECARA AMAN ---
setInterval(function() {
    var textCepat = document.querySelector('li.depocepat p');
    if (textCepat && textCepat.innerText !== 'Deposit QRIS') {
        textCepat.innerText = 'Deposit QRIS';
    }
}, 100);


// --- 3. AUTO-KLIK NATURAL ---
window.addEventListener('load', function() {
    // Jeda 1 detik penuh agar website selesai memuat semua animasi & fungsinya
    setTimeout(function() {
        var tabCepat = document.querySelector('li.depocepat');
        var tabManual = document.querySelector('li.depomanual');
        
        // Jika saat ini tab Manual sedang aktif, tembak klik ke tab QRIS
        if (tabCepat && tabManual && tabManual.classList.contains('active')) {
            if (typeof window.jQuery !== 'undefined') {
                window.jQuery('.depocepat').trigger('click');
            } else {
                tabCepat.click();
            }
        }
    }, 1000); 
});