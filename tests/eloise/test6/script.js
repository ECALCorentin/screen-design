/**
 * Découpe le texte source en <span class="ch">…</span> par caractère
 * pour permettre le survol individuel (hover/touch).
 */
(function () {
  const el = document.getElementById("quote");
  if (!el) return;

  const text = el.getAttribute("data-text") || "";
  const frag = document.createDocumentFragment();

  // Utiliser Array.from pour bien gérer les emojis et les ligatures
  const chars = Array.from(text);

  chars.forEach((ch) => {
    if (ch === " ") {
      const span = document.createElement("span");
      span.className = "ch";
      span.dataset.space = "true";
      span.textContent = " "; // garde le flux et les retours à la ligne
      frag.appendChild(span);
      return;
    }

    const span = document.createElement("span");
    span.className = "ch";
    // Marque simple pour ponctuation (optionnel)
    if (/[.,;:!?«»'’"()\-]/.test(ch)) span.dataset.punct = "true";
    span.textContent = ch;
    frag.appendChild(span);
  });

  el.textContent = ""; // nettoie
  el.appendChild(frag);

  // ---- Support mobile : agrandit la lettre sous le doigt ----
  // Sur mobile il n'y a pas de :hover fiable. On “simule” en appliquant
  // la classe :hover via JS sur l’élément sous le doigt.
  let lastHover = null;

  function setHoverFromPoint(clientX, clientY) {
    const target = document.elementFromPoint(clientX, clientY);
    if (!target) return;
    if (lastHover && lastHover !== target) lastHover.classList.remove("hover");
    if (target.classList && target.classList.contains("ch")) {
      target.classList.add("hover"); // appliqué avec CSS via :is(.hover, :hover)
      lastHover = target;
    }
  }

  // Ajoute un sélecteur CSS logique pour .hover (voir ci-dessous)
  const style = document.createElement("style");
  style.textContent = `.ch:is(.hover, :hover){ transform: scale(var(--scale-hover)); text-shadow: 0 0 0.01px rgba(255,255,255,0.4), 0 6px 24px rgba(0,0,0,0.25); }`;
  document.head.appendChild(style);

  // Écouteurs tactiles
  el.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches && e.touches[0]) {
        setHoverFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true }
  );

  el.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches && e.touches[0]) {
        setHoverFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true }
  );

  el.addEventListener("touchend", () => {
    if (lastHover) lastHover.classList.remove("hover");
    lastHover = null;
  });
})();
