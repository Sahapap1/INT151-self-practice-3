async function getDog() {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();
    const content = document.getElementById('content')
    content.innerHTML = ""
    const imgEle = document.createElement('img')
    imgEle.setAttribute('src', data.message)
    content.appendChild(imgEle)


}

getDog();




