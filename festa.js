// ==========================================================================
// APP STATE & DATABASE
// ==========================================================================
let appState = {
    points: 1500,
    level: 1,
    xp: 0,
    userCoords: [38.1025, 127.6980], // Default outside festival ground
    activeTab: 'tab-home',
    quests: [
        {
            id: 'fishing',
            title: '산천어 얼음낚시 퀘스트 🎣',
            spotName: '화천천 얼음낚시터',
            coords: [38.1062, 127.7031],
            pointsReward: 500,
            xpReward: 100,
            rank: 'A',
            completed: false,
            gpsVerified: false,
            mode: 'quiz',
            quiz: {
                question: '산천어는 연어목 연어과의 물고기입니다. 산천어가 정상적으로 생육하기 위한 조건으로 가장 올바른 것은 무엇일까요?',
                options: [
                    '수온이 20℃ 이하인 매우 맑고 차가운 1급수 계곡물',
                    '수온이 28℃ 이상인 따뜻하고 유기물이 많은 강물',
                    '밀물이 드나들며 염분이 섞이는 탁한 갯벌 구역',
                    '빛이 들어오지 않는 수심 500m 이상의 아주 깊은 바다'
                ],
                answerIndex: 0
            },
            completedDate: null
        },
        {
            id: 'lantern',
            title: '선등거리 야경 인증 퀘스트 🏮',
            spotName: '선등거리 회전교차로',
            coords: [38.1054, 127.7071],
            pointsReward: 500,
            xpReward: 100,
            rank: 'B',
            completed: false,
            gpsVerified: false,
            mode: 'photo',
            completedDate: null
        },
        {
            id: 'plaza',
            title: '실내얼음조각광장 관람 퀘스트 ❄️',
            spotName: '실내얼음조각광장',
            coords: [38.1082, 127.7025],
            pointsReward: 500,
            xpReward: 100,
            rank: 'S',
            completed: false,
            gpsVerified: false,
            mode: 'quiz',
            quiz: {
                question: '화천 실내얼음조각광장은 세계 최대 규모의 빙등 전시관입니다. 이곳의 대형 얼음 조각들은 매년 어느 축제 기술진이 참여해 제작할까요?',
                options: [
                    '일본 삿포로 눈축제 기술진',
                    '중국 하얼빈 빙등제 조각 예술가팀',
                    '캐나다 퀘벡 윈터 카니발 연출팀',
                    '핀란드 로바니에미 산타마을 기획팀'
                ],
                answerIndex: 1
            },
            completedDate: null
        }
    ],
    bookedTickets: [],
    coupons: [],
    // Simulation Coordinate presets
    coordsPreset: {
        'user-default': [38.1025, 127.6980],
        'fishing': [38.1062, 127.7031],
        'lantern': [38.1054, 127.7071],
        'plaza': [38.1082, 127.7025]
    }
};

const nationwideFestivals = [
    { name: '2026 화천산천어축제', coords: [38.1062, 127.7031], region: '강원 화천', season: '겨울', desc: '얼음판 위에서 산천어 얼음낚시와 맨손잡기, 화려한 눈조각을 즐기는 대표 겨울 축제.', active: true },
    { name: '보령 머드 축제', coords: [36.3090, 126.5170], region: '충남 보령', season: '여름', desc: '대천해수욕장 머드광장에서 온몸에 머드를 바르고 뒹구는 열정적인 글로벌 여름 축제.', active: false },
    { name: '부산 불꽃 축제', coords: [35.1532, 129.1189], region: '부산 수영구', season: '가을', desc: '광안대교를 배경으로 펼쳐지는 국내 최대 규모의 초대형 스토리텔링 불꽃쇼.', active: false },
    { name: '경주 벚꽃 축제', coords: [35.8333, 129.2167], region: '경북 경주', season: '봄', desc: '천년고도 경주의 역사유적지와 어우러진 눈부신 벚꽃비를 감상하는 봄 페스티벌.', active: false },
    { name: '제주 들불 축제', coords: [33.3643, 126.3578], region: '제주 애월', season: '봄', desc: '새별오름 전체에 거대한 들불을 놓아 액운을 몰아내고 복을 기원하는 들불 놓기 대축제.', active: false },
    { name: '강릉 커피 축제', coords: [37.7725, 128.9080], region: '강원 강릉', season: '가을', desc: '커피의 도시 강릉의 은은한 바다 향기와 명품 로스터리 커피를 한곳에서 즐기는 문화 축제.', active: false },
    { name: '안동 탈춤 페스티벌', coords: [36.5683, 128.7094], region: '경북 안동', season: '가을', desc: '신명나는 하회탈놀이와 전 세계 탈춤꾼들의 역동적인 춤사위가 펼쳐지는 탈춤 축제.', active: false }
];

