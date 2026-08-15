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
    const returnInput = document.getElementById('return-order-number').value.trim().toUpperCase();
    const resultBox = document.getElementById('return-result');
    
    resultBox.classList.remove('hidden', 'success', 'error', 'warning');

    if (!returnInput) {
        resultBox.textContent = "Please enter an order number.";
        resultBox.classList.add('error');
        return;
    }

    const orderData = orderDatabase[returnInput];

    if (orderData) {
        if (orderData.returnEligible) {
            resultBox.innerHTML = `
                Good news! Your order (<strong>${returnInput}</strong>) is eligible for a return.<br><br>
                <button style="background-color: #198754;" onclick="generateLabel('${returnInput}')">Generate Return Label</button>
            `;
            resultBox.classList.add('success');
        } else if (orderData.status !== "Delivered") {
            resultBox.innerHTML = `
                Your order is currently marked as <strong>${orderData.status}</strong>. You can only initiate a return after delivery.<br>
                <button class="escalate-btn" onclick="openChatWithContext('I have an issue returning order ${returnInput}')">Speak to Agent</button>
            `;
            resultBox.classList.add('warning');
        } else {
            resultBox.innerHTML = `
                This order is outside the 30-day return window and is no longer eligible for an automated return.<br>
                <button class="escalate-btn" onclick="openChatWithContext('Requesting return exception for order ${returnInput}')">Request Agent Exemption</button>
            `;
            resultBox.classList.add('error');
        }
    } else {
        resultBox.innerHTML = `
            Order not found. We cannot process a return for an unknown order.<br>
            <button class="escalate-btn" onclick="openChatWithContext('I need assistance returning an unlisted order ${returnInput}')">Escalate to Live Agent</button>
        `;
        resultBox.classList.add('error');
    }
}

function generateLabel(orderId) {
    const resultBox = document.getElementById('return-result');
    resultBox.innerHTML = `<strong>Success!</strong> Return label generated for ${orderId}. Printable PDF instructions sent to your email.`;
    resultBox.className = "result-box success";
}

// Feature 3: Stock Availability Logic
function checkStock() {
    const query = document.getElementById('product-query').value.trim().toLowerCase();
    const resultBox = document.getElementById('stock-result');

    clearSuggestions();
    resultBox.classList.remove('hidden', 'success', 'error', 'warning');

    if (!query) {
        resultBox.textContent = "Please enter a product SKU or name.";
        resultBox.classList.add('error');
        return;
    }

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
    }
}

// Auto-Suggest Handler
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('product-query');
    if (!input) return;

    const inputGroup = input.closest('.input-group');
    if (inputGroup) inputGroup.style.position = 'relative';

    const suggestBox = document.createElement('div');
    suggestBox.id = 'stock-suggestions';
    suggestBox.className = 'suggestions-box hidden';
    inputGroup.appendChild(suggestBox);

    input.addEventListener('input', (e) => {
        const value = e.target.value.trim().toLowerCase();

        if (!value) {
            clearSuggestions();
            return;
        }

        const matches = stockDatabase.filter(item =>
            item.name.toLowerCase().includes(value) || item.sku.toLowerCase().includes(value)
        );

        if (matches.length === 0) {
            clearSuggestions();
            return;
        }

        renderSuggestions(matches);
    });

    document.addEventListener('click', (e) => {
        if (!inputGroup.contains(e.target)) {
            clearSuggestions();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            clearSuggestions();
        }
    });
});

function renderSuggestions(items) {
    const suggestBox = document.getElementById('stock-suggestions');
    if (!suggestBox) return;

    suggestBox.innerHTML = items.map(item => `
        <div class="suggestion-item" onclick="selectSuggestion('${item.sku}', '${item.name}')">
            <span><strong>${item.name}</strong></span>
            <small style="color: #666;">(${item.sku})</small>
        </div>
    `).join('');

    suggestBox.classList.remove('hidden');
}

function selectSuggestion(sku, name) {
    const input = document.getElementById('product-query');
    input.value = name;
    clearSuggestions();
    checkStock();
}

function clearSuggestions() {
    const suggestBox = document.getElementById('stock-suggestions');
    if (suggestBox) {
        suggestBox.innerHTML = '';
        suggestBox.classList.add('hidden');
    }
}

// Feature 4: Simulated Live Agent Chat Logic
function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    const openBtn = document.getElementById('open-chat-btn');
    
    if (chatContainer.classList.contains('hidden')) {
        chatContainer.classList.remove('hidden');
        openBtn.style.display = 'none';
    } else {
        chatContainer.classList.add('hidden');
        openBtn.style.display = 'inline-block';
    }
}

