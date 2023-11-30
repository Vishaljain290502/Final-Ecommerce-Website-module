// Selecting the hamburger menu and navigation menu elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("#nav-menu");

// Adding event listener to toggle the "active" class on hamburger and navigation menu when clicked
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Closing the navigation menu when a navigation link is clicked
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Function to remove an item from the cart
const removeItem = (id) => {
    var cartData = JSON.parse(localStorage.getItem("productdetails"));
    var updatedCart = cartData.filter(item => item.id !== id);
    localStorage.setItem("productdetails", JSON.stringify(updatedCart));

    // Update the cart display after removing an item
    updateCart();
};

// Function to update the cart and display the items in the cart
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

            // Display each item in the cart with details
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

        // Calculate and display the total price and cart total
        let total = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
        let price = cartData.reduce((acc, item) => acc + item.price, 0);
        console.log("=====", total);
        tableData += `<div class="price-total">Price: $${price}</div>`;
        tableData += `<div class="cart-total">Total: $ ${total}</div>`;
    }

    // Display the cart items and totals in the HTML
    cartBoxTable.innerHTML = tableData;
};

// Function to update quantity in local storage and update the cart display
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

    // Update the cart display after changing the quantity
    updateCart();
};

// Call updateCart to initialize the cart display
updateCart();

// Function to handle the "Buy Now" button click
const buyNow = () => {
    // You can add additional logic here, such as redirecting to a checkout page
    // or displaying a confirmation message. For now, let's just alert a message.
    alert("Thank you for your purchase!");

    // Optional: Clear the cart after the purchase
    localStorage.removeItem("productdetails");

    // Update the cart display after the purchase
    updateCart();
};