const rewardsData = [
    {
        id: 'gift_card_5000',
        title: '화천사랑상품권 모바일 교환권 (5,000원권)',
        price: 1000,
        img: 'https://images.unsplash.com/photo-1598432439360-5a3d76326cd6?auto=format&fit=crop&q=80&w=300',
        category: 'local',
        desc: '화천군 관내 가맹점에서 현금처럼 편리하게 사용할 수 있는 상품권입니다.'
    },
    {
        id: 'bus_coupon_3000',
        title: 'FestGO 직통 셔틀버스 할인권 (3,000원권)',
        price: 500,
        img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=300',
        category: 'bus',
        desc: '셔틀 예약 결제 시 적용할 수 있는 예약 전용 3천원권 모바일 할인권입니다.'
    },
    {
        id: 'starbucks_americano',
        title: '스타벅스 카페 아메리카노 Tall 기프티콘',
        price: 1200,
        img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=300',
        category: 'coffee',
        desc: '스타벅스 매장에서 사용 가능한 아메리카노 모바일 쿠폰입니다.'
    },
    {
        id: 'local_rice_10k',
        title: '청정 화천 오대쌀 4kg 교환권',
        price: 3000,
        img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300',
        category: 'local',
        desc: '화천 명품 특산품 협동조합에서 직송되는 유기농 친환경 오대쌀입니다.'
    }
];

let bookingWizardState = {
    departure: '서울 동서울 터미널',
    destination: '화천 산천어축제 행사장',
    date: '2026-06-25',
    time: '08:00 출발',
    selectedSeat: null
};

// ==========================================================================
// AUDIO SYNTHESIZER (8-BIT GAME SOUNDS)
// ==========================================================================
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playGameSound(type) {
    try {
        initAudio();
        if (!audioCtx) return;
        
        const now = audioCtx.currentTime;
        
        if (type === 'click') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(600, now);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.08);
        } 
        else if (type === 'stamp') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.25);
        } 
        else if (type === 'levelup') {
            // Rising arpeggio (C4 -> E4 -> G4 -> C5)
            const freqs = [261.63, 329.63, 392.00, 523.25];
            freqs.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(freq, now + idx * 0.12);
                gain.gain.setValueAtTime(0.08, now + idx * 0.12);
                gain.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.12 + 0.15);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + idx * 0.12);
                osc.stop(now + idx * 0.12 + 0.15);
            });
        }
        else if (type === 'fanfare') {
            // Happy retro chime
            const freqs = [392.00, 523.25, 659.25, 783.99];
            freqs.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, now + idx * 0.08);
                gain.gain.setValueAtTime(0.1, now + idx * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.2);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now + idx * 0.08);
                osc.stop(now + idx * 0.08 + 0.2);
            });
        }
    } catch (e) {
        console.warn('Audio synthesis failed', e);
    }
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================
let map, userMarker;
let nationwideMapInst = null;

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // 로컬 스토리지 데이터 로드를 사용하지 않아 새로고침(F5) 시 모든 상태가 리셋됩니다.
    // 이전 캐시를 지우기 위해 명시적으로 removeItem 처리
    localStorage.removeItem('festgo_state_light');

    updateUI();
    initMap();
    setupEventListeners();
});

function saveState() {
    // 새로고침 시 리셋을 위해 더 이상 상태를 로컬 스토리지에 저장하지 않습니다.
}

// ==========================================================================
// TABS & NAVIGATION
// ==========================================================================
function switchTab(tabId) {
    playGameSound('click');
    appState.activeTab = tabId;
    
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    const navBtn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
    if (navBtn) navBtn.classList.add('active');
    
    if (tabId === 'tab-map') {
        setTimeout(() => {
            if (map) {
                map.invalidateSize();
                updateMapMarkers();
            }
        }, 100);
    }
    
    updateUI();
}

