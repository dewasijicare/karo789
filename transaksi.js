(function() {
    // 1. GENERATOR DATA PINTAR
    function getRandomUsername() {
        const prefixes = ['and','bud','cit','dew','eko','fit','gil','hen','iwa','jok','kev','luk','mar','nov','put','riz','sat','tri','vin','wid','yan','zul','agu','bag','cah','dim','end','far','gun','had','ind','jam','kar','les','mah','nur','oka','pan','rah','sur','teg','unt','wah','yud','bos','bro','pak','mas','mbk','cak','ban','jur','boy','roy','joy','coy','sob','gan','suh','dik','kak','sri','ayu','rat','sus','lin','tin','des','mel','lia','nia','mia','tia','ria','fia','kia','cia','yul','wul','hok','vip','pro','top','win','max','jpx','gac','hky','cpt'];
        let base = prefixes[Math.floor(Math.random() * prefixes.length)];
        const caseType = Math.floor(Math.random() * 3);
        if (caseType === 0) base = base.toUpperCase(); else if (caseType === 1) base = base.charAt(0).toUpperCase() + base.slice(1);
        const formatType = Math.random(); let finalName = "";
        if (formatType < 0.40) finalName = base.substring(0, 3); else if (formatType < 0.70) finalName = base.substring(0, 2) + (Math.floor(Math.random() * 9) + 1); else if (formatType < 0.90) finalName = base.substring(0, 1) + (Math.floor(Math.random() * 89) + 10);
        else { const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'; for (let i = 0; i < 3; i++) finalName += chars.charAt(Math.floor(Math.random() * chars.length)); if (caseType === 0 || caseType === 1) finalName = finalName.toUpperCase(); }
        return finalName + '***';
    }

    function generateNaturalDate(minutesOffset) {
        const pastTime = new Date(new Date().getTime() - (minutesOffset * 60000) - Math.floor(Math.random() * 60000));
        return `${String(pastTime.getDate()).padStart(2, '0')}/${String(pastTime.getMonth() + 1).padStart(2, '0')}/${pastTime.getFullYear()} ${String(pastTime.getHours()).padStart(2, '0')}:${String(pastTime.getMinutes()).padStart(2, '0')}:${String(pastTime.getSeconds()).padStart(2, '0')}`;
    }

    function getDepositAmount() {
        const prob = Math.random();
        if (prob < 0.60) return [10000, 20000, 25000, 50000, 50000, 50000, 100000, 100000][Math.floor(Math.random() * 8)]; 
        else if (prob < 0.85) return [150000, 200000, 250000, 300000, 500000, 500000, 750000, 1000000][Math.floor(Math.random() * 8)]; 
        else if (prob < 0.95) return [1200000, 1500000, 1800000, 2000000][Math.floor(Math.random() * 4)]; 
        else { let res = ((Math.floor(Math.random() * 18) + 3) * 1000000) + (Math.random() > 0.5 ? 500000 : 0); return res > 20000000 ? 20000000 : res; }
    }

    function getWithdrawAmount() {
        const prob = Math.random();
        if (prob < 0.50) return [100000, 150000, 200000, 250000, 300000, 500000, 750000, 1000000, 1500000, 2000000, 3000000][Math.floor(Math.random() * 11)]; 
        else if (prob < 0.85) { let res = (Math.floor(Math.random() * 5) * 1000000) + ((Math.floor(Math.random() * 999) + 1) * 1000); return res < 100000 ? res + 150000 : res; } 
        else if (prob < 0.95) return (Math.floor(Math.random() * 11) + 5) * 1000000 + (Math.random() > 0.5 ? (Math.floor(Math.random() * 99) + 1) * 10000 : 0); 
        else return (Math.floor(Math.random() * 61) + 20) * 1000000 + (Math.random() > 0.7 ? (Math.floor(Math.random() * 99) + 1) * 100000 : 0);
    }

    function formatIDR(angka) { return "Rp " + new Intl.NumberFormat('id-ID').format(angka); }

    // 2. RENDER BARIS TRANSAKSI
    function renderTransactions() {
        const depList = document.getElementById('karo-dep-list');
        const wdList = document.getElementById('karo-wd-list');
        if (!depList || !wdList) return;

        let deps = '', wds = '';
        for (let i = 0; i < 20; i++) {
            let userDep = getRandomUsername(), amtDep = formatIDR(getDepositAmount()), timeDep = generateNaturalDate(i * 2);
            let userWd = getRandomUsername(), amtWd = formatIDR(getWithdrawAmount()), timeWd = generateNaturalDate(i * 3);
            
            // Menggunakan FontAwesome (fas fa-...) sesuai sistem Karo789
            deps += `<div class="tx-item"><div class="tx-col-user"><i class="fas fa-user-circle" style="color:#f87171 !important; margin-right:6px;"></i><span style="font-weight:bold;color:#fff;">${userDep}</span></div><div class="tx-col-time"><i class="fas fa-clock" style="margin-right:3px;"></i>${timeDep}</div><div class="tx-col-amount tx-deposit">${amtDep}</div></div>`;
            wds += `<div class="tx-item"><div class="tx-col-user"><i class="fas fa-user-circle" style="color:#fde047 !important; margin-right:6px;"></i><span style="font-weight:bold;color:#fff;">${userWd}</span></div><div class="tx-col-time"><i class="fas fa-clock" style="margin-right:3px;"></i>${timeWd}</div><div class="tx-col-amount tx-withdraw">${amtWd}</div></div>`;
        }
        depList.innerHTML = deps + deps; wdList.innerHTML = wds + wds;
    }

    // 3. INJEKSI WIDGET TEMA MERAH EMAS
    function injectTransactionsWidget() {
        // Target lokasi: Tepat di dalam wrapper di bawah angka jackpot
        const target = document.querySelector('.benefits.jackpot-home .wrapper');
        if (!target || document.getElementById('karo-trx-engine')) return false;

        const widgetHTML = `
            <div id="karo-trx-engine">
                <div class="trx-inner-wrapper">
                    <div class="karo-trx-flex">
                        <div class="trx-column">
                            <div class="tx-card tx-card-deposit">
                                <div class="tx-header border-red"><i class="fas fa-donate tx-icon-red"></i> LIVE DEPOSIT</div>
                                <div class="tx-table-header header-red"><div class="tx-col-user">USER</div><div class="tx-col-time" style="text-align:center;">WAKTU</div><div class="tx-col-amount" style="text-align:right;">NOMINAL</div></div>
                                <div class="tx-body"><div class="tx-marquee" id="karo-dep-list"></div></div>
                            </div>
                        </div>
                        <div class="trx-column">
                            <div class="tx-card tx-card-withdraw">
                                <div class="tx-header border-gold"><i class="fas fa-hand-holding-usd tx-icon-gold"></i> LIVE WITHDRAW</div>
                                <div class="tx-table-header header-gold"><div class="tx-col-user">USER</div><div class="tx-col-time" style="text-align:center;">WAKTU</div><div class="tx-col-amount" style="text-align:right;">NOMINAL</div></div>
                                <div class="tx-body"><div class="tx-marquee" id="karo-wd-list"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const cssHTML = `
            <style>
                /* DINDING PEMISAH MUTLAK */
                #karo-trx-engine { 
                    display: block !important;
                    width: 100% !important; 
                    margin: 20px auto 15px auto !important; /* Jarak atas dari Jackpot */
                    padding: 0 !important;
                    box-sizing: border-box !important;
                    clear: both !important;
                    position: relative !important;
                    z-index: 20 !important;
                }

                #karo-trx-engine .trx-inner-wrapper { padding: 0; width: 100%; box-sizing: border-box; }
                #karo-trx-engine .karo-trx-flex { display: flex; flex-wrap: wrap; gap: 20px; width: 100%; margin: 0; padding: 0; }
                #karo-trx-engine .trx-column { flex: 1; min-width: 320px; display: flex; flex-direction: column; }

                /* TEMA KARTU: Background Merah Gelap Marun */
                #karo-trx-engine .tx-card { width: 100%; background: linear-gradient(145deg, #3b0c09, #1a0504); border-radius: 8px !important; overflow: hidden; }
                #karo-trx-engine .tx-card-deposit { box-shadow: 0 0 15px rgba(220, 38, 38, 0.3); border: 1px solid #dc2626; }
                #karo-trx-engine .tx-card-withdraw { box-shadow: 0 0 15px rgba(234, 179, 8, 0.3); border: 1px solid #eab308; }

                /* HEADER UTAMA */
                #karo-trx-engine .tx-header { padding: 12px 15px; font-weight: 800; color: #fff; text-align: center; text-transform: uppercase; letter-spacing: 1px; background: rgba(0,0,0,0.4); flex-shrink: 0; }
                #karo-trx-engine .border-red { border-bottom: 2px solid #dc2626; text-shadow: 0 0 8px rgba(220, 38, 38, 0.6); }
                #karo-trx-engine .border-gold { border-bottom: 2px solid #eab308; text-shadow: 0 0 8px rgba(234, 179, 8, 0.6); color: #facc15; }
                #karo-trx-engine .tx-icon-red { color: #f87171; margin-right: 8px; font-size: 1.2em; }
                #karo-trx-engine .tx-icon-gold { color: #fde047; margin-right: 8px; font-size: 1.2em; }

                /* SUB-HEADER (USER | WAKTU | NOMINAL) */
                #karo-trx-engine .tx-table-header { display: flex; padding: 10px 15px; font-weight: 900; font-size: 0.85rem; flex-shrink: 0; }
                #karo-trx-engine .header-red { background: linear-gradient(90deg, #991b1b, #dc2626); border-bottom: 2px solid #7f1d1d; color: #ffffff; text-shadow: 0 1px 2px rgba(0,0,0,0.5);}
                #karo-trx-engine .header-gold { background: linear-gradient(90deg, #ca8a04, #eab308); border-bottom: 2px solid #854d0e; color: #451a03; text-shadow: none;}

                /* ISI TRANSAKSI */
                #karo-trx-engine .tx-item { display: flex; align-items: center; padding: 0 15px; height: 45px; border-bottom: 1px solid #4a1515; font-size: 0.85rem; font-family: sans-serif; }
                #karo-trx-engine .tx-col-user { flex: 1; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                #karo-trx-engine .tx-col-time { flex: 1.2; text-align: center; color: #cbd5e1; font-size: 0.75rem; }
                #karo-trx-engine .tx-col-amount { flex: 1; text-align: right; }

                /* ANIMASI SCROLL */
                #karo-trx-engine .tx-body { height: 220px; overflow: hidden; position: relative; background: transparent; }
                #karo-trx-engine .tx-marquee { transition: opacity 0.5s ease; animation: scrollUpKaro 30s linear infinite; }
                @keyframes scrollUpKaro { 0% { transform: translateY(0); } 100% { transform: translateY(-900px); } }

                /* WARNA NOMINAL */
                #karo-trx-engine .tx-deposit { color: #4ade80; font-weight: 800; text-shadow: 0 0 5px rgba(74, 222, 128, 0.4); }
                #karo-trx-engine .tx-withdraw { color: #fcd34d; font-weight: 800; text-shadow: 0 0 5px rgba(253, 211, 77, 0.4); font-size: 0.95rem; }

                /* RESPONSIVE MOBILE */
                @media (max-width: 768px) {
                    #karo-trx-engine .karo-trx-flex { gap: 15px; }
                    #karo-trx-engine .tx-col-time { font-size: 0.65rem; }
                    #karo-trx-engine .tx-item { font-size: 0.75rem; padding: 0 10px; height: 40px; }
                    #karo-trx-engine .tx-table-header { padding: 8px 10px; font-size: 0.75rem; }
                    @keyframes scrollUpKaro { 0% { transform: translateY(0); } 100% { transform: translateY(-800px); } }
                }
            </style>
        `;

        // Inject CSS & HTML
        const styleWrapper = document.createElement('div');
        styleWrapper.innerHTML = cssHTML;
        document.head.appendChild(styleWrapper.firstElementChild);
        
        target.insertAdjacentHTML('beforeend', widgetHTML);
        renderTransactions();
        
        // Looping Animasi Ulang
        setInterval(() => {
            const lists = document.querySelectorAll('#karo-trx-engine .tx-marquee');
            lists.forEach(el => el.style.opacity = '0'); 
            setTimeout(() => { 
                renderTransactions(); 
                lists.forEach(el => { 
                    el.style.animation = 'none'; 
                    el.offsetHeight; 
                    el.style.animation = null; 
                    el.style.opacity = '1'; 
                }); 
            }, 500);
        }, 60000);
        
        return true;
    }

    // Eksekutor
    const checkInterval = setInterval(() => { 
        if (injectTransactionsWidget()) clearInterval(checkInterval); 
    }, 300);
})();