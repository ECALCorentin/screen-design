window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const scrollPercent = Math.min(scrollY / windowHeight, 1);

    const appartement = document.querySelector('.appartement');
    const cave = document.querySelector('.cave');

    // Réduire la taille de l'appartement en fonction du scroll


    const minHeight = 38;
    const maxHeight = 88;
    const currentHeight = maxHeight - (scrollPercent * (maxHeight - minHeight));
    appartement.style.height = currentHeight + 'vh';

    // Augmenter la hauteur de la cave
    const minCaveHeight = 0;
    const maxCaveHeight = 50;
    const currentCaveHeight = minCaveHeight + (scrollPercent * (maxCaveHeight - minCaveHeight));

    cave.style.height = currentCaveHeight + 'vh';
});