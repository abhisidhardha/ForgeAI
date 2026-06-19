# ForgeAI

<div align="center">

**AI-Powered Engineering Operations Platform**

*Plan, manage, and accelerate product development with artificial intelligence*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-%5E18.0.0-61dafb)](https://reactjs.org/)

[Features](#core-features) • [Architecture](#system-architecture) • [Installation](#installation) • [Contributing](#contributing)

</div>

---

## 🚀 Overview

ForgeAI is a comprehensive engineering operations platform that combines project management, team collaboration, and artificial intelligence to help software teams build better products faster. By integrating AI-powered planning, intelligent search, and autonomous engineering agents into a unified workspace, ForgeAI eliminates context switching and accelerates every phase of the development lifecycle.

## 💡 Problem Statement

Modern software teams face critical challenges:

- **Fragmented Tools**: Teams juggle multiple platforms for project management, documentation, communication, and code management
- **Manual Planning Overhead**: Engineering leaders spend countless hours on sprint planning, task breakdown, and resource allocation
- **Knowledge Silos**: Critical project knowledge is scattered across wikis, tickets, Slack threads, and individual minds
- **Inefficient Workflows**: Repetitive engineering tasks consume valuable time that could be spent on innovation
- **Poor Visibility**: Leadership lacks real-time insights into project health, team velocity, and deployment status

## ✨ Solution

ForgeAI unifies your entire engineering workflow into a single, AI-enhanced platform:

- **Unified Workspace**: Manage projects, tasks, documentation, and team collaboration in one place
- **AI-Powered Intelligence**: Leverage AI for project planning, requirement analysis, and documentation generation
- **Autonomous Agents**: Deploy AI agents to automate repetitive engineering tasks and workflows
- **Smart Knowledge Base**: RAG-powered search instantly surfaces relevant context from your entire project history
- **Real-Time Observability**: Track deployments, monitor team performance, and gain actionable insights

## 🎯 Core Features

### Project & Task Management
- **Hierarchical Project Organization**: Organize work across portfolios, projects, epics, and tasks
- **Agile Workflows**: Sprint planning, backlog management, and kanban boards
- **Custom Fields & Views**: Tailor your workspace to match your team's methodology
- **Dependencies & Milestones**: Visualize critical paths and track progress toward key dates

### AI-Powered Planning
- **Intelligent Project Planning**: AI analyzes requirements and generates comprehensive project plans
- **Smart Task Breakdown**: Automatically decompose epics into actionable user stories and tasks
- **Requirement Analysis**: Extract and structure requirements from natural language descriptions
- **Effort Estimation**: AI-assisted story point estimation based on historical data

### Knowledge Management
- **Centralized Documentation**: Create, organize, and maintain technical documentation
- **AI-Assisted Writing**: Generate documentation drafts, API references, and technical specs
- **Retrieval-Augmented Generation (RAG)**: Semantic search across all project knowledge
- **Version Control**: Track changes and maintain documentation history

### Team Collaboration
- **Real-Time Updates**: Stay synchronized with live activity feeds and notifications
- **Threaded Discussions**: Context-aware conversations on tasks, documents, and code
- **@Mentions & Assignments**: Direct communication and clear ownership
- **Team Workspaces**: Organize teams, set permissions, and manage access

### Multi-Agent Workflows
- **Autonomous Engineering Agents**: Deploy AI agents for code review, testing, and deployment
- **Custom Agent Pipelines**: Build workflows that combine multiple specialized agents
- **Agent Orchestration**: Coordinate complex multi-step engineering processes
- **Human-in-the-Loop**: Maintain control with approval gates and oversight

### Deployment & Observability
- **Deployment Tracking**: Monitor releases across environments
- **Performance Analytics**: Track team velocity, cycle time, and throughput
- **Custom Dashboards**: Build views tailored to your KPIs
- **Integration Hub**: Connect with GitHub, GitLab, Jira, Slack, and more

## 🏗️ System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React UI   │  │  Vite Build  │  │   WebSocket  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Express.js  │  │  JWT Auth    │  │  Rate Limit  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Application Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Business   │  │   AI Agent   │  │   Workflow   │      │
│  │    Logic     │  │  Orchestrator│  │    Engine    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        AI Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   OpenAI     │  │  LangChain   │  │  LangGraph   │      │
│  │     API      │  │   Pipeline   │  │   Agents     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │    Vector    │  │    Redis     │      │
│  │   Database   │  │   Database   │  │    Cache     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Infrastructure Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    Docker    │  │  Kubernetes  │  │     AWS      │      │
│  │  Containers  │  │ Orchestration│  │    Cloud     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Technology Stack

### Frontend
- **React** - Component-based UI framework
- **JavaScript** - Primary programming language
- **Vite** - Next-generation frontend build tool

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework

### Database
- **PostgreSQL** - Primary relational database

### Authentication
- **JWT** - JSON Web Token authentication

### AI & Infrastructure
- **OpenAI APIs** - Large language model integration
- **LangChain** - LLM application framework
- **LangGraph** - Multi-agent workflow orchestration
- **Vector Databases** - Semantic search and RAG
- **Redis** - Caching and session management
- **Docker** - Containerization
- **Kubernetes** - Container orchestration
- **AWS** - Cloud infrastructure

## 📁 Folder Structure

```text
forgeai/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   ├── store/         # State management
│   │   ├── utils/         # Utility functions
│   │   └── App.jsx        # Root component
│   ├── public/            # Static assets
│   └── vite.config.js     # Vite configuration
│
├── server/                # Backend application
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── services/      # Business logic
│   │   ├── agents/        # AI agent definitions
│   │   ├── workflows/     # Agent workflows
│   │   └── config/        # Configuration files
│   └── server.js          # Entry point
│
├── database/              # Database scripts
│   ├── migrations/        # Schema migrations
│   └── seeds/             # Seed data
│
├── docker/                # Docker configurations
│   ├── Dockerfile.client
│   ├── Dockerfile.server
│   └── docker-compose.yml
│
├── kubernetes/            # K8s manifests
│   ├── deployments/
│   ├── services/
│   └── ingress/
│
├── docs/                  # Documentation
│   ├── api/              # API documentation
│   ├── architecture/     # Architecture docs
│   └── guides/           # User guides
│
└── README.md
```

## 🚀 Installation

### Prerequisites

- Node.js >= 18.0.0
- PostgreSQL >= 14
- Redis >= 6.0
- Docker (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/forgeai.git
   cd forgeai
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Server configuration
   cp server/.env.example server/.env
   # Edit server/.env with your database credentials and API keys

   # Client configuration
   cp client/.env.example client/.env
   # Edit client/.env with your API endpoint
   ```

4. **Set up the database**
   ```bash
   cd server
   npm run db:migrate
   npm run db:seed
   ```

5. **Start the development servers**
   ```bash
   # Terminal 1 - Start backend
   cd server
   npm run dev

   # Terminal 2 - Start frontend
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Docker Deployment

```bash
docker-compose up -d
```

Access the application:

- Frontend: http://localhost:80
- Backend API: http://localhost:3000
