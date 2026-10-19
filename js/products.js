// AGRISUDECO PRODUCTS
const products = [
    {
        id: 1,
        name: "Fresh Whole Chicken",
        category: "Chicken",
        price: 130.00,
        icon: "🍗",
        image: "images/homepage-chicken.jpg",
        description: "Fresh whole 2kg chicken suitable for family meals."
    },

    {
        id: 2,
        name: "Chicken Mixed Portions",
        category: "Chicken",
        price: 94.99,
        icon: "🍗",
        image: "images/Mixed portion chicken.jpg",
        description: "Quality chicken portions ready for cooking."
    },

    {
        id: 3,
        name: "Chicken Wings",
        category: "Chicken",
        price: 51.99,
        icon: "🍗",
        image: "images/Chicken wings.jpg",
        description: "Fresh chicken wings for delicious meals."
    },

    {
        id: 4,
        name: "Chicken Interstines",
        category: "Chicken",
        price: 65.00,
        icon: "🍗",
        image: "images/Chicken interstines.jpg",
        description: "1kg Fresh traditional chicken interstines."
    },

    {
        id: 5,
        name: "Chicken Necks",
        category: "Chicken",
        price: 40.99,
        icon: "🍗",
        image: "images/Chicken Necks.jpg",
        description: "1kg Freshly produced chicken necks."
    },

    {
        id: 6,
        name: "Chicken Breast",
        category: "Chicken",
        price: 86.99,
        icon: "🍗",
        image: "images/Chicken Breasts.jpg",
        description: "Fresh high quality chicken breasts."
    },

    {
        id:7,
        name: "Chicken Feet",
        category: "Chicken",
        price: 40.99,
        icon: "🍗",
        image: "images/Chicken feet.jpg",
        description: "1kg Chicken feet for a warm heartfilling stew."
    },

    {
        id:8,
        name:"Chicken Gizzards",
        category: "Chicken",
        price: 40.99,
        icon:"",
        image: "images/Chicken Gizzards.jpg",
        description: "",
    },

    {
        id: 9,
        name: "Bulk",
        category: "Bulk",
        price: 600.00,
        icon: "📦",
        image:"images/homepage-chicken.jpg",
        description: "Fresh 5 whole full chickens."
    },

    {
        id: 10,
        name: "Chicken Drumstick",
        category: "Chicken",
        price: 69.99,
        icon: "",
        image: "images/Chicken drum sticks.jpg",
        description: "Fresh well sized chicken drumsticks."
    },
];

// PRODUCT CONTAINER
const productContainer = document.getElementById("product-container");

// DISPLAY PRODUCTS
function displayProducts(productList = products) {

    if (!productContainer) {
        return;
    }

    productContainer.innerHTML = "";
    if (productList.length === 0) {
        productContainer.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>
        `;
        return;
    }


    productList.forEach(function(product) {
        const productCard =
            document.createElement("div");

        productCard.className =
            "shop-product-card";


        productCard.innerHTML = `
            <div class="shop-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <div class="shop-product-info">

                <span class="category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-bottom">

                    <span class="shop-price">
                        R${product.price.toFixed(2)}
                    </span>

                    <button
                        class="shop-add-cart"
                        onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;
        productContainer.appendChild(productCard);
    });
}

// ADD TO CART
function addToCart(productId) {
    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const product =
        products.find(function(item) {
            return item.id === productId;
        });

    if (!product) {
        return;
    }

    const existingProduct =
        cart.find(function(item) {
            return item.id === productId;
        });

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({

            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            icon: product.icon,
            quantity: 1

        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
    updateCartCount();
    alert(
        product.name +
        " has been added to your cart!"
    );
}

// SEARCH PRODUCTS
const searchInput = document.getElementById("product-search");
const searchButton = document.getElementById("search-product-btn");
    
function searchProducts() {
    if (!searchInput) {
        return;
    }

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();

    const filteredProducts = products.filter(function(product) {
            return (
                product.name
                    .toLowerCase()
                    .includes(searchTerm)
                ||
                product.category
                    .toLowerCase()
                    .includes(searchTerm)

                ||
                product.description
                    .toLowerCase()
                    .includes(searchTerm)
            );
        });
    displayProducts(filteredProducts);
}

// Search when button is clicked
if (searchButton) {
    searchButton.addEventListener(
        "click",
        searchProducts
    );
}

// Search when pressing Enter
if (searchInput) {
    searchInput.addEventListener(
        "keypress",
        function(event) {
            if (event.key === "Enter") {
                searchProducts();
            }
        }
    );
}

// CATEGORY FILTER
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button) {
    button.addEventListener(
        "click",
        function() {
            // Remove active class
            filterButtons.forEach(
                function(btn) {
                    btn.classList.remove("active");
                }
            );

            // Add active class
            button.classList.add("active");
            const category = button.dataset.category;               

            // Show all products
            if (category === "All") {
                displayProducts(products);
                return;
            }

            // Show selected category
            const filteredProducts =
                products.filter(
                    function(product) {
                        return (
                            product.category === category
                        );
                    }
                );
            displayProducts(filteredProducts);
        }
    );
});

// DISPLAY PRODUCTS WHEN PAGE LOADS
displayProducts();