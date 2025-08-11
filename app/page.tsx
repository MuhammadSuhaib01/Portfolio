'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Services from '@/components/sections/services'
import Portfolio from '@/components/sections/portfolio'
import Contact from '@/components/sections/contact'
import Footer from '@/components/sections/footer'
import Navigation from '@/components/navigation'
import Loading from '@/components/ui/loading'
import { ThemeProvider } from '@/components/theme-provider'
import { AnimatePresence } from 'framer-motion'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Simulate realistic loading with actual progress tracking
    const loadingSteps = [
      { step: 'Initializing...', progress: 20, delay: 300 },
      { step: 'Loading assets...', progress: 50, delay: 400 },
      { step: 'Preparing 3D scene...', progress: 80, delay: 500 },
      { step: 'Ready!', progress: 100, delay: 300 }
    ]

    let currentStep = 0
    const executeStep = () => {
      if (currentStep < loadingSteps.length) {
        const { progress, delay } = loadingSteps[currentStep]
        setLoadingProgress(progress)
        
        setTimeout(() => {
          currentStep++
          if (currentStep < loadingSteps.length) {
            executeStep()
          } else {
            // Complete loading
            setTimeout(() => setIsLoading(false), 200)
          }
        }, delay)
      }
    }

    // Start loading sequence
    const startTimer = setTimeout(executeStep, 100)

    // Cleanup
    return () => clearTimeout(startTimer)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loading 
            key="loading"
            progress={loadingProgress}
            onComplete={() => setIsLoading(false)} 
          />
        ) : (
          <div 
            key="main-content"
            className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          >
            <Navigation />
            <section id="home">
              <Hero />
            </section>
            <section id="about">
              <About />
            </section>
            <section id="services">
              <Services />
            </section>
            <section id="portfolio">
              <Portfolio />
            </section>
            <section id="contact">
              <Contact />
            </section>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}
