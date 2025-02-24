# Campus Project - Add Everything you know - Open Source

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Campus Diary is a dynamic platform designed to streamline and enhance campus life for students. Built with Next.js, TypeScript, Prisma, and Neon Postgres, it provides a seamless experience for connecting with peers, exploring campus resources, and staying updated with important events.

The platform features a 'Peers' page, where students can easily discover and connect with fellow users. To ensure efficiency, the system optimally checks existing connections, displaying relevant statuses like 'Connect' or 'Already Connected' in real time.

With a structured backend architecture and efficient state management using Zustand, Campus Diary aims to offer a smooth, scalable, and user-friendly experience for students navigating their campus ecosystem.

## Features

- User authentication and authorization
- Profile management for Users
- Connect with Peers & Grow your Network
- Event scheduling and notifications
- Discussion forums and messaging
- Course Details and Forms
- Brilliant UI & UX
- Create & Organize Clubs, Sports, Events
- ShowCase your Projects

## 📚 Tech Stack

- **Frontend:**
  - React.js
  - Next.js
  - Shadcn-ui
  - TailwindCSS
  - TypeScript
  - Zod - Form Validation
  - Framer-motion
- **State Management:**
  - Zustand
- **Backend:**
  - Node.js
  - Prisma
  - Express-JS
  - Mongoose
  - TypeScript
- **Database:**
  - Neon
  - PostgreSQL
  - MongoDB
- **Version Control:**
  - Git

```
## 📁 File Structure :
Directory structure:
└── karan-develops-campus-connect/
    ├── Readme.md
    ├── CONTRIBUTING.md
    ├── LICENCE
    ├── backend/
    │   ├── index.ts
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── .gitignore
    │   ├── controllers/
    │   │   ├── academicInfo.controller.ts
    │   │   ├── contactInfo.controller.ts
    │   │   ├── demoSportsData.controller.ts
    │   │   └── placement.controller.ts
    │   ├── db/
    │   │   └── connectDb.ts
    │   ├── models/
    │   │   ├── academicData.models.ts
    │   │   ├── contactInfo.models.ts
    │   │   ├── demoPlacements.models.ts
    │   │   └── demoSportsProgramData.models.ts
    │   ├── routes/
    │   │   ├── academicInfo.route.ts
    │   │   ├── contactInfo.route.ts
    │   │   ├── demoSportsData.route.ts
    │   │   └── placement.route.ts
    │   └── scripts/
    │       ├── demoAcademicData.seed.ts
    │       ├── demoPlacements.seed.ts
    │       ├── demoSportsProgramData.seed.ts
    │       └── data/
    │           ├── demoAcaData.ts
    │           └── sportsProgramData.ts
    └── frontend/
        ├── README.md
        ├── components.json
        ├── eslint.config.mjs
        ├── middleware.ts
        ├── next.config.ts
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.mjs
        ├── tailwind.config.ts
        ├── tsconfig.json
        ├── .gitignore
        ├── actions/
        │   ├── extraUser.actions.ts
        │   ├── message.actions.ts
        │   ├── peers.actions.ts
        │   ├── skills.actions.ts
        │   └── user.actions.ts
        ├── app/
        │   ├── error.tsx
        │   ├── globals.css
        │   ├── layout.tsx
        │   ├── not-found.tsx
        │   ├── (auth)/
        │   │   ├── layout.tsx
        │   │   ├── forgot-password/
        │   │   │   └── page.tsx
        │   │   ├── sign-in/
        │   │   │   └── page.tsx
        │   │   └── sign-up/
        │   │       └── page.tsx
        │   ├── (root)/
        │   │   ├── layout.tsx
        │   │   ├── page.tsx
        │   │   ├── academics/
        │   │   │   ├── academics-content.tsx
        │   │   │   ├── page.tsx
        │   │   │   └── [program]/
        │   │   │       ├── learn-more-content.tsx
        │   │   │       └── page.tsx
        │   │   ├── admissions/
        │   │   │   ├── admissions-content.tsx
        │   │   │   └── page.tsx
        │   │   ├── apply/
        │   │   │   ├── application-form.tsx
        │   │   │   └── page.tsx
        │   │   ├── campus-life/
        │   │   │   ├── clubs/
        │   │   │   │   ├── club-content.tsx
        │   │   │   │   └── page.tsx
        │   │   │   ├── create/
        │   │   │   │   ├── create-content.tsx
        │   │   │   │   └── page.tsx
        │   │   │   ├── events/
        │   │   │   │   ├── events-content.tsx
        │   │   │   │   └── page.tsx
        │   │   │   └── sports/
        │   │   │       ├── page.tsx
        │   │   │       └── sports-content.tsx
        │   │   ├── contact/
        │   │   │   ├── contact-content.tsx
        │   │   │   └── page.tsx
        │   │   ├── messages/
        │   │   │   └── [identifier]/
        │   │   │       ├── messages-content.tsx
        │   │   │       └── page.tsx
        │   │   ├── my-creations/
        │   │   │   ├── my-creations-content.tsx
        │   │   │   └── page.tsx
        │   │   ├── peers/
        │   │   │   ├── login-page.tsx
        │   │   │   ├── page.tsx
        │   │   │   ├── peers-content.tsx
        │   │   │   └── skill-exchange/
        │   │   │       ├── page.tsx
        │   │   │       ├── skill-exchange-content.tsx
        │   │   │       └── listing/
        │   │   │           └── [id]/
        │   │   │               ├── ListingContent.tsx
        │   │   │               └── page.tsx
        │   │   ├── placements/
        │   │   │   ├── page.tsx
        │   │   │   └── placements-content.tsx
        │   │   └── profile/
        │   │       ├── profile-content.tsx
        │   │       └── [identifier]/
        │   │           └── page.tsx
        │   ├── api/
        │   │   ├── academic-info/
        │   │   │   └── [name]/
        │   │   │       └── route.ts
        │   │   ├── contact-info/
        │   │   │   └── route.ts
        │   │   ├── create/
        │   │   │   └── route.ts
        │   │   ├── messages/
        │   │   │   └── route.ts
        │   │   ├── placements/
        │   │   │   └── route.ts
        │   │   ├── profile/
        │   │   │   └── route.ts
        │   │   ├── skill-exchange/
        │   │   │   ├── route.ts
        │   │   │   └── [id]/
        │   │   │       ├── route.ts
        │   │   │       ├── comment/
        │   │   │       │   └── route.ts
        │   │   │       └── like/
        │   │   │           └── route.ts
        │   │   └── sports-info/
        │   │       └── route.ts
        │   └── constants/
        │       ├── academicStreams.constants.ts
        │       ├── admissions.constants.ts
        │       ├── club-data.constants.ts
        │       ├── contact.constants.ts
        │       ├── events-data.constants.ts
        │       ├── peersData.constants.ts
        │       └── skill.constants.ts
        ├── components/
        │   ├── AuthProvider.tsx
        │   ├── CampusMap.tsx
        │   ├── ConnectWUs.tsx
        │   ├── CreateForm.tsx
        │   ├── FAQS.tsx
        │   ├── Footer.tsx
        │   ├── Hero2.tsx
        │   ├── HomeNewFeatures.tsx
        │   ├── HomePage.tsx
        │   ├── Loader1.tsx
        │   ├── Marquee.tsx
        │   ├── Navbar.tsx
        │   ├── NavbarWrapper.tsx
        │   ├── NewHero.tsx
        │   ├── ThemeProvider.tsx
        │   ├── ToggleTheme.tsx
        │   └── ui/
        │       ├── accordion.tsx
        │       ├── alert.tsx
        │       ├── avatar.tsx
        │       ├── badge.tsx
        │       ├── button.tsx
        │       ├── calendar.tsx
        │       ├── card.tsx
        │       ├── dialog.tsx
        │       ├── form.tsx
        │       ├── input.tsx
        │       ├── label.tsx
        │       ├── menubar.tsx
        │       ├── popover.tsx
        │       ├── progress.tsx
        │       ├── select.tsx
        │       ├── separator.tsx
        │       ├── switch.tsx
        │       ├── tabs.tsx
        │       ├── textarea.tsx
        │       ├── toast.tsx
        │       └── toaster.tsx
        ├── hooks/
        │   └── use-toast.ts
        ├── lib/
        │   ├── prisma.ts
        │   ├── utils.ts
        │   ├── validations.ts
        │   └── store/
        │       └── authStore.ts
        ├── prisma/
        │   ├── schema.prisma
        │   └── migrations/
        │       ├── migration_lock.toml
        │       ├── 20250126121634_mg1/
        │       │   └── migration.sql
        │       ├── 20250209091130_campus_life/
        │       │   └── migration.sql
        │       ├── 20250211113840_connections/
        │       │   └── migration.sql
        │       ├── 20250222120441_skills/
        │       │   └── migration.sql
        │       ├── 20250223102327_skill_ex_likes_comments/
        │       │   └── migration.sql
        │       └── 20250223115641_likes_bug_fix/
        │           └── migration.sql
        ├── public/
        │   └── images/
        │       └── placements/
        └── types/
            └── skill-exchange.ts
```

