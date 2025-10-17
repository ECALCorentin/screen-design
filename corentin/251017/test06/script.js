window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const scrollPercent = Math.min(scrollY / windowHeight, 1);

    const cave = document.querySelector('.cave');

    // La cave grandit depuis le centre vers le haut et le bas
    const maxCaveHeight = 85;
    const currentCaveHeight = scrollPercent * maxCaveHeight;

    cave.style.height = currentCaveHeight + 'vh';
});