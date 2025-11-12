async function getItems(url) {
    try {
        const res = await fetch(url)

        if (!res.ok) if (!res.ok) throw new Error(handleErrorStatus(res))
        const data = await res.json()
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getItemById(url, id) {
    try {
        const res = await fetch(`${url}/${id}`)
        
        if (!res.ok) throw new Error(handleErrorStatus(res))
        const data = await res.json()
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

function handleErrorStatus(res) {
    let message = ""
    switch (res.status) {
        case 404:
            message = "404 - Item not found"
            return message
        case 409:
            message = '409 - Conflict'
            return message
        case 500:
            message = '500 - Internal Server Error'
        default:
            message = "Fail to get item, please try again"
            return message
    }
}

export { getItems, getItemById }