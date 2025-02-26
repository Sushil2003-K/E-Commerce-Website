import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Database
const db = getDatabase();
const ordersRef = ref(db, "orders");

// Fetch orders
onValue(ordersRef, (snapshot) => {
    let orders = snapshot.val();
    let orderList = document.getElementById("order-list");
    orderList.innerHTML = ""; // Clear previous data

    for (let id in orders) {
        let order = orders[id];
        let row = `<tr>
            <td>${order.orderId}</td>
            <td>₹${order.amount}</td>
            <td>${order.date}</td>
        </tr>`;
        orderList.innerHTML += row;
    }
});
