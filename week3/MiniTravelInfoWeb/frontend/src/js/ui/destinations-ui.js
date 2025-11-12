import { loadDestinations } from '../services/destinations-service'

document.addEventListener('DOMContentLoaded', async () => {

    const destinations = await loadDestinations()
    const destList = document.getElementById('destination-list')
    destinations.forEach((dest) => {
        
        destList.append(createDestinationCard(dest))
    });

})


function createDestinationCard(dest) {
    
    const aEle = document.createElement('a')
    aEle.setAttribute('href', `./destination.html?id=${dest.id}`)
    const divEle = document.createElement('div')
    const htmlText = `<div class="flex flex-col gap-3 pb-3">
                        <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                             style='background-image: url("${dest.image}");'>
                        </div>
                        <div>
                            <p class="text-[#0d141b] text-base font-medium leading-normal">${dest.name}</p>
                            <p class="text-[#4c739a] text-sm font-normal leading-normal">${dest.country}</p>
                         </div>
                      </div>`
    divEle.innerHTML = htmlText
    aEle.appendChild(divEle)
    return aEle
}






// <a href="./destination.html">
//                             <div class="flex flex-col gap-3 pb-3">
//                                 <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
//                                     style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_IDL-3CCgqcbwp_X3mzPaF58tRk_B7oVfEo_7VagosSLJvSY1D6ODObzDTEld_5zBIXWh2WbUONkU7-_r7jxHbG-bAa3WDYLSxdmEa6kOb8QuDgsS498U20EXpvQWaeA_qjNyimMFKu_UOeOVUSViCPNxiDRdJmYkJ7SL0sVPDkyQFAqAoCLkJAeEXVjqIOl8qCKIiUwvfYA-kIuiTCLVeGMsJLHFw5V3ejhGl-Eo5e2E8008qsF9AZJhMb5I-HUzzOM3WqdVeP_2");'>
//                                 </div>
//                                 <div>
//                                     <p class="text-[#0d141b] text-base font-medium leading-normal">Paris</p>
//                                     <p class="text-[#4c739a] text-sm font-normal leading-normal">France</p>
//                                 </div>
//                             </div>
//                         </a>
//                         