import { Pane } from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.3/dist/tweakpane.min.js';

const PARAMS = {
    x: 30,   // C'est maintenant le paramètre principal (Déplacement latéral)
    z: 10, // On recule un peu la caméra pour voir plus large
    rx: 0, ry: 0,
    gap: 500
};

const pane = new Pane({ title: 'Galerie Panoramique' });

const update = () => {
    const r = document.documentElement.style;

    r.setProperty('--cam-x', (PARAMS.x * -1) + 'px');
    r.setProperty('--cam-z', PARAMS.z + 'px');
    r.setProperty('--cam-rx', PARAMS.rx + 'deg');
    r.setProperty('--cam-ry', PARAMS.ry + 'deg');
    r.setProperty('--layer-gap', PARAMS.gap + 'px');
};

// SLIDER NAVIGATION
// De -1500 (Gauche) à 1500 (Droite)
pane.addBinding(PARAMS, 'x', {
    min: -1500,
    max: 1500,
    step: 10,
    label: 'Navigation (X)'
}).on('change', update);

// SLIDER PROFONDEUR CAMÉRA
pane.addBinding(PARAMS, 'z', {
    min: -1000,
    max: 2000,
    label: 'Distance Caméra'
}).on('change', update);

// EFFETS 3D
const fRot = pane.addFolder({ title: 'Regard (Tête)' });
fRot.addBinding(PARAMS, 'ry', { min: -60, max: 60, label: 'Gauche/Droite' });
fRot.addBinding(PARAMS, 'rx', { min: -45, max: 45, label: 'Haut/Bas' });
fRot.on('change', update);

pane.addBinding(PARAMS, 'gap', { min: 0, max: 1000 }).on('change', update);

update();