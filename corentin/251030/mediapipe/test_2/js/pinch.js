const homme = document.getElementById('homme');
const table = document.getElementById('table');
const chaise = document.getElementById('chaise');
const images = [homme, table, chaise];


let activeElement = null;
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
        activeElement = getElementUnderCursor(x, y);

        if (activeElement) {
            const currentScale = parseFloat(activeElement.dataset.scale || 1);
            const newScale = Math.max(currentScale * 0.8, 0.4);

            activeElement.style.transform = `scale(${newScale})`;
            activeElement.style.transformOrigin = 'center bottom';
            activeElement.dataset.scale = newScale;
        }
    }

    if (!isPinching && wasPinching) {
        activeElement = null;
    }

    wasPinching = isPinching;

    return { distance, isPinching };
}

function getElementUnderCursor(x, y) {
    const el = document.elementFromPoint(x, y);
    return images.includes(el) ? el : null;
}
