'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Globe, Smartphone, Brain, Palette, MessageSquare, ArrowRight } from 'lucide-react'
import { ScrollTriggeredAnimation, StaggeredAnimation } from '@/components/ui/scroll-triggered-animation'

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Full-stack web applications using React, Next.js, and modern frameworks. From concept to deployment.',
      features: ['Responsive Design', 'Performance Optimization', 'SEO Friendly', 'Modern UI/UX'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Smartphone,
      title: 'Android App Development',
      description: 'Native Android applications using Java/Kotlin and cross-platform solutions with Flutter.',
      features: ['Native Performance', 'Material Design', 'Play Store Ready', 'Cross-platform'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Brain,
      title: 'AI & Computer Vision',
      description: 'AI-powered solutions including computer vision, machine learning models, and intelligent systems.',
      features: ['YOLOv8 Integration', 'Custom ML Models', 'Real-time Processing', 'Data Analysis'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'User-centered design solutions that combine aesthetics with functionality for optimal user experience.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: MessageSquare,
      title: 'Consultation & Architecture',
      description: 'Technical consultation and system architecture planning for scalable and maintainable solutions.',
      features: ['System Design', 'Code Review', 'Performance Audit', 'Best Practices'],
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header with scroll trigger */}
        <ScrollTriggeredAnimation direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              My{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive development services tailored to bring your ideas to life 
              with cutting-edge technology and innovative solutions.
            </p>
          </div>
        </ScrollTriggeredAnimation>

        {/* Services grid with staggered animation */}
        <StaggeredAnimation staggerDelay={0.15} childDelay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group"
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 h-full overflow-hidden relative">
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <CardHeader className="relative z-10">
                    <motion.div 
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.color} p-4 mb-4`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center text-sm text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: featureIndex * 0.1,
                            duration: 0.3
                          }}
                          viewport={{ once: true }}
                        >
                          <motion.div 
                            className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"
                            whileHover={{ scale: 1.5 }}
                            transition={{ duration: 0.2 }}
                          />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>

                    <Button 
                      variant="ghost" 
                      className="w-full text-purple-400 hover:text-white hover:bg-purple-500/20 group/btn transition-all duration-300"
                    >
                      Learn More
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </motion.div>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </StaggeredAnimation>
      </div>
    </section>
  )
}
