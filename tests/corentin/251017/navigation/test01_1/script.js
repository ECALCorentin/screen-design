window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const scrollPercent = Math.min(scrollY / windowHeight, 1);

    const appartement = document.querySelector('.appartement');


    // Réduire la taille de l'appartement en fonction du scroll
    const minHeight = 70;
    const maxHeight = 94;
    const currentHeight = maxHeight - (scrollPercent * (maxHeight - minHeight));

    appartement.style.height = currentHeight + 'vh';

    // Faire remonter légèrement l'appartement pour donner l'impression qu'il scroll
    const maxAppartementTop = 0;
    const minAppartementTop = -30;
    const currentAppartementTop = maxAppartementTop - (scrollPercent * (maxAppartementTop - minAppartementTop));

    appartement.style.top = currentAppartementTop + 'px';

    // cave.style.opacity = Math.min(0.3 + scrollPercent * 0.7, 1);
});