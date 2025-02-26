document.addEventListener("DOMContentLoaded", function () {
    loadBookings();
});

function loadBookings() {
    let bookingList = document.getElementById("booking-list");
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookingList.innerHTML = ""; // Clear previous entries

    bookings.forEach((booking, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${booking.name}</td>
            <td>${booking.email}</td>
            <td>${booking.phone}</td>
            <td>${booking.service}</td>
            <td>${booking.date}</td>
            <td>
                <button class="edit-btn" onclick="editBooking(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteBooking(${index})">Delete</button>
            </td>
        `;
        bookingList.appendChild(row);
    });
}

function deleteBooking(index) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    loadBookings();
    alert("Booking deleted successfully!");
}

function editBooking(index) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    let newDate = prompt("Enter new booking date:", bookings[index].date);
    if (newDate) {
        bookings[index].date = newDate;
        localStorage.setItem("bookings", JSON.stringify(bookings));
        loadBookings();
        alert("Booking updated successfully!");
    }
}

document.getElementById("booking-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let service = document.getElementById("service").value;
    let date = document.getElementById("date").value;

    if (name === "" || email === "" || phone === "" || date === "") {
        alert("Please fill in all fields!");
        return;
    }

    let newBooking = { name, email, phone, service, date };

    // Save booking in Local Storage
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Admin Alert
    alert("New Service Booking Received!\n\n" +
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Phone: " + phone + "\n" +
        "Service: " + service + "\n" +
        "Date: " + date
    );

    document.getElementById("booking-form").reset();
});


function logoutAdmin() {
    localStorage.removeItem("adminLoggedIn");
    alert("Logged Out Successfully!");
    window.location.href = "admin-login.html"; // Redirect to Login Page
}
