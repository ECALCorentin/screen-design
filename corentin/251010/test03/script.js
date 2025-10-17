let currentMouseX = 0;
let currentMouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;


const initialSize = 300;
const minSize = 50;
const maxSize = 600;


const smoothingFactor = 0.1;


const leftCircle = document.querySelector('.left .black-circle');
const rightCircle = document.querySelector('.right .black-circle');
const mouseIndicator = document.getElementById('mouseIndicator');


let currentLeftSize = initialSize;
let currentRightSize = initialSize;
let targetLeftSize = initialSize;
let targetRightSize = initialSize;


let animationId;


function lerp(start, end, factor) {
    return start + (end - start) * factor;
}


function calculateTargetSizes(mouseX, mouseY) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;


    const normalizedX = mouseX / screenWidth;
    const normalizedY = mouseY / screenHeight;


    const sizeRange = maxSize - minSize;

    targetLeftSize = minSize + (sizeRange * (1 - normalizedX));
    targetRightSize = minSize + (sizeRange * normalizedX);


    const verticalEffect = (normalizedY - 0.5) * 80;
    targetLeftSize = Math.max(minSize, Math.min(maxSize, targetLeftSize + verticalEffect));
    targetRightSize = Math.max(minSize, Math.min(maxSize, targetRightSize - verticalEffect));
}

function animate() {

    currentMouseX = lerp(currentMouseX, targetMouseX, smoothingFactor);
    currentMouseY = lerp(currentMouseY, targetMouseY, smoothingFactor);


    calculateTargetSizes(currentMouseX, currentMouseY);


    currentLeftSize = lerp(currentLeftSize, targetLeftSize, smoothingFactor);
    currentRightSize = lerp(currentRightSize, targetRightSize, smoothingFactor);


    leftCircle.style.width = Math.round(currentLeftSize) + 'px';
    leftCircle.style.height = Math.round(currentLeftSize) + 'px';
    rightCircle.style.width = Math.round(currentRightSize) + 'px';
    rightCircle.style.height = Math.round(currentRightSize) + 'px';


    if (mouseIndicator) {
        mouseIndicator.style.left = Math.round(currentMouseX) + 'px';
        mouseIndicator.style.top = Math.round(currentMouseY) + 'px';
    }


    animationId = requestAnimationFrame(animate);
}


window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
});

function init() {

    targetMouseX = window.innerWidth / 2;
    targetMouseY = window.innerHeight / 2;
    currentMouseX = targetMouseX;
    currentMouseY = targetMouseY;

    animate();
}


window.addEventListener('load', init);


window.addEventListener('resize', () => {
    calculateTargetSizes(currentMouseX, currentMouseY);
});