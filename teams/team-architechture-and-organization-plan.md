Team Structure and Organization Plan
Overview
This document outlines the team structure for developing the Pump.Fun Bundler frontend using tmux MCP server with Claude Code subagents.

1. In each phase create a relevant teams. Once phase is done move on to next phase and create new teams.
3. Have each team plan a todo list in ./teams/team-name/TODO.md
4. Have each team build according to instruction in ./teams/team-name/INSTRUCTIONS.md
5. Have each give a  feature summary in ./teams/team-name/SUMMARY.md
6. Teams can read and write specification from ../App/docs/xx-spec.md (xx is the spec name)
7. Check on teams that are active in the relevant phase every 5 minutes.

Team Responsibilities
Team Architecture
Role: Foundation and project setup
Focus: Next.js setup, TypeScript configuration, project structure, routing
Team UI Components
Role: Reusable component library
Focus: shadcn/ui integration, custom components, design system
Team Authentication
Role: User management and security
Focus: Login/register, wallet connection, session management
Team Landing Page
Role: Landing page design, SEO, accessibility
Focus: grab user attention 
Team Dashboard
Role: Main application interface
Focus: Overview cards, status monitoring, navigation
Team Wallet Management
Role: Wallet operations and LUT management
Focus: Keypair generation, SOL distribution, profile management
Team Token Launch
Role: Token creation and launch workflows
Focus: Metadata forms, launch strategies, execution interface
Team Bundle Monitoring
Role: Real-time bundle tracking
Focus: Status monitoring, transaction history, performance metrics
Team Analytics
Role: Data visualization and insights
Focus: Charts, reports, performance analytics
Team Backend Integration
Role: API connections and data flow
Focus: TypeScript backend integration, WebSocket connections, state management
Team Testing
Role: Quality assurance and testing
Focus: Unit tests, integration tests, E2E testing
Team Deployment
Role: Production readiness
Focus: Build optimization, deployment pipelines, environment configuration
Coordination Guidelines
Inter-team Dependencies

Architecture → All teams (foundation dependency)
UI Components → All feature teams (component dependency)
Authentication → Dashboard, Wallet Management, Token Launch (auth dependency)
Backend Integration → All feature teams (data dependency)

Communication Protocols

Each team maintains their TODO.md with progress updates
Dependencies are clearly marked in TODO items
Teams communicate through shared documentation
Regular sync points for integration testing

Development Phases
Phase 1: Foundation (Weeks 1-2)

Team Architecture: Project setup
Team UI Components: Basic component library
Team Authentication: Core auth system
Team Landing Page: Landing page design

Phase 2: Core Features (Weeks 3-5)

Team Dashboard: Main interface
Team Wallet Management: Basic wallet operations
Team Token Launch: Launch workflows
Team Backend Integration: API connections

Phase 3: Advanced Features (Weeks 6-7)

Team Bundle Monitoring: Real-time tracking
Team Analytics: Data visualization
Enhanced features for all teams

Phase 4: Polish & Deploy (Week 8)

Team Testing: Comprehensive testing
Bug fixes and optimizations

Do not start Team Deployment in any phase

Quality Standards
Code Standards

TypeScript strict mode
ESLint and Prettier configuration
Component documentation
Error handling patterns

Documentation Requirements

API documentation
Component usage examples
Integration guides
Deployment procedures

Testing Requirements

Unit test coverage > 80%
Integration tests for critical paths
E2E tests for main user flows
Performance testing

This structure ensures clear separation of concerns while maintaining coordination between teams working on the Pump.Fun Bundler frontend.