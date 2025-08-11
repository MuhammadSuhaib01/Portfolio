import { Mail,Github, Linkedin  } from 'lucide-react'

export const NAME = 'Muhammad Suhaib'
export const DESCRIPTION = 'Created by Muhammad Suhaib'



export const socialLinks = [
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
      href: '#',
      color: 'hover:text-red-400'
    }
  ]

  export const projects = [
      {
        id: 1,
        title: 'GhostAI - Game Tracker',
        description: 'Real-time game event tracking assistant for streamers and competitive gamers. Features kill count detection, storm progression tracking, and modular architecture for extensibility.',
        longDescription: 'Advanced computer vision system that analyzes gaming streams in real-time, providing automated event detection and statistics tracking for competitive gaming.',
        image: '/ghostai-game-tracker.png',
        technologies: ['Python', 'OpenCV', 'MoviePy', 'PyQt5', 'Computer Vision'],
        category: 'AI',
        year: '2025',
        status: 'Active',
        featured: true,
        github: '#',
        demo: '#',
        metrics: {
          accuracy: '95%',
          performance: 'Real-time',
          users: '500+'
        }
      },
      {
        id: 2,
        title: 'PhysioTrack AI Platform',
        description: 'AI-powered home-based physiotherapy platform using YOLOv8 pose detection for exercise evaluation and progress tracking. Final year project with clinical validation.',
        longDescription: 'Comprehensive physiotherapy solution combining AI pose estimation with clinical expertise to provide personalized rehabilitation programs.',
        image: '/physiotrack-ai-platform.png',
        technologies: ['Python', 'Django', 'MySQL', 'Flutter', 'YOLOv8', 'TensorFlow'],
        category: 'AI',
        year: '2024',
        status: 'Final Year Project',
        featured: true,
        github: '#',
        demo: '#',
        metrics: {
          accuracy: '92%',
          exercises: '50+',
          validation: 'Clinical'
        }
      },
      {
        id: 3,
        title: 'MailGuard AI Detection',
        description: 'AI-driven spam and suspicious email detection tool using ensemble machine learning models including Random Forest, SVM, and Naive Bayes for enhanced accuracy.',
        longDescription: 'Enterprise-grade email security solution with multi-model approach for detecting spam, phishing, and malicious content with high precision.',
        image: '/mailguard-ai-detection.png',
        technologies: ['Python', 'Machine Learning', 'Random Forest', 'SVM', 'Naive Bayes', 'NLP'],
        category: 'AI',
        year: '2023',
        status: 'Completed',
        featured: true,
        github: '#',
        demo: '#',
        metrics: {
          accuracy: '98%',
          falsePositive: '<1%',
          speed: 'Instant'
        }
      },
      {
        id: 4,
        title: 'GRAM - Gesture Recognition',
        description: 'Real-time hand gesture recognition system using computer vision to detect numbers 1–10 based on finger positions with high accuracy and low latency.',
        longDescription: 'Advanced gesture recognition system for human-computer interaction, enabling touchless control through hand gestures.',
        image: '/gram-gesture-recognition.png',
        technologies: ['Python', 'OpenCV', 'Deep Learning', 'Computer Vision', 'MediaPipe'],
        category: 'AI',
        year: '2023',
        status: 'Completed',
        featured: false,
        github: '#',
        demo: '#',
        metrics: {
          accuracy: '94%',
          latency: '<100ms',
          gestures: '10+'
        }
      },
      {
        id: 5,
        title: 'Pennywise - Expense Tracker',
        description: 'Modern single-page web application for personal expense management with real-time updates, monthly summaries, and intuitive data visualization.',
        longDescription: 'Full-featured expense tracking application with advanced analytics, budget planning, and financial insights.',
        image: '/pennywise-expense-tracker.png',
        technologies: ['React.js', 'Tailwind CSS', 'Firebase', 'Firestore', 'Chart.js'],
        category: 'Web',
        year: '2025',
        status: 'Active',
        featured: true,
        github: '#',
        demo: '#',
        metrics: {
          users: '1000+',
          uptime: '99.9%',
          features: '25+'
        }
      },
      {
        id: 6,
        title: 'ShopEasy - E-commerce Platform',
        description: 'Comprehensive online shopping platform with advanced cart functionality, product management, user authentication, and payment integration.',
        longDescription: 'Full-stack e-commerce solution with modern UI/UX, secure payments, and comprehensive admin dashboard.',
        image: '/shopeasy-ecommerce.png',
        technologies: ['React.js', 'Node.js', 'Firebase', 'Authentication', 'Firestore', 'Stripe'],
        category: 'Web',
        year: '2023',
        status: 'Completed',
        featured: true,
        github: '#',
        demo: '#',
        metrics: {
          products: '500+',
          orders: '200+',
          conversion: '3.2%'
        }
      },
      {
        id: 7,
        title: 'FitNourish - Fitness App',
        description: 'Comprehensive UI/UX prototype for a health-tracking application focused on workout planning, meal tracking, and progress monitoring.',
        longDescription: 'Complete fitness ecosystem design with user-centered approach, praised for usability and visual design clarity.',
        image: '/fitnourish-fitness-app.png',
        technologies: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research'],
        category: 'Mobile',
        year: '2022',
        status: 'Design Prototype',
        featured: true,
        github: '#',
        demo: '#',
        metrics: {
          screens: '50+',
          userTests: '20+',
          satisfaction: '4.8/5'
        }
      },
      {
        id: 8,
        title: 'Realtime Public ChatRoom',
        description: 'Flutter-based real-time messaging application with Firebase backend, featuring live chat, user authentication, and message persistence.',
        longDescription: 'Scalable chat application developed during internship, supporting real-time messaging with modern mobile UI patterns.',
        image: '/realtime-chatroom.png',
        technologies: ['Flutter', 'Dart', 'Firebase', 'Authentication', 'Firestore', 'Cloud Functions'],
        category: 'Mobile',
        year: '2022',
        status: 'Internship Project',
        featured: false,
        github: '#',
        demo: '#',
        metrics: {
          messages: '10k+',
          users: '100+',
          uptime: '99%'
        }
      },
      {
        id: 9,
        title: 'Traffic Signal Automation',
        description: 'Formal verification system using Alloy Analyzer to model deadlock-free traffic light systems ensuring safety and mutual exclusion properties.',
        longDescription: 'Academic research project focusing on formal methods for critical system verification and safety assurance.',
        image: '/traffic-signal-automation.png',
        technologies: ['Alloy Analyzer', 'Formal Verification', 'System Design', 'Logic Modeling'],
        category: 'Systems',
        year: '2023',
        status: 'Academic Project',
        featured: false,
        github: '#',
        demo: '#',
        metrics: {
          scenarios: '50+',
          verification: '100%',
          safety: 'Proven'
        }
      },
      {
        id: 10,
        title: 'SGS - Student Grading System',
        description: 'Comprehensive C# desktop application for academic grade management, report generation, and student performance analytics with intuitive interface.',
        longDescription: 'Enterprise-level academic management system with advanced reporting and analytics capabilities.',
        image: '/student-grading-system.png',
        technologies: ['C#', '.NET Framework', 'SQL Server', 'Windows Forms', 'Crystal Reports'],
        category: 'Desktop',
        year: '2022',
        status: 'Completed',
        featured: false,
        github: '#',
        demo: '#',
        metrics: {
          students: '500+',
          reports: '20+',
          schools: '5+'
        }
      },
      {
        id: 11,
        title: 'SMS - Student Management CLI',
        description: 'Command-line interface student data management system developed in C++, featuring enrollment tracking and performance monitoring.',
        longDescription: 'Efficient CLI-based system for academic data management with file-based storage and advanced search capabilities.',
        image: '/student-management-cli.png',
        technologies: ['C++', 'CLI', 'File System', 'Data Structures', 'Algorithms'],
        category: 'Systems',
        year: '2021',
        status: 'Completed',
        featured: false,
        github: '#',
        demo: '#',
        metrics: {
          records: '1000+',
          operations: '15+',
          performance: 'Optimized'
        }
      },
      {
        id: 12,
        title: 'Arduino Robotics Projects',
        description: 'Collection of embedded system projects including Fire Alarm System, Bluetooth-Controlled Water Pump, and Traffic Signal Controller.',
        longDescription: 'Comprehensive IoT and robotics project portfolio demonstrating hardware-software integration and sensor technologies.',
        image: '/arduino-robotics-projects.png',
        technologies: ['Arduino UNO', 'C/C++', 'Sensors', 'Embedded Systems', 'IoT', 'Bluetooth'],
        category: 'Hardware',
        year: '2022',
        status: 'Multiple Projects',
        featured: false,
        github: '#',
        demo: '#',
        metrics: {
          projects: '5+',
          sensors: '20+',
          automation: '100%'
        }
      }
    ]
