// Variables pour la position de la souris
let currentMouseX = 0;
let currentMouseY = 0;

// Récupérer les éléments
const mouseIndicator = document.getElementById('mouseIndicator');
const proximityText = document.getElementById('proximityText');

// Variables pour l'effet de proximité du texte
let textScale = 1;
let targetTextScale = 3;

// Variables pour l'interlignage
let currentLineHeight = 1.4;
let targetLineHeight = 1.4;

// Variables pour l'animation
let animationId;

// Fonction de lissage (lerp - linear interpolation)
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Fonction pour calculer l'effet de proximité sur le texte
function calculateTextProximity() {
    if (!proximityText) return;

    const textRect = proximityText.getBoundingClientRect();
    const textCenterX = textRect.left + textRect.width / 2;
    const textCenterY = textRect.top + textRect.height / 2;

    // Calculer la distance entre la souris et le centre du texte
    const distance = Math.sqrt(
        Math.pow(currentMouseX - textCenterX, 2) +
        Math.pow(currentMouseY - textCenterY, 2)
    );

    // Définir les distances de référence
    const maxDistance = 2500; // Distance maximale pour l'effet
    const minDistance = 0;   // Distance minimale

    // Normaliser la distance (0 = très proche, 1 = très loin)
    const normalizedDistance = Math.max(0, Math.min(1, distance / maxDistance));

    // Calculer l'échelle (plus proche = plus grand)
    // À distance 0: échelle 2.5 (très grand)
    // À distance max: échelle 1 (taille normale)
    targetTextScale = 1 + ((1 - normalizedDistance) * 1.5);
}

// Fonction pour calculer l'interlignage basé sur la position Y de la souris
function calculateLineHeight() {
    if (!proximityText) return;

    // Normaliser la position Y de la souris (0 à 1)
    const normalizedY = currentMouseY / window.innerHeight;

    // Calculer l'interlignage basé sur la position verticale
    // En haut (Y=0): interlignage 0.5 (très serré)
    // En bas (Y=1): interlignage 3.0 (très espacé)
    targetLineHeight = 0.5 + (normalizedY * 2.5);
}

// Fonction d'animation principale
function animate() {
    // Calculer l'effet de proximité sur le texte
    calculateTextProximity();

    // Calculer l'interlignage basé sur la position Y
    calculateLineHeight();

    // Lisser l'échelle du texte
    textScale = lerp(textScale, targetTextScale, 0.15);

    // Lisser l'interlignage
    currentLineHeight = lerp(currentLineHeight, targetLineHeight, 0.1);

    // Mettre à jour le texte de proximité
    if (proximityText) {
        proximityText.style.transform = `scale(${textScale})`;
        proximityText.style.lineHeight = currentLineHeight;
    }

    // Mettre à jour l'indicateur de souris
    if (mouseIndicator) {
        mouseIndicator.style.left = Math.round(currentMouseX) + 'px';
        mouseIndicator.style.top = Math.round(currentMouseY) + 'px';
    }

    // Continuer l'animation
    animationId = requestAnimationFrame(animate);
}

// Événements de souris
window.addEventListener('mousemove', (e) => {
    currentMouseX = e.clientX;
    currentMouseY = e.clientY;
});

// Initialiser et démarrer l'animation
function init() {
    // Initialiser les positions
    currentMouseX = window.innerWidth / 2;
    currentMouseY = window.innerHeight / 2;

    // Démarrer la boucle d'animation
    animate();
}

// Démarrer quand la page est chargée
window.addEventListener('load', init);