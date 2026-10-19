/* ============================= */
/* ADMIN LOGIN */
/* ============================= */

const adminLoginForm =
    document.getElementById("admin-login-form");

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("admin-email").value;

        const password =
            document.getElementById("admin-password").value;

        if (email === "" || password === "") {

            alert("Please enter your email and password.");

            return;
        }

        alert("Admin login successful!");

        window.location.href = "dashboard.html";

    });

}


/* ============================= */
/* ADMIN SIDEBAR MOBILE MENU */
/* ============================= */

const adminMenuToggle =
    document.getElementById("admin-menu-toggle");

const adminSidebar =
    document.getElementById("admin-sidebar");

if (adminMenuToggle && adminSidebar) {

    adminMenuToggle.addEventListener("click", function() {

        adminSidebar.classList.toggle("show");

    });

}


/* ============================= */
/* ADMIN LOGOUT */
/* ============================= */
const adminLogout =
    document.getElementById("admin-logout");
if (adminLogout) {
    adminLogout.addEventListener("click", function() {
        const confirmLogout =
            confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            window.location.href = "login.html";
        }

    });

}

/* ============================= */
/* CLOSE SIDEBAR AFTER NAV CLICK */
/* ============================= */
const adminNavLinks = document.querySelectorAll(".admin-nav-link");

adminNavLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        if (adminSidebar) {
            adminSidebar.classList.remove("show");
        }

    });

});

/* ============================= */
/* ADMIN PRODUCTS */
/* ============================= */

const adminProductsList =
    document.getElementById("admin-products-list");

const adminProducts = [

    {
        id: 1,
        name: "Fresh Whole Chicken",
        category: "Chicken",
        price: 130.00,
        icon: "🍗",
        image: "../images/homepage-chicken.jpg",
        description: "Fresh whole 2kg chicken suitable for family meals."
    },

    {
        id: 2,
        name: "Chicken Mixed Portions",
        category: "Chicken",
        price: 94.99,
        icon: "🍗",
        image: "../images/Mixed portion chicken.jpg",
        description: "Quality chicken portions ready for cooking."
    },

    {
        id: 3,
        name: "Chicken Wings",
        category: "Chicken",
        price: 51.99,
        icon: "🍗",
        image: "../images/Chicken wings.jpg",
        description: "Fresh chicken wings for delicious meals."
    },

    {
        id: 4,
        name: "Chicken Interstines",
        category: "Chicken",
        price: 65.00,
        icon: "🍗",
        image: "../images/Chicken interstines.jpg",
        description: "1kg Fresh traditional chicken interstines."
    },

    {
        id: 5,
        name: "Chicken Necks",
        category: "Chicken",
        price: 40.99,
        icon: "🍗",
        image: "../images/Chicken Necks.jpg",
        description: "1kg Freshly produced chicken necks."
    },

    {
        id: 6,
        name: "Chicken Breast",
        category: "Chicken",
        price: 86.99,
        icon: "🍗",
        image: "../images/Chicken Breasts.jpg",
        description: "Fresh high quality chicken breasts."
    },

    {
        id:7,
        name: "Chicken Feet",
        category: "Chicken",
        price: 40.99,
        icon: "🍗",
        image: "../images/Chicken feet.jpg",
        description: "1kg Chicken feet for a warm heartfilling stew."
    },

    {
        id:8,
        name:"Chicken Gizzards",
        category: "Chicken",
        price: 40.99,
        icon:"",
        image: "../images/Chicken Gizzards.jpg",
        description: "",
    },

    {
        id: 9,
        name: "Bulk",
        category: "Bulk",
        price: 600.00,
        icon: "📦",
        image:"../images/homepage-chicken.jpg",
        description: "Fresh 5 whole full chickens."
    },

    {
        id: 10,
        name: "Chicken Drumstick",
        category: "Chicken",
        price: 69.99,
        icon: "",
        image: "../images/Chicken drum sticks.jpg",
        description: "Fresh well sized chicken drumsticks."
    },

];


