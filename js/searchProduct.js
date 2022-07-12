const buttonSearch = document.getElementById('searchButton')

buttonSearch.addEventListener('click', event =>{
    event.preventDefault();
    searchProduct();
})

const searchProduct = async () => {

    let search = document.getElementById('searchProduct').value;
    if(search === ''){
        search = 404;
    }

    try {
        const res = await fetch('https://desafiobsalebackend.herokuapp.com/api/products/search?product='+ search);
        const data = await res.json();
        localStorage.setItem('search', JSON.stringify(data));
        window.location.href = "./search.html";

    } catch (error) {
        console.log(error);
    }
}