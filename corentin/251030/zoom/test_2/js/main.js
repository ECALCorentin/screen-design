const homme = document.getElementById('homme')
const table = document.getElementById('table')
const chaise = document.getElementById('chaise')

const baseDPR = window.devicePixelRatio || 1
let rafId = null

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)) }

// Essaie (1) VisualViewport.scale → (2) DPR ratio → (3) outer/inner width
function getViewportScale() {
    if (window.visualViewport && typeof window.visualViewport.scale === 'number') {
        return window.visualViewport.scale       // 1 = 100%, <1 dézoom, >1 zoom
    }
    if (typeof window.devicePixelRatio === 'number') {
        return (window.devicePixelRatio || 1) / baseDPR
    }
    if (window.outerWidth && window.innerWidth) {
        return window.outerWidth / window.innerWidth
    }
    return 1
}

function applyScales() {
    const z = getViewportScale()          // ex: 0.8 (dézoom), 1, 1.25 (zoom)

    // Homme rétrécit au dézoom (z<1), grossit au zoom (z>1)
    const scaleHomme = clamp(z, 0.5, 3)

    const inverse = clamp(2 - z, 0.1, 3)

    homme.style.transform = `scale(${scaleHomme})`
    table.style.transform = `scale(${inverse})`
    chaise.style.transform = `scale(${inverse})`
}

function scheduleApply() {
    if (rafId) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(applyScales)
}


window.addEventListener('resize', scheduleApply)
window.addEventListener('orientationchange', scheduleApply)

if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', scheduleApply)
    window.visualViewport.addEventListener('scroll', scheduleApply)
}

// Initialisation
applyScales()