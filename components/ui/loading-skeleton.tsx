'use client'

import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export function LoadingSkeleton({ 
  className = '', 
  variant = 'rectangular',
  width = '100%',
  height = '20px'
}: LoadingSkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse"
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    >
      <motion.div
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="h-full w-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
      />
    </motion.div>
  )
}

// Pre-built skeleton components
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <LoadingSkeleton
          key={i}
          height="16px"
          width={i === lines - 1 ? '75%' : '100%'}
        />
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <LoadingSkeleton variant="circular" width="60px" height="60px" />
      <LoadingSkeleton height="24px" width="80%" />
      <TextSkeleton lines={2} />
      <LoadingSkeleton height="40px" width="120px" />
    </div>
  )
}
