# Shubham Rathod — Portfolio

> Personal developer portfolio built with Node.js, Express, and EJS. Deployed on Railway.

**Live:** [https://portfolio-shubham-rathod.up.railway.app](https://portfolio-shubham-rathod.up.railway.app)

---

## About

A production-ready portfolio website showcasing my full-stack projects, skills, and background. Built entirely server-side — no frontend framework, no fluff. Clean, fast, and deployed.

---

## Tech Stack

| Layer      | Tech           |
| ---------- | -------------- |
| Runtime    | Node.js ≥ 18   |
| Framework  | Express.js     |
| Templating | EJS            |
| Email      | Nodemailer     |
| Security   | Helmet, dotenv |
| Logging    | Morgan         |
| Hosting    | Railway        |

---

## Features

- Single-page portfolio with sections: About, Skills, Projects, Experience, Contact
- Resume served as a downloadable PDF route (`/resume`)
- Contact form with Nodemailer integration
- Compression and Helmet for performance and security
- Environment-based config via dotenv
- Dev mode with `node --watch` (no nodemon needed)

---

## Projects Featured

| Project                | Description                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------ |
| **WanderLust**         | Airbnb-inspired full-stack platform with CRUD, Cloudinary, map integration, and auth |
| **PetCare**            | Pet management app with Google OAuth, JWT, Nodemailer, and Cloudinary                |
| **NoticeProject**      | Hackathon — Digital Notice Board with Next.js, TypeScript, real-time updates         |
| **ContactMe Services** | Freelance multi-business portal with MERN stack, analytics, and CMS                  |
| **PracticeAPI**        | REST API server with 20+ data categories, deployed on Railway                        |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm

### Installation

```bash
git clone https://github.com/git-shubham-side/Portfolio.git
cd Portfolio
npm install
```

### Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Required variables (see `.env.example` for full list):

```env
PORT=3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Run

```bash
# Development (auto-restarts on file change)
npm run dev

# Production
npm start
```

App runs on `http://localhost:3000`

---

## Project Structure

```
Portfolio/
├── src/
│   └── server.js        # Express app entry point
├── views/               # EJS templates
├── public/              # Static assets (CSS, JS, images)
├── Samples/             # Sample/reference files
├── .env.example         # Environment variable template
├── .gitignore
└── package.json
```

---

## Deployment

Deployed on [Railway](https://railway.app). The `start` script (`node src/server.js`) is used in production.

To deploy your own instance:

1. Push the repo to GitHub
2. Connect it to Railway
3. Set environment variables in Railway's dashboard
4. Railway auto-deploys on every push to `main`

---

## Contact

- **GitHub:** [git-shubham-side](https://github.com/git-shubham-side)
- **LinkedIn:** [shubham-rathod-dev](https://www.linkedin.com/in/shubham-rathod-dev/)
- **Email:** rathodshubham7711@email.com

---

## License

MIT
