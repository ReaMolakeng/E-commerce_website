// AGRISUDECO CHECKOUT

const loggedInUser =
    localStorage.getItem("loggedInUser");

//Check Login || First check if user is logged in
if (!loggedInUser) {
    alert(
        "Please login before accessing checkout."
    );

    window.location.href =
        "login.html?redirect=checkout";
}
// Get cart
let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

// Get elements
const checkoutItems =
    document.getElementById("checkout-items");

const checkoutSubtotal =
    document.getElementById("checkout-subtotal");

const checkoutDelivery =
    document.getElementById("checkout-delivery");

const checkoutTotal =
    document.getElementById("checkout-total");

const checkoutForm =
    document.getElementById("checkout-form");

// DISPLAY ORDER
function displayCheckout() {

    if (!checkoutItems) {
        return;
    }

    checkoutItems.innerHTML = "";

    // Empty cart
    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p class="checkout-empty">
                Your cart is empty.
            </p>
        `;

        checkoutSubtotal.textContent = "R0.00";
        checkoutDelivery.textContent = "R0.00";
        checkoutTotal.textContent = "R0.00";

        if (checkoutForm) {
            checkoutForm.style.display = "none";
        }

        return;
    }
    let subtotal = 0;

    // Display products
    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;

        subtotal += itemTotal;

        const itemElement =
            document.createElement("div");

        itemElement.className =
            "checkout-item";

        itemElement.innerHTML = `
            <div class="checkout-item-icon">
                ${item.icon}
            </div>

            <div class="checkout-item-info">

                <strong>
                    ${item.name}
                </strong>

                <span>
                    Quantity: ${item.quantity}
                </span>

            </div>

            <strong>
                R${itemTotal.toFixed(2)}
            </strong>

        `;
        checkoutItems.appendChild(itemElement);

    });

    // Delivery
    let delivery = 50;

    // Calculate total
    const total =
        subtotal + delivery;

    // Display totals
    checkoutSubtotal.textContent =
        `R${subtotal.toFixed(2)}`;

    checkoutDelivery.textContent =
        `R${delivery.toFixed(2)}`;

    checkoutTotal.textContent =
        `R${total.toFixed(2)}`;

}

// PLACE ORDER
if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();
            if (cart.length === 0) {
                alert(
                    "Your cart is empty."
                );
                return;
            }


            // Get customer details
            const firstName =
                document.getElementById(
                    "first-name"
                ).value;

            const lastName =
                document.getElementById(
                    "last-name"
                ).value;

            // Temporary order confirmation
            alert(
                "Thank you " +
                firstName +
                " " +
                lastName +
                "! Your order has been received."
            );

            // Clear cart
            localStorage.removeItem("cart");

            // Return to home page
            window.location.href =
                "index.html";

        }
    );

}

// START
displayCheckout();