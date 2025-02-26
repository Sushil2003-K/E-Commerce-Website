// JavaScript can be added here for interactive features
console.log("Website Loaded Successfully!");
// JavaScript can be added here for interactive features
console.log("Website Loaded Successfully!");

document.getElementById('clickMe').addEventListener('click', function() {
    alert('Button clicked! Thanks for visiting.');
});

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from local storage

document.addEventListener("DOMContentLoaded", function () {
    updateCart(); // Update cart on page load

    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseInt(this.getAttribute("data-price"));
            const image = this.getAttribute("data-image");

            addToCart(name, price, image);
        });
    });
});

function addToCart(name, price, image) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1, image });
    }
    saveCart();
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.image}" width="50"></td>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>
                <button onclick="decreaseQuantity(${index})">-</button>
                ${item.quantity}
                <button onclick="increaseQuantity(${index})">+</button>
            </td>
            <td>₹${item.price * item.quantity}</td>
            <td><button class="remove-btn" onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartItems.appendChild(row);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = total;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to local storage
}

function increaseQuantity(index) {
    cart[index].quantity += 1;
    saveCart();
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

document.getElementById("checkout-btn").addEventListener("click", function () {
    alert("Redirecting to checkout...");
});


document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".about-content, .why-choose-us, .our-team");

    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
});

