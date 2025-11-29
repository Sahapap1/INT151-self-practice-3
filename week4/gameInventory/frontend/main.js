
let myItems

async function getItems(endPoint) {
    try {
        const res = await fetch(`http://localhost:3000/${endPoint}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error.message)
    }
}

async function getItemToInventory(item) {
    try {
        const res = await fetch("http://localhost:3000/my-inventory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message)
    }
}

async function increasItemQuantity(itemId, newQuantity) {
    console.log(newQuantity);

    try {
        const res = await fetch(`http://localhost:3000/my-inventory/${itemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newQuantity)
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message)
    }
}

async function removeItemFromInventory(itemId, newQuantity) {
    console.log(newQuantity);

    try {
        const res = await fetch(`http://localhost:3000/my-inventory/${itemId}`, {
            method: "DELETE",
        });

        return true;
    } catch (error) {
        console.log(error.message)
    }
}

const rarityColor = {
    "Common": "text-gray-300",
    "Uncommon": "text-green-400",
    "Rare": "text-blue-400",
    "Epic": "text-purple-400",
    "Legendary": "text-yellow-400"
};



const itemsContainer = document.getElementById("items-container")

async function renderItems() {
    myItems = await getItems("my-inventory");
    itemsContainer.innerHTML = "";

    if (!myItems || myItems.length === 0) {
        for (let i = 0; i < 20; i++) {
            itemsContainer.innerHTML += `
                <div class="bg-slate-800 flex flex-col rounded justify-end aspect-square relative group border-2 border-transparent"></div>
            `;
        }
        return;
    }

    myItems.forEach(item => {
        const color = rarityColor[item.rarity] || "text-white";
        const itemHTML = `
            <div 
                draggable="true"
                data-id="${item.id}"
                class="inventory-item bg-cover bg-center flex flex-col rounded justify-end aspect-square relative cursor-pointer group border-2 border-transparent hover:border-primary transition-all
                duration-200 ease-in-out active:scale-90"
                data-alt="${item.name}"
                style='background-image: 
                    linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), 
                    url("${item.image}");'>

                <p class="absolute bottom-1 right-1.5 text-white text-sm font-bold leading-tight bg-black/50 px-1 rounded">
                    x${item.quantity || 1}
                </p>

                <div
                    class="absolute inset-0 bg-black/60 p-1 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-center">
                    <p class="text-white font-bold text-xs leading-tight">${item.name}</p>
                    <p class="${color} text-[10px]">${item.rarity}</p>
                </div>
            </div>
        `;
        itemsContainer.innerHTML += itemHTML;
    });

    if (myItems || myItems.length > 0) {
        for (let i = myItems.length; i < 20; i++) {
            itemsContainer.innerHTML += `
                <div class="bg-slate-800 flex flex-col rounded justify-end aspect-square relative group border-2 border-transparent"></div>
            `;
        }
        return;
    }

}

renderItems();

const items = await getItems("items")
const randomBtn = document.getElementById('random-btn')
const randomedItem = document.getElementById("randomed-item")
let currentRandomItem = null;

randomBtn.addEventListener('click', () => {
    if (!items || items.length === 0) {
        console.log("No items to random.");
        return;
    }
    const randomIndex = Math.floor(Math.random() * items.length)
    const randomItem = items[randomIndex]
    currentRandomItem = items[randomIndex];
    const color = rarityColor[randomItem.rarity] || "text-white";


    randomedItem.innerHTML = ""
    randomedItem.innerHTML = `<div class="w-40 aspect-square bg-background-dark rounded-lg flex items-center justify-center bg-cover bg-center"
                                    data-alt="Close up of a mythical glowing sword"
                                    style='background-image: url(${randomItem.image})'>
                                </div>
                                <div class="flex flex-col gap-4 py-6">
                                    <div class="flex flex-col gap-1">
                                        <p class="${color} text-sm font-bold">${randomItem.rarity}</p>
                                        <h2 class="text-white text-2xl font-bold">${randomItem.name}</h2>
                                        <button id="get-item"
                                            class="w-full bg-confirm text-white font-bold py-3 px-4 rounded-lg hover:bg-confirm/50 transition-colors">Get Item</button>
                                    </div>

                                </div>
                            `
})

randomedItem.addEventListener("click", (e) => {
    if (e.target && e.target.id === "get-item") {

        const exists = myItems.find(item => item.id === currentRandomItem.id);

        if (exists) {
            const data = { ...currentRandomItem, quantity: exists.quantity + 1 }
            console.log(data);

            increasItemQuantity(data.id, data);
        } else {
            const data = { ...currentRandomItem, quantity: 1 }
            getItemToInventory(data);
        }
    }
});

let draggedItemId = null;


setTimeout(() => {
    const itemElements = document.querySelectorAll(".inventory-item");

    itemElements.forEach(el => {
        el.addEventListener("dragstart", handleDragStart);
        el.addEventListener("dragend", handleDragEnd);
    });
}, 0);


function handleDragStart(e) {
    const item = e.target.closest(".inventory-item");
    if (!item) return;
    draggedItemId = item.dataset.id;
    
    // effect ตอนเริ่มลาก
    e.target.classList.add("opacity-50", "scale-90");
}

function handleDragEnd(e) {
    e.target.classList.remove("opacity-50", "scale-90");
}


const trashZone = document.getElementById("trash-zone");

trashZone.addEventListener("dragover", (e) => {
    e.preventDefault(); 
    trashZone.classList.add("bg-red-700");
});

trashZone.addEventListener("dragleave", () => {
    trashZone.classList.remove("bg-red-700");
});

trashZone.addEventListener("drop", async (e) => {
    e.preventDefault();

    trashZone.classList.remove("bg-red-700");

    if (!draggedItemId) return;

    console.log("Dropping item:", draggedItemId);

    await removeItemFromInventory(draggedItemId);
    renderItems()

    draggedItemId = null;
});