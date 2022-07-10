const fragment = document.createDocumentFragment()
const templateCard = document.getElementById('template-card').content
const cards = document.getElementById('cards')

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
 /*    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    } */
})

cards.addEventListener('click', e =>{
    addCarrito(e)

})

const fetchData = async () => {
    try {
        let id = localStorage.getItem('id');
        const res = await fetch('http://localhost:4000/api/products/'+id)
        const data = await res.json()
        pintarProductos(data)

    } catch (error) {
        console.log(error)
    }
}

const img = document.createElement("img");
img.src = "../images/unknown.png";

const pintarProductos = data => {
    data.forEach(producto=>{
        if (producto.url_image === null){
            templateCard.querySelector('img').setAttribute('src', img.src)
        }else if (producto.url_image === ''){
            templateCard.querySelector('img').setAttribute('src', img.src)
        }else{
            templateCard.querySelector('img').setAttribute('src', producto.url_image)
        }
        templateCard.querySelector('h5').textContent = producto.name
        templateCard.querySelector('p').textContent = producto.price
        templateCard.querySelector('span').textContent = producto.discount
        templateCard.querySelector('.btn-outline-dark').dataset.id = producto.id
        
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })

    cards.appendChild(fragment)
}


 const addCarrito = e =>{
    if (e.target.classList.contains('btn-outline-dark')){
      setCarrito(e.target.parentElement)
    }
    e.stopPropagation();
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-outline-dark').dataset.id,
        name: objeto.querySelector('h5').textContent,
        price: objeto.querySelector('p').textContent,
        discount: objeto.querySelector('.text-danger').textContent,
        amount: 1

    }

if(carrito.hasOwnProperty(producto.id)){
    producto.amount = carrito[producto.id].amount +1
}

carrito[producto.id] = {...producto}
}