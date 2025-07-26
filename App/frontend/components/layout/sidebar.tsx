"use client"

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  LayoutDashboard, 
  Wallet, 
  Coins, 
  Package, 
  Settings,
  Activity,
  TrendingUp,
  Zap
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Wallets',
    href: '/wallets',
    icon: Wallet,
  },
  {
    name: 'Tokens',
    href: '/tokens',
    icon: Coins,
  },
  {
    name: 'Bundles',
    href: '/bundles',
    icon: Package,
  },
]

const secondaryNavigation = [
  {
    name: 'Analytics',
    href: '/analytics',
    icon: TrendingUp,
  },
  {
    name: 'Activity',
    href: '/activity',
    icon: Activity,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-purple-900/20 to-purple-800/10 border-r border-purple-200/20">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-lg overflow-hidden">
            <Image 
              src="/images/BBB-LOGO.PNG" 
              alt="BBB Logo" 
              width={48} 
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              BigBangBot
            </h1>
          </div>
        </div>
      </div>

      <Separator className="mx-6 bg-purple-200/20" />

      {/* Primary Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-10 px-3",
                  isActive 
                    ? "bg-purple-100 text-purple-900 hover:bg-purple-200" 
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-800"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}

        <Separator className="my-4 bg-purple-200/20" />

        {/* Secondary Navigation */}
        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-10 px-3",
                  isActive 
                    ? "bg-purple-100 text-purple-900 hover:bg-purple-200" 
                    : "text-gray-700 hover:bg-purple-50 hover:text-purple-800"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4">
        <div className="rounded-lg bg-gradient-to-r from-purple-500/10 to-purple-600/10 p-3 border border-purple-200/30">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-400"></div>
            <span className="text-sm text-gray-600">Server Connected</span>
          </div>
        </div>
      </div>
    </div>
  )
}