import { Mascot, AnimatedMascot } from '@/components/mascot'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <AnimatedMascot 
              expressions={['logo', 'waveWink', 'satisfied', 'cool']}
              size="xl"
              interval={2000}
            />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              PumpFun Bundler
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create, manage, and execute Solana token bundles with advanced MEV protection 
              and smart trading capabilities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/dashboard">
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/docs">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to trade tokens efficiently on Pump.Fun
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Mascot expression="satisfied" size="sm" />
                <CardTitle>Token Creation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Deploy tokens on Pump.Fun with rich metadata, custom images, and social links.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Mascot expression="cool" size="sm" />
                <CardTitle>Bundle Trading</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Execute multiple buy/sell transactions atomically with optimized transaction sizes.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Mascot expression="ok" size="sm" />
                <CardTitle>MEV Protection</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Protect your trades from front-running with Jito MEV protection integration.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Status Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Mascot expression="cute" size="lg" />
            </div>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              All systems operational and ready for trading
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Solana Network</span>
              <span className="text-green-600 font-medium">✓ Connected</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Jito MEV Protection</span>
              <span className="text-green-600 font-medium">✓ Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pump.Fun Integration</span>
              <span className="text-green-600 font-medium">✓ Ready</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
