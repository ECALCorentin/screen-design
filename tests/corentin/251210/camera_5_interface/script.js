import { Pane } from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.3/dist/tweakpane.min.js';

// --- CONFIGURATION ---
const PARAMS = {
    x: -200, y: -33, z: 10,
    rx: 0, ry: 0,
    gap: 500
};

// Configuration du Pan "Bords d'écran"
const SCROLL_CFG = {
    active: false,
    threshold: 100,
    speed: 5
};

const MOUSE = { x: 0, y: 0 };

// Variable pour savoir quelle pièce est actuellement zoomée
let currentPiece = null;

// --- NOUVEAU : Variable pour mémoriser la vue d'ensemble ---
let savedState = { ...PARAMS };

const pane = new Pane({ title: 'Galerie Panoramique' });

// --- UPDATE VISUEL ---
const update = () => {
    const r = document.documentElement.style;
    r.setProperty('--cam-x', (PARAMS.x * -1) + 'px');
    r.setProperty('--cam-y', (PARAMS.y * -1) + 'px');
    r.setProperty('--cam-z', PARAMS.z + 'px');
    r.setProperty('--cam-rx', PARAMS.rx + 'deg');
    r.setProperty('--cam-ry', PARAMS.ry + 'deg');
    r.setProperty('--layer-gap', PARAMS.gap + 'px');
};

// --- TWEAKPANE ---
pane.addBinding(PARAMS, 'x', { min: -2000, max: 2000 }).on('change', update);
pane.addBinding(PARAMS, 'y', { min: -1500, max: 1500 }).on('change', update);
pane.addBinding(PARAMS, 'z', { min: -1000, max: 2000 }).on('change', update);
const fRot = pane.addFolder({ title: 'Rotation' });
fRot.addBinding(PARAMS, 'ry', { min: -60, max: 60 });
fRot.addBinding(PARAMS, 'rx', { min: -45, max: 45 });
fRot.on('change', update);


// --- LOGIQUE DE DÉPLACEMENT PAR BORDS ---
window.addEventListener('mousemove', (e) => {
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;
});

const tick = () => {
    if (SCROLL_CFG.active) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        let needsUpdate = false;

        // Gauche / Droite
        if (MOUSE.x < SCROLL_CFG.threshold) {
            PARAMS.x -= SCROLL_CFG.speed;
            needsUpdate = true;
        } else if (MOUSE.x > width - SCROLL_CFG.threshold) {
            PARAMS.x += SCROLL_CFG.speed;
            needsUpdate = true;
        }

        // Haut / Bas
        if (MOUSE.y < SCROLL_CFG.threshold) {
            PARAMS.y -= SCROLL_CFG.speed;
            needsUpdate = true;
        } else if (MOUSE.y > height - SCROLL_CFG.threshold) {
            PARAMS.y += SCROLL_CFG.speed;
            needsUpdate = true;
        }

        if (needsUpdate) {
            pane.refresh();
            update();
        }
    }
    requestAnimationFrame(tick);
};
tick();


// --- LOGIQUE ZOOM / UNZOOM ---

// Fonction de restauration (Retour vue précédente)
const resetCamera = () => {
    // On remet les valeurs qu'on avait sauvegardées avant le zoom
    PARAMS.x = savedState.x;
    PARAMS.y = savedState.y;
    PARAMS.z = savedState.z;
    PARAMS.rx = savedState.rx;
    PARAMS.ry = savedState.ry;

    currentPiece = null;
    SCROLL_CFG.active = false; // On arrête le déplacement souris

    pane.refresh();
    update();
};

const pieces = document.querySelectorAll('.piece');

pieces.forEach(piece => {
    piece.addEventListener('click', (e) => {
        e.stopPropagation();

        // Si on clique sur la même pièce -> Dé-zoom
        if (currentPiece === piece) {
            resetCamera();
            return;
        }

        // --- C'EST ICI QUE CA SE PASSE ---
        // Si on n'était pas déjà en mode zoom (c'est le premier clic),
        // on sauvegarde la position actuelle de la "Vue d'ensemble".
        // Si on passe d'une pièce A à une pièce B directement, on ne veut PAS
        // écraser la sauvegarde avec la position de la pièce A.
        if (currentPiece === null) {
            // On copie l'objet PARAMS actuel dans savedState
            savedState = { ...PARAMS };
        }

        // Zoom sur la nouvelle pièce
        currentPiece = piece;

        const targetX = parseFloat(piece.dataset.x) || 0;
        const targetY = parseFloat(piece.dataset.y) || 0;

        PARAMS.x = targetX;
        PARAMS.y = targetY;
        PARAMS.z = 750;
        PARAMS.rx = 0;
        PARAMS.ry = 0;

        SCROLL_CFG.active = true; // Activer le pan

        pane.refresh();
        update();
    });
});

// Clic fond = Reset
document.addEventListener('click', (e) => {
    if (e.target.closest('.tp-dfwv')) return;
    if (!e.target.closest('.piece')) {
        // On ne reset que si on était zoomé
        if (currentPiece !== null) {
            resetCamera();
        }
    }
});

update();