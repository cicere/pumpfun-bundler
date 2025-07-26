'use client'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { images, type MascotExpression } from '@/lib/images'

// Re-export the type for use in other components
export type { MascotExpression }

interface MascotProps {
  expression?: MascotExpression
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  alt?: string
}

const sizeConfig = {
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 64, height: 64 },
  xl: { width: 96, height: 96 },
}

export function Mascot({ 
  expression = 'logo', 
  size = 'md', 
  className,
  alt = 'BigBangBot mascot'
}: MascotProps) {
  const { width, height } = sizeConfig[size]
  const imageSrc = images.mascot[expression]

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        'rounded-full object-contain',
        className
      )}
      priority={expression === 'logo'}
    />
  )
}

// Animated mascot that changes expressions
export function AnimatedMascot({ 
  expressions = ['cute', 'satisfied', 'waveWink', 'ok'],
  interval = 3000,
  size = 'md',
  className
}: {
  expressions?: MascotExpression[]
  interval?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const [currentExpression, setCurrentExpression] = React.useState<MascotExpression>(expressions[0])

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExpression(prev => {
        const currentIndex = expressions.indexOf(prev)
        const nextIndex = (currentIndex + 1) % expressions.length
        return expressions[nextIndex]
      })
    }, interval)

    return () => clearInterval(timer)
  }, [expressions, interval])

  return (
    <Mascot 
      expression={currentExpression}
      size={size}
      className={cn('transition-all duration-500', className)}
    />
  )
}
