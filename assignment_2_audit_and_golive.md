# Assignment 2 — Audit and Go-Live

## 1. Project

**NorthstarSprint — Customer Support MVP**

The project is a customer support self-service MVP designed to help customers
resolve common support needs through an easy-to-use web application.

---

## 2. Features Completed

### Order Status

Customers can enter an order number and view:

- Order status
- Estimated delivery
- Carrier information

### Returns & Refunds

Customers can enter an order number and check:

- Whether the order exists
- Whether the order has been delivered
- Whether the order is eligible for return
- Appropriate return guidance

### Live Agent Chatbot

The support page includes clickable options that allow customers to access
live agent support functionality.

### Dark Mode

The application includes a dark mode feature to provide an alternative
viewing experience for users.

---

## 3. Team Contributions

| Member | Contribution | Branch / Evidence |
|---|---|---|
| **John Gachie** | Initialized the base prototype files and established the core HTML, CSS, and JavaScript structure | Base project commit |
| **nelly-mwangi** | Returns & Refunds functionality | `feature/returns-refunds` / Pull Request #8 |
| **Sammy Samuel Otieno** | Live Agent Chatbot clickable options | Commit: `added clickable options in the live agent chatbot` |
| **Dorcas Mutua ** | README/documentation updates | Commit: `modified the readme file to reflect the new change` |
| **Stephen Thiong'o ** | README/documentation updates | `features/readme` / Commit: `Update README.md` |

> The GitHub repository provides evidence of the team's individual
> contributions through commits, branches, and Pull Requests.

---

## 4. GitHub Collaboration Evidence

The team used GitHub for collaborative software development.

The workflow included:

- Creating feature branches
- Making individual commits
- Opening Pull Requests
- Reviewing code changes
- Merging completed work into the `main` branch
- Updating project documentation

Examples of contributions include:

- `feat: initialize base prototype files - establishes the core HTML, CSS, and JS structure for the MVP`
- `added the dark mode feature`
- `added clickable options in the live agent chatbot`
- `modified the readme file to reflect the new change`
- `Update README.md`
- Pull Request #8
- Pull Request #9

---

## 5. Testing

The following test scenarios were completed:

| Test | Expected Result | Result |
|---|---|---|
| Empty order number | Error message displayed | Passed |
| Invalid order number | Order not found message displayed | Passed |
| Shipped order | Return unavailable message displayed | Passed |
| Delivered eligible order | Return available message displayed | Passed |
| Processing order | Return unavailable message displayed | Passed |

The application was also run locally using a Python HTTP server and
tested in a web browser before the changes were committed.

---

## 6. Go-Live Checklist

- [x] Website loads successfully
- [x] Base HTML, CSS and JavaScript structure created
- [x] Order Status feature implemented
- [x] Returns & Refunds feature implemented
- [x] Invalid input is handled
- [x] Return scenarios tested
- [x] Live Agent Chatbot options added
- [x] Dark Mode feature added
- [x] README/documentation updated
- [x] Team contributions recorded
- [x] Feature branches used
- [x] Pull Requests used
- [x] Code changes reviewed
- [x] Changes merged into `main`

---

## 7. Final Status

The **NorthstarSprint Customer Support MVP** has been implemented,
tested, and prepared for demonstration.

The MVP provides customer self-service functionality for Order Status and
Returns & Refunds, together with additional support features including Live
Agent Chatbot options and Dark Mode.

The project is ready for final demonstration and review.
