gsap.registerPlugin(Draggable);
const root = document.documentElement.style;
let zoomLevel = 0;

Draggable.create("#proxy", {
    type: "x,y",
    trigger: "#proxy",
    inertia: true,
    edgeResistance: 0.5,
    dragResistance: 0.4,
    onDrag: update3D,
    onThrowUpdate: update3D
});

function update3D() {
    root.setProperty('--cam-x', this.x * 1.2 + 'px');
    root.setProperty('--cam-y', this.y * 1.2 + 'px');


    const rotateY = this.x / -30;
    const rotateX = this.y / 40;

    const clampedRotY = Math.max(Math.min(rotateY, 45), -45);
    const clampedRotX = Math.max(Math.min(rotateX, 45), -45);

    root.setProperty('--rot-y', clampedRotY + 'deg');
    root.setProperty('--rot-x', clampedRotX + 'deg');
}

const proxy = document.getElementById("proxy");
proxy.addEventListener("wheel", (e) => {
    e.preventDefault();
    zoomLevel += e.deltaY * -3;
    zoomLevel = Math.min(Math.max(zoomLevel, -5000), 1500);

    gsap.to("html", {
        "--cam-z": zoomLevel + "px",
        duration: 1,
        ease: "power2.out"
    });
}, { passive: false });
