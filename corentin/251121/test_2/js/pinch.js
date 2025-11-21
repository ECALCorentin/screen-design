const homme = document.getElementById('homme');
const table = document.getElementById('table');
const chaise = document.getElementById('chaise');
const images = [homme, table, chaise];

let wasPinching = false;

export function detectPinch(landmarks) {
    const thumb = landmarks[4];
    const index = landmarks[8];

    const dx = thumb.x - index.x;
    const dy = thumb.y - index.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const isPinching = distance < 0.06;

    const x = (1 - index.x) * window.innerWidth;
    const y = index.y * window.innerHeight;

    // --- GESTION DU PINCH ---
    if (isPinching && !wasPinching) {
        // Vérifie si on pince sur l'homme
        const el = getElementUnderCursor(x, y);
        if (el === homme) {
            // Récupère l'échelle actuelle
            const currentScale = parseFloat(homme.dataset.scale || 1);
            // Réduit un peu
            const newScale = Math.max(currentScale * 0.8, 0.4);

            // homme.style.transform = `scale(${newScale})`;
            // homme.style.transformOrigin = 'center bottom';
            // homme.dataset.scale = newScale;

            // --- Les autres grandissent ---
            const growthFactor = currentScale / newScale; // inversement proportionnel
            [table, chaise].forEach(el => {
                const s = parseFloat(el.dataset.scale || 1);
                const newS = Math.min(s * growthFactor, 3); // limite à 3x max
                el.style.transform = `scale(${newS})`;
                el.style.transformOrigin = 'center bottom';
                el.dataset.scale = newS;
            });
        }
    }

    wasPinching = isPinching;

    return { distance, isPinching };
}

function getElementUnderCursor(x, y) {
    const el = document.elementFromPoint(x, y);
    return images.includes(el) ? el : null;
}
