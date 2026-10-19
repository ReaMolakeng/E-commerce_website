// AGRISUDECO MAIN SCRIPT

// HAMBURGER MENU
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
if (menuToggle && mainNav) {
    menuToggle.addEventListener(
        "click",
        function() {
            mainNav.classList.toggle("show");
        }
    );

    const navLinks = mainNav.querySelectorAll("a");
    navLinks.forEach(function(link) {
        link.addEventListener(
            "click",
            function() {
                mainNav.classList.remove("show");
            }
        );
    });
}

// UPDATE CART COUNT
function updateCartCount() {
    const cartCount =
        document.getElementById("cart-count");
    if (!cartCount) {
        return;
    }

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    let totalItems = 0;

    cart.forEach(function(item) {
        totalItems += item.quantity;
    });
    cartCount.textContent = totalItems;
}

// UPDATE ACCOUNT AREA
function updateAccountArea() {

    const accountArea =
        document.getElementById("account-area");

    if (!accountArea) {
        return;
    }

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );


    if (loggedInUser) {

        const name =
            loggedInUser.name.trim();

        const nameParts =
            name.split(/\s+/);

        let initials = "";

        if (nameParts.length >= 2) {

            initials =
                nameParts[0].charAt(0) +
                nameParts[nameParts.length - 1].charAt(0);

        } else {

            initials =
                nameParts[0].substring(0, 2);

        }

        initials =
            initials.toUpperCase();


        accountArea.innerHTML = `

            <div class="account-area">

                <button
                    class="account-btn"
                    title="${loggedInUser.name}">

                    👤
                    <span>${initials}</span>

                </button>

                <button
                    class="logout-btn"
                    onclick="logoutUser()">

                    Logout

                </button>

            </div>

        `;

    } else {

        accountArea.innerHTML = `

            <a
                href="login.html"
                class="login-btn">

                Login

            </a>

        `;

    }
}

// LOGOUT
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    updateAccountArea();
    window.location.href = "index.html";
}

// PAGE LOAD
document.addEventListener(
    "DOMContentLoaded",
    function() {
        updateCartCount();
        updateAccountArea();
    }
);

// ============================================
// NAVBAR SEARCH
// ============================================

const navSearchButton =
    document.getElementById("nav-search-btn");

const navSearchPanel =
    document.getElementById("nav-search-panel");

const navSearchInput =
    document.getElementById("nav-product-search");

const navSearchSubmit =
    document.getElementById("nav-search-submit");

if (navSearchButton && navSearchPanel) {

    navSearchButton.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            navSearchPanel.classList.toggle("show");

            if (navSearchPanel.classList.contains("show")) {

                setTimeout(function() {

                    if (navSearchInput) {
                        navSearchInput.focus();
                    }

                }, 100);

            }

        }
    );
}

// SEARCH BUTTON
if (navSearchSubmit) {

    navSearchSubmit.addEventListener(
        "click",
        function() {

            if (
                navSearchInput &&
                typeof searchProducts === "function"
            ) {

                searchProductsFromNavbar();

            }

        }
    );

}

// ENTER KEY
if (navSearchInput) {

    navSearchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchProductsFromNavbar();

            }

        }
    );

}

// NAVBAR SEARCH FUNCTION
function searchProductsFromNavbar() {

    const searchTerm =
        navSearchInput.value.trim();


    if (!searchTerm) {
        return;
    }


    // Put the search term into
    // the existing Shop search system

    const existingSearch =
        document.getElementById("product-search");

    if (existingSearch) {

        existingSearch.value =
            searchTerm;

    }


    // Use existing product search

    if (
        typeof searchProducts === "function"
    ) {

        searchProducts();

    }


    navSearchPanel.classList.remove("show");

}

// CLOSE SEARCH WHEN CLICKING OUTSIDE
document.addEventListener(
    "click",
    function(event) {

        if (
            navSearchPanel &&
            navSearchButton &&
            !navSearchPanel.contains(event.target) &&
            !navSearchButton.contains(event.target)
        ) {

            navSearchPanel.classList.remove("show");

        }

    }
);