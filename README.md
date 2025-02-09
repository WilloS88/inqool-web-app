# Inqool Web App

- This project is a front-end application based on fetching data from API and performing operations on them. 
- Its built with **React**, **Vite**, and **TypeScript**.
---

## Getting Started

### Prerequisites

- **Node.js** (version 14+)
- **Docker** (if you want to use the Docker setup)
- **npm** (Node Package Manager)
- **.env** (Dont forget to use the API base url in your .env file)
---

## Installation & Setup

```bash
git clone https://github.com/yourusername/inqool-web-app.git
cd inqool-web-app
npm install 
npm run dev
```

## Docker Setup

```bash
docker build -t inqool-web-app .
docker run -p 80:80 inqool-web-app
```

### Folder structure

```
└── 📁src
    └── 📁assets
        └── companyLogo.svg
        └── userIcon.svg
    └── 📁components
        └── AddButton.tsx
        └── DataContext.ts
        └── DataProvider.tsx
        └── FilterSection.tsx
        └── 📁modal
            └── AddEntityModal.tsx
            └── EditEntityModal.tsx
            └── modalConfig.ts
        └── 📁table
            └── AnimalTableRow.tsx
            └── TableList.tsx
            └── UserTableRow.tsx
        └── 📁ui
            └── Button.tsx
            └── Footer.tsx
            └── Navbar.tsx
    └── 📁pages
        └── AnimalsPage.tsx
        └── HomePage.tsx
        └── NotFoundPage.tsx
        └── UsersPage.tsx
    └── 📁types
        └── Animal.tsx
        └── User.tsx
    └── App.tsx
    └── index.css
    └── main.tsx
    └── Router.tsx
    └── vite-env.d.ts
```
