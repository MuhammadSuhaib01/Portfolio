'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Menu, X, Github, Linkedin, Mail } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

// Animated gradient component for the MS logo
function AnimatedMSLogo() {
  return (
    <motion.span
      className="inline-block bg-clip-text text-transparent text-2xl font-bold"
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
        duration: 12, // Same slow speed as the main name
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      MS
    </motion.span>
  )
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll lock effect
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Disable scroll
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.width = '100%'
    } else {
      // Re-enable scroll and restore position
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ]

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    // Enhanced smooth scroll with better timing
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }
    }, 300)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/20 backdrop-blur-md border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Animated MS Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer"
            onClick={() => {
              const homeSection = document.querySelector('#home')
              if (homeSection) {
                homeSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <AnimatedMSLogo />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector(item.href)
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'nearest'
                    })
                  }
                }}
              >
                {item.name}
              </motion.a>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-white/80 hover:text-white"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white/80 hover:text-white relative z-50"
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Full Screen Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`md:hidden fixed inset-0 z-40 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isMobileMenuOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          {/* Navigation Content */}
          <div 
            className="relative h-full w-full bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-lg border-l border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center justify-center h-full px-8">
              {/* Logo/Brand with animated gradient */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-12 text-center"
              >
                <div className="text-4xl font-bold mb-2">
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
                      duration: 12, // Same slow speed
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    Muhammad Suhaib
                  </motion.span>
                </div>
                <p className="text-gray-400 text-center mt-2">Full-Stack Developer</p>
              </motion.div>

              {/* Navigation Items */}
              <nav className="flex flex-col items-center space-y-8 mb-12">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    onClick={() => handleNavClick(item.href)}
                    className="group relative text-2xl font-medium text-white/80 hover:text-white transition-all duration-300 bg-transparent border-none cursor-pointer"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                      style={{ padding: '12px 24px', margin: '-12px -24px' }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      style={{ width: '100%' }}
                    />
                  </motion.button>
                ))}
              </nav>

              {/* Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mb-8"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="text-white/80 hover:text-white hover:bg-white/10 rounded-full px-6 py-3 transition-all duration-300"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-5 w-5 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5 mr-2" />
                      Dark Mode
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex space-x-6"
              >
                {[
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Mail, href: '#contact', label: 'Email' }
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 bg-white/10 backdrop-blur-sm rounded-full text-white/80 hover:text-white hover:bg-purple-500/30 transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </motion.div>

              {/* Close hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isMobileMenuOpen ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute bottom-8 text-gray-500 text-sm"
              >
                Tap outside to close
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}
