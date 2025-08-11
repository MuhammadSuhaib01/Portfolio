'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollTriggeredAnimation } from '@/components/ui/scroll-triggered-animation'

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6">
          <ScrollTriggeredAnimation direction="up" delay={0.2}>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to collaborate?
              </h3>
              <p className="text-gray-300">
                Let's build something amazing together. 🚀
              </p>
            
            </div>
          </ScrollTriggeredAnimation>

          <ScrollTriggeredAnimation direction="fade" delay={0.4}>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <motion.div
                animate={isInView ? {
                  scale: [1, 1.2, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                } : {}}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>by Muhammad Suhaib</span>
            </div>
          </ScrollTriggeredAnimation>

          <ScrollTriggeredAnimation direction="fade" delay={0.6}>
            <div className="text-center text-sm text-gray-500">
              <p>&copy; 2024 Muhammad Suhaib. All rights reserved.</p>
              <p className="mt-1">Computer Science Graduate • Full-Stack Developer • Co-founder of SAOTS</p>
            </div>
          </ScrollTriggeredAnimation>
        </div>

        {/* Back to Top Button with scroll trigger */}
        <ScrollTriggeredAnimation direction="scale" delay={0.8}>
          <div className="absolute bottom-8 right-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={scrollToTop}
                size="icon"
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-purple-500/25"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </ScrollTriggeredAnimation>
      </div>
    </footer>
  )
}
