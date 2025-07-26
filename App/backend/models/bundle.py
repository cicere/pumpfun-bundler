from datetime import datetime
from typing import List, Optional
from enum import Enum

class ExecutionStrategy(str, Enum):
    SIMULTANEOUS = "simultaneous"
    STAGGERED = "staggered"
    DELAYED = "delayed"

class BundleStatus(str, Enum):
    DRAFT = "draft"
    READY = "ready"
    EXECUTING = "executing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class Bundle:
    def __init__(self, **kwargs):
        self.id = kwargs.get('id', '')
        self.name = kwargs.get('name', '')
        self.token_id = kwargs.get('token_id', '')
        self.wallet_ids = kwargs.get('wallet_ids', [])
        self.buy_amounts = kwargs.get('buy_amounts', [])
        self.execution_strategy = kwargs.get('execution_strategy', ExecutionStrategy.SIMULTANEOUS)
        self.status = kwargs.get('status', BundleStatus.DRAFT)
        self.created_at = kwargs.get('created_at', datetime.now().isoformat())
        self.updated_at = kwargs.get('updated_at', datetime.now().isoformat())
        self.executed_at = kwargs.get('executed_at', None)
        self.transaction_signatures = kwargs.get('transaction_signatures', [])
        self.total_amount = kwargs.get('total_amount', 0.0)
        self.estimated_tokens = kwargs.get('estimated_tokens', 0)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'token_id': self.token_id,
            'wallet_ids': self.wallet_ids,
            'buy_amounts': self.buy_amounts,
            'execution_strategy': self.execution_strategy,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'executed_at': self.executed_at,
            'transaction_signatures': self.transaction_signatures,
            'total_amount': self.total_amount,
            'estimated_tokens': self.estimated_tokens
        }