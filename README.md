# 🍽️ QR Menu Management System (QR App)

A modern **QR Menu Management System** built with **React** that allows businesses and restaurants to **create, manage, and share digital menus** via automatically generated **QR codes**.  
Each company can manage its own menus, categories, and menu items — all linked through unique QR codes.

---

## 🚀 Features

### 🧾 Menu Management
- Create, edit, and delete **menus** for your restaurant or company  
- Add **menu items** with:
  - Name, description, and price  
  - Base64 or image upload support  
  - Category and visibility controls  
- Filter and organize items easily with a clean, user-friendly interface  

### 🔢 Multi-Company System
- Each business has its own **separate menu space**  
- Companies can manage multiple menus independently  
- Securely separated company data using unique company identifiers  

### 📱 QR Code Generation
- Instantly generate **QR codes** for each menu  
- QR codes directly link to the live, shareable menu page  
- Downloadable in high-quality PNG format for print or web use  

### 👤 Role-Based Access
- Admins can create, update, or remove menus  
- Standard users (staff) can manage menu items within their permissions  
- Authentication and token-based access system  

### 💬 Comments & Feedback
- Customers can leave **comments** on menu items  
- Star rating and feedback system to enhance menu quality  

### 🎨 Modern UI/UX
- Built with **React + Tailwind CSS**  
- Light and dark theme support  
- Smooth animations using **Framer Motion**  
- Responsive design optimized for both mobile and desktop  

---

## 🛠️ Tech Stack

- **Frontend Framework:** React  
- **Styling:** Tailwind CSS  
- **Animations:** Framer Motion  
- **QR Generation:** `qrcode.react`  
- **API Integration:** Axios  
- **State Management:** React Hooks  
- **Icons:** Lucide React  

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/mertcakirm/QRApp.git

# Navigate to the project folder
cd QR-App

# Install dependencies
npm install

# Start the development server
npm run dev
