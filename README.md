# Agrisudeco Poultry

Agrisudeco Poultry is a static e-commerce website concept for browsing and ordering poultry products. It includes a customer storefront, product catalogue, shopping cart, account registration and login pages, checkout flow, and an administration interface.

## Features

### Customer storefront

- Home page with product categories, business information, and contact content.
- Product catalogue with search and category filtering.
- Product cards with descriptions, prices in South African rand (R), and poultry images.
- Shopping cart with quantity controls, subtotal, delivery fee, and total.
- Registration and login forms with browser-based account state.
- Checkout form for submitting an order.
- Responsive navigation and layouts for smaller screens.

### Administration

The `admin/` folder contains an admin login screen and pages for a dashboard, products, orders, and customers. Product management interfaces include adding and editing products.

## Project structure

```text
.
├── index.html                 # Storefront home page
├── products.html              # Product catalogue
├── product-details.html       # Product details page (currently empty)
├── register.html              # Customer registration
├── login.html                 # Customer login
├── cart.html                  # Shopping cart
├── checkout.html              # Checkout
├── css/
│   └── style.css              # Storefront styles
├── js/
│   ├── script.js              # Shared navigation and account/cart UI
│   ├── products.js            # Product catalogue and catalogue interactions
│   ├── auth.js                # Registration and login behavior
│   ├── cart.js                # Cart behavior
│   └── checkout.js            # Checkout behavior
├── images/                    # Logo and poultry product images
└── admin/
    ├── *.html                 # Admin pages
    ├── css/admin-style.css    # Admin styles
    └── js/admin.js            # Admin interface behavior and sample data
```

## Run locally

No build step or package installation is required. Clone or download the repository, then open `index.html` in a browser. For a local web server, you can use Python from the project directory:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Publish with GitHub Pages

1. Push the project files to your GitHub repository.
2. Open the repository's **Settings → Pages**.
3. Choose the branch containing the site and the repository root as the publishing source.
4. Save and open the URL GitHub Pages provides.

The home page is `index.html`, so the site can be served directly from the repository root.

## Data and implementation notes

This project uses plain HTML, CSS, and JavaScript; it has no server-side application or database. Cart, registered-user, and login state are stored in the browser's `localStorage`, so the data is specific to that browser and device. The admin login currently accepts any non-empty email and password, and the admin interface includes sample data. These client-side flows are suitable for a demonstration, but they do not provide secure authentication, persistent shared inventory, or production order processing. Do not use real passwords or sensitive customer information with this version.

The product detail page (`product-details.html`) is currently an empty placeholder.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`
- Font Awesome 4.7.0 via CDN

## License

No license is currently specified. Add a `LICENSE` file if you intend to grant reuse rights.
