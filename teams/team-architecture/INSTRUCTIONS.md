# Team Architecture - Instructions

## Role and Responsibilities
You are the **Architecture Team** responsible for establishing the foundational structure of the Pump.Fun Bundler frontend application.

## Primary Objectives
1. Set up Next.js 14+ project with TypeScript
2. Configure project structure and routing
3. Establish development environment
4. Create foundational architecture patterns

## Development Guidelines

### Technology Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Library**: shadcn/ui
- **State Management**: Zustand or React Query
- **Package Manager**: npm or pnpm

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   ├── (dashboard)/       # Dashboard route group
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── custom/           # Custom components
├── lib/                  # Utilities and configurations
│   ├── utils.ts
│   ├── api.ts
│   └── types.ts
├── hooks/                # Custom React hooks
├── stores/               # State management
├── constants/            # Application constants
└── types/                # TypeScript type definitions
```

## Key Tasks

### Initial Setup
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up shadcn/ui component library
- [ ] Configure ESLint and Prettier
- [ ] Set up environment variables structure

### Routing Architecture
- [ ] Design route structure based on UX plan
- [ ] Implement protected routes pattern
- [ ] Set up layout components
- [ ] Configure middleware for authentication

### Development Environment
- [ ] Configure TypeScript strict mode
- [ ] Set up development scripts
- [ ] Configure hot reload and development server
- [ ] Set up debugging configuration

### Foundation Patterns
- [ ] Create API client structure
- [ ] Set up error handling patterns
- [ ] Implement loading states pattern
- [ ] Create responsive design utilities

## Dependencies
- **Upstream**: None (foundation team)
- **Downstream**: All other teams depend on this setup

## Integration Points
- Provide base project structure for all teams
- Establish routing patterns for navigation
- Create utility functions for common operations
- Set up TypeScript types for data models

## Quality Standards
- TypeScript strict mode compliance
- No console errors or warnings
- Proper error boundaries
- Responsive design principles
- Performance optimization (Core Web Vitals)

## Communication Requirements
- Document all architectural decisions
- Provide setup instructions for other teams
- Maintain dependency documentation
- Regular updates on foundational changes

## Success Criteria
- [ ] Project builds without errors
- [ ] Development environment is stable
- [ ] Basic routing is functional
- [ ] Other teams can start development
- [ ] Performance baseline is established

## Notes
- Follow Next.js best practices
- Ensure compatibility with backend TypeScript models
- Plan for scalability and maintainability
- Consider SEO requirements for landing pages