let filter_btns = document.querySelectorAll('.filter-btns button');
let filterable_cards = document.querySelectorAll('.filterable-cards .card');

filter_btns.forEach(button => button.addEventListener("click", function(){
    filter_btns.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    let filterValue = button.dataset.name;

    filterable_cards.forEach(card => {
    if (filterValue === 'all' || filterValue === card.dataset.name) {
        card.parentElement.style.display = 'block';
    }else {
        card.parentElement.style.display = 'none';
    }
});

}));

let buttons = document.querySelectorAll('.color-options button');
buttons.forEach(button => {button.addEventListener('click', function(){
    let imgsrc = button.dataset.image;
    let card = button.closest('.card');
    let images = card.querySelector('.product-image');
    images.setAttribute('src', `images/${imgsrc}`)
})});


let addtocartbtns = document.querySelectorAll('.addtocart');

let tempProduct= {};
addtocartbtns.forEach(button => {
    button.addEventListener('click', function () {
        let card = button.closest('.card');

        let image = card.querySelector('.product-image').getAttribute('src');
        let name = card.querySelector('.card-title').textContent;
        let price = card.querySelector('.card-text').textContent.replace('$', '');

        tempProduct = {image, name, price};

        document.getElementById('box').classList.add('d-block');
        document.getElementById('box').classList.remove('d-none');
    });
});

function cancel(){
    document.getElementById('box').classList.remove('d-block');
    document.getElementById('box').classList.add('d-none');
} 

function add() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingProduct = cart.find(item => item.name === tempProduct.name && item.image === tempProduct.image);

    if(existingProduct) {
        existingProduct.qty +=1;
    } else {
        let product = {
        id : cart.length + 1,
        name : tempProduct.name,
        price : tempProduct.price,
        image : tempProduct.image,
        qty:1
    }
    cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    tempProduct = {};
    cancel();
    quantity();
    load();
}

function clearAll() {
    localStorage.removeItem('cart');
    let price = document.querySelector('#total');
    price.textContent = 0;

    let quantity = document.getElementById('quantity');
    quantity.textContent = 0;
    quantity.classList.remove('bg-danger');
    load();
}

function load() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let cartlist = document.querySelector('.carts');
    let price = document.querySelector('#total');
    let total = 0;
    cartlist.innerHTML = '';
    if (cart.length === 0) {
        cartlist.innerHTML +=  `<h2> Your Cart is Empty </h2>`
    }
    else{
        cart.forEach((item,index)=> {
            cartlist.innerHTML += `<div class="cart d-flex align-items-center justify-content-between">
            <img src="${item.image}" alt="" style="width: 100px; ">
            <div class="info">
            <h4 class="m-0">${item.name}</h4>
            <p class="m-0 fs-4">Price: $ ${item.price}</p>
            <div class="btns">
                <button onclick="changeQuantity(${index}, 'decrease')" class="btn mx-2 fs-4">-</button>
                <span>${item.qty}</span>
                <button onclick="changeQuantity(${index}, 'increase')" class="btn mx-2 fs-4">+</button>
            </div>
            </div>
            </div> <hr>`;

    total += item.price * item.qty;
    price.textContent = total ;
        
    });
   }
}
function changeQuantity(index, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(action === 'increase') {
        cart[index].qty += 1;
    }
    else if(action === 'decrease') {
        cart[index].qty -= 1;
    }
    if(cart[index].qty ===  0) {
        cart.splice(index, 1);
    }


    localStorage.setItem('cart', JSON.stringify(cart));
    load();
}

function quantity() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let totalqty = 0;

    cart.forEach(item => {
        totalqty += item.qty;
    });
    let quantity = document.getElementById('quantity');
    quantity.textContent = totalqty;
    quantity.classList.add('bg-danger');

}