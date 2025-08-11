'use client'

import { motion, useInView } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Button } from '@/components/ui/button'
import { FlipWords, GradientFlipWords, TypewriterEffect } from '@/components/ui/flip-words'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { ChevronDown, Github, Linkedin, Mail, ArrowDown } from 'lucide-react'
import { Suspense, useState, useEffect, useRef } from 'react'
import { socialLinks } from '../constants/config'

// Optimized 3D Sphere with error handling
function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 64, 64]} scale={2}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.3}
        speed={1}
        roughness={0}
      />
    </Sphere>
  )
}

// Lightweight fallback component
function CanvasFallback() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-purple-900/30" />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
      />
    </div>
  )
}

export default function Hero() {
  const [canvasError, setCanvasError] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: false,
    margin: "-10% 0px -10% 0px"
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Enhanced words array with more engaging content
  const flipWords = [
    "I'm Muhammad Suhaib",
    "Welcome to my digital world",
    "I'm a Computer Science Graduate",
    "I'm a full-stack developer",
    "Co-Founder of SAOTS",
    "AI/ML & Cybersecurity Enthusiast",
    "Let's build the future together"
  ]

  // Typewriter words for alternative effect
  const typewriterWords = [
    {
      text: "I'm Muhammad Suhaib",
      className: "text-purple-400 font-bold"
    },
    {
      text: "Full-Stack Developer",
      className: "text-pink-400 font-bold"
    },
    {
      text: "AI/ML Enthusiast",
      className: "text-blue-400 font-bold"
    },
    {
      text: "Problem Solver",
      className: "text-green-400 font-bold"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const floatingParticleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [0, -100, -200],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 5
      }
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" ref={ref}>
      {/* 3D Background with scroll-triggered optimization */}
      <div className="absolute inset-0 z-0">
        {isClient && !canvasError && isInView ? (
          <Suspense fallback={<CanvasFallback />}>
            <Canvas 
              camera={{ position: [0, 0, 5] }}
              onError={() => setCanvasError(true)}
              gl={{ antialias: false, alpha: true }}
              dpr={[1, 1.5]}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <AnimatedSphere />
              <OrbitControls 
                enableZoom={false} 
                enablePan={false} 
                autoRotate 
                autoRotateSpeed={0.3}
                enableDamping={false}
              />
            </Canvas>
          </Suspense>
        ) : (
          <CanvasFallback />
        )}
      </div>

      {/* Content with scroll-triggered animations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full text-purple-300 text-sm font-medium border border-purple-500/30">
            👋 Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-white">Hi, I'm </span>
          <br className="sm:hidden" />
          {isInView && (
            <AnimatedGradientText 
              className="text-4xl sm:text-6xl lg:text-7xl font-bold"
              duration={12}
            >
              Muhammad Suhaib
            </AnimatedGradientText>
          )}
        </motion.h1>

        {/* Enhanced FlipWords Section with multiple variants */}
        <motion.div
          variants={itemVariants}
          className="mb-8 leading-relaxed min-h-[120px] flex items-center justify-center"
        >
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-xl rounded-full opacity-50" />
            
            {/* Enhanced FlipWords with better mobile support */}
            {isInView && (
              <div className="relative z-10">
                {/* Primary FlipWords */}
                <div className="block">
                  <FlipWords
                    words={flipWords}
                    duration={4000} // Slightly longer for better readability
                    className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-300"
                  />
                </div>
                
                {/* Alternative: Gradient FlipWords (uncomment to use) */}
                <div className="hidden">
                  <GradientFlipWords
                    words={flipWords}
                    duration={4000}
                    className="text-xl sm:text-2xl lg:text-3xl font-bold"
                    gradientClassName="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent"
                  />
                </div>
                
                {/* Alternative: TypeWriter Effect (uncomment to use) */}
                <div className="hidden">
                  <TypewriterEffect
                    words={typewriterWords}
                    className="text-xl sm:text-2xl lg:text-3xl"
                    cursorClassName="bg-purple-400"
                  />
                </div>
              </div>
            )}
            
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
              initial={{ width: 0 }}
              animate={isInView ? { width: "80%" } : { width: 0 }}
              transition={{
                duration: 3,
                repeat: isInView ? Infinity : 0,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          My mission is to solve real-world problems through technology, whether it's a web platform 
          for clients or an AI-driven research prototype.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-500 shadow-lg hover:shadow-purple-500/25"
            >
              Hire Me
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="group border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/25 relative overflow-hidden"
              onClick={() => {
                const portfolioSection = document.querySelector('#portfolio')
                if (portfolioSection) {
                  portfolioSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              <span className="relative z-10 flex items-center">
                See My Work
                <motion.div
                  initial={{ x: 0, opacity: 0.7 }}
                  whileHover={{ x: 4, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="ml-2"
                >
                  <ArrowDown className="w-4 h-4 group-hover:animate-bounce" />
                </motion.div>
              </span>
              
              <motion.div
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 -z-10"
              />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-6 mb-16"
        >
          {socialLinks.map(({ icon: Icon, href, name, color }) => (
            <motion.a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              color=''
              className='p-3 bg-white/10 backdrop-blur-sm rounded-full text-white transition-all duration-400 hover:bg-gray-600/30'
            >
              <Icon className={`w-6 h-6 ${color}`} />
            </motion.a>
          ))}
        </motion.div>
        

        <motion.div
          variants={itemVariants}
          animate={isInView ? {
            y: [0, -10, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          } : {}}
        >
          <ChevronDown className="w-8 h-8 text-white/60 mx-auto" />
        </motion.div>
      </motion.div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50 pointer-events-none" />
      
      {/* Floating particles effect with scroll trigger */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            variants={floatingParticleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
