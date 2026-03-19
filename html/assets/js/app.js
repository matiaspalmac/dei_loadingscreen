/* ============================================================
 *  dei_loadingscreen - App
 *  Dei Ecosystem | Pantalla de Carga
 * ============================================================
 *  Reads CONFIG from config.js and drives the entire UI.
 * ============================================================ */

(() => {
    'use strict';

    // ── Helpers ──────────────────────────────────────────────
    const $ = (s, p = document) => p.querySelector(s);
    const $$ = (s, p = document) => [...p.querySelectorAll(s)];

    // ── Refs ─────────────────────────────────────────────────
    const refs = {
        bgVideoWrap:    $('#bg-video-wrap'),
        bgVideo:        $('#bg-video'),
        bgSlideshow:    $('#bg-slideshow'),
        bgFallback:     $('#bg-fallback'),
        particles:      $('#particles'),
        clock:          $('#clock'),
        clockTime:      $('#clock-time'),
        serverLogo:     $('#server-logo'),
        logoFallback:   $('#server-logo-fallback'),
        serverName:     $('#server-name'),
        serverDesc:     $('#server-desc'),
        serverStatus:   $('#server-status-text'),
        socialLinks:    $('#social-links'),
        tipsCard:       $('#tips-card'),
        tipText:        $('#tip-text'),
        tipCounter:     $('#tip-counter'),
        rulesCard:      $('#rules-card'),
        rulesList:      $('#rules-list'),
        rulesLink:      $('#rules-discord-link'),
        rulesLinkText:  $('#rules-discord-text'),
        staffCard:      $('#staff-card'),
        staffList:      $('#staff-list'),
        musicPlayer:    $('#music-player'),
        musicPrompt:    $('#music-prompt'),
        musicToggle:    $('#music-toggle'),
        musicSongName:  $('#music-song-name'),
        musicVolume:    $('#music-volume'),
        iconPlay:       $('#icon-play'),
        iconPause:      $('#icon-pause'),
        audio:          $('#music-audio'),
        audioVisualizer:$('#audio-visualizer'),
        loadingStatus:  $('#loading-status'),
        loadingPercent: $('#loading-percent'),
        loadingFill:    $('#loading-fill'),
        tabBar:         $('#tab-bar'),
        tabIndicator:   $('#tab-indicator'),
        tabPanels:      $('#tab-panels'),
        changelogCard:  $('#changelog-card'),
        changelogList:  $('#changelog-list'),
    };

    // ── State ────────────────────────────────────────────────
    let currentTip = 0;
    let tipInterval = null;
    let slideIndex = 0;
    let slideInterval = null;
    let isPlaying = false;
    let loadProgress = 0;
    let loadingDone = false;
    let musicStarted = false;
    let audioCtx = null;
    let analyser = null;
    let vizAnimFrame = null;
    let loadComplete = false;

    // ── Social Icons (SVG) ───────────────────────────────────
    const socialIcons = {
        discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/></svg>',
        instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
        youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
        tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.8a8.28 8.28 0 0 0 4.76 1.5V6.83a4.83 4.83 0 0 1-1-.14z"/></svg>',
        twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
        web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    };

    // ── Init ─────────────────────────────────────────────────
    function init() {
        applyTheme();
        initTabs();
        populateServerInfo();
        populateSocialLinks();
        populateRules();
        populateStaff();
        populateChangelog();
        initBackground();
        initClock();
        initTips();
        initMusic();
        initParticles();
        initLoadingEvents();
        staggerReveal();
    }

    // ── Theme ────────────────────────────────────────────────
    function applyTheme() {
        const theme = CONFIG.theme || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        if (CONFIG.lightMode) {
            document.body.classList.add('light-mode');
        }
    }

    // ── Server Info ──────────────────────────────────────────
    function populateServerInfo() {
        refs.serverName.textContent = CONFIG.serverName || '';
        refs.serverDesc.textContent = CONFIG.serverDescription || '';

        if (CONFIG.serverLogo) {
            refs.serverLogo.src = CONFIG.serverLogo;
            refs.serverLogo.classList.remove('hidden');
            refs.logoFallback.classList.add('hidden');
            refs.serverLogo.onerror = () => {
                refs.serverLogo.classList.add('hidden');
                refs.logoFallback.classList.remove('hidden');
            };
        }
    }

    // ── Social Links ─────────────────────────────────────────
    function populateSocialLinks() {
        const links = (CONFIG.socialLinks || []).filter(l => l.url);
        if (!links.length) {
            refs.socialLinks.classList.add('hidden');
            return;
        }
        refs.socialLinks.innerHTML = links.map(link => {
            const icon = socialIcons[link.platform] || socialIcons.web;
            return `<a class="social-link" href="${escHtml(link.url)}" target="_blank" title="${escHtml(link.platform)}">${icon}</a>`;
        }).join('');
    }

    // ── Rules ────────────────────────────────────────────────
    function populateRules() {
        if (!CONFIG.showRules || !CONFIG.rules || !CONFIG.rules.length) {
            refs.rulesCard.classList.add('hidden');
            return;
        }
        refs.rulesList.innerHTML = CONFIG.rules.map(r => `<li>${escHtml(r)}</li>`).join('');

        if (CONFIG.discord) {
            refs.rulesLink.href = CONFIG.discord;
        }
        refs.rulesLinkText.textContent = CONFIG.rulesDiscordText || '';
    }

    // ── Staff ────────────────────────────────────────────────
    function populateStaff() {
        if (!CONFIG.showStaff || !CONFIG.staff || !CONFIG.staff.length) {
            refs.staffCard.classList.add('hidden');
            return;
        }
        refs.staffList.innerHTML = CONFIG.staff.map(member => {
            const initials = member.name.substring(0, 2);
            const roleKey = getRoleKey(member.role);
            return `
                <div class="staff-member" data-role="${roleKey}">
                    <div class="staff-avatar">${escHtml(initials)}</div>
                    <div class="staff-details">
                        <span class="staff-name">${escHtml(member.name)}</span>
                        <span class="staff-role">${escHtml(member.role)}</span>
                    </div>
                </div>`;
        }).join('');
    }

    function getRoleKey(role) {
        const r = (role || '').toLowerCase();
        if (r.includes('fund') || r.includes('owner') || r.includes('ceo')) return 'founder';
        if (r.includes('admin')) return 'admin';
        if (r.includes('mod')) return 'mod';
        if (r.includes('dev') || r.includes('desarr')) return 'dev';
        return 'default';
    }

    // ── Background ───────────────────────────────────────────
    function initBackground() {
        if (CONFIG.backgroundType === 'video') {
            initVideoBackground();
        } else {
            initSlideshowBackground();
        }
    }

    function initVideoBackground() {
        refs.bgSlideshow.classList.add('hidden');
        refs.bgVideoWrap.classList.remove('hidden');
        refs.bgVideo.src = CONFIG.backgroundVideo || '';
        refs.bgVideo.play().catch(() => {
            // Video failed, show fallback
            refs.bgVideoWrap.classList.add('hidden');
            refs.bgFallback.style.display = 'block';
        });
    }

    function initSlideshowBackground() {
        const images = CONFIG.backgroundImages || [];
        if (!images.length) {
            refs.bgSlideshow.classList.add('hidden');
            refs.bgFallback.style.display = 'block';
            return;
        }

        const slides = $$('.slide', refs.bgSlideshow);

        // Preload first image
        const firstImg = new Image();
        firstImg.onload = () => {
            slides[0].style.backgroundImage = `url('${images[0]}')`;
            slides[0].classList.add('active');
        };
        firstImg.onerror = () => {
            refs.bgSlideshow.classList.add('hidden');
            refs.bgFallback.style.display = 'block';
        };
        firstImg.src = images[0];

        if (images.length > 1) {
            slideInterval = setInterval(() => {
                const current = slideIndex;
                slideIndex = (slideIndex + 1) % images.length;
                const nextSlideIdx = slideIndex;

                const activeSlide = slides.find(s => s.classList.contains('active'));
                const inactiveSlide = slides.find(s => !s.classList.contains('active'));

                if (!activeSlide || !inactiveSlide) return;

                // Preload next image
                const img = new Image();
                img.onload = () => {
                    inactiveSlide.style.backgroundImage = `url('${images[nextSlideIdx]}')`;
                    inactiveSlide.classList.add('active');
                    activeSlide.classList.remove('active');
                };
                img.onerror = () => {
                    // Skip this image
                    slideIndex = (slideIndex + 1) % images.length;
                };
                img.src = images[nextSlideIdx];
            }, CONFIG.slideshowInterval || 8000);
        }
    }

    // ── Clock ────────────────────────────────────────────────
    function initClock() {
        function update() {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            refs.clockTime.textContent = `${h}:${m}`;
        }
        update();
        setInterval(update, 10000);
    }

    // ── Tips ─────────────────────────────────────────────────
    function initTips() {
        const tips = CONFIG.tips || [];
        if (!tips.length) {
            refs.tipsCard.classList.add('hidden');
            return;
        }

        showTip(0);
        if (tips.length > 1) {
            tipInterval = setInterval(() => {
                currentTip = (currentTip + 1) % tips.length;
                animateTipChange(currentTip);
            }, CONFIG.tipInterval || 6000);
        }
    }

    function showTip(index) {
        const tips = CONFIG.tips || [];
        refs.tipText.textContent = tips[index] || '';
        refs.tipCounter.textContent = `${index + 1} / ${tips.length}`;
    }

    function animateTipChange(index) {
        refs.tipText.classList.add('tip-exit');

        setTimeout(() => {
            refs.tipText.classList.remove('tip-exit');
            refs.tipText.classList.add('tip-enter');
            showTip(index);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    refs.tipText.classList.remove('tip-enter');
                });
            });
        }, 350);
    }

    // ── Music ────────────────────────────────────────────────
    function initMusic() {
        if (!CONFIG.enableMusic) {
            refs.musicPlayer.classList.add('hidden');
            return;
        }

        refs.audio.src = CONFIG.musicFile || '';
        refs.audio.volume = CONFIG.musicVolume || 0.3;
        refs.musicVolume.value = Math.round((CONFIG.musicVolume || 0.3) * 100);
        refs.musicSongName.textContent = CONFIG.songName || '';

        // Create equalizer bars
        const eqBars = document.createElement('div');
        eqBars.className = 'eq-bars paused';
        for (let i = 0; i < 5; i++) {
            const bar = document.createElement('div');
            bar.className = 'eq-bar';
            eqBars.appendChild(bar);
        }
        refs.musicSongName.after(eqBars);

        // Init audio visualizer
        initAudioVisualizer();

        // Try autoplay
        tryAutoplay();

        // Prompt click
        refs.musicPrompt.addEventListener('click', () => {
            startMusic();
            refs.musicPrompt.classList.add('hidden');
        });

        // Toggle
        refs.musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                pauseMusic();
            } else {
                startMusic();
            }
        });

        // Volume
        refs.musicVolume.addEventListener('input', (e) => {
            const vol = parseInt(e.target.value) / 100;
            refs.audio.volume = vol;
        });

        // Global click to enable audio
        document.addEventListener('click', () => {
            if (!musicStarted && CONFIG.enableMusic) {
                startMusic();
            }
        }, { once: true });
    }

    function tryAutoplay() {
        const playPromise = refs.audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicStarted = true;
                isPlaying = true;
                updateMusicUI();
            }).catch(() => {
                // Autoplay blocked, show prompt
                refs.musicPrompt.classList.remove('hidden');
            });
        }
    }

    function startMusic() {
        // Resume AudioContext if suspended (browser autoplay policy)
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().catch(() => {});
        }
        refs.audio.play().then(() => {
            musicStarted = true;
            isPlaying = true;
            updateMusicUI();
        }).catch(() => {});
    }

    function pauseMusic() {
        refs.audio.pause();
        isPlaying = false;
        updateMusicUI();
    }

    function updateMusicUI() {
        refs.iconPlay.classList.toggle('hidden', isPlaying);
        refs.iconPause.classList.toggle('hidden', !isPlaying);
        const eq = $('.eq-bars', refs.musicPlayer);
        if (eq) {
            eq.classList.toggle('paused', !isPlaying);
        }
    }

    // ── Particles ────────────────────────────────────────────
    function initParticles() {
        if (!CONFIG.enableParticles) return;

        const count = CONFIG.particleCount || 30;
        const container = refs.particles;

        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';

            const size = Math.random() * 4 + 1;
            const x = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * duration;
            const startY = Math.random() * 100;

            p.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${startY}%;
                opacity: ${Math.random() * 0.5 + 0.1};
                animation: particleFloat ${duration}s ${delay}s linear infinite;
            `;

            container.appendChild(p);
        }

        // Inject keyframes once
        if (!document.getElementById('particle-keyframes')) {
            const style = document.createElement('style');
            style.id = 'particle-keyframes';
            style.textContent = `
                @keyframes particleFloat {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.4;
                    }
                    90% {
                        opacity: 0.2;
                    }
                    100% {
                        transform: translate(${Math.random() > 0.5 ? '' : '-'}${30 + Math.random() * 40}px, -${window.innerHeight + 50}px) scale(0.3);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ── FiveM Loading Events ─────────────────────────────────
    function initLoadingEvents() {
        const stages = {
            'INIT_BEFORE_MAP_LOADED':   { label: 'Iniciando...',               weight: 0 },
            'MAP':                       { label: 'Cargando mapa...',           weight: 20 },
            'INIT_AFTER_MAP_LOADED':    { label: 'Preparando mundo...',         weight: 40 },
            'INIT_SESSION':             { label: 'Iniciando sesion...',         weight: 60 },
            'LOAD':                      { label: 'Cargando recursos...',       weight: 80 },
        };

        // Listen for FiveM handshake events
        window.addEventListener('message', (event) => {
            const data = event.data;

            if (data.eventName === 'loadProgress') {
                const progress = data.loadFraction;
                setProgress(Math.round(progress * 100));
            }

            if (data.eventName === 'startInitFunctionOrder') {
                const stage = stages[data.type];
                if (stage) {
                    refs.loadingStatus.textContent = stage.label;
                    setProgress(Math.max(loadProgress, stage.weight));
                }
            }

            if (data.eventName === 'startDataFileEntries') {
                refs.loadingStatus.textContent = 'Cargando datos...';
                setProgress(Math.max(loadProgress, 50));
            }

            if (data.eventName === 'performMapLoadFunction') {
                refs.loadingStatus.textContent = 'Cargando mapa...';
                setProgress(Math.max(loadProgress, 30));
            }

            if (data.eventName === 'onLogLine' && data.message) {
                // Could parse log lines for more detail
            }
        });

        // FiveM native handlers
        const handlers = {
            handshake: () => {
                refs.serverStatus.textContent = 'Conectado al servidor';
                setProgress(Math.max(loadProgress, 5));
            },
            sessionStart: () => {
                refs.loadingStatus.textContent = 'Sesion iniciada...';
                setProgress(Math.max(loadProgress, 70));
            },
            loadComplete: () => {
                refs.loadingStatus.textContent = 'Carga completada!';
                setProgress(100);
            },
        };

        // Expose handlers globally for FiveM
        window.nuiHandshake = handlers.handshake;

        // Also handle via native events
        if (typeof window.addEventListener === 'function') {
            window.addEventListener('message', (e) => {
                if (e.data && e.data.type === 'handshake') handlers.handshake();
            });
        }
    }

    function setProgress(value) {
        loadProgress = Math.min(Math.max(value, loadProgress), 100);
        refs.loadingFill.style.width = `${loadProgress}%`;
        refs.loadingPercent.textContent = `${loadProgress}%`;

        if (loadProgress >= 100 && !loadingDone) {
            loadingDone = true;
            refs.loadingStatus.textContent = 'Carga completada!';
        }
    }

    // ── Staggered Reveal ─────────────────────────────────────
    function staggerReveal() {
        const elements = $$('.fade-element');
        elements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, 200 + i * 150);
        });
    }

    // ── Tabs ─────────────────────────────────────────────────
    function initTabs() {
        const tabBtns = $$('.tab-btn', refs.tabBar);
        const panels = $$('.tab-panel', refs.tabPanels);

        // Hide tabs for disabled sections
        if (!CONFIG.showRules) {
            const rulesTab = $('.tab-btn[data-tab="reglas"]', refs.tabBar);
            if (rulesTab) rulesTab.classList.add('hidden');
        }
        if (!CONFIG.showStaff) {
            const staffTab = $('.tab-btn[data-tab="staff"]', refs.tabBar);
            if (staffTab) staffTab.classList.add('hidden');
        }
        if (!CONFIG.showChangelog) {
            const changelogTab = $('.tab-btn[data-tab="changelog"]', refs.tabBar);
            if (changelogTab) changelogTab.classList.add('hidden');
        }

        // Click handlers
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                switchTab(tabId);
            });
        });

        // Position indicator on active tab
        requestAnimationFrame(() => {
            updateTabIndicator();
        });
    }

    function switchTab(tabId) {
        const tabBtns = $$('.tab-btn', refs.tabBar);
        const panels = $$('.tab-panel', refs.tabPanels);

        tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
        });

        panels.forEach(panel => {
            panel.classList.toggle('active', panel.getAttribute('data-tab') === tabId);
        });

        updateTabIndicator();
    }

    function updateTabIndicator() {
        const activeBtn = $('.tab-btn.active', refs.tabBar);
        if (!activeBtn || !refs.tabIndicator) return;

        const barRect = refs.tabBar.getBoundingClientRect();
        const btnRect = activeBtn.getBoundingClientRect();

        refs.tabIndicator.style.left = (btnRect.left - barRect.left) + 'px';
        refs.tabIndicator.style.width = btnRect.width + 'px';
    }

    // ── Changelog ─────────────────────────────────────────────
    function populateChangelog() {
        if (!CONFIG.showChangelog || !CONFIG.changelog || !CONFIG.changelog.length) {
            if (refs.changelogCard) refs.changelogCard.classList.add('hidden');
            return;
        }

        refs.changelogList.innerHTML = CONFIG.changelog.map(entry => {
            const changesHtml = entry.changes.map(c => `
                <li class="changelog-change">
                    <span class="changelog-type" data-type="${escHtml(c.type)}">${escHtml(c.type)}</span>
                    <span>${escHtml(c.text)}</span>
                </li>
            `).join('');

            return `
                <div class="changelog-entry">
                    <div class="changelog-entry-header">
                        <span class="changelog-version">v${escHtml(entry.version)}</span>
                        <span class="changelog-date">${escHtml(entry.date)}</span>
                    </div>
                    <ul class="changelog-changes">${changesHtml}</ul>
                </div>
            `;
        }).join('');
    }

    // ── Audio Visualizer ──────────────────────────────────────
    function initAudioVisualizer() {
        const barCount = 10;
        refs.audioVisualizer.innerHTML = '';

        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'viz-bar';
            bar.style.height = '2px';
            refs.audioVisualizer.appendChild(bar);
        }

        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            analyser.fftSize = 64;

            const source = audioCtx.createMediaElementSource(refs.audio);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);

            animateVisualizer();
        } catch (e) {
            // Fallback: CSS-only fake animation
            animateFakeVisualizer();
        }
    }

    function animateVisualizer() {
        if (!analyser) return;

        const bars = $$('.viz-bar', refs.audioVisualizer);
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function draw() {
            vizAnimFrame = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            const step = Math.floor(bufferLength / bars.length);
            bars.forEach((bar, i) => {
                const value = dataArray[i * step] || 0;
                const height = Math.max(2, (value / 255) * 26);
                bar.style.height = height + 'px';
            });
        }

        draw();
    }

    function animateFakeVisualizer() {
        const bars = $$('.viz-bar', refs.audioVisualizer);
        let frame = 0;

        function draw() {
            vizAnimFrame = requestAnimationFrame(draw);
            frame++;

            bars.forEach((bar, i) => {
                if (isPlaying) {
                    const h = Math.max(2, Math.abs(Math.sin((frame * 0.05) + i * 0.7)) * 24 + Math.random() * 4);
                    bar.style.height = h + 'px';
                } else {
                    bar.style.height = '2px';
                }
            });
        }

        draw();
    }

    // ── Utility ──────────────────────────────────────────────
    function escHtml(str) {
        const div = document.createElement('div');
        div.textContent = str || '';
        return div.innerHTML;
    }

    // ── Boot ─────────────────────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { init(); });
    } else {
        init();
    }
})();
