'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/tooltip'
import { Mail, Phone, MapPin, Send, Calendar, Github, Linkedin, User, AtSign, MessageSquare, FileText, CheckCircle, AlertCircle, Loader2, Info } from 'lucide-react'
import { ScrollTriggeredAnimation, StaggeredAnimation } from '@/components/ui/scroll-triggered-animation'

// Comprehensive regex patterns for validation
const VALIDATION_PATTERNS = {
  name: /^[a-zA-Z\s]{2,50}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  subject: /^[a-zA-Z0-9\s\-_.,!?]{5,100}$/,
  message: /^[a-zA-Z0-9\s\-_.,!?()'"\/\n\r]{10,1000}$/
}

// Field configurations with tooltips
const FIELD_CONFIG = {
  name: {
    icon: User,
    label: 'Name',
    placeholder: 'John Doe',
    tooltip: 'Enter your full name (letters and spaces only)',
    maxLength: 50,
    pattern: 'letters and spaces only'
  },
  email: {
    icon: AtSign,
    label: 'Email',
    placeholder: 'john.doe@company.com',
    tooltip: 'Enter your professional work email address',
    maxLength: 100,
    pattern: 'valid email format'
  },
  subject: {
    icon: FileText,
    label: 'Subject',
    placeholder: 'Web Development Project',
    tooltip: 'Specify which aspect of my services you need',
    maxLength: 100,
    pattern: 'letters, numbers, and basic punctuation'
  },
  message: {
    icon: MessageSquare,
    label: 'Message',
    placeholder: 'Tell me about your project requirements, timeline, budget, and any specific features you need...',
    tooltip: 'Provide detailed information about your project',
    maxLength: 1000,
    pattern: 'detailed project information'
  }
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  // Enhanced validation function
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    const trimmedValue = value.trim()
    
    if (!trimmedValue) {
      return `${FIELD_CONFIG[name].label} is required`
    }

    if (!VALIDATION_PATTERNS[name].test(trimmedValue)) {
      switch (name) {
        case 'name':
          return 'Name must contain only letters and spaces (2-50 characters)'
        case 'email':
          return 'Please enter a valid email address (e.g., name@domain.com)'
        case 'subject':
          return 'Subject must be 5-100 characters with letters, numbers, and basic punctuation'
        case 'message':
          return 'Message must be 10-1000 characters with letters, numbers, and basic punctuation'
        default:
          return 'Invalid input format'
      }
    }

    // Additional email validation
    if (name === 'email') {
      const emailParts = trimmedValue.split('@')
      if (emailParts.length !== 2 || emailParts[0].length < 1 || emailParts[1].length < 3) {
        return 'Please enter a valid email address'
      }
    }

    return undefined
  }

  // Handle input change with real-time validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const fieldName = name as keyof FormData

    // Update form data
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))

    // Clear status message when user starts typing
    if (status.message) {
      setStatus({ type: 'idle' })
    }

    // Validate if field has been touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value)
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }))
    }
  }

  // Handle field blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const fieldName = name as keyof FormData

    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }))

    const error = validateField(fieldName, value)
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }))
  }

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    Object.keys(formData).forEach(key => {
      const fieldName = key as keyof FormData
      const error = validateField(fieldName, formData[fieldName])
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    })

    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setStatus({
        type: 'error',
        message: 'Please fix the validation errors above before submitting.'
      })
      return
    }

    setStatus({ type: 'loading' })

    try {
      // Email data for msuhaibkl@gmail.com
      const emailData = {
        to: 'msuhaibkl@gmail.com',
        from: formData.email,
        replyTo: formData.email,
        subject: `Portfolio Contact: ${formData.subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
              .section { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #8b5cf6; }
              .footer { background: #1e293b; color: #94a3b8; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; }
              .highlight { color: #8b5cf6; font-weight: 600; }
              .message-content { background: #f1f5f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">🚀 New Contact Form Submission</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">From your portfolio website</p>
              </div>
              
              <div class="content">
                <div class="section">
                  <h3 style="margin-top: 0; color: #1e293b;">👤 Contact Information</h3>
                  <p><strong>Name:</strong> <span class="highlight">${formData.name}</span></p>
                  <p><strong>Email:</strong> <span class="highlight">${formData.email}</span></p>
                  <p><strong>Subject:</strong> <span class="highlight">${formData.subject}</span></p>
                </div>
                
                <div class="section">
                  <h3 style="margin-top: 0; color: #1e293b;">💼 Project Details</h3>
                  <div class="message-content">${formData.message}</div>
                </div>
                
                <div class="section">
                  <h3 style="margin-top: 0; color: #1e293b;">📊 Submission Details</h3>
                  <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                  <p><strong>Source:</strong> Portfolio Contact Form</p>
                  <p><strong>Reply To:</strong> <a href="mailto:${formData.email}" style="color: #8b5cf6;">${formData.email}</a></p>
                </div>
              </div>
              
              <div class="footer">
                <p style="margin: 0;">This message was sent from your portfolio contact form.</p>
                <p style="margin: 5px 0 0 0;">Muhammad Suhaib - Full-Stack Developer</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
New Contact Form Submission

Contact Information:
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Project Details:
${formData.message}

Submitted: ${new Date().toLocaleString()}
Reply to: ${formData.email}
        `
      }

      // Here you would integrate with your email service (EmailJS, Resend, etc.)
      console.log('Email data prepared for msuhaibkl@gmail.com:', emailData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setStatus({
        type: 'success',
        message: '🎉 Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours at the email address you provided.'
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setErrors({})
      setTouched({})

    } catch (error) {
      console.error('Form submission error:', error)
      setStatus({
        type: 'error',
        message: '❌ Sorry, there was an error sending your message. Please try again or contact me directly at msuhaibkl@gmail.com'
      })
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'msuhaibkl@gmail.com',
      href: 'mailto:msuhaibkl@gmail.com',
      description: 'Primary contact for all inquiries'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+60 17-893 4957',
      href: 'tel:+60178934957',
      description: 'Available for urgent consultations'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Malaysia',
      href: '#',
      description: 'Available for remote work globally'
    },
    {
      icon: Calendar,
      title: 'Schedule',
      value: 'Book a consultation',
      href: '#',
      description: 'Free 30-minute discovery call'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/MuhammadSuhaib01',
      color: 'hover:text-gray-400'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'www.linkedin.com/in/muhammadsuhaib01',
      color: 'hover:text-blue-400'
    },
    {
      icon: Mail,
      name: 'Email',
      href: 'mailto:msuhaibkl@gmail.com',
      color: 'hover:text-red-400'
    }
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header */}
        <ScrollTriggeredAnimation direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Get In{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to collaborate or bring your next idea to life? 
              Let's build something amazing together. 🚀
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-6"></div>
          </div>
        </ScrollTriggeredAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <ScrollTriggeredAnimation direction="left" delay={0.3}>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  Send Message
                </CardTitle>
                <p className="text-gray-400 mt-2">
                  Fill out the form below and I'll get back to you within 24 hours.
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-purple-400" />
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">
                        {FIELD_CONFIG.name.label}
                      </label>
                      <Tooltip content={FIELD_CONFIG.name.tooltip} side="top">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-help"
                        >
                          <span className="text-white text-xs font-bold">!</span>
                        </motion.div>
                      </Tooltip>
                    </div>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      maxLength={FIELD_CONFIG.name.maxLength}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 transition-colors duration-300 ${
                        errors.name ? 'border-red-500 focus:border-red-500' : ''
                      } ${!errors.name && touched.name && formData.name ? 'border-green-500/50' : ''}`}
                      placeholder={FIELD_CONFIG.name.placeholder}
                      required
                    />
                    {errors.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </motion.div>
                    )}
                    {!errors.name && touched.name && formData.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-green-400 text-sm"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Looks good!
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Email Field */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <AtSign className="w-4 h-4 text-purple-400" />
                      <label htmlFor="email" className="text-sm font-medium text-gray-300">
                        {FIELD_CONFIG.email.label}
                      </label>
                      <Tooltip content={FIELD_CONFIG.email.tooltip} side="top">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-help"
                        >
                          <span className="text-white text-xs font-bold">!</span>
                        </motion.div>
                      </Tooltip>
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      maxLength={FIELD_CONFIG.email.maxLength}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 transition-colors duration-300 ${
                        errors.email ? 'border-red-500 focus:border-red-500' : ''
                      } ${!errors.email && touched.email && formData.email ? 'border-green-500/50' : ''}`}
                      placeholder={FIELD_CONFIG.email.placeholder}
                      required
                    />
                    {errors.email && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </motion.div>
                    )}
                    {!errors.email && touched.email && formData.email && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-green-400 text-sm"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Valid email format!
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Subject Field */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-purple-400" />
                      <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                        {FIELD_CONFIG.subject.label}
                      </label>
                      <Tooltip content={FIELD_CONFIG.subject.tooltip} side="top">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-help"
                        >
                          <span className="text-white text-xs font-bold">!</span>
                        </motion.div>
                      </Tooltip>
                    </div>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      maxLength={FIELD_CONFIG.subject.maxLength}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 transition-colors duration-300 ${
                        errors.subject ? 'border-red-500 focus:border-red-500' : ''
                      } ${!errors.subject && touched.subject && formData.subject ? 'border-green-500/50' : ''}`}
                      placeholder={FIELD_CONFIG.subject.placeholder}
                      required
                    />
                    {errors.subject && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.subject}
                      </motion.div>
                    )}
                    {!errors.subject && touched.subject && formData.subject && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-green-400 text-sm"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Perfect subject line!
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Message Field */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                      <label htmlFor="message" className="text-sm font-medium text-gray-300">
                        {FIELD_CONFIG.message.label}
                      </label>
                      <Tooltip content={FIELD_CONFIG.message.tooltip} side="top">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-help"
                        >
                          <span className="text-white text-xs font-bold">!</span>
                        </motion.div>
                      </Tooltip>
                    </div>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      maxLength={FIELD_CONFIG.message.maxLength}
                      rows={5}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-500 resize-none transition-colors duration-300 ${
                        errors.message ? 'border-red-500 focus:border-red-500' : ''
                      } ${!errors.message && touched.message && formData.message ? 'border-green-500/50' : ''}`}
                      placeholder={FIELD_CONFIG.message.placeholder}
                      required
                    />
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        {errors.message && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-red-400 text-sm mb-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.message}
                          </motion.div>
                        )}
                        {!errors.message && touched.message && formData.message && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-green-400 text-sm mb-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Great project details!
                          </motion.div>
                        )}
                      </div>
                      <span className={`text-xs ml-4 ${
                        formData.message.length > FIELD_CONFIG.message.maxLength * 0.9 
                          ? 'text-yellow-400' 
                          : 'text-gray-500'
                      }`}>
                        {formData.message.length}/{FIELD_CONFIG.message.maxLength}
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* Status Messages */}
                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg flex items-start gap-3 ${
                        status.type === 'success' 
                          ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                          : status.type === 'error'
                          ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                          : 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                      }`}
                    >
                      {status.type === 'success' && <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />}
                      {status.type === 'error' && <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />}
                      <span className="text-sm leading-relaxed">{status.message}</span>
                    </motion.div>
                  )}
                  
                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Button
                      type="submit"
                      disabled={status.type === 'loading'}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {status.type === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message to msuhaibkl@gmail.com
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </ScrollTriggeredAnimation>

          {/* Contact Information */}
          <div className="space-y-8">
            <ScrollTriggeredAnimation direction="right" delay={0.3}>
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  Contact Information
                </h3>
                <StaggeredAnimation staggerDelay={0.1} childDelay={0.2}>
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <motion.a
                        key={index}
                        href={info.href}
                        className="flex items-center p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group block"
                        whileHover={{ x: 10, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full mr-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <info.icon className="w-6 h-6 text-purple-400" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold group-hover:text-purple-400 transition-colors duration-300">
                            {info.title}
                          </h4>
                          <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                            {info.value}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {info.description}
                          </p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </StaggeredAnimation>
              </div>
            </ScrollTriggeredAnimation>

            <ScrollTriggeredAnimation direction="right" delay={0.5}>
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                    <Github className="w-5 h-5 text-white" />
                  </div>
                  Follow Me
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white ${social.color} transition-all duration-300 hover:bg-white/10 hover:border-purple-500/30`}
                      aria-label={social.name}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </ScrollTriggeredAnimation>

            <ScrollTriggeredAnimation direction="up" delay={0.7}>
              <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg backdrop-blur-sm">
                <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  Ready to start your project?
                </h4>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Let's discuss your ideas and turn them into reality. 
                  I'm available for freelance projects and consultations.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 flex-1"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule a Call
                  </Button>
                  <Button
                    variant="outline"
                    className="border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white transition-all duration-300 flex-1"
                    onClick={() => window.open('mailto:msuhaibkl@gmail.com', '_blank')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Direct Email
                  </Button>
                </div>
              </div>
            </ScrollTriggeredAnimation>
          </div>
        </div>
      </div>
    </section>
  )
}
