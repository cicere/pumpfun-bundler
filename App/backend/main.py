from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="PumpFun Bundler API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "PumpFun Bundler API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Backend server is running"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)