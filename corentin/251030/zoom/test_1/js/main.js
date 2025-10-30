const homme = document.getElementById('homme')
const table = document.getElementById('table')
const chaise = document.getElementById('chaise')

function resizeImages() {
    const largeur = window.innerWidth
    const base = 1000 // largeur de référence

    // On calcule un facteur de taille basé sur la largeur actuelle
    const ratio = largeur / base

    // L’homme diminue quand on dézoome
    const scaleHomme = Math.max(0.5, ratio) // minimum 0.5 pour éviter qu’il disparaisse
    homme.style.transform = `scale(${scaleHomme})`

    // La table et la chaise grandissent quand on dézoome
    const scaleAutres = 2 - Math.min(1.5, ratio) // inverse le rapport
    table.style.transform = `scale(${scaleAutres})`
    chaise.style.transform = `scale(${scaleAutres})`
}

// Exécution initiale + sur redimensionnement
window.addEventListener('resize', resizeImages)
resizeImages()