function displayAdminProducts(productList) {

    if (!adminProductsList) {
        return;
    }

    adminProductsList.innerHTML = "";


    if (productList.length === 0) {

        adminProductsList.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center; padding:30px;">
                    No products found.
                </td>
            </tr>
        `;

        return;
    }


    productList.forEach(function(product) {

        let stockClass = "stock-good";

        if (product.stock === 0) {

            stockClass = "stock-out";

        } else if (product.stock <= 5) {

            stockClass = "stock-low";

        }


        let productStatus = "";

        if (product.stock > 0) {

            productStatus = `
                <span class="product-status available">
                    Available
                </span>
            `;

        } else {

            productStatus = `
                <span class="product-status unavailable">
                    Out of Stock
                </span>
            `;

        }


        const row = document.createElement("tr");

        row.innerHTML = `

            <td>
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-admin-image"
                >
            </td>


            <td class="product-name-cell">
                ${product.name}
            </td>


            <td class="product-category-cell">
                ${product.category}
            </td>


            <td class="product-price-cell">
                R${product.price.toFixed(2)}
            </td>


            <td class="${stockClass}">
                ${product.stock}
            </td>


            <td>
                ${productStatus}
            </td>


            <td>

                <div class="product-actions">

                    <button
                        class="product-action-btn edit-product-btn"
                        onclick="editProduct(${product.id})">

                        Edit

                    </button>


                    <button
                        class="product-action-btn delete-product-btn"
                        onclick="deleteProduct(${product.id})">

                        Delete

                    </button>

                </div>

            </td>

        `;


        adminProductsList.appendChild(row);

    });

}


/* ============================= */
/* SEARCH PRODUCTS */
/* ============================= */
const productSearch =
    document.getElementById("product-search");

if (productSearch) {

    productSearch.addEventListener("input", function() {

        const searchValue =
            productSearch.value.toLowerCase();


        const filteredProducts =
            adminProducts.filter(function(product) {

                return product.name
                    .toLowerCase()
                    .includes(searchValue);

            });


        displayAdminProducts(filteredProducts);

    });

}


/* ============================= */
/* FILTER PRODUCTS */
/* ============================= */
const categoryFilter =
    document.getElementById("category-filter");

if (categoryFilter) {

    categoryFilter.addEventListener("change", function() {

        const selectedCategory =
            categoryFilter.value;


        if (selectedCategory === "all") {

            displayAdminProducts(adminProducts);

            return;

        }


        const filteredProducts =
            adminProducts.filter(function(product) {

                return product.category === selectedCategory;

            });


        displayAdminProducts(filteredProducts);

    });

}


/* ============================= */
/* ADD PRODUCT */
/* ============================= */
const addProductButton =
    document.getElementById("add-product-btn");

if (addProductButton) {

    addProductButton.addEventListener("click", function() {
        window.location.href = "add-product.html";
    });

}


/* ============================= */
/* EDIT PRODUCT */
/* ============================= */
function editProduct(productId) {

    window.location.href = "edit-product.html?id=" + productId;

}

/* ============================= */
/* EDIT PRODUCT FORM */
/* ============================= */
const editProductForm = document.getElementById("edit-product-form");
if (editProductForm) {

    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));

    // Find the selected product
    const product = adminProducts.find(function(item) {
        return item.id === productId;
    });

    // If the product exists, fill the form
    if (product) {

        document.getElementById("edit-product-name").value =
            product.name;

        document.getElementById("edit-product-category").value =
            product.category;

        document.getElementById("edit-product-price").value =
            product.price;

        document.getElementById("edit-product-stock").value =
            product.stock;

        document.getElementById("edit-product-description").value =
            product.description || "";

        // Display current product image
        const imagePreview =
            document.getElementById("edit-product-image-preview");

        imagePreview.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
            >
        `;
    }


    // Update product
    editProductForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const updatedName =
        document.getElementById("edit-product-name").value.trim();

    const updatedCategory =
        document.getElementById("edit-product-category").value;

    const updatedPrice =
        document.getElementById("edit-product-price").value;

    const updatedStock =
        document.getElementById("edit-product-stock").value;

    const updatedDescription =
        document.getElementById("edit-product-description").value.trim();

    const updatedImage =
        document.getElementById("edit-product-image");


    // Validate the form
    if (
        updatedName === "" ||
        updatedCategory === "" ||
        updatedPrice === "" ||
        updatedStock === "" ||
        updatedDescription === ""
    ) {

        alert("Please complete all required fields.");

        return;
    }


    // Make sure the product exists
    if (!product) {

        alert("Product could not be found.");

        return;
    }


    // Update product information
    product.name = updatedName;
    product.category = updatedCategory;
    product.price = parseFloat(updatedPrice);
    product.stock = parseInt(updatedStock);
    product.description = updatedDescription;


    // Check whether a new image was selected
    if (updatedImage.files.length > 0) {

        const file = updatedImage.files[0];

        const reader = new FileReader();

        reader.addEventListener("load", function() {

            product.image = reader.result;

            alert("Product updated successfully!");

            window.location.href = "products.html";

        });

        reader.readAsDataURL(file);

    } else {

        alert("Product updated successfully!");

        window.location.href = "products.html";

    }

});


}

