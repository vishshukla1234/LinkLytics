# LinkLytics 🚀
A modern, scalable full-stack URL shortening and real-time analytics platform designed for speed, reliability, and deep insights.

---

## ✨ Key Features

* **Efficient Base62 Encoding**: Converts auto-incrementing database IDs or unique keys into compact, URL-friendly 6-character slugs using Base62 (`a-z`, `A-Z`, `0-9`).
* **Optimized Redirects (302 Found)**: Utilizes HTTP `302 Found` status codes to ensure every click passes through the redirection server, capturing accurate analytics without aggressive permanent caching (`301`) masking subsequent hits.
* **Real-Time Analytics**: Tracks and visualizes user engagement metrics instantly, including click counts, geographic distributions, referral sources, and device/browser breakdowns.
* **Secure Authentication**: Robust user management and endpoint protection using JWT (JSON Web Tokens) and Spring Security.
* **Containerized Architecture**: Fully dockerized microservices and backend setup for seamless local development and cloud deployment.

---

## 🛠️ Tech Stack

### Backend
* **Language & Framework**: Java, Spring Boot
* **Data Access**: Spring Data JPA, Hibernate
* **Database**: PostgreSQL / Neon DB
* **Security**: Spring Security, JWT

### Frontend
* **Library**: React.js
* **Styling**: Tailwind CSS / Modern CSS
* **HTTP Client**: Axios

### DevOps & Tools
* **Containerization**: Docker & Docker Compose
* **API Testing**: Postman
* **Deployment**: Render / Netlify

---

## 🏗️ Architecture & How It Works

1. **Shortening Flow**: 
   * A user submits a long URL via the React frontend.
   * The Spring Boot backend validates the URL, saves it to the database, and generates a unique short code via **Base62 encoding**.
2. **Redirection & Analytics Flow**:
   * When a user visits `linklytics.com/{shortCode}`, the server looks up the original destination.
   * It issues an HTTP `302 Found` response to redirect the browser while asynchronously logging analytics data (timestamp, user-agent, referrer) to keep redirection latency to an absolute minimum.

---

## 🚀 Getting Started Locally

### Prerequisites
* Java 17+
* Node.js & npm
* Docker & Docker Compose (optional, for containerized setup)

### Backend Setup
```bash
# Clone the repository
git clone [https://github.com/your-username/linklytics.git](https://github.com/your-username/linklytics.git)
cd linklytics/backend

# Configure your database in application.properties or .env
# Run the application
./mvnw spring-boot:run
