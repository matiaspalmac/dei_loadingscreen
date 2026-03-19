/*
 * ============================================================
 *  dei_loadingscreen - Configuracion
 *  Dei Ecosystem | Pantalla de Carga
 * ============================================================
 *  Edita este archivo para personalizar tu pantalla de carga.
 *  No es necesario tocar app.js ni styles.css.
 * ============================================================
 */

const CONFIG = {

    // ── Informacion del Servidor ──────────────────────────────
    serverName: 'Mi Servidor RP',
    serverDescription: 'La mejor experiencia de roleplay en espanol. Unete y vive tu historia.',
    serverLogo: '', // Ruta a logo (ej: 'assets/img/logo.png') — dejar vacio para usar solo texto

    // ── Discord ───────────────────────────────────────────────
    discord: 'https://discord.gg/ejemplo',

    // ── Redes Sociales ────────────────────────────────────────
    socialLinks: [
        { platform: 'discord',   url: 'https://discord.gg/ejemplo' },
        { platform: 'instagram', url: '' },
        { platform: 'youtube',   url: '' },
        { platform: 'tiktok',    url: '' },
    ],

    // ── Tema ──────────────────────────────────────────────────
    // Opciones: 'dark', 'midnight', 'neon', 'minimal'
    theme: 'dark',
    lightMode: false,

    // ── Fondo ─────────────────────────────────────────────────
    // Tipo: 'video' o 'image'
    backgroundType: 'image',
    backgroundVideo: 'assets/img/bg.mp4',
    backgroundImages: [
        'assets/img/bg1.jpg',
        'assets/img/bg2.jpg',
        'assets/img/bg3.jpg',
    ],
    slideshowInterval: 8000, // ms entre transiciones de imagen

    // ── Musica ────────────────────────────────────────────────
    enableMusic: true,
    musicFile: 'assets/music/bg.mp3',
    musicVolume: 0.3,
    songName: 'Ambient RP',

    // ── Particulas Flotantes ──────────────────────────────────
    enableParticles: true,
    particleCount: 30,

    // ── Tips / Consejos ───────────────────────────────────────
    tips: [
        'Usa /me para describir acciones de tu personaje.',
        'Recuerda siempre mantener el roleplay.',
        'Respeta a los demas jugadores en todo momento.',
        'Usa /ooc para hablar fuera de personaje.',
        'Reporta bugs en nuestro Discord.',
        'Los vehiculos se guardan automaticamente en tu garaje.',
        'Puedes personalizar tu HUD con /hudtheme.',
        'Usa el cinturon de seguridad con B.',
        'Pulsa F1 para abrir tu celular.',
        'No olvides beber agua y comer para mantener tu salud.',
    ],
    tipInterval: 6000, // ms entre consejos

    // ── Staff / Equipo ────────────────────────────────────────
    showStaff: true,
    staff: [
        { name: 'Admin1', role: 'Fundador' },
        { name: 'Admin2', role: 'Administrador' },
        { name: 'Mod1',   role: 'Moderador' },
        { name: 'Dev1',   role: 'Desarrollador' },
    ],

    // ── Reglas ────────────────────────────────────────────────
    showRules: true,
    rules: [
        'Respetar a todos los jugadores.',
        'No usar hacks o exploits.',
        'Mantener el roleplay en todo momento.',
        'No hacer RDM/VDM.',
        'Seguir las instrucciones del staff.',
    ],
    rulesDiscordText: 'Lee las reglas completas en nuestro Discord',

    // ── Changelog ───────────────────────────────────────────
    showChangelog: true,
    changelog: [
        {
            version: '1.0.0',
            date: '2026-03-19',
            changes: [
                { type: 'added', text: 'Lanzamiento inicial' },
            ],
        },
    ],

};
