"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { MdBlurOn } from "react-icons/md";
// @ts-expect-error: No type definitions for 'aos'
import AOS from "aos";

// Skill data
const SKILLS = [
  // Frontend
  { icon: <Image src="/react.svg" alt="React" width={24} height={24} />, name: "React", category: "Frontend" },
  { icon: <Image src="/next.svg" alt="Next.js" width={24} height={24} />, name: "Next.js", category: "Frontend" },
  { icon: <Image src="/tailwind.svg" alt="Tailwind CSS" width={24} height={24} />, name: "Tailwind CSS", category: "Frontend" },
  { icon: <Image src="/html5.svg" alt="HTML5" width={24} height={24} />, name: "HTML5", category: "Frontend" },
  { icon: <Image src="/css3.svg" alt="CSS3" width={24} height={24} />, name: "CSS3", category: "Frontend" },
  { icon: "🔄", name: "Redux", category: "Frontend" },
  { icon: "🅰️", name: "Angular", category: "Frontend" },
  { icon: "🎯", name: "Bootstrap", category: "Frontend" },
  // Backend
  { icon: <Image src="/nodejs.svg" alt="Node.js" width={24} height={24} />, name: "Node.js", category: "Backend" },
  { icon: "🚂", name: "Express.js", category: "Backend" },
  { icon: "🍃", name: "MongoDB", category: "Backend" },
  { icon: "🐬", name: "MySQL", category: "Backend" },
  { icon: "🔗", name: "REST APIs", category: "Backend" },
  { icon: "🌱", name: "Spring Boot", category: "Backend" },
  // Cloud
  { icon: "☁️", name: "AWS", category: "Cloud" },
  { icon: "🔷", name: "Azure", category: "Cloud" },
  { icon: "☁️", name: "Google Cloud", category: "Cloud" },
  // Tools
  { icon: "🐙", name: "GitHub", category: "Tools" },
  { icon: <Image src="/vercel.svg" alt="Vercel" width={24} height={24} />, name: "Vercel", category: "Tools" },
  { icon: "🧪", name: "Jasmine", category: "Tools" },
  { icon: "⚡", name: "Karma", category: "Tools" },
  { icon: "📮", name: "Postman", category: "Tools" },
  { icon: "🎨", name: "Figma", category: "Tools" },
  { icon: "🔵", name: "Bitbucket", category: "Tools" },
  { icon: "🎨", name: "Canva", category: "Tools" },
  { icon: "🖼️", name: "Photoshop", category: "Tools" },
  { icon: "📝", name: "Typeform", category: "Tools" },
  { icon: "📊", name: "Power BI", category: "Tools" },
  { icon: "📈", name: "Excel", category: "Tools" },
  { icon: "📋", name: "Jira", category: "Tools" },
  { icon: "⚡", name: "Agile", category: "Tools" },
  // Languages
  { icon: <Image src="/java.svg" alt="Java" width={24} height={24} />, name: "Java", category: "Languages" },
  { icon: <Image src="/python.svg" alt="Python" width={24} height={24} />, name: "Python", category: "Languages" },
  { icon: "📘", name: "TypeScript", category: "Languages" },
  { icon: "📜", name: "JavaScript", category: "Languages" },
  { icon: "📊", name: "R", category: "Languages" },
  // Specializations
  { icon: "🤖", name: "AI/ML (LLMs)", category: "Specializations" },
  { icon: "🦾", name: "Assistive Tech (AAC)", category: "Specializations" },
  { icon: "🎮", name: "Game Development Management", category: "Specializations" },
];

const SKILL_TABS = ["All", "Frontend", "Backend", "Cloud", "Tools", "Languages", "Specializations"];