// ==========================================================================
// UI RENDERERS
// ==========================================================================
function updateUI() {
    // Points & Level dashboard values
    document.getElementById('headerPoints').innerText = appState.points.toLocaleString();
    document.getElementById('rewardsTabPoints').innerText = appState.points.toLocaleString() + ' P';
    document.getElementById('myPagePoints').innerText = appState.points.toLocaleString() + ' P';
    
    // My Page XP Dashboard
    document.getElementById('myPageLevelTxt').innerText = `LV.${appState.level}`;
    document.getElementById('myPageXPTxt').innerText = `${appState.xp} / 100`;
    
    const xpPercent = Math.min((appState.xp / 100) * 100, 100);
    document.getElementById('myPageXPBar').style.width = `${xpPercent}%`;
    
    // Set level title
    let levelTitle = `Level ${appState.level} `;
    if (appState.level === 1) levelTitle += '초보 모험가 ⚔️';
    else if (appState.level === 2) levelTitle += '숙련된 탐색가 🧭';
    else if (appState.level === 3) levelTitle += '프로 방랑자 🗺️';
    else levelTitle += '축제 마스터 👑';
    document.getElementById('userLevelTitle').innerText = levelTitle;

    // Quest progress calculations
    const completedCount = appState.quests.filter(q => q.completed).length;
    document.getElementById('questProgressRatio').innerText = `${completedCount} / ${appState.quests.length}`;
    document.getElementById('myPageCompletedCount').innerText = `${completedCount} / ${appState.quests.length}`;
    
    const progressPercent = (completedCount / appState.quests.length) * 100;
    document.getElementById('questProgressBar').style.width = `${progressPercent}%`;

    renderQuests();
    renderRewards();
    renderMyPageStamps();
    renderBookedTickets();
    renderCoupons();
}

