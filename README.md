# Employee Management System

A modern React-based application for managing employee records, featuring authentication, a dashboard, and full CRUD capabilities.

## Tech Stack
- **Framework**: React.js (Vite)
- **Styling**: Vanilla CSS (Global styles in `src/index.css`)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **State Management**: React Context API
- **Persistence**: LocalStorage (Mock Database)

## Features
- **Authentication**: secure login (mock) with protected routes.
- **Dashboard**: Overview of fleet statistics (Total, Active, Inactive).
- **Employee Management**:
    - **List View**: Search by name, filter by Gender/Status.
    - **Pagination**: Client-side pagination (10 items per page).
    - **Add/Edit**: Comprehensive form with validation and image preview.
    - **Delete**: Confirmation dialog before removal.
    - **Print**: Printer-friendly employee list (auto-expands to show all employees).
- **Modern UI**: Clean, responsive layout with sidebar navigation.

## Steps to Run Locally

1. **Clone the repository** (or unzip the source code).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Open your browser** to the URL shown (usually `http://localhost:5173`).

## Login Credentials
Use the following mock credentials to log in:
- **Username**: `admin`
- **Password**: `admin`

## Assumptions & Design Decisions
- **Data Persistence**: Uses `localStorage` to simulate a database. Data persists across reloads but clears if browser cache is cleared.
- **Styling**: Uses standard global CSS (`index.css`) for all components, keeping component files clean and logic-focused.
- **Images**: Profile images are stored as Base64 strings in `localStorage`. Large images are restricted to 2MB.

## Project Structure
- `src/components`: UI Components and Layouts.
- `src/context`: State management (auth, employees).
- `src/pages`: Application views (Login, List, Form).
- `src/index.css`: Global application styles.