export default function Home() {
  // Theme state: 'light', 'dark', 'glass'
  const [theme, setTheme] = useState('glass');
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (saved) setTheme(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('theme', theme);
  }, [theme]);
  const nextTheme = theme === 'glass' ? 'light' : theme === 'light' ? 'dark' : 'glass';
  const themeIcon = theme === 'glass' ? <MdBlurOn size={22} /> : theme === 'light' ? <FaSun size={22} /> : <FaMoon size={22} />;

  useEffect(() => {
    AOS.init({ 
      once: false, 
      duration: 800, 
      offset: 40,
      easing: 'ease-out-cubic'
    });
  }, []);

  // Scroll to top on page refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Floating contact button state
  const [showContact, setShowContact] = useState(false);

  // Add state for active tab
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className={`relative min-h-screen p-4 sm:p-10 flex flex-col items-center font-sans overflow-x-hidden 
      ${theme === 'glass' ? 'bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 text-black' : ''}
      ${theme === 'light' ? 'bg-white text-black' : ''}
      ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white' : ''}
    `}>
      {/* Animated SVG background pattern */}
      <svg className="absolute top-0 left-0 w-full h-64 opacity-10 z-0" style={{animation: 'pulse 4s ease-in-out infinite'}} viewBox="0 0 1440 320">
        <path fill="#800000" fillOpacity="1" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
      </svg>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-accent rounded-full animate-float opacity-30"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent-light rounded-full animate-float" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-float opacity-40" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute top-80 right-1/3 w-1 h-1 bg-accent-light rounded-full animate-float" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute top-96 left-1/2 w-2 h-2 bg-accent rounded-full animate-float opacity-30" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
        
        {/* More particles in different areas */}
        <div className="absolute top-1/3 left-16 w-1 h-1 bg-accent-light rounded-full animate-float" style={{animationDelay: '0.8s', animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 right-12 w-1.5 h-1.5 bg-accent rounded-full animate-float opacity-40" style={{animationDelay: '2.2s', animationDuration: '4s'}}></div>
        <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-accent-light rounded-full animate-float" style={{animationDelay: '1.2s', animationDuration: '3.8s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-accent rounded-full animate-float opacity-30" style={{animationDelay: '0.3s', animationDuration: '5.2s'}}></div>
        
        {/* Bottom area particles */}
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-accent-light rounded-full animate-float" style={{animationDelay: '1.8s', animationDuration: '4.2s'}}></div>
        <div className="absolute bottom-60 right-16 w-1.5 h-1.5 bg-accent rounded-full animate-float opacity-40" style={{animationDelay: '0.7s', animationDuration: '3.3s'}}></div>
        <div className="absolute bottom-80 left-1/3 w-1 h-1 bg-accent-light rounded-full animate-float" style={{animationDelay: '2.5s', animationDuration: '4.8s'}}></div>

        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-accent/20 to-accent-light/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-accent-light/20 to-accent/20 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-gradient-to-r from-accent/15 to-accent-light/15 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>

        {/* Moving Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent animate-shimmer"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent animate-shimmer" style={{animationDelay: '1s'}}></div>
        
        {/* Diagonal Lines */}
        <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent transform rotate-45 animate-shimmer" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-3/4 right-0 w-32 h-px bg-gradient-to-r from-transparent via-accent-light/20 to-transparent transform -rotate-45 animate-shimmer" style={{animationDelay: '1.5s'}}></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(128, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(128, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'shimmer 8s linear infinite'
          }}></div>
        </div>

        {/* Glowing Spots */}
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-accent rounded-full blur-sm animate-glow opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-accent-light rounded-full blur-sm animate-glow opacity-50" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-accent rounded-full blur-sm animate-glow opacity-60" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Floating Contact Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-accent text-white rounded-full shadow-lg p-4 transition-all duration-300 flex items-center gap-2"
        onClick={() => setShowContact(true)}
        aria-label="Contact Me"
      >
        📞 Contact Me
      </button>
      {showContact && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fadeIn" onClick={() => setShowContact(false)}>
          <div className="bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 text-black rounded-2xl p-8 shadow-2xl relative min-w-[400px] max-w-[500px] animate-scaleIn border border-gray-200" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform text-gray-500 hover:text-gray-700" onClick={() => setShowContact(false)}>&times;</button>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Let&apos;s Connect!</h3>
              <p className="text-gray-600">I&apos;d love to hear from you!</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 transition-colors duration-300 group">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Image src="/gmail_logo.png" alt="Gmail" width={28} height={28} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <a href="mailto:shambhavinavranjankumar@gmail.com" className="text-accent hover:text-accent-light transition-colors font-medium">shambhavinavranjankumar@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 transition-colors duration-300 group">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-green-600 text-lg">📞</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Phone</p>
                  <a href="tel:6692104314" className="text-accent hover:text-accent-light transition-colors font-medium">669-210-4314</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 transition-colors duration-300 group">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">LinkedIn</p>
                  <a href="http://linkedin.com/in/shambhavinkumar" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light transition-colors font-medium">/shambhavinkumar</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 transition-colors duration-300 group">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.75a5.75 5.75 0 1 1-5.75 5.75 5.75 5.75 0 0 1 5.75-5.75zm0 1.5a4.25 4.25 0 1 0 4.25 4.25 4.25 4.25 0 0 0-4.25-4.25zm5.25 1.25a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Instagram</p>
                  <a href="https://www.instagram.com/shambhavi_123" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light transition-colors font-medium">@shambhavi_123</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-100 transition-colors duration-300 group">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-sky-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Twitter</p>
                  <a href="https://twitter.com/Shambhavi_123" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light transition-colors font-medium">@Shambhavi_123</a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">Looking forward to connecting with you! ✨</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative w-full max-w-3xl flex flex-col items-center gap-2 mb-10 z-10" data-aos="fade-down">
        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[var(--accent)] shadow-lg mb-2 hover:scale-105 transition-transform duration-300">
          <Image src="/profile.jpg" alt="Profile" width={144} height={144} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <h1 className="text-4xl font-bold accent drop-shadow-lg hover:scale-105 transition-transform duration-300">Shambhavi Navranjan Kumar</h1>
          <button
            className="ml-4 p-2 rounded-full border border-accent bg-white/70 dark:bg-gray-800/70 hover:bg-accent hover:text-white transition-colors duration-300 shadow"
            aria-label="Switch theme"
            onClick={() => setTheme(nextTheme)}
            title={`Switch to ${nextTheme} mode`}
          >
            {themeIcon}
          </button>
        </div>
      </header>

      {/* Objective */}
      <section className="relative w-full max-w-5xl mb-10 z-10" data-aos="fade-up">
        {/* <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl animate-spin-slow">🎯</span>
          <h2 className="text-3xl font-bold accent text-left hover:text-accent-light transition-colors">Objective</h2>
        </div> */}
        <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-2xl p-8 border-2 border-accent hover:shadow-accent/50 transition-all duration-300 hover:scale-[1.02]">
          <p className="text-base">Front-End Developer with 4 years of experience building responsive web applications, now pursuing a Master&apos;s in Engineering Management to combine technical and leadership skills for scalable solutions.</p>
          <p className="italic accent mt-2 text-base">Currently based in San Jose, California, USA.</p>
        </div>
      </section>

      {/* Work Experience */}
      <section className="relative w-full max-w-5xl mb-10 z-10" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl animate-bounce">💼</span>
          <h2 className="text-3xl font-bold accent text-left hover:text-accent-light transition-colors">Work Experience</h2>
        </div>
        <div className="grid grid-cols-1 gap-4" data-aos="fade-up" data-aos-delay="200">
          {[
            {
              title: "🤖 AI/Software Intern",
              company: "Brain and Body Autism Center, Mountain View, CA, USA",
              dates: "(Jun 2025 - Present)",
              points: [
                "Developed iOS-based AI-powered AAC app for non-verbal autistic children using on-device LLMs",
                "Enhanced communication personalization by 40% through contextual AI implementation",
                "Collaborated with clinical experts to improve UI/UX, boosting therapy usability by 60%"
              ]
            },
            {
              title: "🎮 Project Manager (Game Development) Intern",
              company: "Resilience Inc. (Remote), USA",
              dates: "(Jun 2025 - Present)",
              points: [
                "Led cross-functional teams to relaunch digital education tools, expanding user adoption by 35%",
                "Managed project timelines and facilitated weekly progress reviews for strategic alignment",
                "Built partnerships with 50+ schools to deploy gamified social-emotional learning content"
              ]
            },
            {
              title: "🧑‍💻 Software Product and Platform Engineering Analyst",
              company: "Accenture Pvt Ltd, India",
              dates: "(May 2022 – Jun 2024)",
              points: [
                "Led team of 4 developers to deliver 10+ responsive web pages for Accenture AWS Business Group",
                "Resolved 100+ defects for Singapore Ministry of Education, enhancing efficiency by 40%",
                "Managed 15+ API integrations and maintained 100% code consistency across projects"
              ]
            },
            {
              title: "🧑‍💼 Application Development Associate",
              company: "Accenture Pvt Ltd, India",
              dates: "(Dec 2020 – Apr 2022)",
              points: [
                "Built reusable UI component library with 20+ Angular components",
                "Reduced page load time by 46% and increased user engagement by 33%",
                "Achieved 90% code coverage through comprehensive unit testing implementation"
              ]
            },
            {
              title: "🧑‍🎓 Salesforce Intern",
              company: "Tata Consultancy Services, India",
              dates: "(Jan 2020 – Jun 2020)",
              points: [
                "Gained hands-on experience with Salesforce platform and Trailhead learning paths",
                "Developed CRM customization and automation skills for workflow optimization",
                "Contributed to internal project efficiency improvements using Salesforce tools"
              ]
            },
            {
              title: "🟠 Intern",
              company: "Orange Tales, Nagpur, India",
              dates: "(May 2019 – Apr 2020)",
              points: [
                "Executed local brand marketing campaigns, boosting event participation by 40%",
                "Managed social media content creation and audience outreach strategies",
                "Analyzed campaign metrics using Excel to drive data-informed marketing decisions"
              ]
            },
            {
              title: "🚶 Global Volunteer",
              company: "AIESEC, Nagpur, India",
              dates: "(Jun 2017 – Feb 2019)",
              points: [
                "Led intercultural marketing initiatives with international teams",
                "Increased volunteer exchange program participation by 25%",
                "Utilized Excel for impact metrics tracking and logistical planning"
              ]
            },
            {
              title: "🟦 Intern",
              company: "eParivahan, Mumbai, India",
              dates: "(Dec 2018 – Jan 2019)",
              points: [
                "Streamlined data entry and reporting processes using Microsoft Excel",
                "Assisted in digitization efforts for legacy transport system records",
                "Created summary dashboards to improve internal data accessibility"
              ]
            }
          ].map((job, index) => (
            <div 
              key={index}
              className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-4 flex flex-col items-start border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-500 hover:scale-[1.02] hover-lift ${
                theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
              }`}
              data-aos="slide-in-left"
              data-aos-delay={index * 150}
            >
              <div className="font-bold text-lg hover:text-accent-light transition-colors duration-300 group-hover:scale-105">{job.title}</div>
              <div className="text-base w-full flex justify-between">
                <span className="hover:text-accent-light transition-colors duration-300">{job.company}</span>
                <span className="italic hover:text-accent-light transition-colors duration-300">{job.dates}</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 mt-1 text-base">
                {job.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="relative w-full max-w-5xl mb-10 z-10" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl animate-pulse">🎓</span>
          <h2 className="text-3xl font-bold accent text-left hover:text-accent-light transition-colors">Education</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6" data-aos="fade-up" data-aos-delay="200">
          {[
            {
              degree: "Master of Science, Engineering Management",
              school: "San Jose State University",
              location: "San Jose, California, USA",
              dates: "Aug 2024 – Present",
              highlight: "Focus: Engineering management, leadership, and scalable solutions."
            },
            {
              degree: "Executive Master of Business Administration",
              school: "IIM Tiruchirappalli",
              location: "Tiruchirappalli, India",
              dates: "May 2023 – Jul 2024",
              highlight: "Highlight: Advanced management training for executives."
            },
            {
              degree: "Bachelor of Engineering, Information Technology",
              school: "Shri Ramdeobaba College of Engineering and Management",
              location: "Nagpur, Maharashtra, India",
              dates: "Aug 2016 – May 2020",
              highlight: "Highlight: Graduated with distinction in Information Technology."
            }
          ].map((edu, index) => (
            <div 
              key={index}
              className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-4 flex flex-col items-start border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-500 hover:scale-105 hover-lift group ${
                theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
              }`}
              data-aos="slide-in-bottom"
              data-aos-delay={index * 200}
            >
              <div className="font-bold text-lg hover:text-accent-light transition-colors duration-300 group-hover:scale-105">{edu.degree}</div>
              <div className="text-base mb-1 hover:text-accent-light transition-colors duration-300">{edu.school}</div>
              <div className="text-base mb-1 hover:text-accent-light transition-colors duration-300">{edu.location}</div>
              <div className="italic text-base mb-2 hover:text-accent-light transition-colors duration-300">{edu.dates}</div>
              <ul className="list-disc pl-4 text-base">
                <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">{edu.highlight}</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Ambassador Roles */}
      <section className="relative w-full max-w-5xl mb-10 z-10" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl animate-pulse">🌟</span>
          <h2 className="text-3xl font-bold accent text-left hover:text-accent-light transition-colors">Ambassador Roles</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6" data-aos="fade-up" data-aos-delay="200">
          <div 
            className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-6 flex flex-col items-start border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-500 hover:scale-105 hover-lift group ${
              theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
            }`}
            data-aos="slide-in-left"
            data-aos-delay="100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <Image src="/adobe-logo.png" alt="Adobe Logo" width={48} height={48} />
              </div>
              <div className="font-bold text-xl hover:text-accent-light transition-colors duration-300 group-hover:scale-105">Adobe Student Ambassador</div>
            </div>
            <div className="text-base mb-3 text-gray-800">Representing Adobe's creative tools and technologies to the student community</div>
            <ul className="list-disc pl-4 text-base space-y-2">
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Promoting Adobe's creative software solutions</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Organizing workshops and training sessions</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Supporting student community with design tools</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Building creative skills and digital literacy</li>
            </ul>
          </div>
          
          <div 
            className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-6 flex flex-col items-start border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-500 hover:scale-105 hover-lift group ${
              theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
            }`}
            data-aos="slide-in-right"
            data-aos-delay="200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <Image src="/fetch-ai-logo.svg" alt="Fetch AI Logo" width={48} height={48} />
              </div>
              <div className="font-bold text-xl hover:text-accent-light transition-colors duration-300 group-hover:scale-105">Fetch AI Innovation Ambassador</div>
            </div>
            <div className="text-base mb-3 text-gray-800">Leading innovation initiatives and AI adoption in the academic community</div>
            <ul className="list-disc pl-4 text-base space-y-2">
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Advocating for AI innovation and adoption</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Facilitating AI workshops and demonstrations</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Connecting students with cutting-edge AI technologies</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Promoting responsible AI development and usage</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Project Experience */}
      <section className="relative w-full max-w-5xl mb-10 z-10" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl animate-pulse">🚀</span>
          <h2 className="text-3xl font-bold accent text-left hover:text-accent-light transition-colors">Project Experience</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6" data-aos="fade-up" data-aos-delay="200">
          {[
            {
              title: "📈 Stock Market Predictor, RCOEM",
              type: "Academic Project",
              points: [
                "Developed a machine learning model to predict future stock prices using Yahoo! Finance data.",
                "Applied LSTM algorithm for accurate stock closing price forecasting.",
                "Designed system to assist investors in making informed decisions while minimizing risks."
              ]
            },
            {
              title: "🧾 Subscription Killer, UCSD Hackathon",
              type: "Hackathon Project",
              points: [
                "Developed a React + GPT-4 based AI app to identify, track, and cancel unwanted subscriptions.",
                "Engineered smart dashboards and auto-cancellation workflows to reduce user spending."
              ]
            }
          ].map((project, index) => (
            <div 
              key={index}
              className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-4 flex flex-col items-start border-2 border-accent min-h-[220px] hover:border-accent-light hover:shadow-accent/30 transition-all duration-500 hover:scale-105 hover-lift group ${
                theme === 'dark' ? 'hover:bg-gray-800/95 text-white' : 'hover:bg-white/95 text-gray-900'
              }`}
              data-aos="slide-in-right"
              data-aos-delay={index * 300}
            >
              <div className="font-extrabold text-xl text-accent drop-shadow-sm hover:text-accent-light transition-colors duration-300 group-hover:scale-105">{project.title}</div>
              <div className="text-base font-semibold mb-2 text-gray-800 drop-shadow-sm hover:text-accent-light transition-colors duration-300">{project.type}</div>
              <ul className="list-disc pl-4 text-base space-y-1">
                {project.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform text-gray-900/90 drop-shadow-sm">{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section className="relative w-full max-w-5xl mb-10 z-10" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl animate-spin-slow">🛠️</span>
          <h2 className="text-3xl font-bold accent text-left hover:text-accent-light transition-colors">Technical Skills</h2>
        </div>
        <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-2xl p-8 border-2 border-accent hover:shadow-accent/50 transition-all duration-300" data-aos="zoom-in" data-aos-delay="200">
          {/* Skill Categories as Tabs */}
          <div className="flex flex-wrap gap-2 mb-6" data-aos="fade-up" data-aos-delay="300">
            {SKILL_TABS.map((tab, index) => (
              <button
                key={tab}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-110 ${activeTab === tab ? "bg-accent text-white scale-105 shadow-lg" : "bg-black/60 text-white hover:bg-accent-light hover:shadow-md"}`}
                onClick={() => setActiveTab(tab)}
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" data-aos="fade-up" data-aos-delay="400">
            {SKILLS.filter(skill => activeTab === "All" || skill.category === activeTab).map((skill, index) => (
              <div 
                key={skill.name} 
                data-aos="zoom-in" 
                data-aos-delay={index * 50}
              >
                <SkillCard icon={skill.icon} name={skill.name} category={skill.category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative w-full max-w-5xl mb-10 z-10" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl animate-pulse">🎓</span>
          <h2 className="text-3xl font-bold accent text-left hover:text-accent-light transition-colors">Certifications</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {/* Advanced Google Analytics */}
          <div className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-4 flex flex-col border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-300 hover:scale-105 hover-lift ${
            theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
          }`} data-aos="zoom-in" data-aos-delay="100">
            <div className="font-bold text-lg mb-1">Advanced Google Analytics</div>
            <div className="text-base mb-1 text-gray-800">Google Analytics Academy</div>
            <div className="text-sm mb-1">Issued Feb 2023 · Expires Apr 2026</div>
          </div>
          {/* Managing Project Risks and Changes */}
          <div className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-4 flex flex-col border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-300 hover:scale-105 hover-lift ${
            theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
          }`} data-aos="zoom-in" data-aos-delay="200">
            <div className="font-bold text-lg mb-1">Managing Project Risks and Changes</div>
            <div className="text-base mb-1 text-gray-800">Coursera</div>
            <div className="text-sm mb-1">Issued Jul 2020</div>
          </div>
          {/* SQL for Data Science */}
          <div className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-4 flex flex-col border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-300 hover:scale-105 hover-lift ${
            theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
          }`} data-aos="zoom-in" data-aos-delay="300">
            <div className="font-bold text-lg mb-1">SQL for Data Science</div>
            <div className="text-base mb-1 text-gray-800">Coursera</div>
            <div className="text-sm mb-1">Issued Jul 2020</div>
          </div>
          {/* Google Analytics for Beginners */}
          <div className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-4 flex flex-col border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-300 hover:scale-105 hover-lift ${
            theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
          }`} data-aos="zoom-in" data-aos-delay="400">
            <div className="font-bold text-lg mb-1">Google Analytics for Beginners</div>
            <div className="text-base mb-1 text-gray-800">Google Analytics Academy</div>
            <div className="text-sm mb-1">Issued Jun 2020</div>
          </div>
          {/* Initiating and Planning Projects */}
          <div className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-4 flex flex-col border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-300 hover:scale-105 hover-lift ${
            theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
          }`} data-aos="zoom-in" data-aos-delay="500">
            <div className="font-bold text-lg mb-1">Initiating and Planning Projects</div>
            <div className="text-base mb-1 text-gray-800">Coursera</div>
            <div className="text-sm mb-1">Issued Jun 2020</div>
            <div className="text-xs mb-1 text-gray-400">Credential ID VVKFP6SFDELC</div>
          </div>
          {/* Introduction to Google Docs */}
          <div className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-4 flex flex-col border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-300 hover:scale-105 hover-lift ${
            theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
          }`} data-aos="zoom-in" data-aos-delay="600">
            <div className="font-bold text-lg mb-1">Introduction to Google Docs</div>
            <div className="text-base mb-1 text-gray-800">Coursera</div>
            <div className="text-sm mb-1">Issued Jun 2020</div>
            <div className="text-xs mb-1 text-gray-400">Credential ID KMDHGHLT5DU8</div>
          </div>
          {/* The Fundamentals of Digital Marketing */}
          <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-4 flex flex-col border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-300 hover:scale-105 hover:bg-white/95 hover-lift" data-aos="zoom-in" data-aos-delay="700">
            <div className="font-bold text-lg mb-1">The Fundamentals of Digital Marketing</div>
            <div className="text-base mb-1 text-gray-800">Google Digital Garage</div>
            <div className="text-sm mb-1">Issued Jun 2020</div>
          </div>
          {/* AI for Everyone */}
          <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-4 flex flex-col border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-300 hover:scale-105 hover:bg-white/95 hover-lift" data-aos="zoom-in" data-aos-delay="800">
            <div className="font-bold text-lg mb-1">AI for Everyone</div>
            <div className="text-base mb-1 text-gray-800">Coursera</div>
            <div className="text-sm mb-1">Issued Mar 2020</div>
          </div>
        </div>
      </section>

      {/* Extra-Curricular Activities & Achievements */}
      <section className="relative w-full max-w-5xl mb-10 z-10" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl animate-pulse">🏆</span>
          <h2 className="text-3xl font-bold accent text-left hover:text-accent-light transition-colors">Extra-Curricular Activities & Achievements</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6" data-aos="fade-up" data-aos-delay="200">
          {/* Achievements */}
          <div className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-4 flex flex-col border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-500 hover:scale-105 hover-lift group ${
            theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
          }`} data-aos="slide-in-left" data-aos-delay="100">
            <div className="font-bold text-lg mb-3 hover:text-accent-light transition-colors duration-300 group-hover:scale-105">🏅 Achievements</div>
            <ul className="list-disc pl-4 text-base space-y-2">
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Secured first division in Kathak</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Visharadh in Kathak</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Performed in World Bengali Dance Conference</li>
            </ul>
          </div>
          
          {/* Extra-Curricular Activities */}
          <div className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-4 flex flex-col border-2 border-accent hover:border-accent-light hover:shadow-accent/30 transition-all duration-500 hover:scale-105 hover-lift group ${
            theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
          }`} data-aos="slide-in-right" data-aos-delay="200">
            <div className="font-bold text-lg mb-3 hover:text-accent-light transition-colors duration-300 group-hover:scale-105">🎭 Extra-Curricular Activities</div>
            <ul className="list-disc pl-4 text-base space-y-2">
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Part of Hindu-Yuva Club, SJSU</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Member of organizing committee of various college events, RCOEM</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Member of Students&apos; Representative Council, 2018-19, RCOEM</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Member of literary club, RCOEM</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Member of Dance club, RCOEM</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Core Committee Vice President of Global Village and Balakalakaar, 2018, AIESEC</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Member of Rotaract Club, 2017-18</li>
              <li className="hover:text-accent-light transition-colors duration-300 hover:translate-x-1 transform">Volunteered in 79th Indian Roads Congress</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Entrepreneurship */}
      <section className="relative w-full max-w-5xl mb-10 z-10" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl animate-pulse">💼</span>
          <h2 className="text-3xl font-bold accent text-left hover:text-accent-light transition-colors">Entrepreneurship</h2>
        </div>
        <div className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-2xl p-8 border-2 border-accent hover:shadow-accent/50 transition-all duration-300 hover:scale-[1.02] ${
          theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
        }`} data-aos="zoom-in" data-aos-delay="200">
          <div className="text-center">
            <div className="font-bold text-xl mb-4 hover:text-accent-light transition-colors duration-300">💎 Coffer Chics</div>
            <p className="text-base mb-4">Founded and operated a successful Instagram-based jewellery business in India, specializing in handmade custom jewellery, demonstrating entrepreneurial spirit and digital marketing skills.</p>
            <p className="text-base mb-4">Instagram: <a href="https://www.instagram.com/coffer_chics" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:no-underline hover:text-accent-light transition-colors">@coffer_chics</a></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {[
                { icon: "🚀", title: "Growth", desc: "Rapidly growing Instagram presence with engaged customer base" },
                { icon: "✨", title: "Handcrafted", desc: "Specialized in handmade custom jewellery with unique designs" },
              ].map((card, idx) => (
                <div
                  key={card.title}
                  className={`rounded-xl p-4 border border-accent transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gray-800/80 text-white'
                      : 'bg-gradient-to-br from-pink-50 via-white to-yellow-100 text-gray-900'
                  }`}
                >
                  <div className="font-semibold text-lg mb-2">{card.icon} {card.title}</div>
                  <p className="text-sm">{card.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <div className="font-semibold text-lg mb-4 text-center">📸 Featured Posts</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {/* Instagram Post Images */}
                <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <Image src="/coffer-chics-1.png" alt="Coffer Chics Jewellery Post 1" width={200} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <Image src="/coffer-chics-2.png" alt="Coffer Chics Jewellery Post 2" width={200} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <Image src="/coffer-chics-3.png" alt="Coffer Chics Jewellery Post 3" width={200} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <Image src="/coffer-chics-4.png" alt="Coffer Chics Jewellery Post 4" width={200} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <Image src="/coffer-chics-5.png" alt="Coffer Chics Jewellery Post 5" width={200} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <Image src="/coffer-chics-6.png" alt="Coffer Chics Jewellery Post 6" width={200} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <Image src="/coffer-chics-7.png" alt="Coffer Chics Jewellery Post 7" width={200} height={200} className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                  <Image src="/coffer-chics-8.png" alt="Coffer Chics Jewellery Post 8" width={200} height={200} className="w-full h-full object-cover" />
                </div>
              </div>
              <p className="text-sm text-center mt-4 text-gray-800">Click <a href="https://www.instagram.com/coffer_chics" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:no-underline">here</a> to view more posts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Management */}
      <section className="relative w-full max-w-5xl mb-10 z-10" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl animate-pulse">🎪</span>
          <h2 className="text-3xl font-bold accent text-left hover:text-accent-light transition-colors">Event Management</h2>
        </div>
        <div className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-2xl p-8 border-2 border-accent hover:shadow-accent/50 transition-all duration-300 hover:scale-[1.02] ${
          theme === 'dark' ? 'hover:bg-gray-800/95' : 'hover:bg-white/95'
        }`} data-aos="zoom-in" data-aos-delay="200">
          <div className="text-center mb-6">
            <div className="font-bold text-2xl mb-4 hover:text-accent-light transition-colors duration-300">🎭 Blindfolded Conversations</div>
            <p className="text-base mb-4">Successfully organized and managed a two-day collaborative event with Lush House cafe in Nagpur, demonstrating comprehensive event management skills.</p>
          </div>
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {[
              { icon: "📱", title: "Social Media Marketing", desc: "Managed complete social media marketing campaign, created posters and hard banners using Photoshop and Canva" },
              { icon: "🎨", title: "Event Decor", desc: "Handled complete event decoration and visual setup for the two-day event" },
              { icon: "📊", title: "Event Success", desc: "Achieved 500+ footfall with media coverage from newspaper reporters" },
              { icon: "��", title: "Collaboration", desc: "Partnered with Lush House cafe in Nagpur for successful event execution" },
              { icon: "📰", title: "Media Coverage", desc: "Event was covered by newspaper reporters, highlighting its success and impact" },
              { icon: "🎯", title: "Project Management", desc: "Coordinated all aspects from planning to execution, ensuring seamless event delivery" },
            ].map((card, idx) => (
              <div
                key={card.title}
                className={`rounded-xl p-4 border border-accent transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-800/80 text-white'
                    : 'bg-gradient-to-br from-yellow-50 via-white to-orange-100 text-gray-900'
                }`}
              >
                <div className="font-semibold text-lg mb-2">{card.icon} {card.title}</div>
                <p className="text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <div className="font-semibold text-lg mb-4 text-center">📸 Event Highlights</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Event Images */}
              <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                <Image src="/event-1.png" alt="Blindfolded Conversations Event 1" width={200} height={200} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                <Image src="/event-2.png" alt="Blindfolded Conversations Event 2" width={200} height={200} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                <Image src="/event-3.png" alt="Blindfolded Conversations Event 3" width={200} height={200} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                <Image src="/event-4.png" alt="Blindfolded Conversations Event 4" width={200} height={200} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                <Image src="/event-5.png" alt="Blindfolded Conversations Event 5" width={200} height={200} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-lg shadow-md hover:scale-105 transition-transform duration-300 overflow-hidden">
                <Image src="/event-6.png" alt="Blindfolded Conversations Event 6" width={200} height={200} className="w-full h-full object-cover" />
              </div>
            </div>
            <p className="text-sm text-center mt-4 text-gray-800">Event photos showcasing the successful execution of Blindfolded Conversations</p>
          </div>
        </div>
      </section>

      {/* Download Resume */}
      <section className="relative w-full max-w-5xl mb-10 z-10" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl animate-pulse">📄</span>
          <h2 className="text-3xl font-bold accent text-left hover:text-accent-light transition-colors">Resume</h2>
        </div>
        <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-2xl p-8 border-2 border-accent hover:shadow-accent/50 transition-all duration-300 hover:scale-[1.02] text-center">
          <p className="text-base mb-6">Download my detailed resume to learn more about my experience, skills, and achievements.</p>
          <a 
            href="/resume.pdf" 
            download="Shambhavi_Kumar_Resume.pdf"
            className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-light hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover-lift"
          >
            <span className="text-xl">📥</span>
            Download Resume (PDF)
          </a>
          <p className="text-sm text-gray-800 mt-4">Click the button above to download my resume</p>
        </div>
      </section>
    </div>
  );
}

// SkillCard component
function SkillCard({ icon, name, category }: { icon: React.ReactNode; name: string; category: string }) {
  const categoryColors = {
    Frontend: "bg-gradient-to-br from-pink-900 to-accent-light",
    Backend: "bg-gradient-to-br from-blue-900 to-accent",
    Cloud: "bg-gradient-to-br from-teal-900 to-accent-light",
    Tools: "bg-gradient-to-br from-purple-900 to-accent-light",
    Languages: "bg-gradient-to-br from-yellow-900 to-accent-light",
    Specializations: "bg-gradient-to-br from-orange-700 to-accent-light",
  };
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl shadow-md p-4 min-h-[100px] ${categoryColors[category as keyof typeof categoryColors]} text-white hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 group`}>
      <div className="text-3xl mb-2 group-hover:scale-125 transition-transform duration-300">{icon}</div>
      <div className="text-sm font-semibold text-center group-hover:text-accent-light transition-colors">{name}</div>
      <div className="text-xs mt-1 opacity-70 group-hover:opacity-100 transition-opacity">{category}</div>
    </div>
  );
}
