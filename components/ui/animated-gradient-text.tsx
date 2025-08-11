'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
  duration?: number
}

export function AnimatedGradientText({ 
  children, 
  className,
  duration = 12 // Increased from 4 to 12 seconds
}: AnimatedGradientTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      {/* Animated gradient text */}
      <motion.span
        className="inline-block bg-clip-text text-transparent"
        style={{
          background: 'linear-gradient(90deg, #8b5cf6, #a855f7, #c084fc, #ec4899, #f472b6, #ef4444, #f87171, #f97316, #fb923c, #eab308, #facc15, #22c55e, #4ade80, #06b6d4, #22d3ee, #3b82f6, #60a5fa, #8b5cf6)',
          backgroundSize: '400% 100%',
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
      
      {/* Shimmer effect overlay - slower */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent bg-clip-text text-transparent"
        style={{
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        animate={{
          backgroundPosition: ['-200% 0%', '200% 0%'],
        }}
        transition={{
          duration: duration / 1.5, // Slower shimmer effect
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}
