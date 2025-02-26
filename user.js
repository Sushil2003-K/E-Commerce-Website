// ---------------- User Signup ----------------
document.getElementById("user-signup-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("user-email").value.trim();
    let password = document.getElementById("user-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    let existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert("Email already registered! Please login.");
        return;
    }

    // Add new user
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Redirecting to login...");
    window.location.href = "user-login.html";
});

// ---------------- User Login ----------------
document.getElementById("user-login-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        alert("Login successful! Welcome, " + validUser.username);
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        window.location.href = "index.html"; // Redirect to homepage or dashboard
    } else {
        alert("Invalid email or password!");
    }
});


// ---------------- Display Profile ----------------
function displayUserProfile() {
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        alert("You are not logged in!");
        window.location.href = "user-login.html";
        return;
    }

    document.getElementById("profile-username").innerText = loggedInUser.username;
    document.getElementById("profile-email").innerText = loggedInUser.email;
}

// ---------------- Edit Profile ----------------
document.getElementById("edit-profile-form")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let newUsername = document.getElementById("edit-username").value.trim();
    let newPassword = document.getElementById("edit-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    let currentUserIndex = users.findIndex(user => user.email === loggedInUser.email);

    if (newUsername) {
        users[currentUserIndex].username = newUsername;
        loggedInUser.username = newUsername;
    }
    if (newPassword) {
        users[currentUserIndex].password = newPassword;
    }

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    alert("Profile updated successfully!");
    displayUserProfile();
});

// ---------------- Logout Function ----------------
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    window.location.href = "user-login.html";
}

// Display user profile automatically on page load
displayUserProfile();



