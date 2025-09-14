// SEARCH TOGGLE
const searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
}

// HEADER SCROLL
window.onscroll = () => {
    searchForm.classList.remove('active');
    const header2 = document.querySelector('.header .header-2');
    if(window.scrollY > 80){
        header2.classList.add('active');
    } else {
        header2.classList.remove('active');
    }
}

window.onload = () => {
    const header2 = document.querySelector('.header .header-2');
    if(window.scrollY > 80){
        header2.classList.add('active');
    } else {
        header2.classList.remove('active');
    }
}

// CART POPUP
const cartBtn = document.getElementById("cart-btn");
const cartPopup = document.getElementById("cart-popup");
const closeCart = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

cartBtn.addEventListener("click", e => {
    e.preventDefault();
    cartPopup.style.display = "flex";
});
closeCart.addEventListener("click", () => cartPopup.style.display = "none");

// TOAST SYSTEM
const toastContainer = document.getElementById("toast-container");
let toastMap = {}; // track unique item toasts

function showToast(itemName, qty) {
    if(toastMap[itemName]){
        toastMap[itemName].textContent = `${qty}x ${itemName} added to cart!`;
    } else {
        const toast = document.createElement("div");
        toast.classList.add("toast", "show");
        toast.textContent = `${qty}x ${itemName} added to cart!`;
        toastContainer.appendChild(toast);
        toastMap[itemName] = toast;

        setTimeout(() => {
            toast.remove();
            delete toastMap[itemName];
        }, 3000);
    }
}

// CART LOGIC
let cart = [];

function addToCart(itemName, price){
    let existing = cart.find(item => item.name === itemName);
    if(existing){
        existing.qty += 1;
    } else {
        cart.push({ name: itemName, price: price, qty: 1 });
    }

    const qty = cart.find(item => item.name === itemName).qty;
    showToast(itemName, qty);

    renderCart();
}

function renderCart(){
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.qty}`;
        const priceSpan = document.createElement("span");
        priceSpan.textContent = `${item.price * item.qty} IQD`;
        li.appendChild(priceSpan);
        cartItemsList.appendChild(li);
        total += item.price * item.qty;
    });

    cartTotal.textContent = `Total: ${total} IQD`;
}

// ATTACH BUY BUTTONS
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = Number(button.getAttribute('data-price').replace(/,/g,''));
        addToCart(name, price);
    });
});

// BUY & CLEAR BUTTONS
const buyBtn = document.getElementById('buy-btn');
const clearBtn = document.getElementById('clear-btn');

buyBtn.addEventListener('click', () => {
    if(cart.length === 0){
        alert("Your cart is empty!");
        return;
    }
    alert("Thanks for your purchase!");
    cart = [];
    renderCart();
});

clearBtn.addEventListener('click', () => {
    cart = [];
    renderCart();
});
