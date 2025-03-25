# 🚐 VanLife

A full-featured **React + Firebase** application that allows users to browse, rent, and manage camper vans. Includes login functionality, protected routes, and role-based dashboard for hosts.

**Live Demo:** [https://link.vercel.app](https://vercel-link.vercel.app)

---

## Features

- Public Pages: Home, About, Vans listing, Van detail
- Authentication: User registration, login, logout using Firebase Auth
- Van Management: Rent a van, view your vans as a host
- Host Dashboard: Income, Reviews, Manage Vans
- Firebase Firestore: Stores van, user, and rental data
- Password hashing with bcrypt

---

---

## 🛠️ Tech Stack

| Tech        | Description                  |
| ----------- | ---------------------------- |
| ⚛️ React  | Component-based UI           |
| 🎨 CSS      | Responsive and modern design |
| 🔥 Firebase | Authentication (Google)      |
| 🚀 Vercel   | Fast and easy deployment     |

---

## How to Run VanLife Locally

Follow these steps to set up and run the **VanLife** app on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/selenozcan/vanlife.git
cd vanlife
```

### 2. Install Dependencies

Make sure you have Node.js and npm installed.

```bash
npm install
```

### 3. Set up Firebase

1) Create a Firebase Project

* Go to Firebase Console and create a new project.

2) Enable Google Authentication

* Go to Authentication → Sign-in method
* Enable Google
* Add your app’s public-facing name and support email

3) Enable Firestore

* Go to Firestore Database
* Click Create Database and follow the setup steps

### 4. Create Environment File

In the root of the project, create a .env file and paste your Firebase config:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

You can find these values in Firebase Console → Project Settings → General → Web App Config.

### 5. Run the Development Server

```bash
npm run dev
```

Then open your browser and go to *[http://localhost:5173]()*

🎉 That’s it — you're ready to VanLife locally!