// Render RPG Quests list
function renderQuests() {
    const container = document.getElementById('questsList');
    container.innerHTML = '';
    
    appState.quests.forEach(q => {
        const card = document.createElement('div');
        card.className = `quest-card ${q.completed ? 'completed' : ''}`;
        
        let badgeHTML = '';
        if (q.completed) {
            badgeHTML = `<span class="quest-badge badge-completed"><i data-lucide="check-circle" style="width: 10px; height:10px; display:inline;"></i> 완료</span>`;
        } else if (q.gpsVerified) {
            badgeHTML = `<span class="quest-badge badge-ready"><i data-lucide="navigation" style="width:10px; height:10px; display:inline;"></i> 미션가능</span>`;
        } else {
            badgeHTML = `<span class="quest-badge badge-waiting"><i data-lucide="map-pin" style="width:10px; height:10px; display:inline;"></i> GPS필요</span>`;
        }

        const distance = getDistance(appState.userCoords, q.coords);
        const distanceText = distance < 1000 ? `${Math.round(distance)}m` : `${(distance/1000).toFixed(1)}km`;
        
        const step1Class = q.gpsVerified || q.completed ? 'done' : '';
        const step2Class = q.completed ? 'done' : '';
        
        // Quest RPG Type
        let questType = '⚔️ 탐색';
        if (q.id === 'fishing') questType = '🎣 수렵';
        if (q.id === 'plaza') questType = '🧠 지혜';

        card.innerHTML = `
            <div class="rpg-rank-badge rank-${q.rank.toLowerCase()}">${q.rank}-RANK</div>
            <div class="quest-card-header" style="padding-right: 50px;">
                <div class="quest-title-box">
                    <h4 style="display:flex; align-items:center; gap: 4px;">
                        <span style="font-size: 11px; opacity:0.8;">[${questType}]</span> ${q.title}
                    </h4>
                    <p style="margin-top: 4px;"><i data-lucide="map-pin" style="width:10px; height:10px; display:inline-block; vertical-align:middle;"></i> ${q.spotName} (${distanceText})</p>
                </div>
            </div>
            <div class="quest-body">
                <div class="quest-steps">
                    <div class="q-step-row ${step1Class}">
                        <i data-lucide="${step1Class ? 'check-circle' : 'circle'}"></i>
                        <span>[1단계] GPS 방문 인증 (${distanceText} 남음)</span>
                    </div>
                    <div class="q-step-row ${step2Class}">
                        <i data-lucide="${step2Class ? 'check-circle' : 'circle'}"></i>
                        <span>[2단계] 현장 미션인증 (${q.mode === 'quiz' ? '퀴즈 풀기' : '현장 사진 업로드'})</span>
                    </div>
                </div>
                <div class="quest-card-actions">
                    <div class="quest-reward-row">
                        <div class="quest-reward-pts" title="골드 골드">
                            <i data-lucide="database"></i>
                            <span>+${q.pointsReward} G</span>
                        </div>
                        <div class="quest-reward-xp" title="경험치">
                            <i data-lucide="chevrons-up"></i>
                            <span>+${q.xpReward} XP</span>
                        </div>
                    </div>
                    ${q.completed 
                        ? `<button class="btn btn-sm btn-glass disabled" disabled style="background:rgba(0,0,0,0.03); color:#94a3b8; border:none;"><i data-lucide="check"></i> 완료됨</button>`
                        : `<button class="btn btn-sm ${q.gpsVerified ? 'btn-primary' : 'btn-glass'}" onclick="handleQuestAction('${q.id}')">
                            ${q.gpsVerified ? '미션 풀기 <i data-lucide="arrow-right"></i>' : '지도 이동'}
                           </button>`
                    }
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    lucide.createIcons();
}

function renderRewards() {
    const container = document.getElementById('rewardsContainer');
    container.innerHTML = '';
    
    rewardsData.forEach(r => {
        const card = document.createElement('div');
        card.className = 'reward-card';
        card.innerHTML = `
            <div class="reward-img-box" style="background-image: url('${r.img}');">
                ${r.category === 'local' ? `<span class="reward-tag-local">지역특산</span>` : ''}
            </div>
            <div class="reward-info">
                <h5 class="reward-title">${r.title}</h5>
                <div class="reward-footer">
                    <div class="reward-price">
                        <i data-lucide="database"></i>
                        <span>${r.price.toLocaleString()}</span>
                    </div>
                    <button class="reward-buy-btn" onclick="exchangeReward('${r.id}')">교환하기</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    lucide.createIcons();
}

function renderMyPageStamps() {
    const container = document.getElementById('stampBookGrid');
    container.innerHTML = '';
    
    appState.quests.forEach(q => {
        const slot = document.createElement('div');
        slot.className = `stamp-slot ${q.completed ? 'stamped' : ''}`;
        
        slot.innerHTML = `
            <div class="stamp-icon-circle">
                <i data-lucide="${q.completed ? 'award' : 'lock'}"></i>
            </div>
            <span>${q.spotName.replace(' 퀘스트', '')}</span>
            ${q.completed ? `<span class="stamp-date-tag">${q.completedDate}</span>` : '<span class="stamp-date-tag">미인증</span>'}
        `;
        container.appendChild(slot);
    });
    
    lucide.createIcons();
}

function renderBookedTickets() {
    const container = document.getElementById('bookedTicketsList');
    container.innerHTML = '';
    
    if (appState.bookedTickets.length === 0) {
        container.innerHTML = `
            <div class="empty-tickets">
                <i data-lucide="ticket" class="empty-icon"></i>
                <p>예약된 셔틀버스 탑승권이 없습니다.</p>
                <button class="btn btn-sm btn-primary" onclick="openBookingWizard()">셔틀 좌석 예약</button>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    appState.bookedTickets.forEach((ticket, idx) => {
        const card = document.createElement('div');
        card.className = 'ticket-row-card';
        card.onclick = () => viewTicketQR(idx);
        card.innerHTML = `
            <div class="ticket-route-info">
                <h5>${ticket.departure} ➔ 화천 축제장</h5>
                <p><i data-lucide="calendar" style="width: 10px; height: 10px; display:inline;"></i> ${ticket.date} | ${ticket.time}</p>
            </div>
            <div class="ticket-btn-view">
                <span>좌석: ${ticket.seat}번</span>
                <i data-lucide="qr-code"></i>
            </div>
        `;
        container.appendChild(card);
    });
    
    lucide.createIcons();
}

function renderCoupons() {
    const container = document.getElementById('myCouponsList');
    container.innerHTML = '';
    
    if (appState.coupons.length === 0) {
        container.innerHTML = `
            <div class="empty-coupons">
                <p>보유 중인 모바일 교환권이 없습니다.</p>
            </div>
        `;
        return;
    }
    
    appState.coupons.forEach(c => {
        const item = document.createElement('div');
        item.className = 'coupon-row-item';
        item.innerHTML = `
            <div class="coupon-left">
                <h5>${c.title}</h5>
                <p>교환일시: ${c.exchangedAt}</p>
            </div>
            <div class="coupon-right">
                <span>사용가능</span>
            </div>
        `;
        container.appendChild(item);
    });
}

// ==========================================================================
// MAP & GPS LOGIC (LIGHT THEME TILES)
// ==========================================================================
function initMap() {
    map = L.map('map', {
        zoomControl: false,
        attributionControl: false
    }).setView([38.1062, 127.704], 15);
    
    // Light Street Map tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);
    
    updateMapMarkers();
}

function updateMapMarkers() {
    if (!map) return;
    
    map.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.Circle) {
            map.removeLayer(layer);
        }
    });

    const userIcon = L.divIcon({
        html: `<div class="user-pulse-icon" style="width: 14px; height: 14px; background: #3b82f6; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 10px #3b82f6;"></div>`,
        className: 'user-marker-container',
        iconSize: [14, 14]
    });
    userMarker = L.marker(appState.userCoords, { icon: userIcon }).addTo(map);

    appState.quests.forEach(q => {
        L.circle(q.coords, {
            radius: 50,
            color: q.completed ? '#10b981' : '#3b82f6',
            fillColor: q.completed ? '#10b981' : '#3b82f6',
            fillOpacity: 0.1,
            weight: 1
        }).addTo(map);
        
        const pinClass = q.completed ? 'custom-pin completed-pin' : 'custom-pin';
        const pinIcon = L.divIcon({
            html: `<div class="${pinClass}"><i data-lucide="${q.completed ? 'award' : 'map-pin'}"></i></div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            className: 'quest-pin-container'
        });
        
        const marker = L.marker(q.coords, { icon: pinIcon }).addTo(map);
        
        marker.bindPopup(`
            <div style="font-family: 'Noto Sans KR';">
                <h4 style="font-weight:800; color:#0f172a;">${q.title}</h4>
                <p style="color:#475569; font-size:10px; margin-top:2px;">장소: ${q.spotName}</p>
                <p style="margin-top:5px; font-weight:700; color:${q.completed ? '#059669' : '#3b82f6'};">${q.completed ? '✅ 인증 완료' : '📍 GPS 방문 필요 (50m 이내)'}</p>
            </div>
        `);
    });
    
    lucide.createIcons();
}

