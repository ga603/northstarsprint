# Northstar Support Deflection MVP

## 1. Project Overview

This is a self-service support portal built for **Northstar Retail Co.** The goal is simple: cut down on the flood of repetitive support tickets by letting customers get answers to common questions on their own, without waiting on a human.

Right now, the MVP covers two areas:

- **Order Status**
- **Returns & Refunds**

---

## 2. Problem Statement

Support teams burn a lot of hours answering the same handful of questions over and over:

- Where's my order?
- Has it shipped yet?
- How do I return something?
- What's going on with my refund?

This project gives customers a place to find those answers themselves, so the support team can spend their time on the issues that actually need a person.

---

## 3. MVP Scope

### What's Included

- Order Status lookup
- Returns & Refunds help
- Order-number input for customers
- Automated responses
- Results shown directly to the customer
- Clear error and success messaging

### What's Not Included Yet

- Hooking into a live order-management system
- Live payment or refund processing
- Real carrier tracking APIs
- A production customer database
- Ticketing-system integration
- Customer login/authentication

These are deliberately left out for now. The point of the MVP is to prove the concept, not build the full production system on day one.

---

## 4. Technology Stack

The MVP is kept simple at this stage. It is a browser-based application built using:

- **HTML5** — page structure and content
- **CSS3** — styling and layout
- **JavaScript** — application logic and customer interactions

No frontend framework such as React, Angular, or Vue is currently used.

The structure, styling, and application logic are separated into individual files, making the project easy to understand and maintain.

---

## 5. Project Structure

```text
northstar-support-deflection-mvp/
│
├── README.md
├── index.html
├── styles.css
└── app.js
