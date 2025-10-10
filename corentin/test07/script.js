let speed = 0.01;

// Changer la vitesse aléatoirement toutes les 2 secondes
setInterval(() => {
    speed = Math.random() * 0.5; // Vitesse entre 0.005 et 0.025
}, 300);

window.addEventListener("wheel", (e) => {
    e.preventDefault();
    window.scrollBy({
        top: e.deltaY * speed,
        behavior: "auto",
    });
}, { passive: false });