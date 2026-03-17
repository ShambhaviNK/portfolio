"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
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

const EXPERIENCE_JOBS = [
  { title: "⚡ Junior Software Engineer", company: "Fetch.ai, San Jose, USA", dates: "Present", points: ["Shipped multi-agent workflows on asi.one, increasing task completion efficiency for coordination-heavy use cases by 30%.", "Translated top user pain points into agent capabilities and interaction protocols, iterating with product and UX to drive a 25% improvement in feature adoption.", "Prototyped and instrumented end-to-end agent journeys, enabling data-driven go/no-go decisions and reducing time-to-validate multi-agent concepts by 40%."], link: undefined as string | undefined },
  { title: "🎮 Project Manager (Game Development) Intern", company: "Resilience Inc. (Remote), USA", dates: "(Jun 2025 – Oct 2025)", points: ["Led cross-functional teams to relaunch digital education tools, expanding user adoption by 35%", "Managed project timelines and facilitated weekly progress reviews for strategic alignment", "Built partnerships with 50+ schools to deploy gamified social-emotional learning content"], link: undefined as string | undefined },
  { title: "🤖 AI/Software Intern", company: "Brain and Body Autism Center, Mountain View, CA, USA", dates: "(Jun 2025 - Dec 2025)", points: ["Developed iOS-based AI-powered AAC app for non-verbal autistic children using on-device LLMs", "Enhanced communication personalization by 40% through contextual AI implementation", "Collaborated with clinical experts to improve UI/UX, boosting therapy usability by 60%"], link: "https://www.tejutalks.com" },
  { title: "🧑‍💻 Software Product and Platform Engineering Analyst", company: "Accenture Pvt Ltd, India", dates: "(May 2022 – Jun 2024)", points: ["Led team of 4 developers to deliver 10+ responsive web pages for Accenture AWS Business Group", "Resolved 100+ defects for Singapore Ministry of Education, enhancing efficiency by 40%", "Managed 15+ API integrations and maintained 100% code consistency across projects"], link: undefined as string | undefined },
  { title: "🧑‍💼 Application Development Associate", company: "Accenture Pvt Ltd, India", dates: "(Dec 2020 – Apr 2022)", points: ["Built reusable UI component library with 20+ Angular components", "Reduced page load time by 46% and increased user engagement by 33%", "Achieved 90% code coverage through comprehensive unit testing implementation"], link: undefined as string | undefined },
  { title: "🧑‍🎓 Salesforce Intern", company: "Tata Consultancy Services, India", dates: "(Jan 2020 – Jun 2020)", points: ["Gained hands-on experience with Salesforce platform and Trailhead learning paths", "Developed CRM customization and automation skills for workflow optimization", "Contributed to internal project efficiency improvements using Salesforce tools"], link: undefined as string | undefined },
  { title: "🟠 Intern", company: "Orange Tales, Nagpur, India", dates: "(May 2019 – Apr 2020)", points: ["Executed local brand marketing campaigns, boosting event participation by 40%", "Managed social media content creation and audience outreach strategies", "Analyzed campaign metrics using Excel to drive data-informed marketing decisions"], link: undefined as string | undefined },
  { title: "🚶 Global Volunteer", company: "AIESEC, Nagpur, India", dates: "(Jun 2017 – Feb 2019)", points: ["Led intercultural marketing initiatives with international teams", "Increased volunteer exchange program participation by 25%", "Utilized Excel for impact metrics tracking and logistical planning"], link: undefined as string | undefined },
  { title: "🟦 Intern", company: "eParivahan, Mumbai, India", dates: "(Dec 2018 – Jan 2019)", points: ["Streamlined data entry and reporting processes using Microsoft Excel", "Assisted in digitization efforts for legacy transport system records", "Created summary dashboards to improve internal data accessibility"], link: undefined as string | undefined },
];

