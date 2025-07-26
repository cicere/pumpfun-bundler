# Backend Specification - PumpFun Bundler

## OVERVIEW
FastAPI-based backend service that provides REST API endpoints for the PumpFun Bundler frontend and manages local data persistence.

## TECHNOLOGY STACK
- **Framework**: FastAPI 0.104+
- **Language**: Python 3.11+
- **Database**: JSON file storage (local)
- **Validation**: Pydantic models
- **CORS**: Enabled for frontend integration
- **Documentation**: Auto-generated OpenAPI/Swagger

## PROJECT STRUCTURE
```
App/backend/
├── main.py                 # FastAPI application entry point
├── api/
│   ├── __init__.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── bundler.py      # Bundler operations
│   │   ├── wallets.py      # Wallet management
│   │   ├── tokens.py       # Token operations
│   │   └── config.py       # Configuration endpoints
│   └── dependencies.py     # Shared dependencies
├── models/
│   ├── __init__.py
│   ├── bundler.py          # Bundler data models
│   ├── wallet.py           # Wallet data models
│   └── token.py            # Token data models
├── services/
│   ├── __init__.py
│   ├── storage.py          # JSON file operations
│   ├── bundler_service.py  # Business logic
│   └── validation.py       # Data validation
├── storage/                # Local data storage
│   ├── wallets.json
│   ├── tokens.json
│   ├── bundles.json
│   └── config.json
└── requirements.txt
```

## API ENDPOINTS

### Wallet Management
```
GET    /api/wallets           # List all wallets
POST   /api/wallets           # Create new wallet
GET    /api/wallets/{id}      # Get wallet details
PUT    /api/wallets/{id}      # Update wallet
DELETE /api/wallets/{id}      # Delete wallet
POST   /api/wallets/generate  # Generate multiple wallets
```

### Token Operations
```
GET    /api/tokens            # List all tokens
POST   /api/tokens            # Create new token
GET    /api/tokens/{id}       # Get token details
PUT    /api/tokens/{id}       # Update token metadata
DELETE /api/tokens/{id}       # Delete token
POST   /api/tokens/deploy     # Deploy token to Pump.Fun
```

### Bundle Operations
```
GET    /api/bundles           # List all bundles
POST   /api/bundles           # Create new bundle
GET    /api/bundles/{id}      # Get bundle details
POST   /api/bundles/{id}/execute  # Execute bundle
GET    /api/bundles/{id}/status   # Get execution status
DELETE /api/bundles/{id}      # Cancel/delete bundle
```

### Configuration
```
GET    /api/config            # Get current configuration
PUT    /api/config            # Update configuration
POST   /api/config/validate   # Validate configuration
GET    /api/config/networks   # List available networks
```

### System
```
GET    /api/health            # Health check
GET    /api/version           # API version
GET    /api/docs              # API documentation
```

## DATA MODELS

### Wallet Model
```python
class Wallet(BaseModel):
    id: str
    name: str
    public_key: str
    private_key: str  # Encrypted
    balance: float
    token_accounts: List[TokenAccount]
    created_at: datetime
    updated_at: datetime
    is_active: bool
```

### Token Model
```python
class Token(BaseModel):
    id: str
    name: str
    symbol: str
    description: str
    image_url: str
    mint_address: str
    decimals: int
    total_supply: int
    metadata_uri: str
    creator_wallet: str
    created_at: datetime
    status: TokenStatus
```

### Bundle Model
```python
class Bundle(BaseModel):
    id: str
    name: str
    token_id: str
    wallet_ids: List[str]
    buy_amounts: List[float]
    execution_strategy: ExecutionStrategy
    status: BundleStatus
    created_at: datetime
    executed_at: Optional[datetime]
    transaction_signatures: List[str]
```

## BUSINESS LOGIC

### Bundle Creation Service
```python
class BundlerService:
    def create_bundle(self, bundle_data: BundleCreate) -> Bundle
    def execute_bundle(self, bundle_id: str) -> ExecutionResult
    def validate_bundle(self, bundle: Bundle) -> ValidationResult
    def estimate_costs(self, bundle: Bundle) -> CostEstimate
```

### Storage Service
```python
class StorageService:
    def save_to_json(self, filename: str, data: dict) -> bool
    def load_from_json(self, filename: str) -> dict
    def backup_data(self) -> str
    def restore_data(self, backup_path: str) -> bool
```

## ERROR HANDLING
- **400 Bad Request**: Invalid input data
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation errors
- **500 Internal Server Error**: Server errors
- **503 Service Unavailable**: Blockchain connectivity issues

## SECURITY CONSIDERATIONS
- Input validation on all endpoints
- Rate limiting (100 requests/minute per IP)
- Private key encryption at rest
- CORS configuration for frontend domain only
- Request/response logging for audit trail

## CONFIGURATION
```python
class Settings(BaseSettings):
    app_name: str = "PumpFun Bundler API"
    debug: bool = False
    cors_origins: List[str] = ["http://localhost:3000"]
    storage_path: str = "./storage"
    max_wallets_per_bundle: int = 20
    max_bundle_size_bytes: int = 1232
```

## TESTING REQUIREMENTS
- Unit tests for all services (90% coverage)
- Integration tests for API endpoints
- Load testing for bundle execution
- Mock blockchain responses for testing

## DEPLOYMENT
```bash
# Development
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## MONITORING
- Health check endpoint for uptime monitoring
- Request/response logging
- Performance metrics collection
- Error rate tracking
