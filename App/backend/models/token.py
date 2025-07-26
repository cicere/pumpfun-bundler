from datetime import datetime
from typing import Optional
from enum import Enum

class TokenStatus(str, Enum):
    DRAFT = "draft"
    DEPLOYED = "deployed"
    ACTIVE = "active"
    PAUSED = "paused"

class Token:
    def __init__(self, **kwargs):
        self.id = kwargs.get('id', '')
        self.name = kwargs.get('name', '')
        self.symbol = kwargs.get('symbol', '')
        self.description = kwargs.get('description', '')
        self.image_url = kwargs.get('image_url', '')
        self.mint_address = kwargs.get('mint_address', '')
        self.decimals = kwargs.get('decimals', 9)
        self.total_supply = kwargs.get('total_supply', 0)
        self.metadata_uri = kwargs.get('metadata_uri', '')
        self.creator_wallet = kwargs.get('creator_wallet', '')
        self.created_at = kwargs.get('created_at', datetime.now().isoformat())
        self.updated_at = kwargs.get('updated_at', datetime.now().isoformat())
        self.status = kwargs.get('status', TokenStatus.DRAFT)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'symbol': self.symbol,
            'description': self.description,
            'image_url': self.image_url,
            'mint_address': self.mint_address,
            'decimals': self.decimals,
            'total_supply': self.total_supply,
            'metadata_uri': self.metadata_uri,
            'creator_wallet': self.creator_wallet,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'status': self.status
        }