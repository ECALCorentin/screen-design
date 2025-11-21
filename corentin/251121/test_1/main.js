const spider = document.getElementById('spider');
const statusText = document.getElementById('status');

let holdStartTime = 0;
let isSpiderVisible = false;
let holdTimer = null;

const MAX_HOLD_TIME = 7000;

function spiderAttack() {
    if (isSpiderVisible) return;

    const randomDelay = Math.floor(Math.random() * 3000) + 1000;

    statusText.innerText = "Ça arrive...";

    setTimeout(() => {
        spider.classList.add('visible');
        isSpiderVisible = true;
        statusText.innerText = "ATTRAPE-LA VITE !";

    }, randomDelay);
}

spiderAttack();

function startHolding(e) {
    e.preventDefault();
    if (!isSpiderVisible) return;

    spider.classList.add('struggling');
    holdStartTime = Date.now();
    statusText.innerText = "MAINTIENS LA !";
}

function stopHolding() {
    if (!isSpiderVisible || holdStartTime === 0) return;

    const holdDuration = Date.now() - holdStartTime;
    spider.classList.remove('struggling');

    checkSuccess(holdDuration);
    holdStartTime = 0;
}

// 5. Calcul des probabilités
function checkSuccess(duration) {

    let winChance = (duration / MAX_HOLD_TIME) * 100;

    if (winChance > 100) winChance = 100;

    console.log(`Temps: ${duration}ms, Chance de réussite: ${Math.floor(winChance)}%`);

    const roll = Math.random() * 100;

    if (roll < winChance) {
        statusText.innerText = `REUSSI ! (Chance: ${Math.floor(winChance)}%)`;
        spider.classList.remove('visible');
        isSpiderVisible = false;

        setTimeout(spiderAttack, 2000);
    } else {
        statusText.innerText = `RATÉ... Elle t'a mordu ! (Chance: ${Math.floor(winChance)}%)`;

        spider.style.transform = "translateY(-50%) scale(1.5)";
        setTimeout(() => {
            spider.style.transform = "";
            statusText.innerText = "Essaie encore...";
        }, 500);
    }
}

spider.addEventListener('mousedown', startHolding);
spider.addEventListener('touchstart', startHolding);

window.addEventListener('mouseup', stopHolding);
window.addEventListener('touchend', stopHolding);