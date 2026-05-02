(async function() {
    // =========================================
    // KONFIGURASI WIDGET JACKPOT TERBESAR
    // =========================================
    const TARGET_SELECTOR = '#karo-trx-engine'; 
    const WIDGET_ID = 'karo789-jackpot-slider';
    
    // =========================================
    // DATABASE GAME VIP (MENGGUNAKAN CDN ASLI WEB ANDA)
    // =========================================
    const VIP_GAMES = [
        { name: "Mahjong Ways 2", provider: "PG SOFT", link: "/game?category=101", img: "https://fffiiillleee.com/open-img-pub/games/pgsoft/74.jpg", weight: 150 },
        { name: "Mahjong Ways", provider: "PG SOFT", link: "/game?category=101", img: "https://fffiiillleee.com/open-img-pub/games/pgsoft/65.jpg", weight: 140 },
        { name: "Gates of Olympus", provider: "PRAGMATIC PLAY", link: "/game?category=101", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/vs20olympgate.png", weight: 130 },
        { name: "Gates of Olympus 1000", provider: "PRAGMATIC PLAY", link: "/game?category=101", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/vs20olympx.png", weight: 120 },
        { name: "Starlight Princess", provider: "PRAGMATIC PLAY", link: "/game?category=101", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/vs20starlight.png", weight: 110 },
        { name: "Starlight Princess 1000", provider: "PRAGMATIC PLAY", link: "/game?category=101", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/vs20starlightx.png", weight: 100 },
        { name: "Sweet Bonanza", provider: "PRAGMATIC PLAY", link: "/game?category=101", img: "https://4n76bph80j.gbgfstie.biz/game_pic/square/200/vs20fruitsw.png", weight: 90 }
    ];

    let LIVE_GAME_LIBRARY = [...VIP_GAMES]; 

    // =========================================
    // MESIN ACAK SINKRONISASI GLOBAL (PRNG)
    // =========================================
    let globalSeed = 1;
    function prng() {
        globalSeed = (globalSeed * 9301 + 49297) % 233280;
        return globalSeed / 233280;
    }

    // =========================================
    // DETEKSI PROVIDER SUPER AKURAT 
    // =========================================
    function detectProvider(name, imgUrl, linkUrl) {
        let text = (name + " " + imgUrl + " " + linkUrl).toLowerCase();
        
        if (text.includes('pgsoft') || text.includes('/pg/') || text.includes('mahjong') || text.includes('neko') || text.includes('bandito') || text.includes('shaolin') || text.includes('wealth') || text.includes('qilin') || text.includes('hatch') || text.includes('caishen') || text.includes('macau') || text.includes('journey') || text.includes('treasures') || text.includes('wild') || text.includes('wins')) {
            return "PG SOFT";
        }
        if (text.includes('pragmatic') || text.includes('/pp/') || text.includes('vs20') || text.includes('vs10') || text.includes('olympus') || text.includes('princess') || text.includes('bonanza') || text.includes('sugar') || text.includes('aztec') || text.includes('rhino') || text.includes('megaways') || text.includes('lions') || text.includes('thor') || text.includes('dice') || text.includes('5g') || text.includes('sweet') || text.includes('starlight')) {
            return "PRAGMATIC PLAY";
        }
        if (text.includes('habanero') || text.includes('koi gate') || text.includes('hot hot')) return "HABANERO";
        if (text.includes('joker') || text.includes('/jk/')) return "JOKER GAMING";
        if (text.includes('microgaming') || text.includes('/mg/')) return "MICROGAMING";
        if (text.includes('spade') || text.includes('/sg/')) return "SPADEGAMING";
        
        const firstLetter = name.trim().charAt(0).toUpperCase();
        if (['A','B','C','D','E','F','G','H','I','J'].includes(firstLetter)) return "PRAGMATIC PLAY";
        if (['K','L','M','N','O','P','Q','R','S','T'].includes(firstLetter)) return "PG SOFT";
        return "JOKER GAMING"; 
    }

    // =========================================
    // FUNGSI 1: AUTO-SCRAPE DENGAN FILTER ANTI-LOGO
    // =========================================
    async function fetchGamesFromRTP() {
        try {
            const response = await fetch('/rtp');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const gameNodes = doc.querySelectorAll('.row.mb-3.g-1 > div[class*="col-"] a, .game-item a');
            let fetchedGames = [];

            gameNodes.forEach(node => {
                const imgEl = node.querySelector('img');
                if (imgEl) {
                    let name = node.dataset.gamename || imgEl.alt || "Slot Game";
                    let imgUrl = imgEl.getAttribute('data-src') || imgEl.getAttribute('data-original') || imgEl.getAttribute('data-lazy') || imgEl.src;
                    
                    let link = node.href || node.dataset.playurl || '/game?category=101';
                    if (link.includes('javascript:') || link.endsWith('#') || link === window.location.href || link.includes('/slots')) {
                        link = '/game?category=101'; 
                    }

                    // --- FILTER LOGIKA ANTI-LOGO PROVIDER ---
                    let checkText = (name + " " + imgUrl).toLowerCase();
                    let isProviderLogo = false;
                    
                    if (checkText.includes('logo') || checkText.includes('provider') || checkText.includes('banner')) isProviderLogo = true;
                    if (name.toLowerCase().trim() === 'pragmatic play' || name.toLowerCase().trim() === 'pg soft' || name.toLowerCase().trim() === 'habanero' || name.toLowerCase().trim() === 'joker') isProviderLogo = true;
                    
                    if (isProviderLogo) return;

                    let provider = detectProvider(name, imgUrl, link);
                    let existingVip = LIVE_GAME_LIBRARY.find(g => g.name.toLowerCase().trim() === name.toLowerCase().trim());
                    
                    if (existingVip) {
                        if (link !== '/game?category=101' && !link.includes('javascript')) existingVip.link = link;
                    } else {
                        if (!fetchedGames.find(g => g.name === name) && imgUrl && !imgUrl.startsWith('data:image/gif')) {
                            fetchedGames.push({ name, provider, img: imgUrl, link, weight: 15 });
                        }
                    }
                }
            });

            LIVE_GAME_LIBRARY = [...VIP_GAMES, ...fetchedGames];

        } catch(err) {
            console.warn("Gagal scrape /rtp, hanya menggunakan data VIP.", err);
        }
    }

    // =========================================
    // FUNGSI 2: GENERATOR NATURAL
    // =========================================
    function getRandomItemWeighted(items) {
        let totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
        let random = prng() * totalWeight; 
        for (let i = 0; i < items.length; i++) {
            if (random < items[i].weight) return items[i];
            random -= items[i].weight;
        }
        return items[0];
    }

    function formatIDR(angka) {
        return "Rp " + new Intl.NumberFormat('id-ID').format(angka);
    }

    function generateJackpotAmount() {
        const rand = prng(); 
        let min, max;
        if (rand < 0.65) { min = 20; max = 45; }
        else if (rand < 0.88) { min = 46; max = 85; }
        else if (rand < 0.97) { min = 86; max = 130; }
        else { min = 131; max = 200; }
        
        const millions = Math.floor(prng() * (max - min + 1)) + min;
        const thousands = Math.floor(prng() * 999);
        const hundreds = Math.floor(prng() * 9) * 100;
        return (millions * 1000000) + (thousands * 1000) + hundreds;
    }

    function generateUsername() {
        const prefixes = ['An','Bo','Ci','De','Ed','Fa','Ga','He','In','Je','Ke','Li','Ma','No','Pu','Ri','Sa','Ti','Vi','Wi','Yo','Za'];
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let pre = prefixes[Math.floor(prng() * prefixes.length)];
        let post = chars.charAt(Math.floor(prng() * chars.length));
        return pre + '****' + post;
    }

    function generateDate(baseTime) {
        const pastTime = new Date(baseTime - Math.floor(prng() * 1800000)); 
        const day = String(pastTime.getDate()).padStart(2, '0');
        const month = String(pastTime.getMonth() + 1).padStart(2, '0');
        const year = pastTime.getFullYear();
        const hours = String(pastTime.getHours()).padStart(2, '0');
        const mins = String(pastTime.getMinutes()).padStart(2, '0');
        const secs = String(pastTime.getSeconds()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
    }

    function generateJackpotData(count = 15) {
        const timeBlock = Math.floor(Date.now() / (30 * 60 * 1000));
        globalSeed = timeBlock;
        const baseTime = timeBlock * 30 * 60 * 1000;

        const data = [];
        for (let i = 0; i < count; i++) {
            const game = getRandomItemWeighted(LIVE_GAME_LIBRARY);
            data.push({
                gameName: game.name,
                provider: game.provider,
                image: game.img,
                link: game.link, 
                amount: generateJackpotAmount(),
                user: generateUsername(),
                date: generateDate(baseTime)
            });
        }
        return data.sort(() => prng() - 0.5);
    }

    // =========================================
    // FUNGSI 3: RENDER HTML & CSS (UKURAN 1296PX)
    // =========================================
    
    const fallbackImageBase64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWEyNTJmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtc2l6ZT0iMjIiIGZpbGw9IiNlYzQ4OTkiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNMT1Q8L3RleHQ+PC9zdmc+";

    function buildCardHTML(item) {
        return `
            <a href="${item.link}" class="jp-card">
                <div class="jp-img-wrapper">
                    <img src="${item.image}" alt="${item.gameName}" onerror="this.onerror=null; this.src='${fallbackImageBase64}';">
                    <div class="play-overlay">
                        <i class="bi bi-play-circle-fill"></i> MAIN
                    </div>
                </div>
                <div class="jp-info">
                    <div class="jp-provider">${item.provider}</div>
                    <div class="jp-name" title="${item.gameName}">${item.gameName}</div>
                    <div class="jp-amount">${formatIDR(item.amount)}</div>
                    <div class="jp-user-date">
                        <span><i class="bi bi-person-circle"></i> ${item.user}</span>
                        <span>${item.date}</span>
                    </div>
                </div>
            </a>
        `;
    }

    function injectWidget() {
        const target = document.querySelector(TARGET_SELECTOR);
        if (!target || document.getElementById(`${WIDGET_ID}-wrapper`)) return false;

        const data = generateJackpotData(15); 
        let cardsHTML = data.map(buildCardHTML).join('');
        cardsHTML += cardsHTML; 

        // Penambahan Wrapper Khusus untuk Lebar 1296px
        const widgetHTML = `
            <div id="${WIDGET_ID}-wrapper">
                <div class="jp-inner-spacing">
                    <div id="${WIDGET_ID}">
                        <div class="karo789-jp-wrapper">
                            <div class="jp-header">
                                <h4><i class="bi bi-trophy-fill"></i> JACKPOT TERBESAR HARI INI</h4>
                            </div>
                            <div class="jp-slider-container" id="jp-slider-container">
                                <div class="jp-slider-track" id="jp-slider-track">
                                    ${cardsHTML}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const cssHTML = `
            <style>
                /* ==============================================================
                   BUNGKUSAN LUAR: LEBAR PASTI 1296PX
                   ============================================================== */
                #${WIDGET_ID}-wrapper { 
                    width: 100%; 
                    max-width: 1296px !important; 
                    margin: 0 auto 25px auto !important; 
                    padding: 0; 
                    box-sizing: border-box;
                    font-family: Arial, sans-serif;
                }

                .jp-inner-spacing {
                    padding: 0 8px; 
                    width: 100%;
                    box-sizing: border-box;
                }

                #${WIDGET_ID} {
                    width: 100%;
                }

                /* ==============================================================
                   STYLING KOTAK: TEMA KARO789 (MERAH & HITAM GELAP)
                   ============================================================== */
                .karo789-jp-wrapper { 
                    width: 100%;
                    background: linear-gradient(145deg, rgba(30, 30, 30, 0.9), rgba(15, 15, 15, 0.95)); 
                    border: 1px solid #ef4444; 
                    border-radius: 6px !important; 
                    padding: 0; 
                    box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); 
                    overflow: hidden; 
                    box-sizing: border-box;
                }

                /* ==============================================================
                   HEADER: MERAH GRADASI DENGAN LIST EMAS (GOLD)
                   ============================================================== */
                .jp-header { 
                    display: flex; align-items: center; justify-content: center; 
                    background: linear-gradient(90deg, #7f1d1d, #ef4444); 
                    padding: 12px 15px; 
                    margin-bottom: 15px; 
                    border-bottom: 2px solid #ffd700; 
                }
                .jp-header h4 { 
                    margin: 0; 
                    color: #ffffff !important; 
                    font-weight: 900; 
                    text-transform: uppercase; 
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.8) !important; 
                    font-size: 1.25rem; 
                    letter-spacing: 1px; 
                }
                .jp-header h4 i {
                    color: #ffd700 !important; 
                    margin-right: 8px;
                }

                .jp-slider-container { 
                    width: 100%; overflow-x: auto; position: relative; padding-bottom: 15px; 
                    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); 
                    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); 
                    -ms-overflow-style: none; scrollbar-width: none; cursor: grab; 
                }
                .jp-slider-container::-webkit-scrollbar { display: none; }
                .jp-slider-track { display: inline-flex; gap: 15px; width: max-content; padding: 0 15px; }
                
                /* ==============================================================
                   KARTU GAME: BACKGROUND HITAM ELEGAN
                   ============================================================== */
                .jp-card { 
                    display: block; text-decoration: none !important; width: 170px; 
                    background: linear-gradient(160deg, rgba(45,45,45,1), rgba(20,20,20,1)); 
                    border: 1px solid #333333; border-radius: 8px; overflow: hidden; 
                    position: relative; flex-shrink: 0; 
                    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; 
                    user-select: none; -webkit-user-drag: none; 
                }
                .jp-card:hover { 
                    transform: translateY(-5px); 
                    border-color: #ef4444; 
                    box-shadow: 0 5px 15px rgba(239, 68, 68, 0.6); z-index: 5; 
                }
                .jp-img-wrapper { 
                    width: 100%; aspect-ratio: 1 / 1; overflow: hidden; 
                    background-color: #0c0c1e; 
                    border-bottom: 2px solid #ef4444; 
                    position: relative; 
                }
                .jp-img-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; pointer-events: none; }
                .jp-card:hover .jp-img-wrapper img { transform: scale(1.1); }
                
                /* OVERLAY TOMBOL MAIN (MERAH) */
                .play-overlay { 
                    position: absolute; inset: 0; 
                    background: rgba(239, 68, 68, 0.85); 
                    display: flex; flex-direction: column; align-items: center; justify-content: center; 
                    opacity: 0; transition: opacity 0.3s ease; color: #fff; 
                    font-weight: 900; font-size: 1.1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5); 
                }
                .play-overlay i { font-size: 2.5rem; margin-bottom: 5px; }
                .jp-card:hover .play-overlay { opacity: 1; }
                
                .jp-info { padding: 10px; text-align: center; }
                .jp-provider { font-size: 0.65rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px; font-weight: bold;}
                .jp-name { font-size: 0.85rem; color: #ffffff; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 6px; }
                
                /* NOMINAL JACKPOT (KUNING EMAS) */
                .jp-amount { 
                    font-size: 1.05rem; color: #ffd700; font-weight: 900; 
                    text-shadow: 0 0 8px rgba(255, 215, 0, 0.6); margin-bottom: 8px; 
                    background: rgba(0,0,0,0.5); padding: 5px; border-radius: 5px; 
                    border: 1px dashed #ffd700; white-space: nowrap; 
                }
                .jp-user-date { display: flex; flex-direction: column; align-items: center; font-size: 0.65rem; color: #9ca3af; gap: 3px; }
                .jp-user-date span:first-child { color: #f3f4f6; font-weight: 600; font-size: 0.75rem; }
                .jp-user-date i { color: #ef4444; margin-right: 2px; } 
                
                /* RESPONSIVE MOBILE TAMPILAN 100% */
                @media (max-width: 768px) { 
                    #${WIDGET_ID}-wrapper { max-width: 100% !important; padding: 0 !important; }
                    .jp-inner-spacing { padding: 0 !important; }
                    .jp-card { width: 140px; } 
                    .jp-amount { font-size: 0.75rem; padding: 4px 2px; }
                    .jp-header h4 { font-size: 1.05rem; } 
                }
            </style>
        `;

        target.insertAdjacentHTML('beforebegin', cssHTML + widgetHTML);

        // =========================================
        // LOGIKA DRAG & SWIPE
        // =========================================
        const container = document.getElementById('jp-slider-container');
        let isDown = false; let startX; let scrollLeft; let exactScrollLeft = 0;
        let isHovered = false; let isDraggingCard = false; 
        
        function autoScroll() {
            if (!isDown && !isHovered) {
                exactScrollLeft += 0.5; 
                if (exactScrollLeft >= container.scrollWidth / 2) exactScrollLeft = 0;
                container.scrollLeft = exactScrollLeft;
            } else {
                exactScrollLeft = container.scrollLeft; 
            }
            requestAnimationFrame(autoScroll);
        }

        container.addEventListener('mousedown', (e) => {
            isDown = true; isDraggingCard = false; container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft; scrollLeft = container.scrollLeft;
        });
        container.addEventListener('mouseleave', () => { isDown = false; isHovered = false; container.style.cursor = 'grab'; });
        container.addEventListener('mouseup', () => { isDown = false; container.style.cursor = 'grab'; });
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return; e.preventDefault();
            const x = e.pageX - container.offsetLeft; const walk = (x - startX) * 1.5; 
            if (Math.abs(walk) > 3) isDraggingCard = true; 
            
            let newScrollLeft = scrollLeft - walk;
            if (newScrollLeft <= 0) {
                newScrollLeft = (container.scrollWidth / 2) - 10;
                startX = e.pageX - container.offsetLeft; scrollLeft = newScrollLeft;
            } else if (newScrollLeft >= container.scrollWidth / 2) {
                newScrollLeft = 0; startX = e.pageX - container.offsetLeft; scrollLeft = newScrollLeft;
            }
            container.scrollLeft = newScrollLeft;
        });
        
        container.addEventListener('touchstart', (e) => {
            isDown = true; isDraggingCard = false;
            startX = e.touches[0].pageX - container.offsetLeft; scrollLeft = container.scrollLeft;
        });
        container.addEventListener('touchend', () => { isDown = false; });
        container.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - container.offsetLeft; const walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 3) isDraggingCard = true;
            
            let newScrollLeft = scrollLeft - walk;
            if (newScrollLeft <= 0) {
                newScrollLeft = (container.scrollWidth / 2) - 10;
                startX = e.touches[0].pageX - container.offsetLeft; scrollLeft = newScrollLeft;
            } else if (newScrollLeft >= container.scrollWidth / 2) {
                newScrollLeft = 0; startX = e.touches[0].pageX - container.offsetLeft; scrollLeft = newScrollLeft;
            }
            container.scrollLeft = newScrollLeft;
        });

        container.addEventListener('mouseenter', () => { isHovered = true; });
        container.addEventListener('click', (e) => { if (isDraggingCard) e.preventDefault(); });

        autoScroll();

        // =========================================
        // LOGIKA AUTO-REFRESH TEPAT WAKTU
        // =========================================
        let currentBlock = Math.floor(Date.now() / (30 * 60 * 1000));
        
        setInterval(() => {
            const newBlock = Math.floor(Date.now() / (30 * 60 * 1000));
            if (newBlock !== currentBlock) {
                currentBlock = newBlock; 
                const track = document.getElementById('jp-slider-track');
                if (track) {
                    const newData = generateJackpotData(15);
                    let newHTML = newData.map(buildCardHTML).join('');
                    track.innerHTML = newHTML + newHTML;
                }
            }
        }, 60000); 

        return true;
    }

    // =========================================
    // EKSEKUSI
    // =========================================
    fetchGamesFromRTP().then(() => {
        const checkInterval = setInterval(() => {
            if (injectWidget()) clearInterval(checkInterval);
        }, 500);
    });

})();