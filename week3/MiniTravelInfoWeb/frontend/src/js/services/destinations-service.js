import { getItems, getItemById } from '../lib/fetchUtil'

const destinationURL = `${import.meta.env.VITE_APP_URL}/destinations`


async function loadDestinations() {
    try {
        const destinations = await getItems(destinationURL)
        return destinations
    } catch (error) {
        alert(`Destination: ${error}`)
    }
}

async function loadDestinationById(id) {
    try {
        const destination = await getItemById(destinationURL, id)
        return destination
    } catch (error) {
        alert(`Destination: ${error}`)
    }
}


export { loadDestinations, loadDestinationById }