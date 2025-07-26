import { Mascot, AnimatedMascot } from '@/components/mascot'
import { StatusMascot, ReactionMascot } from '@/components/status-mascot'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { images } from '@/lib/images'

export default function MascotDemo() {
  const mascotExpressions = Object.keys(images.mascot) as Array<keyof typeof images.mascot>

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">BigBangBot Mascot Gallery</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meet our friendly mascot with various expressions and moods for different application states.
        </p>
      </div>

      {/* Animated Mascot Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Animated Mascot</CardTitle>
          <CardDescription>
            Our mascot can cycle through different expressions automatically
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <AnimatedMascot 
            expressions={['logo', 'waveWink', 'satisfied', 'cool', 'cute']}
            size="xl"
            interval={1500}
          />
        </CardContent>
      </Card>

      {/* All Expressions */}
      <Card>
        <CardHeader>
          <CardTitle>All Expressions</CardTitle>
          <CardDescription>
            Complete collection of mascot expressions available in the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {mascotExpressions.map((expression) => (
              <div key={expression} className="text-center space-y-2">
                <Mascot expression={expression} size="lg" className="mx-auto" />
                <p className="text-sm font-medium capitalize">
                  {expression.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Status Indicators</CardTitle>
          <CardDescription>
            Mascot expressions used to indicate different application states
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {(['loading', 'success', 'error', 'warning', 'idle'] as const).map((status) => (
              <div key={status} className="text-center space-y-2">
                <StatusMascot status={status} size="lg" className="mx-auto" />
                <p className="text-sm font-medium capitalize">{status}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reaction Expressions */}
      <Card>
        <CardHeader>
          <CardTitle>Reaction Expressions</CardTitle>
          <CardDescription>
            Mascot reactions to user interactions and events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {(['happy', 'excited', 'thinking', 'angry', 'confused', 'cool'] as const).map((reaction) => (
              <div key={reaction} className="text-center space-y-2">
                <ReactionMascot reaction={reaction} size="lg" className="mx-auto" />
                <p className="text-sm font-medium capitalize">{reaction}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Size Variations */}
      <Card>
        <CardHeader>
          <CardTitle>Size Variations</CardTitle>
          <CardDescription>
            Different sizes available for various UI contexts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-8">
            {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <div key={size} className="text-center space-y-2">
                <Mascot expression="logo" size={size} className="mx-auto" />
                <p className="text-sm font-medium uppercase">{size}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
