<div align="center">

# 🎓 CampusCart

### *Your Campus. Your Marketplace.*

An intuitive peer-to-peer campus marketplace designed for college students to buy, sell, and exchange textbooks, electronics, notes, dorm essentials, and college supplies securely within their university community.

---

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

</div>

<br />

## 🌟 Highlights & Key Features

### 🛍️ **Marketplace & Smart Discovery**
- **Dynamic Search & Filtering**: Real-time filtering by category (*Books, Electronics, Furniture, Clothing*), listing type (*Sale, Free, Exchange*), and text query.
- **Product Details & Gallery**: Full view of product images, condition indicators (*New, Like New, Good, Fair*), pricing, and verified seller info.
- **Favorites & Wishlist**: Bookmark items of interest saved across sessions using local persistence.

### 📦 **Listing Management**
- **Intuitive Creation Flow**: Clean form with auto-filled seller details from the logged-in session, instant image preview, and category tags.
- **Seller Inventory Portal**: Manage listings under `/account/listings` with quick-filter statuses (*Available, Reserved, Sold*), status toggling, and deletion controls.
- **Ownership Security**: Protected backend routes verify token authorization so only the listing owner can modify or delete listings.

### 💬 **Enquiry & Buyer-Seller Communication**
- **On-Platform Inquiries**: Prospective buyers can send direct messages with their contact information right from the product page.
- **Sent Enquiries Tracker**: Buyers can monitor the status of their submitted enquiries (`Pending` vs `Responded`) at `/account/enquiries`.
- **Received Enquiries Inbox**: Sellers review messages, toggle response statuses, and launch direct email replies via `mailto:` at `/account/received-enquiries`.

### 📊 **Student Dashboard & Profiles**
- **Account Overview**: Real-time KPI statistics tracking total listings, active items, received enquiries, and sent messages.
- **Student Profile**: Customize full name, contact phone number, and campus/college affiliation under `/account/profile`.

### 🔒 **Authentication & Security**
- Secure password hashing using **bcryptjs**.
- Stateless session authentication using **JWT** (`jose`) stored in `HttpOnly` cookies.
- Role-based authorization supporting student accounts and administrator roles.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack), [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) |
| **Backend** | Next.js Server Route Handlers, [Mongoose 9](https://mongoosejs.com/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) / Local MongoDB |
| **Auth & Crypto** | [jose](https://github.com/panva/jose) (JWT verification), [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **Language & Tooling** | TypeScript 5, ESLint 9, `tsx` for DB seeds |

---

## 📁 Project Architecture

```plaintext
campuscart/
├── public/                 # Static assets & public images
├── src/
│   ├── app/                # Next.js App Router (Pages & API endpoints)
│   │   ├── (auth)/         # /login, /signup pages
│   │   ├── account/        # Student dashboard, listings, enquiries, profile
│   │   ├── api/            # API Route Handlers
│   │   │   ├── auth/       # Login, signup, me, logout, profile
│   │   │   ├── dashboard/  # Account KPI metrics
│   │   │   ├── enquiries/  # Buyer & seller enquiry management
│   │   │   └── products/   # CRUD endpoints & user listings
│   │   ├── favorites/      # Saved products page
│   │   ├── marketplace/    # Browse & search catalog
│   │   ├── product/[id]/   # Product detail & enquiry modal
│   │   └── sell/           # Create new listing
│   ├── components/
│   │   ├── layout/         # Responsive Navbar, Header, Nav links
│   │   ├── marketplace/    # ProductCard, ProductForm, EnquiryForm, etc.
│   │   └── ui/             # Reusable UI controls
│   ├── context/            # AuthContext & FavoritesContext
│   ├── lib/                # MongoDB connection helper & utility functions
│   ├── models/             # Mongoose schemas (User, Product, Enquiry)
│   ├── scripts/            # Database seed scripts
│   ├── services/           # Client-side API abstraction layer
│   └── types/              # TypeScript definitions & interfaces
└── package.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.17+ or v20+ recommended)
- **npm**, **pnpm**, or **yarn**
- A running **MongoDB** instance (local or MongoDB Atlas connection URI)

### 2. Clone the Repository
```bash
git clone https://github.com/raunak2015/campuscart.git
cd campuscart
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/campuscart?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
```

### 5. (Optional) Seed Sample Data
Populate sample campus enquiries to test the inbox feature:
```bash
npm run seed:enquiries
```

### 6. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start exploring CampusCart.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server with Turbopack |
| `npm run build` | Compiles optimized production build |
| `npm run start` | Starts production server |
| `npm run lint` | Runs ESLint checks across project |
| `npm run seed:enquiries` | Seeds mock products and enquiries into MongoDB |

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve CampusCart:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
Made with ❤️ for college campuses everywhere.
</div>