### Backend

| Variable      | Description                            |
| :------------ | :------------------------------------- |
| `MONGODB_URI` | Database URI                           |
| `PORT`        | Port number for backend (8080 OR 5000) |

### Frontend

| Varibale                            | Description                                      |
| :---------------------------------- | :----------------------------------------------- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Make a free clerk account (Project)              |
| `CLERK_SECRET_KEY`                  | Clerk Secret Key                                 |
| `DATABASE_URL`                      | Database URL from neon again make a free account |
| `BACKEND_URL`                       | http://localhost:8080                            |

---

---

# 💻Installation

## 🔥 1. Main NextJS

To run this project locally, follow these steps:

1.  Clone the repository:
    `git clone https://github.com/Karan-develops/Campus-Compass`
2.  Navigate to the project directory:
    `cd frontend`
3.  Install the dependencies:
    `npm install`
4.  Set up environment variables: - Create a `.env` file in the `frontend` directory, - Add the Variables given in above `frontend` Table.
5.  Start the development server:
    `npm run dev`

## 🔥 2. Backend For Static Data Fetch

To run this project locally, follow these steps:

1.  Navigate to the project directory:
    `cd backend`
2.  Install the dependencies:
    `npm install`
3.  Set up environment variables: - Create a `.env` file in the `backend` directory, - Add the Variables given in above `backend` Table.
4.  Initialize TypeScript:
    `npx tsc --init`
5.  Configure the `outdir` and `src` in `tsconfig` file.
6.  Seed the MongoDB database:
    `Run the seed files that have been provided.`
7.  Start the development server:
    `npm run dev`

## Usage

- Open your browser and navigate to `http://localhost:3000` for frontend.
- Open your browser and navigate to `http://localhost:8080` OR `http://localhost:8080` for backend.
- Register a new account or log in with existing credentials.
- Explore the features and functionalities of the Campus Project.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   `git checkout -b feature/your-feature-name`
3. Make your changes and commit them:
   `git commit -m "Add your message"`
4. Push to the branch:
   `git push origin feature/your-feature-name`
5. Open a pull request.

## 🔒 License

This repository is open source and under [MIT](https://choosealicense.com/licenses/mit/) License.

--- **_Lets Build & Grow Together_** **😊** ---
