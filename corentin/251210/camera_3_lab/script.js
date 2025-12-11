import { Pane } from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.3/dist/tweakpane.min.js';

const PARAMS = {
    perspective: 1000,
    originX: 50, originY: 50,
    x: 0, y: 0, z: 0,
    rx: 0, ry: 0, rz: 0,
    pivotZ: 0, // NOUVEAU
    gap: 500,
    backScale: 2,
    blurBack: 0, // NOUVEAU
    dimBack: 1, // NOUVEAU
    blurFront: 0, // NOUVEAU
    backface: true // NOUVEAU
};

const pane = new Pane({ title: 'Labo 3D CSS - Director Mode' });

const update = () => {
    const root = document.documentElement.style;
    root.setProperty('--persp', PARAMS.perspective + 'px');
    root.setProperty('--persp-origin-x', PARAMS.originX + '%');
    root.setProperty('--persp-origin-y', PARAMS.originY + '%');

    root.setProperty('--cam-x', PARAMS.x + 'px');
    root.setProperty('--cam-y', PARAMS.y + 'px');
    root.setProperty('--cam-z', PARAMS.z + 'px');
    root.setProperty('--cam-rx', PARAMS.rx + 'deg');
    root.setProperty('--cam-ry', PARAMS.ry + 'deg');
    root.setProperty('--cam-rz', PARAMS.rz + 'deg');

    root.setProperty('--pivot-z', PARAMS.pivotZ + 'px');

    root.setProperty('--layer-gap', PARAMS.gap + 'px');
    root.setProperty('--back-scale', PARAMS.backScale);

    // Effets
    root.setProperty('--blur-back', PARAMS.blurBack + 'px');
    root.setProperty('--dim-back', PARAMS.dimBack);
    root.setProperty('--blur-front', PARAMS.blurFront + 'px');
    root.setProperty('--backface', PARAMS.backface ? 'visible' : 'hidden');
};

const f1 = pane.addFolder({ title: '🎥 Objectif' });
f1.addBinding(PARAMS, 'perspective', { min: 200, max: 2000, step: 10 });
f1.addBinding(PARAMS, 'originX', { min: 0, max: 100, label: 'Regard X' });
f1.addBinding(PARAMS, 'originY', { min: 0, max: 100, label: 'Regard Y' });

const f2 = pane.addFolder({ title: '🕹️ Position' });
f2.addBinding(PARAMS, 'x', { min: -1000, max: 1000 });
f2.addBinding(PARAMS, 'y', { min: -1000, max: 1000 });
f2.addBinding(PARAMS, 'z', { min: -2000, max: 1000, label: 'Zoom (Z)' });

const f3 = pane.addFolder({ title: '🔄 Rotation & Pivot' });
f3.addBinding(PARAMS, 'rx', { min: -180, max: 180, label: 'Tilt' });
f3.addBinding(PARAMS, 'ry', { min: -180, max: 180, label: 'Pan' });
f3.addBinding(PARAMS, 'rz', { min: -180, max: 180, label: 'Roll' });
f3.addBinding(PARAMS, 'pivotZ', { min: -1000, max: 1000, label: 'Axe Pivot Z' });

const f4 = pane.addFolder({ title: '🎨 Effets & Optique' });
f4.addBinding(PARAMS, 'blurBack', { min: 0, max: 20, label: 'Flou Fond' });
f4.addBinding(PARAMS, 'dimBack', { min: 0, max: 1, label: 'Lumière Fond' });
f4.addBinding(PARAMS, 'blurFront', { min: 0, max: 20, label: 'Flou Avant' });
f4.addBinding(PARAMS, 'backface', { label: 'Voir Dos' });
f4.addBinding(PARAMS, 'gap', { min: 0, max: 2000, label: 'Écart Calques' });
f4.addBinding(PARAMS, 'backScale', { min: 0.5, max: 5 });

pane.on('change', update);
update();