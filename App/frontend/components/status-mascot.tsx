import { Mascot, type MascotExpression } from './mascot'

interface StatusMascotProps {
  status: 'loading' | 'success' | 'error' | 'warning' | 'idle'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const statusToExpression: Record<StatusMascotProps['status'], MascotExpression> = {
  loading: 'cute',
  success: 'satisfied',
  error: 'sad',
  warning: 'surprised',
  idle: 'logo'
}

export function StatusMascot({ status, size = 'md', className }: StatusMascotProps) {
  const expression = statusToExpression[status]
  
  return (
    <Mascot 
      expression={expression}
      size={size}
      className={className}
      alt={`Status: ${status}`}
    />
  )
}

// Component for showing mascot reactions to user actions
interface ReactionMascotProps {
  reaction: 'happy' | 'excited' | 'thinking' | 'angry' | 'confused' | 'cool'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const reactionToExpression: Record<ReactionMascotProps['reaction'], MascotExpression> = {
  happy: 'satisfied',
  excited: 'waveWink',
  thinking: 'cute',
  angry: 'mad',
  confused: 'surprised',
  cool: 'cool'
}

export function ReactionMascot({ reaction, size = 'md', className }: ReactionMascotProps) {
  const expression = reactionToExpression[reaction]
  
  return (
    <Mascot 
      expression={expression}
      size={size}
      className={className}
      alt={`Reaction: ${reaction}`}
    />
  )
}
