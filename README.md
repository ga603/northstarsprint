# Northstar Support Deflection MVP

## 1. Project Overview

This is a self-service support portal built for **Northstar Retail Co.** The goal is simple: cut down on the flood of repetitive support tickets by letting customers get answers to common questions on their own, without waiting on a human.

The portal enables customers to resolve common retail support requests through an intuitive web interface while providing the option to escalate unresolved issues to a simulated live support agent.

The current MVP includes the following support services:

- Order Status Tracking
- Returns & Refunds
- Stock Availability Lookup
- Live Agent Chat
- Human Support Escalation

---

## 2. Problem Statement

Support teams spend a significant amount of time responding to repetitive customer questions, including:

- Where is my order?
- Has my order shipped?
- How do I return an item?
- Is this product currently in stock?
- When will this item be restocked?
- I still need help. Can I speak with someone?

This project reduces repetitive support requests by allowing customers to access information instantly through a self-service portal while still providing a path to human assistance when necessary.

---

## 3. MVP Scope

### What's Included

### Order Status

Customers can:

- Search for orders using an Order Number.
- View shipment status.
- View estimated delivery dates.
- View shipping carriers.
- Receive clear success and error messages.
- Escalate missing-order issues directly to a live support agent.

---

### Returns & Refunds

Customers can:

- Check whether an order is eligible for return.
- Generate return labels for eligible orders.
- Receive explanations when an order is not yet eligible.
- Request manual review for expired return windows.
- Escalate return issues to a support representative.

---

### Stock Availability

Customers can:

- Search products by SKU or product name.
- View available inventory.
- View stock status badges:
  - In Stock
  - Low Stock
  - Out of Stock
- View expected restock information.
- Receive product suggestions while typing.
- Request restock notifications from a support representative.

---

### Live Agent Support

Customers can:

- Open a live chat session.
- Send messages to a simulated support agent.
- Receive automated conversational responses.
- Press **Enter** to send messages.
- Receive contextual replies based on keywords such as:
  - Orders
  - Shipping
  - Returns
  - Refunds
- Automatically open the chat when support escalation is required.

---

### Human Support Escalation

When automated support cannot resolve an issue, customers can:

- Request assistance from a human representative.
- Submit an email address or phone number.
- Receive validation of contact information.
- Receive confirmation once a transfer request has been submitted.
- View estimated response time.

---

### Customer Feedback

After every automated agent response, customers can:

- Indicate whether the response was helpful.
- Trigger escalation to a human representative if the answer was not satisfactory.

---

### User Interface

The portal includes:

- Responsive layout
- Modern widget-based interface
- Success, warning and error notifications
- Product suggestion dropdown
- Stock status badges
- Interactive live chat window
- Company footer
- Social media links
- Clean and intuitive user experience

---

## 4. Technology Stack

The MVP is a browser-based application developed using:

- **HTML5** — semantic page structure and user interface
- **CSS3** — responsive layout, styling, stock badges, chat interface, suggestion dropdowns, and footer components
- **JavaScript — application logic, mock databases, order lookup, returns processing, stock search, auto-complete suggestions, live chat, customer feedback, and human escalation workflows

---

## 5. Application Features

### Mock Databases

The application includes mock data for demonstration purposes:

- Order Database
- Product Stock Database

These simulate backend data without requiring a server or database.

---

### Automated Order Tracking

- Order lookup by Order ID
- Shipping status
- Estimated delivery date
- Carrier information

---

### Automated Returns

- Return eligibility checking
- Return label generation
- Return exception handling
- Agent escalation

---

### Product Inventory Search

- SKU search
- Product name search
- Live auto-complete suggestions
- Stock availability display
- Restock information

---

### Live Support Chat

- Simulated customer support conversation
- Context-aware responses
- Greeting detection
- Order and return assistance
- Automatic scrolling
- Enter-key support

---

### Human Agent Escalation

Customers can request assistance from a live representative by providing:

- Email address
- Phone number

The application validates the submitted information before confirming the escalation request.

---

### Customer Satisfaction Feedback

Customers can indicate whether an automated response was helpful.

If not, the application immediately offers human support.

---

## 6. Technology Highlights

- Responsive design
- JavaScript functions
- Client-side form validation
- Mock API simulation
- Interactive search suggestions
- Dynamic DOM manipulation
- Human support workflow

---

## 7. Future Improvements

Potential enhancements include:

- Backend database integration
- REST API integration
- User authentication
- Customer accounts
- Order history
- Email notifications
- SMS notifications
- AI-powered chatbot
- Real-time live agent integration
- Admin dashboard
- Analytics for support requests
- FAQ knowledge base
- Multi-language support

---

## 8. Technology Architecture

``
Customer
     │
     ▼
Northstar Support Portal
     │
     ├── Order Status Module
     ├── Returns Module
     ├── Stock Availability Module
     ├── Live Chat Module
     ├── Human Escalation Module
     └── Mock Databases
``

---

## 9. Project Status

- Order Status Module Complete

- Returns & Refunds Module Complete

- Stock Availability Module Complete

- Live Chat Module Complete

- Human Escalation Workflow Complete

- Customer Feedback System Complete
