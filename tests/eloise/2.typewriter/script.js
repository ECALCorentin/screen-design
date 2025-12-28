document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("typewriter");

  // Config
  const initialText = "Marty !"; // texte au chargement
  const nextText = "Eh Marty"; // texte à écrire après effacement
  const waitBeforeChangeMs = 5000; // 5s avant de commencer à effacer
  const deleteSpeedMs = 80; // vitesse d'effacement par lettre
  const typeSpeedMs = 90; // vitesse de frappe par lettre

  // Respecte les préférences de mouvement (réduit = pas d'anim lettre/lettre)
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Assure le texte initial
  el.textContent = initialText;

  // Helpers delay
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  async function deleteText(target, speed) {
    while (target.textContent.length > 0) {
      target.textContent = target.textContent.slice(0, -1);
      await sleep(speed);
    }
  }

  async function typeText(target, text, speed) {
    target.textContent = ""; // sécurité
    for (let i = 0; i < text.length; i++) {
      target.textContent += text[i];
      await sleep(speed);
    }
  }

  (async () => {
    // Attendre 5s avant de lancer la transition
    await sleep(waitBeforeChangeMs);

    if (prefersReducedMotion) {
      // Sans animation fine : on remplace d'un coup après 5s
      el.textContent = nextText;
      return;
    }

    // Effacer lettre par lettre
    await deleteText(el, deleteSpeedMs);
    // Re-taper lettre par lettre
    await typeText(el, nextText, typeSpeedMs);
  })();
});