export default function Home() {
  useEffect(() => {
    AOS.init({ 
      once: true, 
      duration: 600, 
      offset: 50,
      easing: 'ease-out-cubic',
      disable: 'mobile'
    });
  }, []);

  // Responsive: detect mobile vs desktop (for slider vs single-page)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateIsMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 1024); // match Tailwind lg breakpoint
      }
    };
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Scroll to top on page refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Floating contact button state
  const [showContact, setShowContact] = useState(false);

  // Add state for active tab
  const [activeTab, setActiveTab] = useState("All");
  
  // Add state for scroll to top button
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Card-based navigation: one section per "card", arrow moves to next/prev
  const CARD_IDS = ['top', 'about', 'experience', 'education', 'ambassador', 'projects', 'skills', 'certifications', 'achievements', 'entrepreneurship', 'events', 'resume'] as const;
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(0);
  const [expandedExperienceIndex, setExpandedExperienceIndex] = useState<number | null>(0);

  // Derive progress and active section from current card index
  useEffect(() => {
    const total = CARD_IDS.length;
    setScrollProgress(total > 1 ? currentSectionIndex / (total - 1) : 0);
    setActiveSection(CARD_IDS[currentSectionIndex]);
  }, [currentSectionIndex]);

  const navSections = [
    { id: 'top', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '🎯' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'ambassador', label: 'Ambassador', icon: '🌟' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'certifications', label: 'Certifications', icon: '📜' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'entrepreneurship', label: 'Entrepreneurship', icon: '💎' },
    { id: 'events', label: 'Events', icon: '🎪' },
    { id: 'resume', label: 'Resume', icon: '📄' }
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'top') {
      setCurrentSectionIndex(0);
      setShowNavMenu(false);
      return;
    }
    const i = CARD_IDS.indexOf(sectionId as typeof CARD_IDS[number]);
    if (i >= 0) setCurrentSectionIndex(i);
    setShowNavMenu(false);
  };

  const goToNextSection = () => {
    setCurrentSectionIndex(i => (i + 1) % CARD_IDS.length);
  };
  const goToPrevSection = () => {
    setCurrentSectionIndex(i => Math.max(0, i - 1));
  };

  const scrollToTop = () => {
    setCurrentSectionIndex(0);
  };

  // Show "scroll to top" when not on first card
  const showScrollTop = currentSectionIndex > 0;

  return (
    <>
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
      `}</style>
      <div className="relative min-h-screen font-sans bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-stone-100">
        {/* Scroll progress bar – top */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200/50 dark:bg-stone-700/50 z-[60]">
          <div className="h-full bg-accent transition-all duration-300 ease-out" style={{ width: `${scrollProgress * 100}%` }} />
        </div>

        {/* Next / Prev section buttons + section indicator */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
          <span className="text-xs font-medium text-stone-500">
            {currentSectionIndex + 1} / {CARD_IDS.length}
          </span>
          <button onClick={goToPrevSection} aria-label="Previous section" className="p-2 rounded-full border-2 border-stone-600 hover:border-accent transition-all hover:scale-110">
            <svg className="w-5 h-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </button>
          <button onClick={goToNextSection} aria-label="Next section" className="p-2 rounded-full border-2 border-stone-600 hover:border-accent transition-all hover:scale-110">
            <svg className="w-5 h-5 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </button>
        </div>

        {/* Side progress nav – visible on all slides */}
        <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-1">
          {navSections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={`flex items-center gap-2 text-left transition-all duration-300 group py-1
                ${activeSection === s.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 ${activeSection === s.id ? 'bg-accent w-2 h-2' : 'bg-stone-500'}`} />
              <span className="text-[11px] font-medium uppercase tracking-wider max-w-0 group-hover:max-w-[88px] overflow-hidden transition-all duration-300 text-stone-400">{s.label}</span>
            </button>
          ))}
        </nav>

        {/* Floating Contact Button – on every slide except the first */}
        {currentSectionIndex !== 0 && (
          <button
            className="fixed bottom-8 right-8 z-50 bg-accent text-white rounded-full shadow-lg p-4 transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-xl hover:bg-accent-light font-medium text-sm"
            onClick={() => setShowContact(true)}
            aria-label="Contact Me"
          >
            📞 Contact Me
          </button>
        )}

        {showContact && (
          <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn overflow-y-auto p-4" onClick={() => setShowContact(false)}>
            <div className={`rounded-2xl p-6 shadow-2xl relative min-w-[320px] max-w-[400px] animate-scaleIn my-8
              bg-stone-800 border border-stone-600 text-stone-100`} onClick={e => e.stopPropagation()}>
              <button className={`absolute top-4 right-4 text-2xl hover:scale-110 transition-transform text-stone-400 hover:text-white`} onClick={() => setShowContact(false)}>&times;</button>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-accent">Let&apos;s Connect!</h3>
                <p className="text-sm text-stone-400">I&apos;d love to hear from you!</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-700 transition-colors duration-300 group">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Image src="/gmail_logo.png" alt="Gmail" width={20} height={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-stone-400">Email</p>
                    <a href="mailto:shambhavinavranjankumar@gmail.com" className="text-accent hover:text-accent-light transition-colors font-medium text-sm">shambhavinavranjankumar@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-700 transition-colors duration-300 group">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="text-green-600 text-sm">📞</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-stone-400">Phone</p>
                    <a href="tel:6692104314" className="text-accent hover:text-accent-light transition-colors font-medium text-sm">669-210-4314</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-700 transition-colors duration-300 group">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-stone-400">LinkedIn</p>
                    <a href="http://linkedin.com/in/shambhavinkumar" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light transition-colors font-medium text-sm">/shambhavinkumar</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-700 transition-colors duration-300 group">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.75a5.75 5.75 0 1 1-5.75 5.75 5.75 5.75 0 0 1 5.75-5.75zm0 1.5a4.25 4.25 0 1 0 4.25 4.25 4.25 4.25 0 0 0-4.25-4.25zm5.25 1.25a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-stone-400">Instagram</p>
                    <a href="https://www.instagram.com/shambhavi_123" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light transition-colors font-medium text-sm">@shambhavi_123</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-700 transition-colors duration-300 group">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-sky-600" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-stone-400">Twitter</p>
                    <a href="https://twitter.com/Shambhavi_123" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light transition-colors font-medium text-sm">@Shambhavi_123</a>
                  </div>
                </div>
              </div>
<div className="mt-6 pt-4 border-t border-stone-600 text-center">
              <p className="text-xs text-stone-400">Looking forward to connecting with you! ✨</p>
              </div>
            </div>
          </div>
        )}

        <div className={isMobile ? "w-full" : "h-screen overflow-hidden w-full"}>
        <div
          className={`flex h-full transition-transform duration-500 ease-out ${isMobile ? "flex-col" : ""}`}
          style={isMobile ? undefined : { transform: `translateX(-${currentSectionIndex * 100}%)` }}
        >
          {/* Slide 0: Hero */}
          <div className="w-full flex-shrink-0 h-full overflow-hidden">
      <div className="w-full flex flex-col items-center p-4 sm:p-10">
      {/* Subtle modern background: gradient mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <>
          <div className="absolute top-0 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-900/80 via-transparent to-transparent" />
        </>
      </div>

      {/* Navigation Menu Button */}
      <button
        onClick={() => setShowNavMenu(!showNavMenu)}
        className="fixed top-8 left-8 z-50 bg-accent text-white rounded-full shadow-lg p-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-accent-light"
        aria-label="Navigation menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Navigation Menu – refined dark card aesthetic */}
      {showNavMenu && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-md z-40 animate-fadeIn" onClick={() => setShowNavMenu(false)}>
          <div
            className="absolute top-20 left-8 rounded-2xl border border-stone-600 bg-stone-800/98 shadow-2xl shadow-black/40 min-w-[288px] max-w-[320px] animate-scaleIn ring-1 ring-stone-700/50 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="border-b border-stone-600/80 px-5 py-4 flex items-center justify-between">
              <h3 className="font-display text-base font-bold tracking-tight text-stone-100">Quick Navigation</h3>
              <button
                onClick={() => setShowNavMenu(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-700/80 transition-colors duration-200"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav className="p-2 py-3 grid grid-cols-1 gap-0.5 max-h-[70vh] overflow-y-auto">
              {navSections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 border-l-[3px]
                      ${isActive
                        ? 'border-accent bg-accent/15 text-teal-200'
                        : 'border-transparent text-stone-300 hover:bg-stone-700/60 hover:text-stone-100'}`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-700/50 text-lg shrink-0" aria-hidden>{section.icon}</span>
                    <span className={`text-sm font-medium ${isActive ? 'text-accent' : ''}`}>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-50 bg-accent text-white rounded-full shadow-lg p-3 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-accent-light"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Hero Section – bold, editorial */}
      <header className="snap-section min-h-screen relative w-full max-w-5xl mx-auto px-4 pt-20 sm:pt-28 pb-12 sm:pb-16 z-10 flex flex-col justify-center" data-aos="fade-down">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8">
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-accent/30 hover:ring-accent/60 transition-all duration-300 hover:scale-[1.02]">
                <Image src="/profile.jpg" alt="Shambhavi Navranjan Kumar" width={144} height={144} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg">
                <Image src="/logo.svg" alt="" width={24} height={24} />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500 mb-2">Portfolio</p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                <span className="gradient-text">Shambhavi</span>
                <br />
                <span className="text-stone-100">Navranjan Kumar</span>
              </h1>
              <p className="mt-3 text-lg sm:text-xl font-medium text-stone-400">
                Product & Engineering Management
              </p>
              <p className="mt-1 text-sm text-stone-500">San Jose, CA · MS @ SJSU</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setShowContact(true)}
              className="cta-glow w-full sm:w-auto px-8 py-4 rounded-2xl bg-accent text-white font-semibold text-base hover:bg-accent-light transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-lg"
            >
              Get in touch
            </button>
            <a
              href="#experience"
              onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl border-2 font-semibold text-base text-center transition-all duration-300 hover:scale-[1.02]
                border-stone-600 text-stone-300 hover:border-accent hover:text-accent`}
            >
              View experience
            </a>
          </div>
        </div>
      </header>
          </div>
        </div>
          {/* Slide 1: About */}
          <div className="w-full flex-shrink-0 h-full overflow-hidden">
      <div className="w-full flex flex-col items-center p-4 sm:p-10">
      {/* About – overlapping “sticky note” cards */}
      <section id="about" className="snap-section min-h-screen relative w-full max-w-5xl mb-12 z-10 flex flex-col justify-center py-16 overflow-hidden" data-aos="fade-up">
        <div className="mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">About</h2>
          <p className={`mt-1 text-sm ${"text-stone-400"}`}>In three notes</p>
        </div>
        <div className="relative flex flex-col gap-4 sm:min-h-[360px] sm:flex sm:items-center sm:justify-center">
          {/* Back card – left; stacked on mobile, tilted on desktop */}
          <div
            className={`relative sm:absolute w-full sm:w-80 max-w-sm rounded-xl p-5 shadow-lg border transition-all duration-300 hover:z-20 hover:scale-[1.02]
              ${"bg-amber-950/40 border-amber-800/50"}
              sm:rotate-[-3deg] sm:origin-bottom-left sm:left-4 sm:top-4 mb-4 sm:mb-0`}
          >
            <span className="text-2xl opacity-70">📐</span>
            <p className="font-display font-bold text-stone-800 dark:text-stone-200 mt-2 text-lg">Built</p>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">4+ years in software engineering & product delivery.</p>
          </div>
          {/* Middle card – right; stacked on mobile, tilted on desktop */}
          <div
            className={`relative sm:absolute w-full sm:w-80 max-w-sm rounded-xl p-5 shadow-lg border transition-all duration-300 hover:z-20 hover:scale-[1.02]
              ${"bg-teal-950/40 border-teal-800/50"}
              sm:rotate-[2deg] sm:origin-bottom-right sm:right-4 sm:top-8 mb-4 sm:mb-0`}
          >
            <span className="text-2xl opacity-70">🎓</span>
            <p className="font-display font-bold text-stone-800 dark:text-stone-200 mt-2 text-lg">Learning</p>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">Masters in Engineering Management — strategy, tech & leadership.</p>
          </div>
          {/* Front card – center, main story */}
          <div
            className={`relative z-10 w-full max-w-lg rounded-2xl p-6 sm:p-8 shadow-xl border transition-all duration-300
              ${"bg-stone-800/95 border-stone-600"}
              rotate-0 mt-0 sm:mt-28`}
          >
            <p className="text-base sm:text-lg leading-relaxed text-stone-700 dark:text-stone-300">
              Aspiring <span className="font-semibold text-stone-900 dark:text-stone-100">Product/Project Manager</span> bridging technical depth with business strategy. Building toward scalable, impactful solutions.
            </p>
          </div>
        </div>
      </section>
          </div>
        </div>
          {/* Slide 2: Experience */}
          <div className="w-full flex-shrink-0 h-full overflow-hidden">
      <div className="w-full flex flex-col items-center p-4 sm:p-10">
      {/* Work Experience – role selector + detail panel */}
      <section id="experience" className="snap-section min-h-screen relative w-full max-w-5xl mb-12 z-10 flex flex-col justify-center py-16" data-aos="fade-up">
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">Work Experience</h2>
          <p className="mt-1 text-sm text-stone-400">{isMobile ? "Tap a role to expand" : "Select a role to view details"}</p>
        </div>
        {isMobile ? (
          <div className="space-y-3">
            {EXPERIENCE_JOBS.map((job, index) => {
              const isOpen = expandedExperienceIndex === index;
              const shortTitle = job.title.replace(/^[^\s]+\s/, "").trim() || job.title;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border shadow-md overflow-hidden ${isOpen ? "border-accent/60" : "border-stone-600"} bg-stone-800/90`}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedExperienceIndex((cur) => (cur === index ? null : index))}
                    className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <div className="font-semibold text-base text-stone-100 leading-snug">{shortTitle}</div>
                      <div className="mt-1 text-xs text-stone-400 flex flex-wrap gap-x-3 gap-y-1">
                        <span className="text-accent font-medium">{job.company}</span>
                        <span className="italic text-stone-500">{job.dates}</span>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-stone-400 transition-transform duration-200 mt-0.5 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <ul className="mt-1 space-y-2 text-sm text-stone-300">
                        {job.points.map((p, i) => (
                          <li key={i} className="flex gap-2 leading-relaxed">
                            <span className="text-accent mt-0.5">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                      {job.link && (
                        <div className="mt-4">
                          <a
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-accent-light transition-all duration-300"
                          >
                            <span>🔗</span> View Project
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,260px)_1fr] gap-6 lg:gap-8">
            {/* Role list – compact */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:max-h-[420px] lg:overflow-y-auto">
              {EXPERIENCE_JOBS.map((job, index) => {
                const isSelected = selectedExperienceIndex === index;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedExperienceIndex(index)}
                    className={`flex-shrink-0 lg:flex-shrink text-left rounded-xl px-4 py-3 transition-all duration-200 border-l-4 lg:border-l-4 min-w-[200px] lg:min-w-0
                      ${isSelected
                        ? "border-accent bg-accent/10 text-white"
                        : "border-transparent hover:bg-stone-700/50 text-stone-400"}`}
                  >
                    <span className="block font-semibold text-sm truncate">{job.title.replace(/^[^\s]+\s/, "").trim() || job.title}</span>
                    <span className="block text-xs opacity-80 mt-0.5 truncate">{job.company}</span>
                  </button>
                );
              })}
            </div>
            {/* Detail panel – one role at a time */}
            <div className="rounded-2xl p-6 sm:p-8 border shadow-lg flex flex-col items-start transition-all duration-300 min-h-[320px] bg-stone-800/90 border-stone-600">
              {(() => {
                const job = EXPERIENCE_JOBS[selectedExperienceIndex];
                if (!job) return null;
                return (
                  <>
                    <div className="font-bold text-lg sm:text-xl text-stone-100">{job.title}</div>
                    <div className="text-sm flex flex-wrap gap-x-4 gap-y-1 mt-2 text-stone-400">
                      <span>{job.company}</span>
                      <span className="italic text-stone-500">{job.dates}</span>
                    </div>
                    <ul className="list-disc pl-5 space-y-2 mt-4 text-sm text-stone-300">
                      {job.points.map((p, i) => (
                        <li key={i} className="leading-relaxed">{p}</li>
                      ))}
                    </ul>
                    {job.link && (
                      <div className="mt-6">
                        <a href={job.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-accent-light transition-all duration-300">
                          <span>🔗</span> View Project
                        </a>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </section>
          </div>
        </div>
          {/* Slide 3: Education */}
          <div className="w-full flex-shrink-0 h-full overflow-hidden">
      <div className="w-full flex flex-col items-center p-4 sm:p-10">
      {/* Education – vertical timeline */}
      <section id="education" className="snap-section min-h-screen relative w-full max-w-5xl mb-12 z-10 flex flex-col justify-center py-16" data-aos="fade-up">
        <div className="mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">Education</h2>
          <p className={`mt-1 text-sm ${"text-stone-400"}`}>Academic journey</p>
        </div>
        <div className="relative pl-8 sm:pl-10 border-l-2 border-accent/40 space-y-10">
          {[
            { degree: "Master of Science, Engineering Management", school: "San Jose State University", location: "San Jose, California, USA", dates: "Aug 2024 – Present", highlight: "Focus: Engineering management, leadership, and scalable solutions." },
            { degree: "Executive Master of Business Administration", school: "IIM Tiruchirappalli", location: "Tiruchirappalli, India", dates: "May 2023 – Jul 2024", highlight: "Advanced management training for executives." },
            { degree: "Bachelor of Engineering, Information Technology", school: "Shri Ramdeobaba College of Engineering and Management", location: "Nagpur, Maharashtra, India", dates: "Aug 2016 – May 2020", highlight: "Graduated with distinction in Information Technology." }
          ].map((edu, index) => (
            <div key={index} className="relative">
              <span className="absolute -left-8 sm:-left-10 top-0 w-4 h-4 rounded-full bg-accent border-4 border-stone-100 dark:border-stone-900 shadow-sm" aria-hidden />
              <div className={`rounded-xl p-5 sm:p-6 ${"bg-stone-800/60 border border-stone-600/60"}`}>
                <span className={`inline-block text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3 ${"bg-accent/20 text-teal-200"}`}>
                  {edu.dates}
                </span>
                <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100">{edu.degree}</h3>
                <p className="text-sm font-medium text-accent mt-1">{edu.school}</p>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-0.5">{edu.location}</p>
                <p className="text-sm text-stone-700 dark:text-stone-300 mt-3 leading-relaxed">{edu.highlight}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
          </div>
        </div>
          {/* Slide 4: Ambassador */}
          <div className="w-full flex-shrink-0 h-full overflow-hidden">
      <div className="w-full flex flex-col items-center p-4 sm:p-10">
      {/* Ambassador Roles – branded split panels */}
      <section id="ambassador" className="snap-section min-h-screen relative w-full max-w-5xl mb-12 z-10 flex flex-col justify-center py-16" data-aos="fade-up">
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">Ambassador Roles</h2>
          <p className={`mt-1 text-sm ${"text-stone-400"}`}>Community & brand representation</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mt-6 overflow-hidden rounded-2xl border shadow-xl border-stone-200 dark:border-stone-600">
          {/* Adobe – left panel with brand tint */}
          <div className={`relative p-6 sm:p-8 flex flex-col ${"bg-gradient-to-br from-red-950/30 to-stone-800/90 border-r-0 lg:border-r border-stone-600"}`}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-md flex-shrink-0 p-1.5 border border-stone-200 dark:border-stone-600">
                <Image src="/adobe-logo.png" alt="Adobe" width={44} height={44} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">Adobe Student Ambassador</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-0.5">Creative tools & technologies for the student community</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
              {["Promoting Adobe creative software solutions", "Organizing workshops and training sessions", "Supporting students with design tools", "Building creative skills and digital literacy"].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-red-500 dark:text-red-400 mt-0.5">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Fetch AI – right panel with brand tint */}
          <div className={`relative p-6 sm:p-8 flex flex-col ${"bg-gradient-to-br from-teal-950/30 to-stone-800/90"}`}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-md flex-shrink-0 p-1.5 border border-stone-200 dark:border-stone-600">
                <Image src="/fetch-ai-logo.svg" alt="Fetch AI" width={44} height={44} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">Fetch AI Innovation Ambassador</h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mt-0.5">AI innovation & adoption in the academic community</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
              {["Advocating for AI innovation and adoption", "Facilitating AI workshops and demonstrations", "Connecting students with cutting-edge AI technologies", "Promoting responsible AI development and usage"].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent mt-0.5">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
          </div>
        </div>
          {/* Slide 5: Projects */}
          <div className="w-full flex-shrink-0 h-full overflow-hidden">
      <div className="w-full flex flex-col items-center p-4 sm:p-10">
      {/* Project Experience – type badges + bento-style layout */}
      <section id="projects" className="snap-section min-h-screen relative w-full max-w-5xl mb-12 z-10 flex flex-col justify-center py-16" data-aos="fade-up">
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">Project Experience</h2>
          <p className={`mt-1 text-sm ${"text-stone-400"}`}>Selected builds</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-6">
          {[
            {
              title: "Stock Market Predictor",
              org: "RCOEM",
              type: "Academic Project",
              typeStyle: "bg-violet-500/20 text-violet-300 border-violet-500/40",
              points: [
                "Developed a machine learning model to predict future stock prices using Yahoo! Finance data.",
                "Applied LSTM algorithm for accurate stock closing price forecasting.",
                "Designed system to assist investors in making informed decisions while minimizing risks."
              ]
            },
            {
              title: "Subscription Killer",
              org: "UCSD Hackathon",
              type: "Hackathon Project",
              typeStyle: "bg-amber-500/20 text-amber-300 border-amber-500/40",
              points: [
                "Developed a React + GPT-4 based AI app to identify, track, and cancel unwanted subscriptions.",
                "Engineered smart dashboards and auto-cancellation workflows to reduce user spending."
              ]
            }
          ].map((project, index) => (
            <div
              key={index}
              className={`lg:col-span-6 rounded-2xl p-6 border shadow-lg flex flex-col transition-all duration-300 hover:shadow-xl
                ${"bg-stone-800/90 border-stone-600"}
                ${index === 0 ? "lg:col-start-1" : "lg:col-start-7"}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <span className={`inline-block w-fit text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg border mb-4 ${project.typeStyle}`}>
                {project.type}
              </span>
              <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">{project.title}</h3>
              <p className="text-sm text-accent font-medium mt-0.5">{project.org}</p>
              <ul className="mt-4 space-y-2 text-sm text-stone-700 dark:text-stone-300">
                {project.points.map((point, pointIndex) => (
                  <li key={pointIndex} className="flex gap-2 leading-relaxed">
                    <span className="text-accent flex-shrink-0 mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
          </div>
        </div>
          {/* Slide 6: Skills */}
          <div className="w-full flex-shrink-0 h-full overflow-y-auto">
      <div className="w-full flex flex-col items-center p-4 sm:p-10">
      {/* Technical Skills */}
      <section id="skills" className="snap-section min-h-screen relative w-full max-w-5xl mb-12 z-10 flex flex-col justify-center py-16">
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">Technical Skills</h2>
        </div>
        <div className="rounded-2xl p-6 sm:p-8 border shadow-lg bg-stone-800/80 border-stone-600">
          {/* Skill Categories as Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {SKILL_TABS.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                  ${activeTab === tab
                    ? 'bg-accent text-white shadow-md'
                    : 'bg-stone-700 text-stone-300 hover:bg-stone-600'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {SKILLS.filter(skill => activeTab === "All" || skill.category === activeTab).map((skill) => (
              <div key={skill.name}>
                <SkillCard icon={skill.icon} name={skill.name} category={skill.category} />
              </div>
            ))}
          </div>
        </div>
      </section>
          </div>
        </div>
          {/* Slide 7: Certifications */}
          <div className="w-full flex-shrink-0 h-full overflow-hidden">
      <div className="w-full flex flex-col items-center p-4 sm:p-10">
      {/* Certifications – grid */}
      <section id="certifications" className="snap-section min-h-screen relative w-full max-w-5xl mb-12 z-10 flex flex-col justify-center py-16" data-aos="fade-up">
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">Certifications</h2>
          <p className={`mt-1 text-sm ${"text-stone-400"}`}>Credentials & courses</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Certified Scrum Product Owner® (CSPO)", org: "Scrum Alliance", date: "Mar 2026 · Active through Mar 2028", id: "001820201" },
            { title: "Advanced Google Analytics", org: "Google Analytics Academy", date: "Feb 2023 · Expires Apr 2026", id: null },
            { title: "Managing Project Risks and Changes", org: "Coursera", date: "Jul 2020", id: null },
            { title: "SQL for Data Science", org: "Coursera", date: "Jul 2020", id: null },
            { title: "Google Analytics for Beginners", org: "Google Analytics Academy", date: "Jun 2020", id: null },
            { title: "Initiating and Planning Projects", org: "Coursera", date: "Jun 2020", id: "VVKFP6SFDELC" },
            { title: "Introduction to Google Docs", org: "Coursera", date: "Jun 2020", id: "KMDHGHLT5DU8" },
            { title: "The Fundamentals of Digital Marketing", org: "Google Digital Garage", date: "Jun 2020", id: null },
            { title: "AI for Everyone", org: "Coursera", date: "Mar 2020", id: null },
          ].map((cert, i) => (
            <div
              key={cert.title}
              className={`rounded-xl p-5 border flex flex-col min-h-[140px] transition-all duration-200 hover:shadow-lg
                bg-stone-800/90 border-stone-600 shadow-sm`}
              data-aos="fade-up"
              data-aos-delay={i * 50}
            >
              <p className="font-display font-bold text-base text-stone-900 dark:text-stone-100 leading-snug">{cert.title}</p>
              <p className="text-sm text-accent font-medium mt-1">{cert.org}</p>
              <p className="text-xs mt-2 text-stone-500">{cert.date}</p>
              {cert.id && <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">ID: {cert.id}</p>}
            </div>
          ))}
        </div>
      </section>
        </div>
        </div>
          {/* Slide 8: Achievements */}
          <div className="w-full flex-shrink-0 h-full overflow-y-auto">
      <div className="w-full flex flex-col items-center p-4 sm:p-10">
      {/* Extra-Curricular Activities & Achievements */}
      <section id="achievements" className="snap-section min-h-screen relative w-full max-w-5xl mb-12 z-10 flex flex-col justify-center py-16" data-aos="fade-up">
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">Achievements &amp; Extra-Curricular</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6" data-aos="fade-up" data-aos-delay="200">
          <div className={`rounded-2xl p-5 border shadow-md flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5
            bg-stone-800/80 border-stone-600`} data-aos="slide-in-left" data-aos-delay="100">
            <div className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-3">🏅 Achievements</div>
            <ul className="list-disc pl-4 text-sm text-stone-700 dark:text-stone-300 space-y-1">
              <li>Secured first division in Kathak</li>
              <li>Visharadh in Kathak</li>
              <li>Performed in World Bengali Dance Conference</li>
            </ul>
          </div>
          <div className={`rounded-2xl p-5 border shadow-md flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5
            bg-stone-800/80 border-stone-600`} data-aos="slide-in-right" data-aos-delay="200">
            <div className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-3">🎭 Extra-Curricular Activities</div>
            <ul className="list-disc pl-4 text-sm text-stone-700 dark:text-stone-300 space-y-1">
              <li>Part of Hindu-Yuva Club, SJSU</li>
              <li>Member of organizing committee of various college events, RCOEM</li>
              <li>Member of Students&apos; Representative Council, 2018-19, RCOEM</li>
              <li>Member of literary club, RCOEM</li>
              <li>Member of Dance club, RCOEM</li>
              <li>Core Committee Vice President of Global Village and Balakalakaar, 2018, AIESEC</li>
              <li>Member of Rotaract Club, 2017-18</li>
              <li>Volunteered in 79th Indian Roads Congress</li>
            </ul>
          </div>
        </div>
      </section>
        </div>
        </div>
          {/* Slide 9: Entrepreneurship */}
          <div className="w-full flex-shrink-0 h-full overflow-y-auto">
      <div className="w-full flex flex-col items-center p-4 sm:p-10">
      {/* Entrepreneurship */}
      <section id="entrepreneurship" className="snap-section min-h-screen relative w-full max-w-5xl mb-12 z-10 flex flex-col justify-center py-16" data-aos="fade-up">
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">Entrepreneurship</h2>
        </div>
        <div className={`rounded-2xl p-6 sm:p-8 border shadow-lg transition-all duration-300
          bg-stone-800/80 border-stone-600`} data-aos="zoom-in" data-aos-delay="200">
          <div className="text-center">
            <div className="font-bold text-xl text-stone-900 dark:text-stone-100 mb-4">💎 Coffer Chics</div>
            <p className="text-base text-stone-700 dark:text-stone-300 mb-4">Founded and operated a successful Instagram-based jewellery business in India, specializing in handmade custom jewellery, demonstrating entrepreneurial spirit and digital marketing skills.</p>
            <p className="text-base mb-4 text-stone-700 dark:text-stone-300">Instagram: <a href="https://www.instagram.com/coffer_chics" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:no-underline hover:text-accent-light transition-colors">@coffer_chics</a></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {[
                { icon: "🚀", title: "Growth", desc: "Rapidly growing Instagram presence with engaged customer base" },
                { icon: "✨", title: "Handcrafted", desc: "Specialized in handmade custom jewellery with unique designs" },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`rounded-xl p-4 border transition-all duration-300
                    bg-stone-700/50 border-stone-600 text-stone-200`}
                >
                  <div className="font-semibold text-lg mb-2">{card.icon} {card.title}</div>
                  <p className="text-sm opacity-90">{card.desc}</p>
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
              <p className="text-sm text-center mt-4 text-stone-400">Click <a href="https://www.instagram.com/coffer_chics" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:no-underline">here</a> to view more posts</p>
            </div>
          </div>
        </div>
      </section>
          </div>
        </div>
          {/* Slide 10: Events */}
          <div className="w-full flex-shrink-0 h-full overflow-y-auto">
      <div className="w-full flex flex-col items-center p-4 sm:p-10">
      {/* Event Management */}
      <section id="events" className="snap-section min-h-screen relative w-full max-w-5xl mb-12 z-10 flex flex-col justify-center py-16" data-aos="fade-up">
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">Event Management</h2>
        </div>
        <div className={`rounded-2xl p-6 sm:p-8 border shadow-lg transition-all duration-300
          bg-stone-800/80 border-stone-600`} data-aos="zoom-in" data-aos-delay="200">
          <div className="text-center mb-6">
            <div className="font-bold text-xl text-stone-900 dark:text-stone-100 mb-4">🎭 Blindfolded Conversations</div>
            <p className="text-base text-stone-700 dark:text-stone-300 mb-4">Successfully organized and managed a two-day collaborative event with Lush House cafe in Nagpur, demonstrating comprehensive event management skills.</p>
          </div>
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {[
              { icon: "📱", title: "Social Media Marketing", desc: "Managed complete social media marketing campaign, created posters and hard banners using Photoshop and Canva" },
              { icon: "🎨", title: "Event Decor", desc: "Handled complete event decoration and visual setup for the two-day event" },
              { icon: "📊", title: "Event Success", desc: "Achieved 500+ footfall with media coverage from newspaper reporters" },
              { icon: "🤝", title: "Collaboration", desc: "Partnered with Lush House cafe in Nagpur for successful event execution" },
              { icon: "📰", title: "Media Coverage", desc: "Event was covered by newspaper reporters, highlighting its success and impact" },
              { icon: "🎯", title: "Project Management", desc: "Coordinated all aspects from planning to execution, ensuring seamless event delivery" },
            ].map((card) => (
              <div
                key={card.title}
                className={`rounded-xl p-4 border transition-all duration-300
                  bg-stone-700/50 border-stone-600 text-stone-200`}
              >
                <div className="font-semibold text-lg mb-2">{card.icon} {card.title}</div>
                <p className="text-sm opacity-90">{card.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <div className="font-semibold text-lg mb-4 text-center text-stone-900 dark:text-stone-100">📸 Event Highlights</div>
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
            <p className="text-sm text-center mt-4 text-stone-400">Event photos showcasing the successful execution of Blindfolded Conversations</p>
          </div>
        </div>
      </section>
          </div>
        </div>
          {/* Slide 11: Resume */}
          <div className="w-full flex-shrink-0 h-full overflow-hidden">
      <div className="w-full flex flex-col items-center p-4 sm:p-10">
      {/* Download Resume */}
      <section id="resume" className="snap-section min-h-screen relative w-full max-w-5xl mb-12 z-10 flex flex-col justify-center py-16" data-aos="fade-up">
        <div className="mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">Resume</h2>
        </div>
        <div className={`rounded-2xl p-8 border shadow-lg text-center transition-all duration-300
          bg-stone-800/80 border-stone-600`}>
          <p className="text-base text-stone-700 dark:text-stone-300 mb-6">Download my detailed resume to learn more about my experience, skills, and achievements.</p>
          <a 
            href="/resume.pdf" 
            download="Shambhavi_Kumar_Resume.pdf"
            className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-xl font-semibold hover:bg-accent-light transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="text-xl">📥</span>
            Download Resume (PDF)
          </a>
          <p className="text-sm text-stone-400 mt-4">Click the button above to download my resume</p>
        </div>
      </section>
        </div>
        </div>
        </div>
      </div>
    </div>
    </>
  );
}

// SkillCard component – modern teal/stone palette
function SkillCard({ icon, name, category }: { icon: React.ReactNode; name: string; category: string }) {
  const categoryColors: Record<string, string> = {
    Frontend: "bg-teal-700 hover:bg-teal-600",
    Backend: "bg-teal-800 hover:bg-teal-700",
    Cloud: "bg-stone-700 hover:bg-stone-600",
    Tools: "bg-amber-800/90 hover:bg-amber-700/90",
    Languages: "bg-teal-600 hover:bg-teal-500",
    Specializations: "bg-amber-900/90 hover:bg-amber-800/90",
  };
  const bg = categoryColors[category] ?? "bg-stone-600 hover:bg-stone-500";
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl shadow-md p-4 min-h-[100px] ${bg} text-white transition-all duration-300 hover:scale-105 hover:shadow-lg group`}>
      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <div className="text-sm font-semibold text-center">{name}</div>
      <div className="text-xs mt-1 opacity-80">{category}</div>
    </div>
  );
}
