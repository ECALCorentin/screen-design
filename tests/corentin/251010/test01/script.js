let lastScrollY = window.scrollY;

const initialSize = 100;
const minSize = 10;
const maxSize = 800;
const scrollSensitivity = 1;


const leftCircle = document.querySelector('.left .black-circle');
const rightCircle = document.querySelector('.right .black-circle');


let leftSize = initialSize;
let rightSize = initialSize;


function updateCircleSizes() {
    leftCircle.style.width = leftSize + 'px';
    leftCircle.style.height = leftSize + 'px';
    rightCircle.style.width = rightSize + 'px';
    rightCircle.style.height = rightSize + 'px';
}


window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;


    const sizeChange = scrollDelta * scrollSensitivity;

    if (scrollDelta > 0) {
        leftSize = Math.max(minSize, leftSize - sizeChange);
        rightSize = Math.min(maxSize, rightSize + sizeChange);
    } else if (scrollDelta < 0) {
        leftSize = Math.min(maxSize, leftSize - sizeChange);
        rightSize = Math.max(minSize, rightSize + sizeChange);
    }

    updateCircleSizes();

    lastScrollY = currentScrollY;
});

updateCircleSizes();