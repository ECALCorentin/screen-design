window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const scrollPercent = Math.min(scrollY / windowHeight, 1);

    const cave = document.querySelector('.cave');

    // Phase 1: La cave grandit d'abord en hauteur jusqu'à 80vh
    if (scrollPercent <= 0.8) {
        const heightPercent = scrollPercent / 0.8; // Normalise entre 0 et 1 pour les premiers 80%
        const currentCaveHeight = heightPercent * 100; // Hauteur max de 80vh

        cave.style.height = currentCaveHeight + 'vh';
        cave.style.width = '20vw'; // Largeur reste fixe à 20vw
    }
    // Phase 2: Après 80vh de hauteur, elle grandit aussi en largeur
    else {
        const widthPercent = (scrollPercent - 0.8) / 0.2;
        const currentCaveWidth = 20 + (widthPercent * 80); // De 20vw à 100vw

        cave.style.height = '100vh'; // Hauteur reste à 80vh
        cave.style.width = currentCaveWidth + 'vw';
    }
});