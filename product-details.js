// product-details.html

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log("==-===",productId);

// Find the product details based on the productId
const productDetails = data.find(item => item.id == productId);
console.log("--=-=-",productDetails);

// Check if the product details were found
if (productDetails) {
    // Use productDetails to populate the product details on your page
    const productNameElement = document.getElementById('product-name');
    const productPriceElement = document.getElementById('product-price');
    const productImageElement = document.getElementById('product-image');
    const producttop = document.getElementById('top');
    const productRating = document.getElementById('ratings');

    productNameElement.textContent = productDetails.title;
    productPriceElement.textContent = `$${productDetails.price}`;
    productImageElement.src = productDetails.image;
    producttop.textContent = productDetails.top;
    productRating.textContent = `Ratings: ${productDetails.ratings}`;

} else {
    // Handle the case where the product details are not found
    console.error('Product details not found');
}

// Function to add the product to the cart for data
const addToCart = () => {
    const productId = urlParams.get('id');
    const productDetails = data.find(item => item.id == productId);

    if (productDetails) {
        // Get the existing cart data from localStorage
        const existingCart = JSON.parse(localStorage.getItem("productdetails")) || [];

        // Check if the product is already in the cart
        const existingProduct = existingCart.find(item => item.id == productId);

        if (existingProduct) {
            alert('Product is already in the cart');
        } else {
            // Add the product to the cart
            existingCart.push(productDetails);
            localStorage.setItem("productdetails", JSON.stringify(existingCart));
            alert('Product added to the cart');
        }
    } else {
        console.error('Product details not found');
    }
};

// Function to navigate to the cart page
const goToCart = () => {
    window.location.href = '/product.html';
};


