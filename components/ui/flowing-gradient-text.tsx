'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FlowingGradientTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  duration?: number
}

export function FlowingGradientText({ 
  children, 
  className,
  colors = [
    '#8b5cf6', // purple-500
    '#ec4899', // pink-500
    '#ef4444', // red-500
    '#f97316', // orange-500
    '#eab308', // yellow-500
    '#22c55e', // green-500
    '#06b6d4', // cyan-500
    '#3b82f6', // blue-500
  ],
  duration = 15 // Increased from 6 to 15 seconds
}: FlowingGradientTextProps) {
  const gradientString = `linear-gradient(90deg, ${colors.join(', ')}, ${colors[0]})`
  
  return (
    <motion.span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        background: gradientString,
        backgroundSize: '300% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  )
}
