import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Admin Login Function
document.getElementById("login-form").addEventListener("submit", function (e)  { 
    e.preventDefault();
    let email = document.getElementById("admin-email").value;
    let password = document.getElementById("admin-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sessionStorage.setItem("admin", userCredential.user.uid);
            window.location.href = "admin.html"; // Redirect to Admin Dashboard
        })
        .catch((error) => {
            document.getElementById("login-error").innerText = "Invalid email or password!";
        });
});


document.getElementById("admin-login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value.trim();

    let adminData = JSON.parse(localStorage.getItem("admin"));

    if (!adminData || adminData.email !== email || adminData.password !== password) {
        alert("Invalid Email or Password!");
        return;
    }

    alert("Login Successful! Redirecting to Admin Dashboard...");
    localStorage.setItem("adminLoggedIn", "true"); // Store login status
    window.location.href = "admin.html"; // Redirect to Admin Dashboard
});

