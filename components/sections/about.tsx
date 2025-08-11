"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Briefcase,
  Brain,
  Rocket,
  Award,
  Code,
} from "lucide-react";
import { getTechIcon } from "@/components/ui/tech-icons";
import {
  ScrollTriggeredAnimation,
  StaggeredAnimation,
} from "@/components/ui/scroll-triggered-animation";
import Marquee from "react-fast-marquee";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const techStackRef = useRef(null);
  const techStackInView = useInView(techStackRef, {
    once: true,
    margin: "-50px",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const techStack = [
    "Python",
    "React.js",
    "Flutter",
    "Django",
    "C#",
    "C++",
    "YOLOv8",
    "OpenCV",
    "Firebase",
    "MySQL",
    "Machine Learning",
    "Computer Vision",
    "Arduino",
    "PyQt5",
    "Tailwind CSS",
    "Figma",
  ];

  const achievements = [
    {
      icon: GraduationCap,
      title: "Education",
      description:
        "BSc in Computer Science with focus on AI/ML and software engineering",
      color: "text-blue-400",
    },
    {
      icon: Briefcase,
      title: "Experience",
      description:
        "Co-founder at SAOTS, Freelance Developer, and Research Assistant",
      color: "text-green-400",
    },
    {
      icon: Brain,
      title: "AI Expertise",
      description:
        "YOLOv8, Computer Vision, Machine Learning, and Real-time Processing",
      color: "text-purple-400",
    },
    {
      icon: Rocket,
      title: "Key Projects",
      description:
        "GhostAI, PhysioTrack, MailGuard AI, and 15+ completed projects",
      color: "text-pink-400",
    },
    {
      icon: Award,
      title: "Specializations",
      description:
        "Full-stack development, Mobile apps, Embedded systems, and Formal verification",
      color: "text-yellow-400",
    },
    {
      icon: Code,
      title: "Innovation",
      description:
        "Real-world problem solving through cutting-edge technology solutions",
      color: "text-red-400",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Header with scroll trigger */}
        <ScrollTriggeredAnimation direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Passionate about creating innovative solutions that bridge the gap
              between cutting-edge technology and real-world applications. Let
              me share my journey.
            </p>
          </div>
        </ScrollTriggeredAnimation>

        {/* Achievement cards with staggered animation */}
        <StaggeredAnimation staggerDelay={0.1} childDelay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <motion.div
                        className={`p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 ${achievement.color}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <achievement.icon className="w-6 h-6" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white ml-4">
                        {achievement.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </StaggeredAnimation>

        {/* Tech stack with individual scroll triggers */}
        <ScrollTriggeredAnimation direction="up" delay={0.4}>
          <div className="text-center" ref={techStackRef}>
            <h3 className="text-2xl font-bold text-white mb-8">Tech Stack</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={
                    techStackInView
                      ? {
                          opacity: 1,
                          scale: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          scale: 0.8,
                          y: 20,
                        }
                  }
                  transition={{
                    delay: index * 0.05,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    transition: { duration: 0.2 },
                  }}
                >
                  {" "}
                  <Marquee>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-purple-500/30 px-4 py-2 text-sm font-medium hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                    >
                      <motion.span
                        className="group-hover:scale-110 transition-transform duration-200"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {getTechIcon(tech)}
                      </motion.span>
                      {tech}
                    </Badge>
                  </Marquee>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollTriggeredAnimation>
      </div>
    </section>
  );
}
