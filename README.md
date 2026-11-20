<div align="center">

# 📚 BookNook — Community Book Exchange & Neighborhood Library

  <p align="center">
    <strong>A modern, full-stack community library platform where book lovers discover, share, borrow, and return books seamlessly.</strong>
  </p>

  <p align="center">
    <a href="https://booknook-client-lilac.vercel.app">
      <img src="https://img.shields.io/badge/Live%20Website-booknook--client-emerald?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Website" />
    </a>
    <a href="https://booknook-server-api.onrender.com">
      <img src="https://img.shields.io/badge/Live%20API-Render-brightgreen?style=for-the-badge&logo=render&logoColor=white" alt="Live API" />
    </a>
    <a href="https://github.com/apu-22/BookNook-Server">
      <img src="https://img.shields.io/badge/Backend%20Repo-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Backend Repo" />
    </a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js%2016-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React%2019-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript%205-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind%20CSS%20v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Better--Auth-4F46E5?style=flat-square" alt="Better Auth" />
    <img src="https://img.shields.io/badge/MongoDB%20Atlas-4EA94B?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB Atlas" />
  </p>

</div>

---

## 🌐 Live Deployments

- 🚀 **Client (Frontend):** [https://booknook-client-lilac.vercel.app](https://booknook-client-lilac.vercel.app)
- ⚙️ **API (Backend):** [https://booknook-server-api.onrender.com](https://booknook-server-api.onrender.com)
- 📦 **Backend Repository:** [https://github.com/apu-22/BookNook-Server](https://github.com/apu-22/BookNook-Server)

---

## 📖 About BookNook

**BookNook** transforms physical bookshelves into an interconnected community library. Instead of letting finished books collect dust, readers can list their favorite titles, explore reads offered by others, and borrow books for a 7-day reading period completely free of charge. Built with Next.js 16 App Router, React 19, and Tailwind CSS v4, BookNook offers a refined, editorial-grade reading experience with blazing-fast page loads and micro-interactions.

---

## ✨ Key Features

- **🔍 Comprehensive Book Discovery & Catalog:**
  Explore hundreds of community-contributed titles filtered by genre, availability, and publication dates. Includes an instant search and catalog view (`/all-books`) with live stock status indicators.

- **📖 1-Click Book Borrowing & Return System:**
  Authenticated users can borrow available books with a single click (`POST /borrow-book`). The system automatically assigns a 7-day lending cycle, locks concurrent duplicate borrows, and allows instantaneous returns that restock catalog inventory in real-time.

- **📚 Personal Bookshelf Management (Add, Edit, Delete):**
  Empowers community members to contribute to the library. Users can add new books (`POST /add-book`) with rich metadata, and manage their contributed titles in a dedicated dashboard (`/my-books`) with full edit and delete permissions.

- **⏱️ Active Borrow Tracking ("My Borrows"):**
  A dedicated lending dashboard (`/my-borrows`) showing all currently borrowed books, borrow dates, upcoming due dates, and real-time return actions.

- **🔐 Robust Authentication & Seamless Smart Redirects:**
  Powered by Better-Auth and JWT token verification. If an unauthenticated guest attempts to borrow a book or access protected routes, an elegant dialog prompts sign-in and smoothly returns the user back to their exact origin page upon successful authentication.

- **🎨 Fluid Framer Motion & Swiper Animations:**
  Polished editorial UI enhanced with Framer Motion scroll reveals, card hover physics, and an interactive hero banner powered by Swiper featuring cinematic gradients and smooth transitions.

- **📱 Fully Responsive & Accessible:**
  Meticulously designed for all screen sizes (mobile, tablet, desktop) following modern accessibility guidelines and dark/light system palette compatibility.

---

## 🛠️ Technology Stack

### Frontend (This Repository)
- **Framework:** Next.js 16 (App Router with Turbopack)
- **Library:** React 19
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4, CSS Variables, Lucide Icons
- **Motion & Sliders:** Framer Motion 14, Swiper 14
- **Authentication Client:** Better-Auth (Client SDK) with JWKS verification

### Backend & Database (External Service)
- **Runtime:** Node.js & Express.js
- **Database:** MongoDB Atlas (Native MongoDB Driver)
- **Security:** `jose` JWT verification, CORS protection, Environment-based secrets
- **Hosting:** Render (Cloud Native Deployment)

---

## 📁 Project Structure

```text
booknook-client/
├── public/                 # Static assets, hero images, and icons
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (authentication)/
│   │   │   ├── sign-in/    # Sign In with redirect fallback support
│   │   │   └── sign-up/    # Sign Up with credentials
│   │   ├── add-book/       # Protected route to contribute new books
│   │   ├── all-books/      # Public catalog & search
│   │   │   └── [id]/       # Dynamic book details & borrow trigger
│   │   ├── my-books/       # User's added books dashboard
│   │   ├── my-borrows/     # User's borrowed books & return actions
│   │   ├── profile/        # User profile view
│   │   ├── globals.css     # Tailwind v4 theme & Swiper styling
│   │   ├── layout.tsx      # Root layout with Toast & Auth Providers
│   │   └── page.tsx        # Homepage (Banner, New Arrivals, Reviews)
│   ├── components/         # Reusable UI components
│   │   ├── books/          # BookCard, AllBooksCatalog, BorrowDialog
│   │   ├── common/         # Navbar, Footer, Framer Motion wrappers
│   │   └── home/           # Banner slider, How It Works, Top Categories
│   ├── lib/                # Auth client & utility configurations
│   └── proxy.ts            # Route authentication & JWT proxy guards
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

Follow these instructions to run BookNook locally on your machine.

### Prerequisites
- **Node.js:** `v18.18.0` or later
- **npm** or **pnpm** / **yarn**
- A running instance of the [BookNook Backend Server](https://github.com/apu-22/BookNook-Server) or the deployed Render API.

### 1. Clone the Repository
```bash
git clone https://github.com/apu-22/BookNook-Client.git
cd BookNook-Client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root of `booknook-client` and configure your API URLs:

```env
# URL of your backend server
NEXT_PUBLIC_API_URL=https://booknook-server-api.onrender.com

# Better Auth Base URL
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_auth_secret_here

# MongoDB Atlas connection (if using server-side auth adapter)
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore BookNook.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🔒 Security & Data Integrity

- **Protected API Communication:** Client communicates with the backend using Bearer tokens authenticated via JSON Web Keys (JWKS).
- **Concurrency & Availability Checks:** Borrow requests validate remaining stock in MongoDB to prevent negative inventory or simultaneous claims.
- **Client Route Guards:** Unauthenticated visits to `/my-books`, `/my-borrows`, and `/add-book` are automatically intercepted and routed to sign-in.

---

## 🤝 Related Repositories

- 🖥️ **Frontend:** [BookNook-Client](https://github.com/apu-22/BookNook-Client)
- ⚙️ **Backend:** [BookNook-Server](https://github.com/apu-22/BookNook-Server)

---

## 👨‍💻 Developed By

**Apu Rayhan**  
- GitHub: [@apu-22](https://github.com/apu-22)
- Project: [BookNook](https://booknook-client-lilac.vercel.app)

*Feel free to star ⭐ the repository if you found this project helpful!*
