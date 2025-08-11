'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface WaveGradientTextProps {
  children: React.ReactNode
  className?: string
  duration?: number
}

export function WaveGradientText({ 
  children, 
  className,
  duration = 10 // Increased from 5 to 10 seconds
}: WaveGradientTextProps) {
  const text = children?.toString() || ''
  
  return (
    <span className={cn("relative inline-block", className)}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block bg-clip-text text-transparent"
          style={{
            background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #3b82f6, #8b5cf6)',
            backgroundSize: '800% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          animate={{
            backgroundPosition: [
              `${-index * 50}% 50%`,
              `${200 - index * 50}% 50%`,
              `${-index * 50}% 50%`
            ],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2, // Increased delay between characters
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}