/* ============================= */
/* DELETE PRODUCT */
/* ============================= */
function deleteProduct(productId) {

    const product = adminProducts.find(function(item) {
        return item.id === productId;
    });

    if (!product) {
        alert("Product could not be found.");
        return;
    }

    const confirmDelete = confirm(
        "Are you sure you want to delete \"" +
        product.name +
        "\"?"
    );

    if (!confirmDelete) {
        return;
    }

    // Remove the product from the array
    const productIndex = adminProducts.findIndex(function(item) {
        return item.id === productId;
    });

    if (productIndex !== -1) {
        adminProducts.splice(productIndex, 1);
    }

    // Refresh the product table
    displayAdminProducts(adminProducts);

    alert("Product deleted successfully!");
}


/* ============================= */
/* DISPLAY PRODUCTS */
/* ============================= */
displayAdminProducts(adminProducts);


/* ============================= */
/* ADD PRODUCT FORM */
/* ============================= */
const addProductForm =
    document.getElementById("add-product-form");

if (addProductForm) {

    addProductForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const productName =
            document.getElementById("product-name").value.trim();

        const productCategory =
            document.getElementById("product-category").value;

        const productPrice =
            document.getElementById("product-price").value;

        const productStock =
            document.getElementById("product-stock").value;

        const productDescription =
            document.getElementById("product-description").value.trim();


        if (
            productName === "" ||
            productCategory === "" ||
            productPrice === "" ||
            productStock === "" ||
            productDescription === ""
        ) {

            alert("Please complete all required fields.");
            return;
        }

        alert(
            "Product added successfully!\n\n" +
            "Product: " + productName + "\n" +
            "Category: " + productCategory + "\n" +
            "Price: R" + productPrice + "\n" +
            "Stock: " + productStock
        );

        window.location.href = "products.html";

    });

}

/* ============================= */
/* PRODUCT IMAGE PREVIEW */
/* ============================= */
const productImage =
    document.getElementById("product-image");

const productImagePreview =
    document.getElementById("product-image-preview");

if (productImage && productImagePreview) {

    productImage.addEventListener("change", function() {

        const file = productImage.files[0];

        if (!file) {
            productImagePreview.innerHTML = `
                <span>
                    Image Preview
                </span>
            `;
            return;
        }

        const reader = new FileReader();

        reader.addEventListener("load", function() {
            productImagePreview.innerHTML = `
                <img
                    src="${reader.result}"
                    alt="Product Preview"
                >
            `;
        });
        reader.readAsDataURL(file);
    });

}

/* =========================
   ADMIN ORDERS
========================= */
const adminOrders = [
    {
        id: 1001,
        customer: "Thabo Mokoena",
        date: "2026-09-25",
        items: 3,
        total: 235.00,
        status: "Pending"
    },

    {
        id: 1002,
        customer: "Lerato Molefe",
        date: "2026-09-25",
        items: 2,
        total: 140.00,
        status: "Processing"
    },

    {
        id: 1003,
        customer: "Kagiso Dlamini",
        date: "2026-09-24",
        items: 5,
        total: 500.00,
        status: "Completed"
    },

    {
        id: 1004,
        customer: "Naledi Mokoena",
        date: "2026-09-23",
        items: 1,
        total: 65.00,
        status: "Cancelled"
    },

    {
        id: 1005,
        customer: "Neo Molapo",
        date: "2026-09-22",
        items: 4,
        total: 310.00,
        status: "Completed"
    }
];


