'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ScrollTriggeredAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  once?: boolean
  threshold?: number
  margin?: string
  viewport?: {
    once?: boolean
    margin?: string
    amount?: number | "some" | "all"
  }
}

export function ScrollTriggeredAnimation({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  once = true,
  threshold = 0.1,
  margin = "0px 0px -50px 0px", // More aggressive for mobile
  viewport
}: ScrollTriggeredAnimationProps) {
  const ref = useRef(null)
  
  // Enhanced viewport settings for better mobile performance
  const viewportSettings = viewport || {
    once,
    margin,
    amount: threshold
  }
  
  const isInView = useInView(ref, viewportSettings)

  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { y: 30, opacity: 0 } // Reduced distance for mobile
      case 'down':
        return { y: -30, opacity: 0 }
      case 'left':
        return { x: 30, opacity: 0 }
      case 'right':
        return { x: -30, opacity: 0 }
      case 'scale':
        return { scale: 0.9, opacity: 0 } // Less dramatic scale
      case 'fade':
        return { opacity: 0 }
      default:
        return { y: 30, opacity: 0 }
    }
  }

  const getAnimateState = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 }
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 }
      case 'scale':
        return { scale: 1, opacity: 1 }
      case 'fade':
        return { opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialState()}
      animate={isInView ? getAnimateState() : getInitialState()}
      transition={{
        duration,
        delay,
        ease: "easeOut",
        type: "tween" // Better for mobile performance
      }}
    >
      {children}
    </motion.div>
  )
}

// Enhanced staggered animation with mobile optimization
interface StaggeredAnimationProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  childDelay?: number
  once?: boolean
  threshold?: number
  margin?: string
}

export function StaggeredAnimation({
  children,
  className = '',
  staggerDelay = 0.08, // Faster stagger for mobile
  childDelay = 0.2,
  once = true,
  threshold = 0.05, // Lower threshold for mobile
  margin = "0px 0px -30px 0px" // More aggressive margin
}: StaggeredAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once, 
    amount: threshold,
    margin 
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: childDelay,
        staggerChildren: staggerDelay,
        type: "tween"
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Reduced movement
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5, // Faster animation
        ease: "easeOut",
        type: "tween"
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>
      }
    </motion.div>
  )
}

// Mobile-optimized animation hook
export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.05, // Very low threshold for mobile
    margin: "0px 0px -20px 0px", // Aggressive margin
    ...options
  })

  return { ref, isInView }
}

// Performance optimized animation for mobile
export function MobileOptimizedAnimation({
  children,
  className = '',
  delay = 0,
  once = true
}: {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once,
    amount: 0.01, // Very low threshold
    margin: "0px 0px 0px 0px"
  })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{
        duration: 0.4,
        delay,
        ease: "easeOut",
        type: "tween"
      }}
    >
      {children}
    </motion.div>
  )
}
