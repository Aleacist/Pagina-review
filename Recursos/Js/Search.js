const searchInput = document.querySelector(".buscarheader")
const imgSearchs = document.getElementsByClassName("imagesearch")
console.log(imgSearchs.length)
for (let i = 0; 1 < imgSearchs.length; i++)
{ console.table(imgSearchs[i].name)} 

function Buscar() {
    searchInput.addEventListener("input", (e) => {
        let value = e.target.value
        if (value === "") {
             for (let i = 0; 1 < imgSearchs.length; i++)
              { imgSearchs[i].style.opacity = 1; } 
            }
        else {
            for (let i = 0; 1 < imgSearchs.length; i++) {
                if( value != imgSearchs[i].name) {
                    imgSearchs[i].style.opacity = 0.6;
                } else imgSearchs[i].style.opacity = 1;}
            
        }
    })
}