function getDistance(coords1, coords2) {
    const R = 6371e3;
    const lat1 = coords1[0] * Math.PI/180;
    const lat2 = coords2[0] * Math.PI/180;
    const deltaLat = (coords2[0]-coords1[0]) * Math.PI/180;
    const deltaLon = (coords2[1]-coords1[1]) * Math.PI/180;

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

function handleGPSSimulation(presetKey) {
    const targetCoords = appState.coordsPreset[presetKey];
    if (!targetCoords) return;
    
    appState.userCoords = targetCoords;
    
    if (userMarker) {
        userMarker.setLatLng(targetCoords);
        map.panTo(targetCoords);
    }
    
    document.getElementById('currentCoordsTxt').innerText = `${targetCoords[0].toFixed(5)}, ${targetCoords[1].toFixed(5)}`;
    
    let nearQuest = null;
    appState.quests.forEach(q => {
        const distance = getDistance(targetCoords, q.coords);
        if (distance <= 50) {
            q.gpsVerified = true;
            nearQuest = q;
        }
    });
    
    const checkInBtn = document.getElementById('gpsCheckInBtn');
    
    if (nearQuest) {
        if (nearQuest.completed) {
            checkInBtn.innerText = '인증 완료됨';
            checkInBtn.className = 'btn btn-secondary disabled';
            checkInBtn.disabled = true;
        } else {
            checkInBtn.innerHTML = `<i data-lucide="navigation"></i> ${nearQuest.spotName} 미션 풀기`;
            checkInBtn.className = 'btn btn-primary';
            checkInBtn.disabled = false;
            checkInBtn.onclick = () => handleQuestAction(nearQuest.id);
        }
        playGameSound('click');
        showToast(`📍 ${nearQuest.spotName} 영역 도착! 미션 수행이 활성화되었습니다.`, 'success');
    } else {
        checkInBtn.innerText = '퀘스트 영역 밖임';
        checkInBtn.className = 'btn btn-secondary disabled';
        checkInBtn.disabled = true;
        checkInBtn.onclick = null;
    }
    
    saveState();
    updateMapMarkers();
    renderQuests();
    lucide.createIcons();
}

// ==========================================================================
// QUEST VERIFICATION DIALOGS
// ==========================================================================
let currentQuestExecuting = null;

function handleQuestAction(questId) {
    playGameSound('click');
    const q = appState.quests.find(x => x.id === questId);
    if (!q) return;
    
    if (q.completed) {
        showToast('이미 완료된 퀘스트입니다.', 'warning');
        return;
    }
    
    if (!q.gpsVerified) {
        showToast('GPS 인증이 필요합니다. 지도를 해당 스팟으로 옮겨서 방문하세요!', 'warning');
        switchTab('tab-map');
        document.getElementById('simLocationSelect').value = q.id;
        return;
    }
    
    currentQuestExecuting = q;
    
    const modal = document.getElementById('questModal');
    modal.classList.add('active');
    document.getElementById('questModalTitle').innerText = `${q.spotName} 미션`;
    
    const quizPanel = document.getElementById('quizModePanel');
    const photoPanel = document.getElementById('photoModePanel');
    
    if (q.mode === 'quiz') {
        quizPanel.style.display = 'block';
        photoPanel.style.display = 'none';
        renderQuizInModal(q);
    } else {
        quizPanel.style.display = 'none';
        photoPanel.style.display = 'block';
        setupPhotoInModal();
    }
}

function renderQuizInModal(q) {
    const quizData = q.id === 'fishing' ? q.quiz : appState.quests.find(x => x.id === 'plaza').quiz;
    document.getElementById('quizQuestion').innerText = quizData.question;
    
    const container = document.getElementById('quizOptionsList');
    container.innerHTML = '';
    
    quizData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.innerText = `${idx + 1}. ${opt}`;
        btn.onclick = () => submitQuizAnswer(idx, quizData.answerIndex, btn);
        container.appendChild(btn);
    });
}

