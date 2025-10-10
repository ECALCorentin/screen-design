
let lastScrollY = window.scrollY;


const initialSize = 120;
const centerMinSize = 30;
const centerMaxSize = 200;
const orbitMinSize = 80;
const orbitMaxSize = 180;
const scrollSensitivity = 0.8;


const centerCircle = document.querySelector('.center-circle');
const orbitCircles = document.querySelectorAll('.orbit-circle');


let centerSize = initialSize;
let orbitSizes = Array.from(orbitCircles).map(() => initialSize);


function updateCircleSizes() {
    centerCircle.style.width = centerSize + 'px';
    centerCircle.style.height = centerSize + 'px';


    orbitCircles.forEach((circle, index) => {
        circle.style.width = orbitSizes[index] + 'px';
        circle.style.height = orbitSizes[index] + 'px';


        if (orbitSizes[index] > initialSize + 10) {
            circle.classList.add('growing');
        } else {
            circle.classList.remove('growing');
        }
    });
}


function calculateScrollEffect() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(window.scrollY / maxScroll, 1);

    return scrollProgress;
}


window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    if (Math.abs(scrollDelta) > 0.5) {
        const scrollEffect = calculateScrollEffect();
        const sizeChange = Math.abs(scrollDelta) * scrollSensitivity;


        if (scrollDelta > 0) {
            centerSize = Math.max(centerMinSize, centerSize - sizeChange * 1.5);
        } else {
            centerSize = Math.min(centerMaxSize, centerSize + sizeChange * 0.8);
        }

        orbitCircles.forEach((circle, index) => {
            const growthFactor = 1 + (scrollEffect * 0.8);

            if (scrollDelta > 0) {
                orbitSizes[index] = Math.min(orbitMaxSize * growthFactor, orbitSizes[index] + sizeChange * 0.7);
            } else {
                orbitSizes[index] = Math.max(orbitMinSize, orbitSizes[index] - sizeChange * 0.5);
            }
        });

        updateCircleSizes();
    }

    lastScrollY = currentScrollY;
});

// Initialiser les tailles
updateCircleSizes();