const fragment = document.createDocumentFragment()
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-cart').content
const items = document.getElementById('items')
const footer = document.getElementById('footer')

let cart = JSON.parse(localStorage.getItem('cart'));


const showCart = () => {
    items.innerHTML = ''
    Object.values(cart).forEach(product => {
        templateCarrito.querySelector('th').textContent = product.id
        templateCarrito.querySelectorAll('td')[0].textContent = product.name
        templateCarrito.querySelectorAll('td')[1].textContent = product.amount
        templateCarrito.querySelector('.btn-info').dataset.id = product.id
        templateCarrito.querySelector('.btn-danger').dataset.id = product.id
        
        if(product.discount !== 0 && product.discount !== null){
            const discount = product.price * product.discount / 100;
            const result = product.price - discount;
            templateCarrito.querySelector('span').textContent = result * product.amount;
        }else{
            templateCarrito.querySelector('span').textContent = product.amount * product.price
        }

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    items.appendChild(fragment)
    showFooter()
}

const showFooter = () => {
    
    footer.innerHTML = ''
    
    if (Object.keys(cart).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">El carrito se encuentra sin productos</th>
        `
        return
    }
    
    const nAmount = Object.values(cart).reduce((acc,{amount})=> acc + amount, 0)
    
    const nPrice = Object.values(cart).reduce((acc, {amount, price, discount}) => {
    
        let result = 0

        if(discount !==0 && discount !== null){
            const discountFooter = price * discount / 100;
            result = (price - discountFooter) * amount;
        }else{
            result = price * amount
        }
        
        return acc + result;
    },0)

        templateFooter.querySelectorAll('td')[0].textContent = nAmount
        templateFooter.querySelector('span').textContent = nPrice
        const clone = templateFooter.cloneNode(true)
        fragment.appendChild(clone)
        footer.appendChild(fragment)
        const btnVaciar = document.getElementById('emptyCart')
        
        btnVaciar.addEventListener('click', () => {
            localStorage.removeItem('cart')
            cart={}
            showCart()
        })
}

items.addEventListener('click', (e) =>{
    btnAccion(e)
})

const btnAccion = e => {
    if(e.target.classList.contains('btn-info')){
       const product = cart[e.target.dataset.id]
       product.amount++
       cart[e.target.dataset.id] = {...product}
       showCart()
    }

    if(e.target.classList.contains('btn-danger')){
        const product = cart[e.target.dataset.id]
        product.amount--
        if (product.amount ===0){
            delete cart[e.target.dataset.id]
        }
        showCart()
     }

     e.stopPropagation()
}

showCart();