function submitQuizAnswer(selectedIdx, correctIdx, btnElement) {
    const options = document.querySelectorAll('.quiz-opt-btn');
    options.forEach(btn => btn.disabled = true);
    
    if (selectedIdx === correctIdx) {
        playGameSound('fanfare');
        btnElement.classList.add('correct');
        showToast('정답입니다!', 'success');
        setTimeout(() => {
            closeModal('questModal');
            completeQuest(currentQuestExecuting.id);
        }, 1000);
    } else {
        playGameSound('click'); // Fail click beep
        btnElement.classList.add('wrong');
        showToast('오답입니다. 다시 한 번 풀어보세요!', 'error');
        setTimeout(() => {
            options.forEach(btn => btn.disabled = false);
            btnElement.classList.remove('wrong');
        }, 1500);
    }
}

function setupPhotoInModal() {
    document.getElementById('photoFileInput').value = '';
    document.getElementById('photoPreviewContainer').style.display = 'none';
    document.getElementById('photoUploadProgress').style.display = 'none';
    
    const submitBtn = document.getElementById('submitPhotoBtn');
    submitBtn.disabled = true;
    submitBtn.innerText = '인증 제출하기';
}

function handlePhotoUpload() {
    const input = document.getElementById('photoFileInput');
    if (!input.files || !input.files[0]) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('photoPreviewImg').src = e.target.result;
        document.getElementById('photoPreviewContainer').style.display = 'block';
        document.getElementById('submitPhotoBtn').disabled = false;
    };
    reader.readAsDataURL(input.files[0]);
}

function submitPhotoVerification() {
    playGameSound('click');
    const submitBtn = document.getElementById('submitPhotoBtn');
    submitBtn.disabled = true;
    
    const progressContainer = document.getElementById('photoUploadProgress');
    const fill = document.getElementById('photoProgressFill');
    progressContainer.style.display = 'block';
    
    let width = 0;
    const interval = setInterval(() => {
        width += 10;
        fill.style.width = `${width}%`;
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                closeModal('questModal');
                completeQuest(currentQuestExecuting.id);
            }, 500);
        }
    }, 150);
}

// Complete Quest
function completeQuest(questId) {
    const q = appState.quests.find(x => x.id === questId);
    if (!q || q.completed) return;
    
    q.completed = true;
    
    const now = new Date();
    q.completedDate = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')}`;
    
    // Reward points (Gold)
    appState.points += q.pointsReward;
    
    // Sound & stamp trigger
    playGameSound('stamp');
    
    // Give XP
    addXP(q.xpReward);
    
    saveState();
    updateUI();
    updateMapMarkers();
    
    document.getElementById('stampSuccessSpotName').innerText = q.spotName;
    document.getElementById('stampSuccessOverlay').classList.add('active');
    
    triggerConfetti();
}

// XP & Level-Up Logic
function addXP(amount) {
    appState.xp += amount;
    if (appState.xp >= 100) {
        appState.xp -= 100;
        appState.level += 1;
        
        // Trigger Level-Up Celebration
        setTimeout(() => {
            triggerLevelUpCelebration();
        }, 1200);
    }
}

