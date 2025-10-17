// Variables pour le drag and drop
let isDragging = false;
let draggedCircle = null;
let dragOffset = { x: 0, y: 0 };
let currentMouseX = 0;
let currentMouseY = 0;

// Tailles initiales et limites des cercles
const initialSize = 200;
const minSize = 80;
const maxSize = 500;

// Facteur de lissage pour l'animation
const smoothingFactor = 1;

// Récupérer les éléments des cercles et l'indicateur
const leftCircle = document.querySelector('.left .black-circle');
const rightCircle = document.querySelector('.right .black-circle');
const mouseIndicator = document.getElementById('mouseIndicator');

// Positions initiales des cercles
const leftSection = document.querySelector('.left');
const rightSection = document.querySelector('.right');

// Variables pour les positions et tailles des cercles
let leftCirclePos = { x: 0, y: 0 };
let rightCirclePos = { x: 0, y: 0 };
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

// Fonction pour calculer la distance entre deux points
function getDistance(pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

// Fonction pour obtenir la position d'un élément
function getElementCenter(element) {
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}

// Fonction pour calculer les tailles basées sur la distance entre les cercles
function calculateTargetSizes() {
    const distance = getDistance(leftCirclePos, rightCirclePos);
    const maxDistance = window.innerWidth * 0.8; // Distance maximale
    const minDistance = 100; // Distance minimale pour l'effet

    // Normaliser la distance (0 = très proche, 1 = très loin)
    const normalizedDistance = Math.max(0, Math.min(1, (distance - minDistance) / (maxDistance - minDistance)));

    if (isDragging) {
        if (draggedCircle === leftCircle) {
            // Le cercle gauche est traîné vers la droite
            targetLeftSize = initialSize + (maxSize - initialSize) * (1 - normalizedDistance);
            targetRightSize = initialSize - (initialSize - minSize) * (1 - normalizedDistance);
        } else if (draggedCircle === rightCircle) {
            // Le cercle droit est traîné vers la gauche
            targetRightSize = initialSize + (maxSize - initialSize) * (1 - normalizedDistance);
            targetLeftSize = initialSize - (initialSize - minSize) * (1 - normalizedDistance);
        }
    } else {
        // Retour à la taille normale quand on ne traîne pas
        targetLeftSize = currentLeftSize;
        targetRightSize = currentRightSize;
    }

    // S'assurer que les tailles restent dans les limites
    targetLeftSize = Math.max(minSize, Math.min(maxSize, targetLeftSize));
    targetRightSize = Math.max(minSize, Math.min(maxSize, targetRightSize));
}

// Fonction d'animation principale
function animate() {
    // Mettre à jour les positions des cercles
    leftCirclePos = getElementCenter(leftCircle);
    rightCirclePos = getElementCenter(rightCircle);

    // Calculer les nouvelles tailles cibles
    calculateTargetSizes();

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

// Fonction pour démarrer le drag
function startDrag(e, circle) {
    isDragging = true;
    draggedCircle = circle;

    const rect = circle.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left - rect.width / 2;
    dragOffset.y = e.clientY - rect.top - rect.height / 2;

    circle.style.zIndex = 1000;
    circle.classList.add('dragging');

    e.preventDefault();
}

// Fonction pour arrêter le drag
function stopDrag() {
    if (draggedCircle) {
        draggedCircle.style.zIndex = '';
        draggedCircle.classList.remove('dragging');

        // Remettre le cercle à sa position d'origine avec animation
        setTimeout(() => {
            if (draggedCircle === leftCircle) {
                draggedCircle.style.transform = '';
                draggedCircle.style.position = '';
            } else {
                draggedCircle.style.transform = '';
                draggedCircle.style.position = '';
            }
        }, 100);
    }

    isDragging = false;
    draggedCircle = null;
}

// Événements de souris
window.addEventListener('mousemove', (e) => {
    currentMouseX = e.clientX;
    currentMouseY = e.clientY;

    if (isDragging && draggedCircle) {
        // Déplacer le cercle traîné
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;

        draggedCircle.style.position = 'fixed';
        draggedCircle.style.left = (newX - currentLeftSize / 2) + 'px';
        draggedCircle.style.top = (newY - currentLeftSize / 2) + 'px';
        draggedCircle.style.transform = 'none';
    }
});

// Événements pour les cercles
leftCircle.addEventListener('mousedown', (e) => startDrag(e, leftCircle));
rightCircle.addEventListener('mousedown', (e) => startDrag(e, rightCircle));

// Événements globaux
window.addEventListener('mouseup', stopDrag);
window.addEventListener('mouseleave', stopDrag);

// Empêcher la sélection de texte pendant le drag
document.addEventListener('selectstart', (e) => {
    if (isDragging) {
        e.preventDefault();
    }
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