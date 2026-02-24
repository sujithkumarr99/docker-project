MERN Student Registration System - DevOps Edition

A full-stack Student Registration Management System built using the MERN stack, fully containerized using Docker Compose and integrated with Prometheus and Grafana for monitoring.

---
Tech Stack

Frontend
- React (Vite)
- Nginx (Production build)

Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

DevOps & Infrastructure
- Docker
- Docker Compose
- Prometheus (Monitoring)
- Node Exporter
- cAdvisor
- Grafana (Dashboard)
- Wireshark (Network Monitoring)

---

Architecture

Frontend → Backend → MongoDB  
Monitoring → Prometheus → Grafana  
Container Metrics → cAdvisor  
System Metrics → Node Exporter  

All services run inside Docker containers.

---

Services Included

| Service | Port |
|----------|------|
| Frontend | 3000 |
| Backend API | 5000 |
| MongoDB | 27017 |
| Prometheus | 9090 |
| Grafana | 3002 |
| cAdvisor | 8085 |
| Node Exporter | 9100 |
| Wireshark | 3001 |



```bash
git clone https://github.com/your-username/mern-student-registration-devops.git
cd mern-student-registration-devops