function triggerLevelUpCelebration() {
    playGameSound('levelup');
    
    let classTitle = '초보 모험가 ⚔️';
    if (appState.level === 2) classTitle = '숙련된 탐색가 🧭';
    else if (appState.level === 3) classTitle = '프로 방랑자 🗺️';
    else classTitle = '축제 마스터 👑';
    
    document.getElementById('levelUpBadge').innerText = `LV.${appState.level}`;
    document.getElementById('levelUpClass').innerText = classTitle;
    document.getElementById('levelUpOverlay').classList.add('active');
    
    // Double Confetti!
    triggerConfetti();
    setTimeout(triggerConfetti, 300);
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// ==========================================================================
// NATIONWIDE MAP LOGIC
// ==========================================================================
function openNationwideMap() {
    playGameSound('click');
    document.getElementById('nationwideMapModal').classList.add('active');
    
    // Set up Leaflet Map inside Modal
    setTimeout(() => {
        if (!nationwideMapInst) {
            nationwideMapInst = L.map('nationwideMap', {
                zoomControl: true,
                attributionControl: false
            }).setView([36.3, 127.8], 7); // Center of South Korea
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18
            }).addTo(nationwideMapInst);
        } else {
            nationwideMapInst.invalidateSize();
        }
        
        // Clear previous layers on nationwide map
        nationwideMapInst.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                nationwideMapInst.removeLayer(layer);
            }
        });

        // Plot Nationwide Pins
        nationwideFestivals.forEach(f => {
            const isHwacheon = f.active;
            const markerColor = isHwacheon ? '#10b981' : '#3b82f6';
            const markerGlow = isHwacheon ? '0 0 10px #10b981' : 'none';
            
            const customIcon = L.divIcon({
                html: `<div class="nation-pin" style="width: 14px; height: 14px; background: ${markerColor}; border: 2px solid white; border-radius: 50%; box-shadow: ${markerGlow};"></div>`,
                className: 'nationwide-marker-container',
                iconSize: [14, 14]
            });
            
            const marker = L.marker(f.coords, { icon: customIcon }).addTo(nationwideMapInst);
            
            // Custom detail popup with Action link
            marker.bindPopup(`
                <div style="font-family: 'Noto Sans KR'; width: 220px; padding: 5px;">
                    <h4 style="margin: 0 0 4px 0; font-size:13px; font-weight:800; color:#0f172a;">${f.name}</h4>
                    <span style="display:inline-block; font-size: 9px; background: rgba(59, 130, 246, 0.08); color: #2563eb; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-bottom: 8px;">
                        ${f.region} • ${f.season}
                    </span>
                    <p style="font-size: 10px; color: #475569; margin: 0 0 10px 0; line-height: 1.4;">${f.desc}</p>
                    ${isHwacheon 
                        ? `<button class="btn btn-sm btn-primary btn-block" style="font-size: 10px;" onclick="window.startStampTourFromNation('${f.name}')">스탬프 투어 시작하기</button>` 
                        : `<button class="btn btn-sm btn-glass btn-block disabled" disabled style="font-size: 10px; background: rgba(0,0,0,0.03); color: #94a3b8; border: none; cursor:not-allowed;">시즌 대기 중 (준비중)</button>`
                    }
                </div>
            `);
        });
        
    }, 150);
}

// Global actions exposed on window for Leaflet Popup scopes
window.startStampTourFromNation = function(festivalName) {
    playGameSound('click');
    closeModal('nationwideMapModal');
    showToast(`🗺️ ${festivalName} 투어로 이동합니다!`, 'success');
    switchTab('tab-map');
};

function closeNationwideMap() {
    closeModal('nationwideMapModal');
}

// ==========================================================================
// BUS RESERVATION WIZARD LOGIC
// ==========================================================================
function openBookingWizard() {
    playGameSound('click');
    document.getElementById('bookingModal').classList.add('active');
    goToBookingStep(1);
}

function closeBookingWizard() {
    closeModal('bookingModal');
}

function goToBookingStep(step) {
    document.querySelectorAll('.w-step').forEach((s, idx) => {
        if (idx + 1 === step) s.classList.add('active');
        else s.classList.remove('active');
    });

    document.querySelectorAll('.wizard-pane').forEach((p, idx) => {
        if (idx + 1 === step) p.classList.add('active');
        else p.classList.remove('active');
    });

    if (step === 2) {
        initBusSeatsGrid();
    }
}

function initBusSeatsGrid() {
    const container = document.getElementById('busSeatsGrid');
    container.innerHTML = '';
    
    bookingWizardState.selectedSeat = null;
    document.getElementById('goToStep3Btn').disabled = true;
    document.getElementById('selectedSeatsTxt').innerText = '선택된 좌석: 없음';
    document.getElementById('totalFareTxt').innerText = '총 0 원';

    const preBooked = [1, 2, 5, 8, 12, 18, 22, 23];

    for (let i = 1; i <= 28; i++) {
        const seat = document.createElement('div');
        const isTaken = preBooked.includes(i);
        
        seat.className = `bus-seat ${isTaken ? 'seat-taken' : 'seat-available'}`;
        seat.innerText = i;
        
        if (!isTaken) {
            seat.onclick = () => selectBusSeat(i, seat);
        }
        
        container.appendChild(seat);
    }
}

function selectBusSeat(seatNumber, seatElement) {
    playGameSound('click');
    const seats = document.querySelectorAll('.bus-seat.seat-available');
    seats.forEach(s => s.classList.remove('seat-selected'));
    
    if (bookingWizardState.selectedSeat === seatNumber) {
        bookingWizardState.selectedSeat = null;
        document.getElementById('goToStep3Btn').disabled = true;
        document.getElementById('selectedSeatsTxt').innerText = '선택된 좌석: 없음';
        document.getElementById('totalFareTxt').innerText = '총 0 원';
    } else {
        bookingWizardState.selectedSeat = seatNumber;
        seatElement.classList.add('seat-selected');
        document.getElementById('goToStep3Btn').disabled = false;
        document.getElementById('selectedSeatsTxt').innerText = `선택된 좌석: ${seatNumber}번 좌석`;
        document.getElementById('totalFareTxt').innerText = '총 15,000 원 (체크인 완료 할인 적용 가능)';
    }
}

