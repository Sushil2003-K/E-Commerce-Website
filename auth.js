let isSignup = false; // Default: Login Mode

// Switch Between Login & Signup
function toggleAuth() {
    isSignup = !isSignup;
    document.getElementById("form-title").textContent = isSignup ? "User Signup" : "User Login";
    document.getElementById("auth-button").textContent = isSignup ? "Sign Up" : "Login";
    document.getElementById("switch-auth").innerHTML = isSignup 
        ? `Already have an account? <a href="#" onclick="toggleAuth()">Login</a>` 
        : `Don't have an account? <a href="#" onclick="toggleAuth()">Sign Up</a>`;
}

// Handle Login/Signup Form
document.getElementById("auth-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (isSignup) {
        // Signup Logic
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let userExists = users.some(user => user.email === email);

        if (userExists) {
            alert("Email already registered. Try logging in.");
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signup successful! You can now log in.");
        toggleAuth(); // Switch to Login Mode
    } else {
        // Login Logic
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let validUser = users.find(user => user.email === email && user.password === password);

        if (validUser) {
            alert(`Welcome ${validUser.username}! Redirecting to homepage...`);
            localStorage.setItem("currentUser", JSON.stringify(validUser));
            window.location.href = "index.html"; // Redirect to homepage
        } else {
            alert("Invalid email or password.");
        }
    }
});


