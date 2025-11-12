import { loadDestinationById } from '../services/destinations-service'

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const destination = await loadDestinationById(id)

    console.log(destination);
    
    const destImg = document.getElementById('destination-img')
    destImg.setAttribute('style', `background-image: url("${destination.image}")`)

    const destTitle = document.getElementById('destination-title')
    destTitle.textContent = destination.title

    const destShortDes = document.getElementById('destination-short-description')
    destShortDes.textContent = destination.short_description

    const destDescription = document.getElementById('destination-description')
    destDescription.textContent = destination.description
})