function openChatWithContext(initialMessage) {
    const chatContainer = document.getElementById('chat-container');
    const openBtn = document.getElementById('open-chat-btn');
    
    chatContainer.classList.remove('hidden');
    openBtn.style.display = 'none';
    
    document.getElementById('live-chat-widget').scrollIntoView({ behavior: 'smooth' });
    
    appendChatMessage(initialMessage, 'user');

    setTimeout(() => {
        appendAgentResponse("Thanks for bringing this to us! I've logged your request regarding this issue. Agent 75 is reviewing your details right now.");
    }, 1000);
}

function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const text = chatInput.value.trim();

    if (!text) return;

    appendChatMessage(text, 'user');
    chatInput.value = '';

    setTimeout(() => {
        let reply = "Thank you! I am reviewing your request and will update your support ticket shortly.";
        const lower = text.toLowerCase();
        
        // Conversational Greeting Detection
        const greetings = ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "greetings", "habari"];
        const isGreeting = greetings.some(g => lower === g || lower.startsWith(g + " ") || lower.startsWith(g + "!"));

        if (isGreeting) {
            reply = "Hello! I'm Agent 75. How can I assist you with your order, return, or product questions today?";
        } else if (lower.includes("refund") || lower.includes("return")) {
            reply = "I see this concerns a refund or return. I can issue a manual override ticket for your account.";
        } else if (lower.includes("shipping") || lower.includes("order")) {
            reply = "I'm checking our fulfillment system manually. One moment please!";
        }

        appendAgentResponse(reply);
    }, 1200);
}

function handleChatKey(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function appendChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return msgDiv;
}

// Feature 5: Human Support Escalation & Feedback Logic
function appendAgentResponse(text) {
    const messagesContainer = document.getElementById('chat-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message agent';

    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    msgDiv.appendChild(textSpan);

    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'feedback-box';
    feedbackDiv.innerHTML = `
        <span>Was this answer helpful?</span>
        <button class="feedback-btn yes" onclick="handleFeedback(this, true)">Yes</button>
        <button class="feedback-btn no" onclick="handleFeedback(this, false)">No</button>
    `;

    msgDiv.appendChild(feedbackDiv);
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleFeedback(btnElement, isSatisfied) {
    const feedbackBox = btnElement.parentElement;

    if (isSatisfied) {
        feedbackBox.innerHTML = `<em>Thank you for your feedback! See you soon again!</em>`;
    } else {
        feedbackBox.innerHTML = `<em>We're sorry this didn't help.</em>`;
        showHumanEscalationOption();
    }
}

function showHumanEscalationOption() {
    const messagesContainer = document.getElementById('chat-messages');
    
    const sysMsgDiv = document.createElement('div');
    sysMsgDiv.className = 'chat-message system';
    sysMsgDiv.innerHTML = `
        <strong>Connect with Human Support</strong>
        <p style="margin: 4px 0; font-size: 0.85rem;">Would you like to transfer this chat to a live human representative?</p>
        <div class="human-escalate-form">
            <input type="text" id="human-contact" placeholder="Enter your Email or Phone #" />
            <span id="escalate-error" style="color: #dc3545; font-size: 0.75rem; display: none;">Please enter a valid email address or phone number.</span>
            <button onclick="submitHumanEscalation(this)">Request Human Agent</button>
        </div>
    `;

    messagesContainer.appendChild(sysMsgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Validation helper for Email or Phone Number
function isValidEmailOrPhone(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,6}$/;
    
    return emailRegex.test(input) || phoneRegex.test(input);
}

function submitHumanEscalation(btnElement) {
    const contactInput = document.getElementById('human-contact');
    const errorMsg = document.getElementById('escalate-error');
    const contactValue = contactInput ? contactInput.value.trim() : '';

    if (!isValidEmailOrPhone(contactValue)) {
        if (errorMsg) {
            errorMsg.style.display = 'block';
        }
        contactInput.style.borderColor = '#dc3545';
        return;
    }

    const formDiv = btnElement.parentElement;
    const parentContainer = formDiv.parentElement;

    parentContainer.innerHTML = `
        <strong>Transfer Request Sent!</strong>
        <p style="margin: 4px 0; font-size: 0.85rem;">
            A human representative has been notified and will respond via <strong>${contactValue}</strong> shortly.
            Estimated wait time: <strong>~10 mins</strong>.
        </p>
    `;
}
 // End of app.js for now.