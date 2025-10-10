(() => {
  const circle = document.getElementById("circle");
  const root = document.documentElement;

  let scale = 1; // échelle actuelle
  const minScale = 1; // échelle mini
  const maxScale = 10; // échelle maxi (sécurité)
  const growPerSecond = 1.8; // vitesse de croissance (facteur/seconde)
  let growing = false; // état “enfoncé”
  let raf = null;
  let last = 0;

  function setScale(v) {
    scale = Math.min(Math.max(v, minScale), maxScale);
    root.style.setProperty("--scale", scale.toFixed(3));
  }

  function loop(t) {
    if (!growing) {
      raf = null;
      return;
    }
    if (!last) last = t;
    const dt = (t - last) / 1000; // secondes écoulées
    last = t;
    setScale(scale + growPerSecond * dt);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (growing) return;
    growing = true;
    last = 0;
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    growing = false;
    last = 0;
  }

  // Souris
  circle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    start();
  });
  window.addEventListener("mouseup", stop);
  circle.addEventListener("mouseleave", () => {
    if (growing) stop();
  });

  // Tactile
  circle.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      start();
    },
    { passive: false }
  );
  window.addEventListener("touchend", stop);
  window.addEventListener("touchcancel", stop);

  // Clavier : maintenir Espace/Entrée pour grossir
  circle.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.key === "Enter") {
      e.preventDefault();
      start();
    }
  });
  circle.addEventListener("keyup", (e) => {
    if (e.code === "Space" || e.key === "Enter") {
      stop();
    }
  });

  // Double-clic pour reset (optionnel)
  circle.addEventListener("dblclick", () => setScale(1));

  // Expose quelques réglages en console (optionnel)
  window.__circleAPI = {
    setScale,
    get scale() {
      return scale;
    },
  };
})();
