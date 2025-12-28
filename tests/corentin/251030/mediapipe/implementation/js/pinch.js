export function detectPinch(landmarks) {
    const thumb = landmarks[4];
    const index = landmarks[8];

    const dx = thumb.x - index.x;
    const dy = thumb.y - index.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    console.log("Distance 4↔8:", distance.toFixed(4));

    const isPinching = distance < 0.06;
    if (isPinching) {
        console.log("👉 Pinch détecté !");
    }

    return { distance, isPinching };
}