/* DISPLAY ORDERS */
function displayAdminOrders(orderList) {

    const ordersTableBody =
        document.getElementById("orders-table-body");

    if (!ordersTableBody) {
        return;
    }

    ordersTableBody.innerHTML = "";


    if (orderList.length === 0) {

        ordersTableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    No orders found.
                </td>
            </tr>
        `;

        return;
    }


    orderList.forEach(function(order) {

        let statusClass = "";

        if (order.status === "Pending") {
            statusClass = "status-pending";
        }

        else if (order.status === "Processing") {
            statusClass = "status-processing";
        }

        else if (order.status === "Completed") {
            statusClass = "status-completed";
        }

        else if (order.status === "Cancelled") {
            statusClass = "status-cancelled";
        }


        ordersTableBody.innerHTML += `

            <tr>

                <td>
                    #${order.id}
                </td>

                <td>
                    ${order.customer}
                </td>

                <td>
                    ${order.date}
                </td>

                <td>
                    ${order.items}
                </td>

                <td>
                    R${order.total.toFixed(2)}
                </td>

                <td>

                    <span class="product-status ${statusClass}">
                        ${order.status}
                    </span>

                </td>

                <td>

                    <button
                        class="edit-product-btn"
                        onclick="viewOrder(${order.id})"
                    >
                        View
                    </button>

                </td>

            </tr>

        `;

    });

}


/* SEARCH ORDERS */
const orderSearch =
    document.getElementById("order-search");

if (orderSearch) {

    orderSearch.addEventListener("input", function() {

        const searchValue =
            orderSearch.value.toLowerCase();

        const filteredOrders =
            adminOrders.filter(function(order) {

                return (
                    order.customer
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    order.id
                        .toString()
                        .includes(searchValue)
                );

            });

        displayAdminOrders(filteredOrders);

    });

}


/* FILTER ORDERS BY STATUS */
const orderStatusFilter =
    document.getElementById("order-status-filter");

if (orderStatusFilter) {

    orderStatusFilter.addEventListener("change", function() {

        const selectedStatus =
            orderStatusFilter.value;

        if (selectedStatus === "all") {
            displayAdminOrders(adminOrders);
            return;
        }

        const filteredOrders =
            adminOrders.filter(function(order) {
                return order.status === selectedStatus;
            });
        displayAdminOrders(filteredOrders);
    });
}


/* VIEW AND UPDATE ORDER */
/* OPEN ORDER STATUS MODAL */

let selectedOrderId = null;

function viewOrder(orderId) {

    const order = adminOrders.find(function(item) {
        return item.id === orderId;
    });

    if (!order) {
        alert("Order could not be found.");
        return;
    }

    selectedOrderId = orderId;

    document.getElementById("modal-order-id").textContent =
        "Order #" + order.id;

    document.getElementById("modal-customer").textContent =
        order.customer;

    document.getElementById("modal-date").textContent =
        order.date;

    document.getElementById("modal-items").textContent =
        order.items;

    document.getElementById("modal-total").textContent =
        "R" + order.total.toFixed(2);

    document.getElementById("modal-status").value =
        order.status;

    document.getElementById("order-modal").classList.add("show");
}

/* CLOSE ORDER MODAL */
const orderModal =
    document.getElementById("order-modal");

const orderModalClose =
    document.getElementById("order-modal-close");

const cancelOrderUpdate =
    document.getElementById("cancel-order-update");

function closeOrderModal() {

    if (orderModal) {
        orderModal.classList.remove("show");
    }

    selectedOrderId = null;
}

if (orderModalClose) {

    orderModalClose.addEventListener(
        "click",
        closeOrderModal
    );

}

if (cancelOrderUpdate) {

    cancelOrderUpdate.addEventListener(
        "click",
        closeOrderModal
    );

}


/* UPDATE ORDER STATUS */

const saveOrderStatus =
    document.getElementById("save-order-status");


if (saveOrderStatus) {

    saveOrderStatus.addEventListener(
        "click",
        function() {

            if (selectedOrderId === null) {
                return;
            }

            const order = adminOrders.find(
                function(item) {
                    return item.id === selectedOrderId;
                }
            );


            if (!order) {

                alert("Order could not be found.");

                return;
            }


            const newStatus =
                document.getElementById(
                    "modal-status"
                ).value;


            order.status = newStatus;


            displayAdminOrders(adminOrders);


            alert(
                "Order #" +
                order.id +
                " status updated successfully!"
            );


            closeOrderModal();

        }
    );

}

/* DISPLAY ORDERS */
displayAdminOrders(adminOrders);

/* =========================
   ADMIN CUSTOMERS
========================= */
const adminCustomers = [

    {
        id: "C001",
        name: "Thabo Mokoena",
        email: "thabo@example.com",
        phone: "071 234 5678",
        orders: 5,
        status: "Active"
    },

    {
        id: "C002",
        name: "Lerato Molefe",
        email: "lerato@example.com",
        phone: "072 345 6789",
        orders: 3,
        status: "Active"
    },

    {
        id: "C003",
        name: "Kagiso Dlamini",
        email: "kagiso@example.com",
        phone: "073 456 7890",
        orders: 1,
        status: "Inactive"
    },

    {
        id: "C004",
        name: "Naledi Mokoena",
        email: "naledi@example.com",
        phone: "074 567 8901",
        orders: 4,
        status: "Active"
    },

    {
        id: "C005",
        name: "Neo Molapo",
        email: "neo@example.com",
        phone: "075 678 9012",
        orders: 2,
        status: "Active"
    },

    {
        id: "C006",
        name: "Palesa Khumalo",
        email: "palesa@example.com",
        phone: "076 789 0123",
        orders: 0,
        status: "Inactive"
    }

];

/* DISPLAY CUSTOMERS */
function displayAdminCustomers(customerList) {

    const customersTableBody =
        document.getElementById("customers-table-body");

    if (!customersTableBody) {
        return;
    }

    customersTableBody.innerHTML = "";


    if (customerList.length === 0) {

        customersTableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    No customers found.
                </td>
            </tr>
        `;

        return;
    }


    customerList.forEach(function(customer) {

        let statusClass = "";

        if (customer.status === "Active") {
            statusClass = "status-completed";
        }
        else if (customer.status === "Inactive") {
            statusClass = "status-cancelled";
        }


        customersTableBody.innerHTML += `

            <tr>

                <td>
                    #${customer.id}
                </td>

                <td>
                    ${customer.name}
                </td>

                <td>
                    ${customer.email}
                </td>

                <td>
                    ${customer.phone}
                </td>

                <td>
                    ${customer.orders}
                </td>

                <td>

                    <span class="product-status ${statusClass}">
                        ${customer.status}
                    </span>

                </td>

                <td>

                    <button
                        class="edit-product-btn"
                        onclick="viewCustomer('${customer.id}')"
                    >
                        View
                    </button>

                </td>

            </tr>

        `;

    });

}

