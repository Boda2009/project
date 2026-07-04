# E-Commerce Backend API

A fully functional, production-ready E-Commerce Backend API built from scratch using Node.js, Express, and Mongoose. This application serves as the complete server-side infrastructure for an online marketplace, featuring dynamic product cataloging, cart persistence mechanics, and a robust checkout system with automated inventory stock verification.

---

##  Features

* **Model-View-Controller (MVC) Architecture:** Clean, decoupled code separation for high scalability.
* **Catalog Management:** Advanced categorization and product schemas equipped with custom relational linking and built-in data validation.
* **Dynamic Query Filters:** Live product searching, catalog sorting, and price filtering.
* **Persistent Shopping Cart:** Fully functional cart controller to add, update, or clear items.
* **Inventory-Aware Checkout:** Safe multi-stage order processing that auto-verifies store balances and deducts product stock counts upon successful purchases.
* **Centralized Error Handling:** Global middleware wrapper to ensure API reliability.

---

##  Prerequisites & Installation

### Prerequisites
Make sure you have the following software installed on your machine:
* **Node.js** (v14.x or higher)
* **npm** (Node Package Manager)
* **MongoDB** (Local instance running on port 27017 or a MongoDB Atlas Cloud cluster connection string)

### Installation Steps

1. **Extract and Open the Project:**
   Open the root `project/` directory inside your terminal or VS Code.

2. **Install Dependencies:**
   Run the following command to download all required packages listed in `package.json`:
   ```bash
   npm install