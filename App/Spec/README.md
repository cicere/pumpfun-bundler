# PumpFun Bundler - Technical Specifications

This directory contains comprehensive technical specifications for the PumpFun Bundler project. These documents serve as the definitive guide for development teams and AI agents working on the project.

## 📋 Document Overview

### Core Specifications
- **[main-spec.md](./main-spec.md)** - Project overview, technology stack, and high-level requirements
- **[backend-spec.md](./backend-spec.md)** - FastAPI backend architecture, API endpoints, and data models
- **[frontend-spec.md](./frontend-spec.md)** - Next.js frontend architecture, components, and UI specifications
- **[integration-spec.md](./integration-spec.md)** - System integration patterns, API contracts, and data flow

### Development Guidelines
- **[development-guidelines.md](./development-guidelines.md)** - Code standards, testing strategy, and best practices
- **[agent-instructions.md](./agent-instructions.md)** - AI agent roles, responsibilities, and collaboration protocols

## 🎯 Project Goals

The PumpFun Bundler is a sophisticated Solana token bundling platform that enables:
- **Token Creation**: Deploy tokens on Pump.Fun with rich metadata
- **Bundle Trading**: Execute multiple buy/sell transactions atomically  
- **MEV Protection**: Jito integration for front-running protection
- **Wallet Management**: Generate and manage multiple keypairs
- **Smart Selling**: Automated selling based on market conditions

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Blockchain    │
│   (Next.js)     │◄──►│   (FastAPI)     │◄──►│   (Solana)      │
│                 │    │                 │    │                 │
│ • React UI      │    │ • REST API      │    │ • Pump.Fun      │
│ • Shadcn UI     │    │ • JSON Storage  │    │ • Jito MEV      │
│ • Zustand       │    │ • Validation    │    │ • SPL Tokens    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: Shadcn UI + Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **API Client**: Axios with React Query

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Storage**: JSON files (local)
- **Validation**: Pydantic
- **Testing**: Pytest

### Blockchain
- **Platform**: Solana
- **Framework**: Anchor
- **MEV Protection**: Jito
- **Libraries**: Web3.js, SPL Token

## 📋 Development Phases

1. **Setup Phase** (1 hour)
   - Environment configuration
   - Project structure setup
   - Dependency installation

2. **UI Development** (3 hours)
   - Component implementation
   - Responsive design
   - User experience polish

3. **Backend Development** (2 hours)
   - API endpoint creation
   - Business logic implementation
   - Data persistence layer

4. **Integration** (2 hours)
   - Frontend-backend connection
   - API integration
   - End-to-end testing

5. **Polish & Testing** (1 hour)
   - Bug fixes
   - Performance optimization
   - Final testing

## 👥 Team Roles

### Frontend Development Agent
- React/Next.js UI development
- Component architecture
- User experience optimization
- Client-side performance

### Backend Development Agent
- FastAPI development
- Business logic implementation
- API design and documentation
- Data validation and storage

### Blockchain Integration Agent
- Solana Web3.js integration
- Transaction optimization
- MEV protection implementation
- Wallet security

### DevOps Agent
- Environment setup
- Build and deployment
- Monitoring and logging
- Performance optimization

## 🔒 Security Requirements

- **Private Key Security**: Never commit private keys
- **Input Validation**: Comprehensive validation on all inputs
- **Error Handling**: Graceful error handling without data leakage
- **Rate Limiting**: Protect against abuse
- **Audit Trail**: Log all important operations

## 📊 Performance Requirements

- **Transaction Size**: Bundles under 1232 bytes
- **API Response**: Sub-second response times
- **Memory Usage**: Efficient handling of large keypair sets
- **Scalability**: Support high-frequency trading scenarios

## 🧪 Testing Strategy

### Frontend Testing
- Component tests with React Testing Library
- Integration tests with Playwright
- Performance testing with Lighthouse

### Backend Testing
- Unit tests with Pytest
- API tests with TestClient
- Load testing for bundle operations

### Integration Testing
- End-to-end user flows
- Cross-component integration
- Blockchain integration tests

## 📝 Documentation Standards

### Code Documentation
- TypeScript interfaces and types documented
- Complex business logic explained
- API endpoints with OpenAPI/Swagger
- Component props and usage examples

### Process Documentation
- Setup and installation guides
- Development workflow procedures
- Deployment instructions
- Troubleshooting guides

## 🚀 Quick Start

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd pumpfun-bundler
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Fill in your configuration values
   ```

4. **Start Development**
   ```bash
   # Backend
   cd App/backend
   uvicorn main:app --reload

   # Frontend  
   cd App/frontend
   npm run dev

   # Core CLI
   npm run start
   ```

## 📞 Support & Communication

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Documentation**: Update specs when making architectural changes
- **Code Review**: All changes require review from relevant agent roles
- **Testing**: Comprehensive testing required before deployment

## 📚 Additional Resources

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Framework](https://project-serum.github.io/anchor/)
- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Shadcn UI Components](https://ui.shadcn.com/)

---

**Note**: These specifications are living documents that should be updated as the project evolves. All team members and agents should refer to these documents for consistent development practices.
