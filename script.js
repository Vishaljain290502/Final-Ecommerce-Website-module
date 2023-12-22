// Navigation menu toggle functionality
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close navigation menu when a navigation link is clicked
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Cart icon and cart functionality
let cartIcon = document.querySelector("#cart-icon");
let cart1 = document.querySelector(".cart1");
let closeCart = document.querySelector("#close-cart");

// Uncomment these lines if you want to use click events for opening and closing the cart
/*
cartIcon.onclick = () => {
    cart1.classList.add("active");
};

closeCart.onclick = () => {
    cart1.classList.remove("active");
};
*/

// Display products in the HTML using data
const row1 = document.getElementById("row1");
console.log("===", row1);
data.map((project, index) =>
    row1.innerHTML += `<div class="card" >
        <div class="col-4" onclick="navigateToProductDetails(${project.id})">
            <a><img src=${project.image} ></a>
            <h4>${project.title}</h4>
            <p>&#8377;${project.price}</p>
        </div>
        <button class="btns" onclick="ViewDetails(${project.id})">Add to Cart</button>
        <a href="${project.href}"><button class="btnn" href="#">Go to Cart</button></a>
    </div>`
);

// Function to redirect to the product details page
const navigateToProductDetails = (productId) => {
    window.location.href = `product-details.html?id=${productId}`;
};

// Function to add a product to the cart
const ViewDetails = (id) => {
    console.log(id, "id");
    var x = JSON.parse(localStorage.getItem("productdetails"));
    let product = data.find(item => item.id == id);
    product.quantity = 1;
    if (x) {
        let prod = x.find(items => items.id == id);
        if (prod) {
            alert('Product has already been added to the Cart');
        } else {
            alert("Your Product has been added successfully to the Cart");
            x.push(product);
            localStorage.setItem("productdetails", JSON.stringify(x));
        }
    } else {
        alert("Your Product has been added successfully to the Cart");
        newArr = [];
        newArr.push(product)
        localStorage.setItem("productdetails", JSON.stringify(newArr));
    };
    updateCartCounter();
};

// Function to remove an item from the cart
const removeItem = (id) => {
    var cartData = JSON.parse(localStorage.getItem("productdetails"));
    var updatedCart = cartData.filter(item => item.id !== id);
    localStorage.setItem("productdetails", JSON.stringify(updatedCart));
    updateCart();
    updateCartCounter();
};

// Function to update the cart and total
const updateCart = () => {
    var cartData = JSON.parse(localStorage.getItem("productdetails"));
    var cartBoxTable = document.querySelector(".cart-content");
    let tableData = "";

    if (!cartData || cartData.length === 0) {
        tableData += `<tr><td colspan="5">No items found</td></tr>`;
    } else {
        cartData.map(data5 => {
            // Calculate total price for each item based on quantity
            let totalPrice = data5.price * data5.quantity;

            tableData += `<div class="cart-display">
                            <img src="${data5.image}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${data5.title}</div>
                                <div class="cart-price">$${totalPrice}</div>
                                <input type="number" value="${data5.quantity}" class="cart-quantity" onchange="updateQuantity(${data5.id}, this.value)">
                                <button class="btnss" onclick="removeItem(${data5.id})"><i class='bx bxs-trash-alt cart-remove'></i></button>
                            </div>
                        </div>`;
        });
        let total = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
        let price = cartData.reduce((acc, item) => acc + item.price, 0);
        console.log("=====", total);
        tableData += `<div class="price-total">Price: $&#8377;{price}</div>`;
        tableData += `<div class="cart-total">Total: $&#8377;{total}</div>`;
    }
    cartBoxTable.innerHTML = tableData;
};

// Function to update quantity in local storage
const updateQuantity = (id, quantity) => {
    var cartData = JSON.parse(localStorage.getItem("productdetails"));
    // Ensure the quantity is at least 1
    quantity = Math.max(0, parseInt(quantity, 10));
    if (quantity == 0) {
        quantity = 1;
        alert("You can remove the item");
    };
    var updatedCart = cartData.map(item => (item.id === id ? { ...item, quantity: parseInt(quantity, 10) } : item));
    localStorage.setItem("productdetails", JSON.stringify(updatedCart));
    updateCart();
};

// Call updateCart to initialize the cart display
updateCart();

// Function to update the cart counter
const updateCartCounter = () => {
    var cartData = JSON.parse(localStorage.getItem("productdetails"));
    var cartCounter = document.getElementById("cart-counter");

    if (cartData && cartCounter) {
        cartCounter.innerText = cartData.length;
    }
};

// Call updateCartCounter to initialize the cart counter
updateCartCounter();



// EmailJS FUNCTION '

// function sendMail (){
//     let parms ={
//         name:
//     }
// }

// script.js
// Your publishable key from the Stripe Dashboard
const stripe = Stripe('your-publishable-key');

// Create an instance of Elements
const elements = stripe.elements();

// Create an instance of the card Element
const card = elements.create('card');

// Add an instance of the card Element into the `card-element` div
card.mount('#card-element');

// Handle form submission
const form = document.getElementById('payment-form');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const { token, error } = await stripe.createToken(card);

    if (error) {
        // Inform the user if there was an error
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
    } else {
        // Send the token to your server
        console.log('Token:', token);
        // In a real-world scenario, you would send the token to your server for further processing.
    }
});









