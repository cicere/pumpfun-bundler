#!/usr/bin/env python3
import json
import os
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import uuid
import sys
sys.path.append('.')
from models.token import Token, TokenStatus
from models.bundle import Bundle, BundleStatus, ExecutionStrategy

class APIHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_OPTIONS(self):
        self._set_headers()
    
    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        if path == '/health':
            self._set_headers()
            response = {"status": "healthy", "message": "Backend server is running"}
            self.wfile.write(json.dumps(response).encode())
        
        elif path == '/api/wallets':
            self._set_headers()
            wallets = self._load_wallets()
            self.wfile.write(json.dumps(wallets).encode())
        
        elif path.startswith('/api/wallets/'):
            wallet_id = path.split('/')[-1]
            wallets = self._load_wallets()
            wallet = next((w for w in wallets if w['id'] == wallet_id), None)
            
            if wallet:
                self._set_headers()
                self.wfile.write(json.dumps(wallet).encode())
            else:
                self._set_headers(404)
                self.wfile.write(json.dumps({"error": "Wallet not found"}).encode())
        
        elif path == '/api/tokens':
            self._set_headers()
            tokens = self._load_tokens()
            self.wfile.write(json.dumps(tokens).encode())
        
        elif path.startswith('/api/tokens/'):
            token_id = path.split('/')[-1]
            tokens = self._load_tokens()
            token = next((t for t in tokens if t['id'] == token_id), None)
            
            if token:
                self._set_headers()
                self.wfile.write(json.dumps(token).encode())
            else:
                self._set_headers(404)
                self.wfile.write(json.dumps({"error": "Token not found"}).encode())
        
        elif path == '/api/bundles':
            self._set_headers()
            bundles = self._load_bundles()
            self.wfile.write(json.dumps(bundles).encode())
        
        elif path.startswith('/api/bundles/'):
            parts = path.split('/')
            if len(parts) >= 4:
                bundle_id = parts[3]
                if len(parts) == 4:  # GET /api/bundles/{id}
                    bundles = self._load_bundles()
                    bundle = next((b for b in bundles if b['id'] == bundle_id), None)
                    
                    if bundle:
                        self._set_headers()
                        self.wfile.write(json.dumps(bundle).encode())
                    else:
                        self._set_headers(404)
                        self.wfile.write(json.dumps({"error": "Bundle not found"}).encode())
                else:
                    self._set_headers(404)
                    self.wfile.write(json.dumps({"error": "Not found"}).encode())
            else:
                self._set_headers(404)
                self.wfile.write(json.dumps({"error": "Not found"}).encode())
        
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')
        
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        if path == '/api/wallets':
            try:
                data = json.loads(post_data)
                wallet = self._create_wallet(data)
                self._set_headers(201)
                self.wfile.write(json.dumps(wallet).encode())
            except Exception as e:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        
        elif path == '/api/tokens':
            try:
                data = json.loads(post_data)
                token = self._create_token(data)
                self._set_headers(201)
                self.wfile.write(json.dumps(token).encode())
            except Exception as e:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def do_PUT(self):
        content_length = int(self.headers['Content-Length'])  
        post_data = self.rfile.read(content_length).decode('utf-8')
        
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        if path.startswith('/api/tokens/'):
            token_id = path.split('/')[-1]  
            try:
                data = json.loads(post_data)
                token = self._update_token(token_id, data)
                if token:
                    self._set_headers()
                    self.wfile.write(json.dumps(token).encode())
                else:
                    self._set_headers(404)
                    self.wfile.write(json.dumps({"error": "Token not found"}).encode())
            except Exception as e:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not found"}).encode())
    
    def _load_wallets(self):
        try:
            with open('./storage/wallets.json', 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return []
    
    def _save_wallets(self, wallets):
        os.makedirs('./storage', exist_ok=True)
        with open('./storage/wallets.json', 'w') as f:
            json.dump(wallets, f, indent=2)
    
    def _create_wallet(self, data):
        wallet = {
            "id": str(uuid.uuid4()),
            "name": data.get("name", "Wallet"),
            "public_key": data.get("public_key", ""),
            "private_key": data.get("private_key", ""),
            "balance": 0.0,
            "token_accounts": [],
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat(),
            "is_active": True
        }
        
        wallets = self._load_wallets()
        wallets.append(wallet)
        self._save_wallets(wallets)
        
        return wallet
    
    def _load_tokens(self):
        try:
            with open('./storage/tokens.json', 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return []
    
    def _save_tokens(self, tokens):
        os.makedirs('./storage', exist_ok=True)
        with open('./storage/tokens.json', 'w') as f:
            json.dump(tokens, f, indent=2)
    
    def _create_token(self, data):
        token = Token(
            id=str(uuid.uuid4()),
            name=data.get("name", ""),
            symbol=data.get("symbol", ""),
            description=data.get("description", ""),
            image_url=data.get("image_url", ""),
            mint_address=data.get("mint_address", ""),
            decimals=data.get("decimals", 9),
            total_supply=data.get("total_supply", 0),
            metadata_uri=data.get("metadata_uri", ""),
            creator_wallet=data.get("creator_wallet", ""),
            status=data.get("status", TokenStatus.DRAFT)
        )
        
        tokens = self._load_tokens()
        tokens.append(token.to_dict())
        self._save_tokens(tokens)
        
        return token.to_dict()
    
    def _update_token(self, token_id, data):
        tokens = self._load_tokens()
        token_index = next((i for i, t in enumerate(tokens) if t['id'] == token_id), None)
        
        if token_index is not None:
            # Update fields
            for key, value in data.items():
                if key in tokens[token_index]:
                    tokens[token_index][key] = value
            tokens[token_index]['updated_at'] = datetime.now().isoformat()
            
            self._save_tokens(tokens)
            return tokens[token_index]
        
        return None

if __name__ == '__main__':
    server = HTTPServer(('0.0.0.0', 8000), APIHandler)
    print("Server running on port 8000...")
    server.serve_forever()