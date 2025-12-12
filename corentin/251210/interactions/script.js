// Sélection des chaises
const chairs = document.querySelectorAll('.chairs img');
const chairNormal = chairs[0];
const chairLag = chairs[1];

// ==============================================
// CHAISE 1 : DRAG NORMAL (1 pour 1)
// ==============================================
let isDragging1 = false;
let startX1, startY1;
let currentX1 = 0, currentY1 = 0;
let initialX1 = 0, initialY1 = 0;

chairNormal.style.cursor = 'grab';

chairNormal.addEventListener('mousedown', (e) => {
    isDragging1 = true;
    startX1 = e.clientX;
    startY1 = e.clientY;
    initialX1 = currentX1;
    initialY1 = currentY1;
    chairNormal.style.cursor = 'grabbing';
    e.preventDefault();
});

window.addEventListener('mouseup', () => {
    if (isDragging1) {
        isDragging1 = false;
        chairNormal.style.cursor = 'grab';
    }
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging1) return;
    const dx = e.clientX - startX1;
    const dy = e.clientY - startY1;

    // Mouvement direct (100% de la distance souris)
    currentX1 = initialX1 + dx;
    currentY1 = initialY1 + dy;

    chairNormal.style.transform = `translate(${currentX1}px, ${currentY1}px)`;
});

// ==============================================
// CHAISE 2 : DRAG LOURD + DISTANCE RÉDUITE
// ==============================================
let isDragging2 = false;
let startX2, startY2; // Position souris au clic

let targetX = 0, targetY = 0;
let currentX2 = 0, currentY2 = 0;
let savedTargetX = 0, savedTargetY = 0;

// --- REGLAGES ---

// 1. FACTEUR DE DISTANCE (Le Ratio)
// 0.2 signifie : Si la souris bouge de 100px, la chaise bouge de 20px.
// Plus c'est petit, moins la chaise avance.
const DISTANCE_RATIO = 0.1;

// 2. FACTEUR DE VITESSE (L'inertie)
// 0.05 signifie : Lissage du mouvement (retard).
const LERP_FACTOR = 0.05;

// Seuil d'arrêt pour éviter le calcul infini
const STOP_THRESHOLD = 0.1;

chairLag.style.cursor = 'grab';

chairLag.addEventListener('mousedown', (e) => {
    isDragging2 = true;
    startX2 = e.clientX;
    startY2 = e.clientY;

    // On mémorise où la chaise "pensait" aller au moment du clic
    savedTargetX = targetX;
    savedTargetY = targetY;

    chairLag.style.cursor = 'grabbing';
    e.preventDefault();

    // Réveil de l'animation
    if (!animationRunning) {
        animationRunning = true;
        animateLag();
    }
});

window.addEventListener('mouseup', () => {
    if (isDragging2) {
        isDragging2 = false;
        chairLag.style.cursor = 'grab';
    }
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging2) return;

    // Distance parcourue par la souris depuis le clic
    const mouseDx = e.clientX - startX2;
    const mouseDy = e.clientY - startY2;

    // ICI EST LE CHANGEMENT PRINCIPAL :
    // On multiplie le mouvement de la souris par le ratio (0.2)
    // La "Cible" n'est plus sous la souris, elle est beaucoup plus proche du départ.
    targetX = savedTargetX + (mouseDx * DISTANCE_RATIO);
    targetY = savedTargetY + (mouseDy * DISTANCE_RATIO);

    if (!animationRunning) {
        animationRunning = true;
        animateLag();
    }
});

let animationRunning = false;

function animateLag() {
    if (!animationRunning) return;

    const diffX = targetX - currentX2;
    const diffY = targetY - currentY2;

    // Si on est très proche de la cible (cible qui est elle-même "courte")
    if (Math.abs(diffX) < STOP_THRESHOLD && Math.abs(diffY) < STOP_THRESHOLD) {
        currentX2 = targetX;
        currentY2 = targetY;
        chairLag.style.transform = `translate(${currentX2}px, ${currentY2}px)`;
        animationRunning = false;
        return;
    }

    // Interpolation vers la cible réduite
    currentX2 += diffX * LERP_FACTOR;
    currentY2 += diffY * LERP_FACTOR;

    chairLag.style.transform = `translate(${currentX2}px, ${currentY2}px)`;

    requestAnimationFrame(animateLag);
}

// Lancement initial
animateLag();