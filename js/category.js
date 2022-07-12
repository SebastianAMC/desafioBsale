const fragment = document.createDocumentFragment()
const templateCard = document.getElementById('template-card').content
const cards = document.getElementById('cards')

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
     if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'))
}})

let cart = {};

cards.addEventListener('click', e =>{
    addCart(e)
})

const fetchData = async () => {
    try {
        let id = localStorage.getItem('id');
        const res = await fetch('https://desafiobsalebackend.herokuapp.com/api/products/'+id)
        const data = await res.json()
        showProducts(data)
        localStorage.removeItem('id');

    } catch (error) {
        console.log(error)
    }
}

const img = document.createElement("img");
img.src = "./images/unknown.png";

const showProducts = data => {
    data.forEach(product=>{
        if (product.url_image === null){
            templateCard.querySelector('img').setAttribute('src', img.src)
        }else if (product.url_image === ''){
            templateCard.querySelector('img').setAttribute('src', img.src)
        }else{
            templateCard.querySelector('img').setAttribute('src', product.url_image)
        }

        templateCard.querySelector('h5').textContent = product.name
        templateCard.querySelector('p').textContent = product.price
        
    if(product.discount !== 0 && product.discount !== null){
            templateCard.querySelector('#discount').textContent = product.discount
            templateCard.querySelector('#discountLine').style.visibility = '' 
        } else{  
            templateCard.querySelector('#discount').textContent = product.discount
            templateCard.querySelector('#discountLine').style.visibility = 'hidden' 
        }  
        
        templateCard.querySelector('.btn-outline-dark').dataset.id = product.id
        
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })

    cards.appendChild(fragment)
}

 const addCart = e =>{
    if (e.target.classList.contains('btn-outline-dark')){
      setCart(e.target.parentElement)
      alert('Agregado al carrito');
    }
    e.stopPropagation();
}

const setCart = object => {
    const product = {
        id: object.querySelector('.btn-outline-dark').dataset.id,
        name: object.querySelector('h5').textContent,
        price: object.querySelector('p').textContent,
        discount: object.querySelector('#discount').textContent,
        amount: 1
    }

if(cart.hasOwnProperty(product.id)){
    product.amount = cart[product.id].amount +1
}

cart[product.id] = {...product}

localStorage.setItem('cart', JSON.stringify(cart))

}