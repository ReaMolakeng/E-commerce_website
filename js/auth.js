// AGRISUDECO AUTHENTICATION

// REGISTER
const registerForm =
    document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const name =
                document.getElementById(
                    "register-name"
                ).value.trim();

            const email =
                document.getElementById(
                    "register-email"
                ).value.trim().toLowerCase();

            const phone =
                document.getElementById(
                    "register-phone"
                ).value.trim();

            const password =
                document.getElementById(
                    "register-password"
                ).value;

            const confirmPassword =
                document.getElementById(
                    "confirm-password"
                ).value;

            const message =
                document.getElementById(
                    "register-message"
                );

            // Check passwords
            if (password !== confirmPassword) {
                message.textContent =
                    "Passwords do not match.";
                message.className =
                    "auth-message error";
                return;
            }

            // Get existing users
            let users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];

            // Check if email already exists
            const existingUser =
                users.find(function(user) {
                    return user.email === email;
                });

            if (existingUser) {
                message.textContent =
                    "An account with this email already exists.";
                message.className =
                    "auth-message error";
                return;
            }

            // Create user
            const newUser = {
                id: Date.now(),
                name: name,
                email: email,
                phone: phone,
                password: password
            };

            // Save user
            users.push(newUser);
            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );

            // Message
            message.textContent =
                "Account created successfully! Redirecting to login...";
            message.className =
                "auth-message success";

            // Go to login
            setTimeout(function() {
                window.location.href =
                    "login.html";
            }, 1500);

        }
    );

}

// LOGIN
const loginForm =
    document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener(
        "submit",
        function(event) {
            event.preventDefault();

            const email =
                document.getElementById(
                    "login-email"
                ).value.trim().toLowerCase();

            const password =
                document.getElementById(
                    "login-password"
                ).value;

            const message =
                document.getElementById(
                    "login-message"
                );

            // Get users
            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];

            // Find matching user
            const user =
                users.find(function(account) {

                    return (
                        account.email === email &&
                        account.password === password
                    );
                });

            // Login failed
            if (!user) {
                message.textContent =
                    "Incorrect email or password.";
                message.className =
                    "auth-message error";
                return;

            }

            // Save logged-in user
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(user)
            );

            // Success
            message.textContent =
                "Login successful!";
            message.className =
                "auth-message success";

            // Redirect
            // Redirect after login

setTimeout(function() {
    // Check if the customer was trying to access checkout
    const urlParams =
        new URLSearchParams(
            window.location.search
        );

    const redirect =
        urlParams.get("redirect");

    if (redirect === "checkout") {
        window.location.href =
            "checkout.html";
    } else {
        window.location.href =
            "index.html";
    }
            }, 1000);
        }
    );
}