'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github, Eye, Filter, Grid, List } from 'lucide-react'
import { getTechIcon } from '@/components/ui/tech-icons'
import { ScrollTriggeredAnimation } from '@/components/ui/scroll-triggered-animation'
import { projects } from '@/components/constants/config'

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.1
  })
  
  const [filter, setFilter] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(false)
  const [visibleProjects, setVisibleProjects] = useState(6)
  const [isMobile, setIsMobile] = useState(false)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Comprehensive projects data
  

  // Enhanced categories with counts
  const categories = [
    { name: 'All', count: projects.length },
    { name: 'AI', count: projects.filter(p => p.category === 'AI').length },
    { name: 'Web', count: projects.filter(p => p.category === 'Web').length },
    { name: 'Mobile', count: projects.filter(p => p.category === 'Mobile').length },
    { name: 'Systems', count: projects.filter(p => p.category === 'Systems').length },
    { name: 'Desktop', count: projects.filter(p => p.category === 'Desktop').length },
    { name: 'Hardware', count: projects.filter(p => p.category === 'Hardware').length }
  ]

  // Filter projects with loading simulation
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const displayedProjects = filteredProjects.slice(0, visibleProjects)

  // Handle filter change with loading state
  const handleFilterChange = (newFilter: string) => {
    if (newFilter === filter) return
    
    setIsLoading(true)
    setFilter(newFilter)
    setVisibleProjects(6) // Reset visible projects
    
    // Simulate loading for smooth transition
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  // Load more projects
  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 6, filteredProjects.length))
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: isMobile ? 0.05 : 0.08
      }
    }
  }

  const itemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-transparent to-slate-900/20">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Enhanced Header */}
        <ScrollTriggeredAnimation direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                My{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  Portfolio
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-6"></div>
            </motion.div>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              A comprehensive showcase of my expertise in{' '}
              <span className="text-purple-400 font-semibold">web development</span>,{' '}
              <span className="text-pink-400 font-semibold">mobile applications</span>,{' '}
              <span className="text-blue-400 font-semibold">AI research</span>, and{' '}
              <span className="text-green-400 font-semibold">innovative solutions</span>.
              Each project represents a unique challenge solved with cutting-edge technology.
            </p>

            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-2xl mx-auto"
            >
              {[
                { label: 'Total Projects', value: projects.length, color: 'text-purple-400' },
                { label: 'AI Projects', value: projects.filter(p => p.category === 'AI').length, color: 'text-pink-400' },
                { label: 'Web Apps', value: projects.filter(p => p.category === 'Web').length, color: 'text-blue-400' },
                { label: 'Mobile Apps', value: projects.filter(p => p.category === 'Mobile').length, color: 'text-green-400' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}+
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </ScrollTriggeredAnimation>

        {/* Enhanced Filter Controls */}
        <ScrollTriggeredAnimation direction="up" delay={0.4}>
          <div className="mb-12">
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  variants={filterVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant={filter === category.name ? "default" : "outline"}
                    onClick={() => handleFilterChange(category.name)}
                    size={isMobile ? "sm" : "default"}
                    className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                      filter === category.name
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                        : 'border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:border-purple-500/50'
                    }`}
                    disabled={isLoading}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {category.name}
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      filter === category.name 
                        ? 'bg-white/20 text-white' 
                        : 'bg-purple-500/20 text-purple-300'
                    }`}>
                      {category.count}
                    </span>
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-center items-center gap-4">
              <span className="text-sm text-gray-400">View:</span>
              <div className="flex bg-slate-800/50 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 ${viewMode === 'grid' ? 'bg-purple-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 ${viewMode === 'list' ? 'bg-purple-600' : 'text-gray-400'}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollTriggeredAnimation>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-12"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-400">Loading projects...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              key={filter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8' 
                  : 'space-y-6'
              }`}
            >
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  className="group"
                >
                  {viewMode === 'grid' ? (
                    <ProjectCard project={project} isMobile={isMobile} />
                  ) : (
                    <ProjectListItem project={project} isMobile={isMobile} />
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More Button */}
        {!isLoading && visibleProjects < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button
              onClick={loadMoreProjects}
              size="lg"
              variant="outline"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Load More Projects
              <span className="ml-2 px-2 py-0.5 bg-purple-500/20 rounded-full text-xs">
                +{Math.min(6, filteredProjects.length - visibleProjects)}
              </span>
            </Button>
          </motion.div>
        )}

        {/* No Projects Message */}
        {!isLoading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 text-lg">
              No projects found for "{filter}" category.
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

// Enhanced Project Card Component
function ProjectCard({ project, isMobile }: { project: any, isMobile: boolean }) {
  const cardRef = useRef(null)
  const cardInView = useInView(cardRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -50px 0px"
  })

  return (
    <Card 
      ref={cardRef}
      className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 overflow-hidden h-full group hover:border-purple-500/30"
    >
      <div className="relative overflow-hidden">
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold">
              Featured
            </Badge>
          </div>
        )}

        <motion.img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-48 object-cover"
          initial={{ scale: 1 }}
          whileHover={!isMobile ? { scale: 1.05 } : {}}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />
        
        {/* Overlay with action buttons */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        
        <motion.div 
          className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
          initial={{ y: -10, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
        >
          <Button size="sm" variant="secondary" className="p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30">
            <Github className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="secondary" className="p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Project Metrics Overlay */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="flex gap-2 text-xs text-white">
            {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
              <div key={key} className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                <span className="capitalize">{key}: </span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
            {project.title}
          </h3>
          <div className="flex flex-col gap-1 ml-2">
            <Badge 
              variant="secondary" 
              className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs whitespace-nowrap"
            >
              {project.category}
            </Badge>
            <Badge 
              variant="outline" 
              className="border-gray-600 text-gray-400 text-xs whitespace-nowrap"
            >
              {project.year}
            </Badge>
          </div>
        </div>
        
        <p className="text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3">
          {project.description}
        </p>

        <div className="mb-4">
          <Badge 
            variant="outline" 
            className={`text-xs ${
              project.status === 'Active' ? 'border-green-500/50 text-green-400' :
              project.status === 'Final Year Project' ? 'border-blue-500/50 text-blue-400' :
              project.status === 'Internship Project' ? 'border-yellow-500/50 text-yellow-400' :
              'bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold'
            }`}
          >
            {project.status}
          </Badge>
        </div>

        {/* Technology badges */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
            <motion.div
              key={techIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={cardInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: techIndex * 0.05, duration: 0.2 }}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
            >
              <Badge
                variant="outline"
                className="text-xs border-gray-600 text-gray-400 flex items-center gap-1 hover:border-purple-500/50 hover:text-purple-300 transition-colors duration-200"
              >
                <span className="scale-75">
                  {getTechIcon(tech)}
                </span>
                {tech}
              </Badge>
            </motion.div>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition-all duration-300"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-purple-500/30 text-purple-400 hover:bg-purple-500/20 transition-all duration-300"
          >
            <Github className="w-4 h-4 mr-2" />
            Code
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Project List Item Component
function ProjectListItem({ project, isMobile }: { project: any, isMobile: boolean }) {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 overflow-hidden group hover:border-purple-500/30">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Project Image */}
          <div className="md:w-1/3 relative overflow-hidden rounded-lg">
            <motion.img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-32 md:h-24 object-cover"
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              transition={{ duration: 0.3 }}
              loading="lazy"
            />
            {project.featured && (
              <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                Featured
              </Badge>
            )}
          </div>

          {/* Project Details */}
          <div className="md:w-2/3">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                {project.title}
              </h3>
              <div className="flex gap-2 ml-4">
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                  {project.category}
                </Badge>
                <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                  {project.year}
                </Badge>
              </div>
            </div>

            <p className="text-gray-300 mb-3 leading-relaxed text-sm">
              {project.longDescription || project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies.map((tech: string, index: number) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs border-gray-600 text-gray-400 flex items-center gap-1"
                >
                  <span className="scale-75">{getTechIcon(tech)}</span>
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Status and Actions */}
            <div className="flex items-center justify-between">
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  project.status === 'Active' ? 'border-green-500/50 text-green-400' :
                  project.status === 'Final Year Project' ? 'border-blue-500/50 text-blue-400' :
                  project.status === 'Internship Project' ? 'border-yellow-500/50 text-yellow-400' :
                  'border-gray-600 text-gray-400'
                }`}
              >
                {project.status}
              </Badge>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20">
                  <Github className="w-4 h-4 mr-1" />
                  Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
