export function initMediaPipe(onResultsCallback) {
    const video = document.getElementById('input_video');
    const canvas = document.getElementById('output_canvas');
    const ctx = canvas.getContext('2d');

    const hands = new Hands({
        locateFile: (file) => {
            // chemin correct vers la version stable contenant le modèle
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`;
        },
    });

    hands.setOptions({
        maxNumHands: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
        modelComplexity: 1, // 0,1,2 possible (plus stable avec 1)
    });

    hands.onResults((results) => {
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0];
            drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
            drawLandmarks(ctx, landmarks, { color: '#FF0000', lineWidth: 1 });
            onResultsCallback(landmarks);
        }
        ctx.restore();
    });

    const camera = new Camera(video, {
        onFrame: async () => {
            await hands.send({ image: video });
        },
        width: 640,
        height: 480,
    });

    camera.start();
}
