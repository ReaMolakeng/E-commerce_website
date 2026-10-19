//Shopping Cart JavaScript

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// CART ELEMENTS
const cartItemsContainer =
    document.getElementById("cart-items");

const emptyCart =
    document.getElementById("empty-cart");

const cartSubtotal =
    document.getElementById("cart-subtotal");

const cartDelivery =
    document.getElementById("cart-delivery");

const cartTotal =
    document.getElementById("cart-total");

const cartCount =
    document.getElementById("cart-count");

const checkoutButton =
    document.getElementById("checkout-btn");



// DISPLAY CART
function displayCart() {
    if (!cartItemsContainer) {
        return;
    }
    cartItemsContainer.innerHTML = "";

    // Check if cart is empty
    if (cart.length === 0) {
        emptyCart.style.display = "block";
        cartSubtotal.textContent = "R0.00";
        cartDelivery.textContent = "R0.00";
        cartTotal.textContent = "R0.00";
        updateCartCount();
        return;
    }


    emptyCart.style.display = "none";
    let subtotal = 0;

    // Display each cart item
    cart.forEach(function(item) {
        const itemTotal =
            item.price * item.quantity;
        subtotal += itemTotal;

        const cartItem =
            document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div class="cart-item-image">
                ${item.icon}
            </div>

            <div class="cart-item-info">
                <h3>
                    ${item.name}
                </h3>
                <p>
                    ${item.category}
                </p>
                <span>
                    R${item.price.toFixed(2)}
                </span>
            </div>

            <div class="cart-item-quantity">
                <button
                    onclick="changeQuantity(${item.id}, -1)">
                    −
                </button>
                <span>
                    ${item.quantity}
                </span>
                <button
                    onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>
            </div>

            <div class="cart-item-total">
                <strong>
                    R${itemTotal.toFixed(2)}
                </strong>
                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})">
                    Remove
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Delivery
    let delivery = 0;
    if (subtotal > 0) {
        delivery = 50;
    }

    const total = subtotal + delivery;

    // Update summary
    cartSubtotal.textContent =
        `R${subtotal.toFixed(2)}`;

    cartDelivery.textContent =
        `R${delivery.toFixed(2)}`;

    cartTotal.textContent =
        `R${total.toFixed(2)}`;

    updateCartCount();

}


// CHANGE QUANTITY
function changeQuantity(productId, change) {
    const item =
        cart.find(function(product) {
            return product.id === productId;
        });
    if (!item) {
        return;
    }
    item.quantity += change;

    // Remove item if quantity becomes 0
    if (item.quantity <= 0) {
        cart =
            cart.filter(function(product) {
                return product.id !== productId;
            });
    }
    saveCart();
    displayCart();
}


// REMOVE ITEM
function removeFromCart(productId) {
    cart =
        cart.filter(function(item) {
            return item.id !== productId;
        });

    saveCart();
    displayCart();
}

// SAVE CART
function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

// CHECKOUT
if (checkoutButton) {
    checkoutButton.addEventListener(
        "click",
        function() {
            //Check if the cart is empty
            if (cart.length === 0) {
                alert(
                    "Your cart is empty. Please add a product first."
                );
                return;
            }
            //Check if customer is logged in
            const loggedInUser = localStorage.getItem("loggedInUser");
            if(!loggedInUser){

                //Customer is not logged in
                alert(
                    "Please login before proceeding to checkout."
                );

                //Send customer to login
                window.location.href = "login.html?redirect=checkout";
                return;
            }

            //Customer is logged in
            window.location.href =
                "checkout.html";
        }
    );

}
// START
displayCart();