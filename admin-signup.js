document.getElementById("admin-signup-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("admin-name").value.trim();
    let email = document.getElementById("admin-email").value.trim();
    let password = document.getElementById("admin-password").value.trim();

    if (name === "" || email === "" || password === "") {
        alert("Please fill in all fields!");
        return;
    }

    // Save admin data in Local Storage
    let adminData = { name, email, password };
    localStorage.setItem("admin", JSON.stringify(adminData));

    alert("Signup successful! Redirecting to login...");
    window.location.href = "admin-login.html"; // Redirect to login page
});

// Password Strength Checker
document.getElementById("admin-password").addEventListener("input", function () {
    let strengthText = document.getElementById("password-strength");
    let password = this.value;

    if (password.length < 6) {
        strengthText.textContent = "Weak Password (Min 6 characters)";
        strengthText.style.color = "red";
    } else if (password.match(/[A-Z]/) && password.match(/[0-9]/)) {
        strengthText.textContent = "Strong Password";
        strengthText.style.color = "green";
    } else {
        strengthText.textContent = "Medium Password (Add numbers & uppercase letters)";
        strengthText.style.color = "orange";
    }
});
