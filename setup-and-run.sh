#!/bin/bash
# PumpFun Bundler - Quick Setup and Run Script

echo "🚀 Setting up PumpFun Bundler Frontend and Backend..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

if ! command_exists python; then
    echo -e "${RED}❌ Python is not installed. Please install Python first.${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Setup Backend
echo -e "${YELLOW}Setting up Backend...${NC}"
cd App/backend

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo -e "${GREEN}✅ Backend setup complete${NC}"

# Setup Frontend
echo -e "${YELLOW}Setting up Frontend...${NC}"
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "Installing Node.js dependencies..."
    npm install
else
    echo "Node modules already installed"
fi

echo -e "${GREEN}✅ Frontend setup complete${NC}"

# Instructions
echo -e "\n${GREEN}🎉 Setup Complete!${NC}"
echo -e "\n${YELLOW}To run the applications:${NC}"
echo ""
echo -e "${GREEN}Backend (Terminal 1):${NC}"
echo "cd App/backend"
echo "source venv/bin/activate"
echo "uvicorn main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo -e "${GREEN}Frontend (Terminal 2):${NC}" 
echo "cd App/frontend"
echo "npm run dev"
echo ""
echo -e "${GREEN}Access URLs:${NC}"
echo "• Frontend: http://localhost:3000"
echo "• Backend API: http://localhost:8000"
echo "• API Docs: http://localhost:8000/docs"
echo ""
echo -e "${YELLOW}Note: Make sure to run both backend and frontend in separate terminals${NC}"
