# TaskFlow – Smart Task Management System

TaskFlow is a robust, full-stack **task management application** that mirrors the real-world workflow of modern organizations. With features such as **role-based access control**, live dashboards, secure authentication, and intuitive visualization, TaskFlow empowers teams to collaborate efficiently and efficiently manage projects of any scale.

## 🚀 Features

- **Multi-User Task Management:** Create, assign, edit, and track tasks among users and teams.
- **Role-Based Access:** Admins, managers, and team members have custom permissions.
- **Intuitive Dashboard:** Visual overview of task progress, user activity, and deadlines.
- **Real-Time Updates:** (Optional) Instant task visibility across all users using SignalR.
- **Secure Auth:** ASP.NET Identity and JWT for login, signup, and session control.
- **Data Visualization:** View analytics with interactive charts (Chart.js).
- **API-Driven:** RESTful backend for scalable integration.
- **Activity Logs:** Track task changes, ownership, and project history.

## 📦 Tech Stack

| Layer       | Technology                                  |
|-------------|---------------------------------------------|
| Backend     | ASP.NET Core, C#, Entity Framework Core     |
| Frontend    | Angular, NgRx, Chart.js                     |
| Database    | SQL Server                                  |
| Auth        | ASP.NET Identity, JWT                       |
| DevOps      | GitHub Actions, Azure/Netlify               |

## 🏗️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

### 2. Backend Setup

- Prerequisites: [.NET 6+ SDK](https://dotnet.microsoft.com/) and SQL Server.

```bash
cd backend
dotnet restore
dotnet ef database update          # Applies database migrations
dotnet run
```

- **API is live at:** `https://localhost:5001/api/`

### 3. Frontend Setup

- Prerequisites: [Node.js](https://nodejs.org/) and npm.

```bash
cd frontend
npm install
ng serve
```

- **Frontend runs at:** `http://localhost:4200/`

## 🗃️ Database Schema Overview

- **Users:** `Id`, `Name`, `Email`, `PasswordHash`, `RoleId`
- **Roles:** `Id`, `RoleName`
- **Tasks:** `Id`, `Title`, `Description`, `AssignedTo`, `Status`, `DueDate`
- **TaskLogs:** `Id`, `TaskId`, `UserId`, `Action`, `TimeStamp`

## 🔒 Authentication & Security

- ASP.NET Identity and JWT tokens for secure, stateless authentication.
- Only authorized users can perform actions based on their roles.

## 📊 Data Visualization

- View completed vs. pending tasks, productivity stats, and more through elegant charts powered by Chart.js.

## 🌐 Real-World Connectivity

TaskFlow simulates organizational work processes:
- **Managers assign tasks, team members execute, and admins oversee.**
- **Audit logs** and **role permissions** map to real-life corporate domains.
- **Scalable APIs** allow for integration with HR, project management, or notification systems.

## 🛠️ Deployment

- Ready for cloud (Azure) or on-premises deployment.
- CI/CD pipelines with GitHub Actions.
- Build artifacts and secrets managed via GitHub repository settings.

## 🤝 Contributing

Pull requests welcome! Please open issues for feature requests and bug reports.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- Angular
- ASP.NET Core
- Chart.js
- NgRx

**TaskFlow:** _Modern task management for real-world teams._