function confirmBusBooking() {
    const dep = document.getElementById('busDeparture').value;
    const dest = document.getElementById('busDestination').value;
    const date = document.getElementById('busDate').value;
    const time = document.getElementById('busTime').value;
    const seat = bookingWizardState.selectedSeat;

    const newTicket = {
        departure: dep.split(' ')[1] || dep,
        destination: '화천',
        date: date,
        time: time,
        seat: seat,
        bookedAt: new Date().toLocaleString()
    };

    appState.bookedTickets.push(newTicket);
    saveState();
    
    document.getElementById('ticketDepVal').innerText = dep;
    document.getElementById('ticketDateVal').innerText = `${date} ${time.split(' ')[0]}`;
    document.getElementById('ticketSeatVal').innerText = `${seat}번 좌석`;
    
    playGameSound('fanfare');
    goToBookingStep(3);
    updateUI();
}

function viewTicketQR(index) {
    playGameSound('click');
    const t = appState.bookedTickets[index];
    if (!t) return;
    
    document.getElementById('ticketModalRoute').innerText = `${t.departure} ➔ 화천 축제장`;
    document.getElementById('ticketModalDate').innerText = `${t.date} ${t.time}`;
    document.getElementById('ticketModalSeat').innerText = `${t.seat}번 좌석`;
    
    document.getElementById('ticketModal').classList.add('active');
}

// ==========================================================================
// REWARD REDEMPTION LOGIC
// ==========================================================================
function exchangeReward(rewardId) {
    playGameSound('click');
    const r = rewardsData.find(x => x.id === rewardId);
    if (!r) return;
    
    if (appState.points < r.price) {
        showToast('⚠️ 보유 포인트가 부족합니다. 스탬프 미션을 추가로 수행해 보세요.', 'error');
        return;
    }

    if (confirm(`[${r.title}] 상품을 교환하시겠습니까?\n소모 포인트: ${r.price} G`)) {
        appState.points -= r.price;
        
        const now = new Date();
        const exchangedAtStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
        
        appState.coupons.push({
            id: r.id,
            title: r.title,
            exchangedAt: exchangedAtStr
        });
        
        saveState();
        updateUI();
        
        playGameSound('levelup');
        triggerConfetti();
        
        showToast(`🎉 ${r.title} 교환 성공! 마이페이지 쿠폰함을 확인하세요.`, 'success');
    }
}

// ==========================================================================
// GENERAL EVENT HANDLERS & MODALS
// ==========================================================================
function setupEventListeners() {
    document.getElementById('simGPSBtn').onclick = () => {
        const val = document.getElementById('simLocationSelect').value;
        handleGPSSimulation(val);
    };

    document.getElementById('recenterMapBtn').onclick = () => {
        if (map && userMarker) {
            map.setView(appState.userCoords, 16);
        }
    };

    document.getElementById('closeQuestBtn').onclick = () => closeModal('questModal');
    document.getElementById('closeBookingBtn1').onclick = closeBookingWizard;
    document.getElementById('closeTicketModalBtn').onclick = () => closeModal('ticketModal');
    document.getElementById('closeNationwideMapBtn').onclick = () => closeModal('nationwideMapModal');
    
    // Level Up Dismiss
    document.getElementById('levelUpCloseBtn').onclick = () => {
        playGameSound('click');
        closeModal('levelUpOverlay');
    };

    // Stamp overlay dismiss
    document.getElementById('stampSuccessCloseBtn').onclick = () => {
        closeModal('stampSuccessOverlay');
        switchTab('tab-mypage');
    };

    document.getElementById('goToStep2Btn').onclick = () => goToBookingStep(2);
    document.getElementById('backToStep1Btn').onclick = () => goToBookingStep(1);
    document.getElementById('goToStep3Btn').onclick = confirmBusBooking;
    document.getElementById('bookingSuccessFinishBtn').onclick = () => {
        closeBookingWizard();
        switchTab('tab-mypage');
    };

    document.getElementById('photoFileInput').onchange = handlePhotoUpload;
    document.getElementById('submitPhotoBtn').onclick = submitPhotoVerification;

    document.getElementById('openBookingBtn').onclick = openBookingWizard;
    document.getElementById('openBookingBtn2').onclick = openBookingWizard;
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'info';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'alert-triangle';
    if (type === 'warning') icon = 'alert-circle';
    
    toast.innerHTML = `
        <i data-lucide="${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    lucide.createIcons();
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
