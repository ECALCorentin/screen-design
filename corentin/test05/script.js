// Variables pour la position et le lissage de la souris
let currentMouseX = 0;
let currentMouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

// Tailles initiales et limites des cercles
const initialSize = 300;
const minSize = 50;
const maxSize = 600;

// Facteurs de lissage (plus petit = plus fluide mais plus lent)
const smoothingFactor = 0.1;

// Récupérer les éléments des cercles et l'indicateur
const leftCircle = document.querySelector('.left .black-circle');
const rightCircle = document.querySelector('.right .black-circle');
const mouseIndicator = document.getElementById('mouseIndicator');

// Tailles actuelles et cibles des cercles
let currentLeftSize = initialSize;
let currentRightSize = initialSize;
let targetLeftSize = initialSize;
let targetRightSize = initialSize;

// Variables pour l'animation
let animationId;

// Fonction de lissage (lerp - linear interpolation)
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Fonction pour calculer les tailles cibles basées sur la position de la souris
function calculateTargetSizes(mouseX, mouseY) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Normaliser les positions de la souris (0 à 1)
    const normalizedX = mouseX / screenWidth;
    const normalizedY = mouseY / screenHeight;

    // Calculer les tailles basées sur la position horizontale
    const sizeRange = maxSize - minSize;

    targetLeftSize = minSize + (sizeRange * (1 - normalizedX));
    targetRightSize = minSize + (sizeRange * normalizedX);

    // Ajouter effet vertical (plus subtil)
    const verticalEffect = (normalizedY - 0.5) * 80;
    targetLeftSize = Math.max(minSize, Math.min(maxSize, targetLeftSize + verticalEffect));
    targetRightSize = Math.max(minSize, Math.min(maxSize, targetRightSize - verticalEffect));
}

// Fonction d'animation principale
function animate() {
    // Lisser la position de la souris
    currentMouseX = lerp(currentMouseX, targetMouseX, smoothingFactor);
    currentMouseY = lerp(currentMouseY, targetMouseY, smoothingFactor);

    // Calculer les nouvelles tailles cibles
    calculateTargetSizes(currentMouseX, currentMouseY);

    // Lisser les tailles des cercles
    currentLeftSize = lerp(currentLeftSize, targetLeftSize, smoothingFactor);
    currentRightSize = lerp(currentRightSize, targetRightSize, smoothingFactor);

    // Mettre à jour les éléments DOM
    leftCircle.style.width = Math.round(currentLeftSize) + 'px';
    leftCircle.style.height = Math.round(currentLeftSize) + 'px';
    rightCircle.style.width = Math.round(currentRightSize) + 'px';
    rightCircle.style.height = Math.round(currentRightSize) + 'px';

    // Mettre à jour l'indicateur de souris
    if (mouseIndicator) {
        mouseIndicator.style.left = Math.round(currentMouseX) + 'px';
        mouseIndicator.style.top = Math.round(currentMouseY) + 'px';
    }

    // Continuer l'animation
    animationId = requestAnimationFrame(animate);
}

// Écouteur d'événement pour le mouvement de la souris
window.addEventListener('mousemove', (e) => {
    // Simplement mettre à jour les positions cibles
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
});

// Initialiser et démarrer l'animation
function init() {
    // Initialiser les positions
    targetMouseX = window.innerWidth / 2;
    targetMouseY = window.innerHeight / 2;
    currentMouseX = targetMouseX;
    currentMouseY = targetMouseY;

    // Démarrer la boucle d'animation
    animate();
}

// Démarrer quand la page est chargée
window.addEventListener('load', init);

// Gérer le redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Recalculer les positions si nécessaire
    calculateTargetSizes(currentMouseX, currentMouseY);
});