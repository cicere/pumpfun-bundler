"use client"

import { Bell, Search, User, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function Header() {
  return (
    <header className="h-16 border-b border-purple-200/20 bg-white/50 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-6">
        {/* Search */}
        <div className="flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search wallets, tokens, bundles..."
              className="w-full h-10 pl-10 pr-4 text-sm border border-purple-200/30 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-4 mr-4">
            <div className="text-center">
              <div className="text-sm font-semibold text-gray-900">24</div>
              <div className="text-xs text-gray-500">Active Wallets</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-purple-600">5</div>
              <div className="text-xs text-gray-500">Running Bundles</div>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 hover:bg-red-600">
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-purple-50 rounded-lg p-2 transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-purple-600 text-white text-sm">
                U
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-900">User</div>
              <div className="text-xs text-gray-500">Trader</div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  )
}