// On attend que le DOM soit prêt
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(Draggable);
    const root = document.documentElement.style;
    let zoomLevel = 0;

    Draggable.create("#proxy", {
        type: "x,y",
        trigger: "#proxy",

        // IMPORTANT : J'ai commenté l'inertie car c'est un plugin payant
        // Si tu n'as pas la licence, ça fait planter tout le script.
        // inertia: true, 

        edgeResistance: 0.5,
        dragResistance: 0.4,
        onDrag: update3D,
        // onThrowUpdate: update3D // À décommenter seulement si tu as le plugin Inertia
    });

    function update3D() {
        // Translation
        root.setProperty('--cam-x', this.x * 1.2 + 'px');
        root.setProperty('--cam-y', this.y * 1.2 + 'px');

        // Rotation (Calculée en fonction de la position souris)
        const rotateY = this.x / -30;
        const rotateX = this.y / 40;

        // Limites (Clamp) pour ne pas retourner l'image complètement
        const clampedRotY = Math.max(Math.min(rotateY, 45), -45);
        const clampedRotX = Math.max(Math.min(rotateX, 45), -45);

        root.setProperty('--rot-y', clampedRotY + 'deg');
        root.setProperty('--rot-x', clampedRotX + 'deg');
    }

    const proxy = document.getElementById("proxy");

    if (proxy) {
        proxy.addEventListener("wheel", (e) => {
            e.preventDefault();
            zoomLevel += e.deltaY * -3;

            // On permet d'aller très loin en arrière (-7000) pour voir tout l'effet
            zoomLevel = Math.min(Math.max(zoomLevel, -7000), 2000);

            gsap.to("html", {
                "--cam-z": zoomLevel + "px",
                duration: 1,
                ease: "power2.out"
            });
        }, { passive: false });
    }
});