window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const scrollPercent = Math.min(scrollY / windowHeight, 1);

    const cave = document.querySelector('.cave');

    // La cave grandit depuis le centre vers la gauche et la droite
    const maxCaveWidth = 90; // 100vw au maximum
    const currentCaveWidth = scrollPercent * maxCaveWidth;

    cave.style.width = currentCaveWidth + 'vw';
});