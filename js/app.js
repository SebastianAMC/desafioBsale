let carrito = {}
export {carrito};

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
        const res = await fetch('http://localhost:4000/api/products')
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

//pintarCarrito();
}

/* const pintarCarrito= () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.name
        templateCarrito.querySelectorAll('td')[1].textContent = producto.amount
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.amount * producto.price

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">El carrito se encuentra sin productos</th>
        `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc,{amount})=> acc + amount, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {amount, price}) => acc + amount * price, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito={}
        pintarCarrito()
    })
}

items.addEventListener('click', (e) =>{
    btnAccion(e)
})

const btnAccion = e => {
    if(e.target.classList.contains('btn-info')){
       const producto = carrito[e.target.dataset.id]
       producto.amount++
       carrito[e.target.dataset.id] = {...producto}
       pintarCarrito()
    }

    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.amount--
        if (producto.amount ===0){
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
     }

     e.stopPropagation()
} */
