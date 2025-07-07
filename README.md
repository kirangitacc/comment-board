# 🧭 Dashboard Assignment

This project is a React-based dashboard application focused on user interface design, client-side data handling, and data persistence. It consists of two main screens: a Profile screen and a Comments Dashboard, developed using dummy APIs.

## 🚀 Technologies Used
- React (JavaScript)
- React Router
- Custom pagination, sorting & searching logic (no third-party logic libraries)
- UI Library: [Specify here, e.g. Material UI or Bootstrap]
- Browser Compatibility: Chrome, Firefox, Edge

## 📁 Project Structure
- `/src/components` – Contains reusable UI components
- `/src/pages/Profile.js` – Loads and displays the first user from dummy API
- `/src/pages/Dashboard.js` – Displays paginated comment grid
- `/src/utils` – Custom pagination, search, and sorting logic
- `/src/App.js` – Routing logic between Profile and Dashboard

## 📜 Features

### 1. Profile Screen
- Fetches user data from dummy users API
- Displays first user only (non-editable)
- “Back to Dashboard” button
- Integrated routing using React Router

### 2. Comments Dashboard
- Loads 500 comment records from dummy comments API
- Custom pagination with dynamic page size (10, 50, 100)
- Partial search on Name, Email, and Phone
- Sorting on Post ID, Name, and Email
  - Click-based cycling: `None ➝ Asc ➝ Desc ➝ None`
  - Only one column sorted at a time
- Persistent state on refresh:
  - Page, page size, search filters, and sorting saved using `localStorage`

## 🛠 Setup Instructions

```bash
git clone https://github.com/your-username/dashboard-assignment.git
cd dashboard-assignment
npm install
npm start
