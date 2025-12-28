import { initMediaPipe } from './mediapipe-setup.js';
import { detectPinch } from './pinch.js';

function handleLandmarks(landmarks) {
    const { distance, isPinching } = detectPinch(landmarks);
    // Exemple d’action : afficher la valeur dans la console
    console.log('distance:', distance.toFixed(3), 'pinch:', isPinching);
}

initMediaPipe(handleLandmarks);
