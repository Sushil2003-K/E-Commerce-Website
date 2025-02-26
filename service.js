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

    // Simulating a successful booking
    let bookingMessage = document.getElementById("booking-message");
    bookingMessage.style.display = "block";

    // Save booking data to Local Storage (optional)
    let bookingData = { name, email, phone, service, date };
    localStorage.setItem("booking", JSON.stringify(bookingData));

    // Clear form fields
    document.getElementById("booking-form").reset();

    setTimeout(() => {
        bookingMessage.style.display = "none";
    }, 3000);
});
