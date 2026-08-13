// Mock Database to simulate a backend lookup
const mockDatabase = {
    "ORD-1001": {
        status: "Shipped",
        estimatedDelivery: "Aug 15, 2026",
        carrier: "FedEx",
        returnEligible: false // Too early to return
    },
    "ORD-1002": {
        status: "Delivered",
        estimatedDelivery: "Aug 10, 2026",
        carrier: "UPS",
        returnEligible: true
    },
    "ORD-1003": {
        status: "Processing",
        estimatedDelivery: "Aug 18, 2026",
        carrier: "Pending",
        returnEligible: false
    }
};

// Feature 1: Order Status Logic
function checkStatus() {
    const orderInput = document.getElementById('order-number').value.trim().toUpperCase();
    const resultBox = document.getElementById('status-result');
    
    resultBox.classList.remove('hidden', 'success', 'error');

    if (!orderInput) {
        resultBox.textContent = "Please enter an order number.";
        resultBox.classList.add('error');
        return;
    }

    const orderData = mockDatabase[orderInput];

    if (orderData) {
        resultBox.innerHTML = `
            <strong>Status:</strong> ${orderData.status}<br>
            <strong>Estimated Delivery:</strong> ${orderData.estimatedDelivery}<br>
            <strong>Carrier:</strong> ${orderData.carrier}
        `;
        resultBox.classList.add('success');
    } else {
        resultBox.textContent = "Order not found. Please verify your order number and try again.";
        resultBox.classList.add('error');
    }
}

// Feature 2: Returns & Refunds Logic
function startReturn() {
    const returnInput = document.getElementById('return-order-number').value.trim().toUpperCase();
    const resultBox = document.getElementById('return-result');
    
    resultBox.classList.remove('hidden', 'success', 'error');

    if (!returnInput) {
        resultBox.textContent = "Please enter an order number.";
        resultBox.classList.add('error');
        return;
    }

    const orderData = mockDatabase[returnInput];

    if (orderData) {
        if (orderData.returnEligible) {
            resultBox.innerHTML = `Good news! Your order (${returnInput}) is eligible for a return. <br><br> <button style="background-color: #198754;">Generate Return Label</button>`;
            resultBox.classList.add('success');
        } else if (orderData.status !== "Delivered") {
             resultBox.innerHTML = `Your order is currently marked as <strong>${orderData.status}</strong>. You can only initiate a return after the item has been delivered.`;
             resultBox.classList.add('error');
        } else {
            resultBox.innerHTML = "This order is outside the 30-day return window and is no longer eligible for a return.";
            resultBox.classList.add('error');
        }
    } else {
        resultBox.textContent = "Order not found. We cannot process a return for an unknown order.";
        resultBox.classList.add('error');
    }
}