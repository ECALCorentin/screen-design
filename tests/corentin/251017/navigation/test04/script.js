window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const scrollPercent = Math.min(scrollY / windowHeight, 1);

    const appartement = document.querySelector('.appartement');
    const cave = document.querySelector('.cave');

    // Réduire la taille de l'appartement en fonction du scroll
    const minHeight = 70;
    const maxHeight = 94;
    const currentHeight = maxHeight - (scrollPercent * (maxHeight - minHeight));

    appartement.style.height = currentHeight + 'vh';

    // Faire remonter légèrement l'appartement pour donner l'impression qu'il scroll
    const maxAppartementTop = 0;
    const minAppartementTop = -80;
    const currentAppartementTop = maxAppartementTop - (scrollPercent * (maxAppartementTop - minAppartementTop));

    appartement.style.top = currentAppartementTop + 'px';

    // Faire remonter la cave
    const maxTop = 100;
    const minTop = 60;
    const currentTop = maxTop - (scrollPercent * (maxTop - minTop));

    cave.style.top = currentTop + 'vh';

    // cave.style.opacity = Math.min(0.3 + scrollPercent * 0.7, 1);
});