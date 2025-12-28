let cameraInstance = null;

function setupCanvasResolution(canvas) {
    const ctx = canvas.getContext('2d');
    const devicePixelRatio = window.devicePixelRatio || 1;

    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    canvas.width = displayWidth * devicePixelRatio;
    canvas.height = displayHeight * devicePixelRatio;

    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';

    ctx.scale(devicePixelRatio, devicePixelRatio);

    return { displayWidth, displayHeight, devicePixelRatio };
}

export function initMediaPipe(onResultsCallback) {
    // Stop existing camera if any
    if (cameraInstance) {
        cameraInstance.stop();
    }

    const video = document.getElementById('input_video');
    const canvas = document.getElementById('output_canvas');
    const ctx = canvas.getContext('2d');

    // Configurer la résolution du canvas
    const { displayWidth, displayHeight, devicePixelRatio } = setupCanvasResolution(canvas);

    const hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/${file}`;
        },
    });

    hands.setOptions({
        maxNumHands: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
        modelComplexity: 1,
    });

    hands.onResults((results) => {
        ctx.save();
        ctx.clearRect(0, 0, displayWidth, displayHeight);

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0];

            // Afficher seulement les points 4 (pouce) et 8 (index)
            const thumb = landmarks[4];
            const index = landmarks[8];

            const thumbX = (1 - thumb.x) * displayWidth;
            const thumbY = thumb.y * displayHeight;
            const indexX = (1 - index.x) * displayWidth;
            const indexY = index.y * displayHeight;

            ctx.fillStyle = '#001effff';
            ctx.beginPath();
            ctx.arc(thumbX, thumbY, 20, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = '#001effff';
            ctx.beginPath();
            ctx.arc(indexX, indexY, 20, 0, 2 * Math.PI);
            ctx.fill();

            onResultsCallback(landmarks);
        }
        ctx.restore();
    });

    cameraInstance = new Camera(video, {
        onFrame: async () => {
            await hands.send({ image: video });
        },
        width: displayWidth,
        height: displayHeight,
    });

    window.addEventListener('resize', () => {
        setupCanvasResolution(canvas);
    });

    cameraInstance.start();
}
