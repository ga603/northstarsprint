// Mock Database
const orderDatabase = {
    "ORD-1001": {
        status: "Shipped",
        estimatedDelivery: "Aug 15, 2026",
        carrier: "FedEx",
        returnEligible: false
    },

    "ORD-1002": {
        status: "Delivered",
        estimatedDelivery: "Aug 10, 2026",
        carrier: "Bolt",
        returnEligible: true
    },

    "ORD-1003": {
        status: "Processing",
        estimatedDelivery: "Aug 18, 2026",
        carrier: "Jumia",
        returnEligible: false
    }
};

const stockDatabase = [
    { sku: "PROD-201", name: "Winter Parka Jacket", quantity: 14, restockDate: "In Stock" },
    { sku: "PROD-202", name: "Leather Trail Boots", quantity: 3, restockDate: "Low Stock (Restock Aug 20)" },
    { sku: "PROD-203", name: "Thermal Running Socks", quantity: 0, restockDate: "Out of Stock (Restock Aug 25)" },
    { sku: "PROD-204", name: "Waterproof Hiking Pants", quantity: 8, restockDate: "In Stock" },
    { sku: "PROD-205", name: "Insulated Gloves", quantity: 0, restockDate: "Out of Stock (Restock Sep 01)" }
];

// Feature 1: Order Status Logic
function checkStatus() {
    const orderInput = document.getElementById('order-number').value.trim().toUpperCase();
    const resultBox = document.getElementById('status-result');
    
    resultBox.classList.remove('hidden', 'success', 'error', 'warning');

    if (!orderInput) {
        resultBox.textContent = "Please enter an order number.";
        resultBox.classList.add('error');
        return;
    }

    const orderData = orderDatabase[orderInput];

    if (orderData) {
        resultBox.innerHTML = `
            <strong>Status:</strong> ${orderData.status}<br>
            <strong>Estimated Delivery:</strong> ${orderData.estimatedDelivery}<br>
            <strong>Carrier:</strong> ${orderData.carrier}
        `;
        resultBox.classList.add('success');
    } else {
        resultBox.innerHTML = `
            Order not found. Please verify your order number and try again.<br>
            <button class="escalate-btn" onclick="openChatWithContext('I need help looking up my order ${orderInput}')">Escalate to Live Agent</button>
        `;
        resultBox.classList.add('error');
    }
}

// Feature 2: Returns & Refunds Logic
function startReturn() {
    const returnInput = document
        .getElementById('return-order-number')
        .value
        .trim()
        .toUpperCase();

    const resultBox = document.getElementById('return-result');

    // Reset previous result styling
    resultBox.classList.remove('hidden', 'success', 'error');
    
    resultBox.classList.remove('hidden', 'success', 'error', 'warning');

    // 1. Check whether the customer entered an order number
    if (!returnInput) {
        resultBox.textContent = "Please enter an order number.";
        resultBox.classList.add('error');
        return;
    }

    // 2. Look for the order in the mock database
    const orderData = mockDatabase[returnInput];

    // 3. Check whether the order exists
    if (!orderData) {
        resultBox.textContent =
            "Order not found. Please verify your order number and try again.";
        resultBox.classList.add('error');
        return;
    }

    // 4. Check whether the order has been delivered
    if (orderData.status !== "Delivered") {
        resultBox.innerHTML = `
            <strong>Return not available yet.</strong><br><br>
            Your order is currently marked as 
            <strong>${orderData.status}</strong>.<br>
            You can start a return after the order has been delivered.
        `;

    const match = stockDatabase.find(item => 
        item.sku.toLowerCase() === query || item.name.toLowerCase().includes(query)
    );

    if (match) {
        let badgeClass = "badge-instock";
        if (match.quantity === 0) badgeClass = "badge-outstock";
        else if (match.quantity < 5) badgeClass = "badge-lowstock";

        resultBox.innerHTML = `
            <strong>Product:</strong> ${match.name} (${match.sku})<br>
            <strong>Stock Status:</strong> <span class="badge ${badgeClass}">${match.quantity > 0 ? match.quantity + ' Available' : 'Out of Stock'}</span><br>
            <strong>Info:</strong> ${match.restockDate}<br>
            ${match.quantity === 0 ? `<button class="escalate-btn" onclick="openChatWithContext('I would like to be notified when ${match.sku} restocks')">Ask Agent for Restock Alert</button>` : ''}
        `;
        resultBox.classList.add('success');
    } else {
        resultBox.innerHTML = `
            Product not found. Try searching with 'PROD-201' or 'Jacket'.<br>
            <button class="escalate-btn" onclick="openChatWithContext('Looking for product stock: ${query}')">Ask Agent about Item</button>
        `;
        resultBox.classList.add('error');
        return;
    }

    // 5. Check whether the delivered order is eligible for return
    if (orderData.returnEligible) {
        resultBox.innerHTML = `
            <strong>Good news!</strong><br><br>
            Order <strong>${returnInput}</strong> is eligible for a return.<br><br>
            You can start the return process and generate a return label.
            <br><br>
            <button type="button"
                    style="background-color: #198754;">
                Generate Return Label
            </button>
        `;

        resultBox.classList.add('success');
        return;
    }

    // 6. Order is delivered but outside the return window
    resultBox.innerHTML = `
        <strong>Return unavailable.</strong><br><br>
        Order <strong>${returnInput}</strong> is outside the
        30-day return window and is no longer eligible for a return.
    `;

    resultBox.classList.add('error');
}