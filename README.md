# Callisto Software Solution - Corporate Website

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

A next-generation, highly interactive, and cyber-security-themed corporate website for **Callisto Software Solution (Pvt) Ltd**. Built with modern web technologies, it features a military-grade aesthetic, fluid animations, a 3D project carousel, and a simulated real-time command center dashboard.

## 🚀 Features

- **Immersive Cyber Aesthetic:** Dark mode by default with vibrant red/orange glowing accents, grid backgrounds, and custom particle effects.
- **Advanced Animations:** Scroll-triggered reveals, continuous particle backgrounds, hacker-text decoding effects, and interactive hover states powered by Framer Motion.
- **3D Project Carousel:** A fully functional, perspective-driven 3D carousel to showcase featured software projects.
- **Dynamic Routing (SPA):** Seamless, zero-reload page transitions between the Home, Platform (Command Center), and dynamic Service Detail pages.
- **"Command Center" Dashboard:** A simulated real-time dashboard featuring live traffic graphs, network status meters, server health gauges, and a live threat log.
- **Fully Responsive:** Carefully crafted layouts that adapt flawlessly from desktop to mobile screens, with smart touch-based animations for mobile devices.
- **Docker Ready:** Containerized environment setup included for instant deployment and collaboration without dependency conflicts.

## 🛠️ Tech Stack

- **Frontend Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Containerization:** Docker & Docker Compose

## 📂 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── Shared.jsx          # Reusable UI elements, animations, and graphics
│   │   ├── PageComponents.jsx  # Complex sections (Carousel, Service Cards)
│   │   ├── Navbar.jsx          # Global navigation
│   │   └── Footer.jsx          # Global footer
│   ├── pages/
│   │   ├── Home.jsx            # Main landing page
│   │   ├── Platform.jsx        # Command Center dashboard
│   │   └── ServiceDetail.jsx   # Dynamic service description page
│   ├── App.jsx                 # Routing logic and layout wrapper
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind directives and custom CSS
├── public/
│   └── logo.png                # Brand assets
├── Dockerfile                  # Docker image configuration
├── docker-compose.yml          # Multi-container orchestration
└── package.json                # Project dependencies

```
## 💻 Local Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository**
   ```bash
   git clone [https://github.com/Hasalawa/callisto-software.git](https://github.com/Hasalawa/callisto-software.git)
   cd callisto-software
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 🐳 Docker Setup (Recommended)

If you prefer to run the project in a containerized environment (no local Node.js required), you can use Docker.

1. **Ensure [Docker Desktop](https://www.docker.com/products/docker-desktop) is running.**

2. **Build and start the container:**
   ```bash
   docker-compose up --build
   ```
   *The site will be available at `http://localhost:5173` with hot-reloading enabled.*

3. **To stop the container:**
   ```bash
   docker-compose down
   ```

## 👨‍💻 Author

**Kehan Hasalawa** - GitHub: [@Hasalawa](https://github.com/Hasalawa)

**Sahan Dilshan** - GitGub: [@Sahan20030814](https://github.com/Sahan20030814)

**Tharindra Dasuni** - Github: [@TharindraDasuni] ()


## 📄 License

© 2024 Callisto Software Solution (Pvt) Ltd. All Rights Reserved.