# Journey with Quran

**Journey with Quran** is a reflective, community-based platform where users can share personal insights, reflections, and inspirations from their Quranic reading. It acts as an open **Quran journal** — a space for thought, learning, and mutual growth. Alongside reflections, the platform offers access to the **Quran**, **tafsir**, and **hadith** resources to deepen understanding and promote meaningful engagement with the words of Allah ﷻ.

---

## Features

* **Post Reflections** – Share your personal learnings and thoughts from your Quran reading.
* **Quran Integration** – Explore and search the Quran with ease.
* **Tafsir & Hadith Support** – Enrich your understanding with classical commentary and hadith sources.
* **Follow System** – Connect with other users, follow their journey, and build a reflection-driven community.
* **Real-Time Data Updates** – Seamless consistency across all posts and profile updates.
* **Secure Modular Backend** – Scalable backend built for growth and flexibility.

---

## Tech Stack

| Layer    | Technology            |
| -------- | --------------------- |
| Frontend | React, TypeScript     |
| Backend  | Node.js, Express      |
| Database | MongoDB, Mongoose     |
| Language | TypeScript            |
| Tools    | Git, VS Code, Postman |

---

## Folder Structure

```
journey-with-quran/
├── frontend-v2/               # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── utils/
├── backend/                   # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middlewares/
└── README.md
```

---

## Getting Started

### Prerequisites

* Node.js (v16+ recommended)
* MongoDB
* Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Mehedi-bit/journey-with-quran.git
   cd journey-with-quran
   ```

2. **Install dependencies**

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend-v2
   npm install
   ```

3. **Environment setup**

   Create `.env` files in `backend/` with the necessary keys.

   **Backend `.env` example:**

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   ```

4. **Run development servers**

   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server (in a new terminal)
   cd ../frontend-v2
   npm run dev
   ```

---

## Backend Highlights

* **Atomic Updates:** MongoDB transactions used for critical operations like follow/unfollow.
* **Auto Propagation:** Profile changes automatically update across all posts and replies.
* **Efficient Bulk Operations:** Handles large-scale data changes without compromising performance.
* **Robust Error Handling:** Ensures stability and reliability during all critical flows.

---

## Contributing

We welcome your contributions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit your code (`git commit -m "Add feature"`)
5. Push to the branch (`git push origin feature-name`)
6. Create a Pull Request

> Please follow clean code principles and include helpful comments.


---

## Special Thanks

To everyone exploring the Quran and sharing their reflections — may this platform be a means of continuous benefit and reward.

![Thanks](https://ik.imagekit.io/mehedi004/Avatars/duhaa.webp?updatedAt=1748276326309)
