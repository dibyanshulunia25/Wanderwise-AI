
# 🌍 Wanderwise-AI

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Convex](https://img.shields.io/badge/Convex-DB-EF4444?style=for-the-badge&logo=convex&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)
![OpenAI](https://img.shields.io/badge/AI-Gemini%2FOpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

**Wanderwise-AI** is your intelligent travel companion, designed to craft personalized trip itineraries in seconds. Powered by advanced AI, it handles the complex logistics of travel planning so you can focus on the wandering.

---

## ✨ Features

- **🗺️ AI-Powered Trip Generation**: Generate comprehensive day-by-day itineraries tailored to your preferences, budget, and travel style.
- **🔒 Secure Authentication**: Seamless and secure user logins powered by **Clerk**.
- **💾 Real-time Data**: Instant data synchronization and storage using **Convex**, ensuring your trips are always saved and accessible.
- **🏨 Smart Recommendations**: Integrated suggestions for hotels and activities based on your destination.
- **🎨 Modern & Responsive UI**: Built with **Next.js 15**, **Tailwind CSS**, and **Shadcn UI** for a sleek, mobile-friendly experience.
- **💳 Subscription Tiers**: (Optional/Planned) Premium features for power travelers.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Convex](https://www.convex.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI Integration**: [Google Gemini](https://deepmind.google/technologies/gemini/) / OpenAI API
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/wanderwise-ai.git
    cd wanderwise-ai
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file in the root directory and add the following keys:

    ```env
    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key

    # Convex Database
    CONVEX_DEPLOYMENT=your_convex_deployment
    NEXT_PUBLIC_CONVEX_URL=your_convex_url

    # AI API Key (Gemini or OpenAI)
    NEXT_PUBLIC_GEMINI_API_KEY=your_google_gemini_api_key
    # or
    NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
    ```

### Running the App

1.  **Start the Convex dev server** (in a separate terminal):
    ```bash
    npx convex dev
    ```

2.  **Start the Next.js development server**:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

Here's an improved overview of the project's file structure:

```bash
wanderwise-ai/
├── app/                  # Next.js App Router directory
│   ├── api/              # API routes
│   ├── (auth)/           # Authentication routes (Clerk)
│   ├── create-trip/      # Trip creation flow pages
│   ├── view-trip/        # Trip details & itinerary view
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI primitives
│   └── custom/           # Project-specific components (Hero, Header, etc.)
├── convex/               # Convex backend code
│   ├── schema.ts         # Database schema
│   └── service.ts        # Backend API functions
├── lib/                  # Utility functions & helpers
├── public/               # Static assets (images, icons)
├── .env.local            # Environment variables (not committed)
└── package.json          # Project dependencies
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to update the issue tracker or submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