/* SEARCH CUSTOMERS */
const customerSearch =
    document.getElementById("customer-search");

if (customerSearch) {

    customerSearch.addEventListener("input", function() {

        const searchValue =
            customerSearch.value.toLowerCase();


        const filteredCustomers =
            adminCustomers.filter(function(customer) {

                return (

                    customer.name
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    customer.email
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    customer.id
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    customer.phone
                        .toLowerCase()
                        .includes(searchValue)

                );

            });

        displayAdminCustomers(filteredCustomers);
    });

}

/* FILTER CUSTOMERS BY STATUS */
const customerStatusFilter =
    document.getElementById("customer-status-filter");

if (customerStatusFilter) {

    customerStatusFilter.addEventListener(
        "change",
        function() {

            const selectedStatus =
                customerStatusFilter.value;


            if (selectedStatus === "all") {

                displayAdminCustomers(adminCustomers);

                return;

            }


            const filteredCustomers =
                adminCustomers.filter(
                    function(customer) {

                        return customer.status === selectedStatus;

                    }
                );

            displayAdminCustomers(filteredCustomers);

        }
    );

}


/* =========================
   CUSTOMER DETAILS MODAL
========================= */
let selectedCustomerId = null;
function viewCustomer(customerId) {

    const customer = adminCustomers.find(function(item) {

        return item.id === customerId;

    });


    if (!customer) {

        alert("Customer could not be found.");

        return;

    }


    selectedCustomerId = customerId;


    // Fill customer information

    document.getElementById("modal-customer-id").textContent =
        "Customer #" + customer.id;


    document.getElementById("modal-customer-name").textContent =
        customer.name;


    document.getElementById("modal-customer-email").textContent =
        customer.email;


    document.getElementById("modal-customer-phone").textContent =
        customer.phone;


    document.getElementById("modal-customer-orders").textContent =
        customer.orders;


    document.getElementById("modal-customer-status").textContent =
        customer.status;


    // Open modal
    document
        .getElementById("customer-modal")
        .classList.add("show");

}

/* CLOSE CUSTOMER MODAL */
const customerModal =
    document.getElementById("customer-modal");

const customerModalClose =
    document.getElementById("customer-modal-close");

const closeCustomerModal =
    document.getElementById("close-customer-modal");

function hideCustomerModal() {

    if (customerModal) {

        customerModal.classList.remove("show");

    }

    selectedCustomerId = null;

}

if (customerModalClose) {

    customerModalClose.addEventListener(
        "click",
        hideCustomerModal
    );

}

if (closeCustomerModal) {

    closeCustomerModal.addEventListener(
        "click",
        hideCustomerModal
    );

}

/* DISPLAY CUSTOMERS */
displayAdminCustomers(adminCustomers);