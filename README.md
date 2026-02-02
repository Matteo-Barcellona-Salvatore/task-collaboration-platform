# Task Collaboration Platform


> A modern, full-stack task management application built with **Spring Boot** and **Angular 19**, featuring real-time collaboration, beautiful UI/UX, and enterprise-grade architecture.

##  Features

### Core Functionality
- **Kanban Board** - Intuitive drag-and-drop task management (TODO, IN PROGRESS, DONE)
- **User Authentication** - Secure registration and login system
- **Task Management** - Create, edit, delete, and organize tasks
- **Priority Levels** - High, Medium, Low priority classification
- **Due Date Tracking** - Never miss deadlines with date management
- **User Assignment** - Assign tasks to team members

### User Experience
- **Modern UI/UX** - Beautiful gradient designs with smooth animations
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Fast Performance** - Optimized bundle size and lazy loading
- **Dark Mode Ready** - Architecture prepared for theme switching
- **Accessibility** - WCAG 2.1 compliant interface

### Technical Features
- **JWT Authentication** - Secure token-based authentication (configurable)
- **Real-time Updates** - WebSocket support for live collaboration (ready)
- **Persistent Storage** - H2/PostgreSQL database options
- **RESTful API** - Well-structured API with Swagger documentation
- **Docker Ready** - Complete containerization setup
- **Tested** - Unit and integration tests

---

##  Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Programming Language |
| Spring Boot | 3.2.x | Application Framework |
| Spring Data JPA | 3.2.x | Data Persistence |
| Spring Web | 3.2.x | REST API |
| H2 Database | 2.x | Development Database |
| PostgreSQL | 16 | Production Database (optional) |
| Maven | 3.9+ | Build Tool |
| Lombok | Latest | Boilerplate Reduction |
| Swagger/OpenAPI | 3.x | API Documentation |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 19 | Frontend Framework |
| TypeScript | 5.0+ | Type Safety |
| RxJS | 7.x | Reactive Programming |
| Tailwind CSS | 3.x | Utility-first CSS |
| SCSS | Latest | Advanced Styling |
| Bootstrap Icons | 1.11+ | Icon Library |
| STOMP.js | 2.x | WebSocket Client (ready) |

### DevOps & Tools
- **Docker** & **Docker Compose** - Containerization
- **Git** - Version Control
- **GitHub Actions** - CI/CD (ready)
- **Nginx** - Web Server (for production)

---

##  Architecture

### High-Level Architecture
```