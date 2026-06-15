import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  // ENVIRONMENT THEME TOGGLE STATE
  const [isDarkMode, setIsDarkMode] = useState(true);

  // MOBILE INTERACTION DRAWER HOOK
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // CONTACT FORM STATE DATA PIPELINES
  const [formData, setFormData] = useState({ name: '', role: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ loading: false, success: null, error: null });

  // MULTIMEDIA REF AND CONTROLLER LAYER (HERO VIDEO)
  const videoRef = useRef(null);
  const [videoState, setVideoState] = useState({ isPlaying: true, isMuted: true });

  // AUTOMATED INSULATED AI CHAT BOT STATES
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "SYSTEM ACTIVE: Welcome recruiter node. I am RANJITH-AI [v4.1]. Click a protocol index below to audit my engineering metrics." }
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: null, error: null });

    try {
      const response = await fetch('https://ranjith-portfolio-gjx8.onrender.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({ loading: false, success: data.message || 'Message packet transmitted successfully!', error: null });
        setFormData({ name: '', role: '', email: '', message: '' }); 
      } else {
        setFormStatus({ loading: false, success: null, error: data.error || 'Server rejected gateway packet.' });
      }
    } catch (err) {
      setFormStatus({ loading: false, success: null, error: 'Cannot connect to local backend engine.' });
    }
  };

  // VIDEO CONTROLS
  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoState.isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoState.isMuted;
      setVideoState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }
  };

  // CHATBOT LOGIC
  const processChatQuery = (userText, responseKey) => {
    if (isBotTyping) return;

    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsBotTyping(true);

    setTimeout(() => {
      let botResponse = "";

      switch(responseKey) {
        case 'about':
          botResponse = "Ranjith A is a Software Engineer specializing in MERN Stack architectures and AI/ML model evaluations. Active node terminal situated in Coimbatore, India.";
          break;
        case 'stack':
          botResponse = "EXPERT MATRIX:\n• Front-End: React, UI DOM layout architectures, Tailwind CSS\n• Back-End: Node.js, Express APIs, FastAPI infrastructure pipelines\n• Databases: MongoDB multi-clustering query optimization schemas\n• Data Science: Python processing matrices (Pandas, NumPy, Predictive analytics)";
          break;
        case 'projects':
          botResponse = "DEPLOYED LAB PACKETS:\n1. HealthEdge AI - Python telemetry models linked to Flask/MongoDB clusters.\n2. Student Campus Manager - Full Enterprise MERN deployment mapping structural components.\n3. TechScope Grocery - Dynamic React engine tracking matrix loops state design frameworks.";
          break;
        case 'contact':
          botResponse = "Direct data wire link established below! Alternatively, execute standard tracking packets transfer loop using the manual fields setup grid.";
          break;
        default:
          botResponse = "Query tracking parameter unmapped. Select valid action protocol index item.";
      }

      setIsBotTyping(false);
      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1000);
  };

  // MOBILE-OPTIMIZED ANIMATION VARIANTS
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } }
  };

  // REUSABLE SOCIAL LINKS COMPONENT
  const SocialLinks = () => (
    <div className="flex items-center gap-4">
      <a href="https://github.com/Ranjith2567" target="_blank" rel="noopener noreferrer" 
         className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 ${isDarkMode ? 'bg-white/5 border-white/10 text-slate-300 hover:text-orange-400 hover:border-orange-500/50' : 'bg-white border-slate-300 text-slate-600 hover:text-orange-500 hover:border-orange-500'}`}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      </a>
      <a href="https://www.linkedin.com/in/ranjith-a-875b8b2b9/" target="_blank" rel="noopener noreferrer" 
         className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 ${isDarkMode ? 'bg-white/5 border-white/10 text-slate-300 hover:text-orange-400 hover:border-orange-500/50' : 'bg-white border-slate-300 text-slate-600 hover:text-orange-500 hover:border-orange-500'}`}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </a>
      <a href="mailto:garanjith4257@gmail.com" 
         className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 ${isDarkMode ? 'bg-white/5 border-white/10 text-slate-300 hover:text-orange-400 hover:border-orange-500/50' : 'bg-white border-slate-300 text-slate-600 hover:text-orange-500 hover:border-orange-500'}`}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
      </a>
    </div>
  );

  return (
    <div className={`w-full min-h-screen font-sans antialiased overflow-x-hidden selection:bg-orange-500 selection:text-white relative transition-colors duration-500 ${
      isDarkMode ? 'bg-[#0a0604] text-slate-100' : 'bg-[#fafafa] text-slate-900'
    }`}>
      
      {/* AMBIENT BACKGROUND GLOW */}
      <div className={`absolute top-0 left-0 w-full h-[100vh] pointer-events-none z-0 transition-opacity duration-500 ${
        isDarkMode ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-orange-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[150px]" />
      </div>

      {/* PRELOADER INTERACTIVE OVERLAY */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-[#0a0604] z-50 flex flex-col items-center justify-center gap-2"
          >
            <motion.h1 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white text-5xl md:text-7xl font-serif tracking-tighter"
            >
              Ranjith<span className="text-orange-500">.</span>
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-[2px] bg-orange-500 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== TOP NAVIGATION HEADER ==================== */}
      <motion.header 
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: loading ? 2.2 : 0 }}
        className={`w-full fixed top-0 backdrop-blur-md z-40 transition-colors duration-300 ${
          isDarkMode ? 'bg-[#0a0604]/80 border-b border-white/5' : 'bg-white/90 border-b border-slate-200'
        }`}
      >
        <div className="max-w-[1400px] mx-auto h-20 px-6 md:px-12 flex justify-between items-center">
          <div className="text-2xl font-serif tracking-tight cursor-pointer group">
            Ranjith<span className="text-orange-500 group-hover:text-amber-400 transition-colors">.</span>
          </div>
          
          <div className={`hidden lg:flex space-x-10 text-xs font-bold uppercase tracking-widest ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            <a href="#experience" className="hover:text-orange-500 transition-colors">Experience</a>
            <a href="#skills" className="hover:text-orange-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-orange-500 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border text-sm transition-all active:scale-95 cursor-pointer ${
                isDarkMode ? 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10' : 'border-slate-300 bg-slate-100 text-amber-600 hover:bg-slate-200'
              }`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border transition-all active:scale-90 cursor-pointer ${
                isDarkMode ? 'border-white/10 bg-white/5 text-slate-300' : 'border-slate-300 bg-slate-50 text-slate-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        
        {/* MOBILE MENU (WITH ANIMATIONS) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`w-full lg:hidden border-b overflow-hidden font-mono ${
                isDarkMode ? 'bg-[#0a0604] border-white/5' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="px-6 py-6 flex flex-col space-y-4 text-xs font-bold uppercase tracking-widest">
                <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-orange-500 transition-colors">// 01. Experience</a>
                <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-orange-500 transition-colors">// 02. Skills</a>
                <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-orange-500 transition-colors">// 03. Projects</a>
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2 hover:text-orange-500 transition-colors">// 04. Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ==================== 1. HERO SECTION (WITH ENTRY ANIMATIONS) ==================== */}
      <div className="w-full max-w-[1600px] mx-auto min-h-screen flex flex-col lg:flex-row relative z-10 pt-20">
        
        {/* LEFT COLUMN: TEXT */}
        <div className="w-full lg:w-1/2 h-auto lg:h-[calc(100vh-80px)] flex flex-col justify-center px-8 lg:px-24 py-12 lg:py-0">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: loading ? 2.3 : 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-[1px] bg-orange-500"></div>
              <p className={`text-[10px] font-bold tracking-[0.2em] uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                AI/ML DEVELOPER • PORTFOLIO 2026
              </p>
            </div>
            <h1 className={`text-6xl md:text-8xl font-serif tracking-tight pb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Ranjith
            </h1>
            <p className={`text-sm md:text-base leading-relaxed max-w-md font-light ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Crafting intelligent <span className={`font-medium underline decoration-orange-500 underline-offset-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>AI models</span>, cinematic visual pipelines, and growth-focused MERN stack experiences that help brands stand out in a competitive digital world.
            </p>
            
            <div className="space-y-6 pt-4">
              <div className="flex flex-wrap items-center gap-6 md:gap-8">
                <a href="#projects" className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:scale-105 transition-transform duration-300 shadow-lg shadow-orange-500/20 cursor-pointer">
                  View Work →
                </a>
                <a href="#contact" className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 cursor-pointer ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                  Get in touch
                </a>
              </div>
              <div className="pt-2">
                <SocialLinks />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: loading ? 2.8 : 0.6 }}
            className="absolute bottom-8 left-8 lg:left-24 hidden lg:block"
          >
            <span className={`text-[10px] tracking-[0.25em] uppercase font-medium ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Scroll ↓
            </span>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: VIDEO CARD */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[calc(100vh-80px)] p-4 md:p-8 lg:p-12 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: loading ? 2.5 : 0.4 }}
            className={`relative w-full h-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden border shadow-[0_0_50px_rgba(0,0,0,0.3)] ${isDarkMode ? 'bg-slate-900/50 border-white/5' : 'bg-slate-100 border-slate-300 shadow-xl'}`}
          >
          <video
  ref={videoRef}
  src="/intro.mp4" 
  className="absolute inset-0 w-full h-full object-cover"
  loop
  autoPlay
  muted={false} 
/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
              <button onClick={togglePlay} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 hover:scale-105 transition-all duration-300 cursor-pointer">
                {videoState.isPlaying ? <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg className="w-4 h-4 translate-x-[1px]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>}
              </button>
              <button onClick={toggleMute} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 hover:scale-105 transition-all duration-300 cursor-pointer">
                {videoState.isMuted ? <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3z"/></svg> : <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ==================== 2. THE REST OF THE PORTFOLIO ==================== */}
      <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 space-y-32 pb-32 relative z-10 pt-20 overflow-hidden">
        
        {/* EXPERIENCE TIMELINE */}
        {/* Changed viewport trigger amount to 0.1 for mobile responsiveness */}
        <motion.section id="experience" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={containerVariants} className="space-y-12 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">Industry History</span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight">Journey of Experience</h2>
          </div>
          <div className="relative pl-8 space-y-12">
            <div className={`absolute left-[11px] top-2 bottom-2 w-[1px] ${isDarkMode ? 'bg-gradient-to-b from-orange-500 via-white/10 to-transparent' : 'bg-gradient-to-b from-orange-500 via-slate-200 to-transparent'}`} />
            
            <motion.div variants={itemVariants} className="relative space-y-2 group">
              <div className={`absolute left-[-26px] top-1.5 w-3 h-3 rounded-full border flex items-center justify-center transition-colors ${isDarkMode ? 'bg-[#0a0604] border-white/20 group-hover:border-orange-500' : 'bg-white border-slate-300 group-hover:border-orange-500'}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 scale-0 group-hover:scale-100 transition-transform duration-200" />
              </div>
              <div className="text-[10px] font-bold tracking-widest text-orange-500 uppercase">Internship • AI & Research Development</div>
              <h4 className="text-xl font-bold font-serif">AI / ML R&D Intern</h4>
              <p className={`text-sm leading-relaxed max-w-2xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Contributed to research sprints involving exploratory data preprocessing, algorithmic evaluation, and feature engineering loops. Trained and verified predictive classification models using advanced ensemble methodologies.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative space-y-2 group">
              <div className={`absolute left-[-26px] top-1.5 w-3 h-3 rounded-full border flex items-center justify-center transition-colors ${isDarkMode ? 'bg-[#0a0604] border-white/20 group-hover:border-orange-500' : 'bg-white border-slate-300 group-hover:border-orange-500'}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 scale-0 group-hover:scale-100 transition-transform duration-200" />
              </div>
              <div className="text-[10px] font-bold tracking-widest text-orange-500 uppercase">Internship • Web Engineering</div>
              <h4 className="text-xl font-bold font-serif">MERN Stack Developer Intern</h4>
              <p className={`text-sm leading-relaxed max-w-2xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Designed and implemented production-grade web systems. Configured non-relational query schemas and pipelines inside MongoDB, orchestrated centralized REST endpoints using Express and Node.js environments.</p>
            </motion.div>
          </div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={containerVariants} className="space-y-12 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">Expertise</span>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight">Technical Arsenal</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "💻", title: "Core Web Development", skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "DOM", "Async", "Bootstrap"] },
              { icon: "🧠", title: "AI / Machine Learning", skills: ["Supervised Learning", "Predictive Analytics", "Decision Trees", "Pandas", "NumPy", "Matplotlib", "Claude", "Gemini"] },
              { icon: "🌐", title: "MERN Architecture", skills: ["MongoDB Clusters", "Express.js", "React.js", "Node.js", "Tailwind CSS v4"] },
              { icon: "🚀", title: "Engines & Deployment", skills: ["Python Core", "FastAPI", "Flask Engine", "Git/GitHub", "Vercel", "Render", "AWS", "Netlify"] }
            ].map((box, idx) => (
              <motion.div key={idx} variants={itemVariants} className={`p-8 rounded-3xl flex flex-col space-y-6 group transition-all duration-300 border ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-2xl p-3 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-[#0a0604] border border-white/10' : 'bg-slate-50 border border-slate-200'}`}>{box.icon}</span>
                  <h4 className="text-xl font-serif font-bold">{box.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {box.skills.map((s, i) => (
                    <span key={i} className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${isDarkMode ? 'bg-[#0a0604] border-white/10 text-slate-300 group-hover:border-orange-500/50' : 'bg-slate-50 border-slate-200 text-slate-600 group-hover:border-orange-500/50'}`}>{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PROJECTS GRID */}
        <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={containerVariants} className="space-y-12 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">Engineering</span>
            <h3 className="text-3xl md:text-4xl font-serif tracking-tight">Featured Lab</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "HealthEdge AI", meta: "Python • ML • Flask • MongoDB", info: "Intelligent medical telemetry analytics application powered by a custom-trained machine learning classifier.", liveUrl: "https://healthedge-l5gz.onrender.com/" },
              { name: "Student Manager", meta: "MERN Stack Enterprise Framework", info: "Full-featured institutional workflow automation system with optimized database read/write pipelines.", liveUrl: "https://smart-campus-manager.vercel.app/" },
              { name: "Grocery Website", meta: "React.js • Tailwind CSS", info: "Responsive premium e-commerce web interface configuration for a modern grocery retail application.", liveUrl: "http://grocery.techscope.sbs" },
              { name: "File Utility", meta: "FastAPI • Python Streams", info: "High-performance system-level data diagnostic command utility with async file-system buffers.", liveUrl: "#" }
            ].map((proj, i) => (
              <motion.div key={i} variants={itemVariants} className={`p-8 rounded-3xl flex flex-col justify-between group transition-all duration-300 border ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`}>
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block">{proj.meta}</span>
                  <h4 className="text-2xl font-serif font-bold group-hover:text-orange-500 transition-colors duration-300">{proj.name}</h4>
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{proj.info}</p>
                </div>
                <div className="flex justify-start pt-8">
                  <a href={proj.liveUrl} target={proj.liveUrl !== "#" ? "_blank" : "_self"} rel="noopener noreferrer" className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-slate-900 group-hover:text-orange-500'}`}>
                    {proj.liveUrl !== "#" ? "View Project ↗" : "In Development"}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CONTACT FORM SECTION */}
        <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={itemVariants} className="scroll-mt-24 max-w-2xl">
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">Opportunities</span>
              <h3 className="text-3xl md:text-4xl font-serif tracking-tight">Start a Conversation</h3>
            </div>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="name" type="text" value={formData.name} onChange={handleInputChange} required placeholder="Your Name" className={`w-full rounded-2xl px-6 py-4 text-sm focus:outline-none transition duration-300 border ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-orange-500 text-white placeholder-slate-500' : 'bg-white border-slate-200 focus:border-orange-500 text-slate-900'}`} />
                <input name="role" type="text" value={formData.role} onChange={handleInputChange} required placeholder="Role / Organization" className={`w-full rounded-2xl px-6 py-4 text-sm focus:outline-none transition duration-300 border ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-orange-500 text-white placeholder-slate-500' : 'bg-white border-slate-200 focus:border-orange-500 text-slate-900'}`} />
              </div>
              <input name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="Email Address" className={`w-full rounded-2xl px-6 py-4 text-sm focus:outline-none transition duration-300 border ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-orange-500 text-white placeholder-slate-500' : 'bg-white border-slate-200 focus:border-orange-500 text-slate-900'}`} />
              <textarea name="message" rows="4" value={formData.message} onChange={handleInputChange} required placeholder="Your Message..." className={`w-full rounded-2xl px-6 py-4 text-sm focus:outline-none transition duration-300 resize-none border ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-orange-500 text-white placeholder-slate-500' : 'bg-white border-slate-200 focus:border-orange-500 text-slate-900'}`}></textarea>
              <button type="submit" disabled={formStatus.loading} className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-400 text-sm font-bold uppercase tracking-widest rounded-2xl text-white shadow-lg shadow-orange-500/20 disabled:opacity-50 hover:scale-[1.02] transition-transform cursor-pointer">
                {formStatus.loading ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus.success && <p className="text-sm text-emerald-500 pt-2">{formStatus.success}</p>}
              {formStatus.error && <p className="text-sm text-red-500 pt-2">{formStatus.error}</p>}
            </form>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className={`pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-6 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
          <div className="text-2xl font-serif tracking-tight">Ranjith<span className="text-orange-500">.</span></div>
          {/* SOCIAL LINKS IN FOOTER */}
          <SocialLinks />
          <p className={`text-[10px] tracking-widest uppercase ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>© 2026 RANJITH A • All Rights Reserved.</p>
        </footer>
      </div>

      {/* ==================== 3. FLOATING AI CHATBOT WIDGET ==================== */}
      <div className="fixed bottom-6 right-6 z-50 font-sans text-sm flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.85, y: 30 }}
              className={`w-[90vw] sm:w-80 md:w-96 h-[400px] border rounded-3xl overflow-hidden shadow-2xl flex flex-col mb-4 ${isDarkMode ? 'bg-[#0a0604] border-white/10' : 'bg-white border-slate-200'}`}
            >
              <div className={`border-b p-5 flex items-center justify-between ${isDarkMode ? 'border-white/10 bg-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className={`text-[11px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Ranjith_AI</span>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-slate-500 hover:text-orange-500 transition cursor-pointer">✕</button>
              </div>

              <div className={`flex-1 p-5 overflow-y-auto space-y-4 flex flex-col ${isDarkMode ? 'bg-[#0a0604]' : 'bg-white'}`}>
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-br-sm'
                        : isDarkMode ? 'bg-white/10 text-slate-200 rounded-bl-sm' : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isBotTyping && (
                  <div className="flex justify-start">
                    <div className={`p-3 rounded-2xl text-xs animate-pulse ${isDarkMode ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>Typing...</div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className={`p-4 border-t grid grid-cols-2 gap-2 ${isDarkMode ? 'border-white/10 bg-white/5' : 'bg-slate-50 border-slate-200'}`}>
                {['about', 'stack', 'projects', 'contact'].map((key, i) => (
                  <button 
                    key={key} onClick={() => processChatQuery(`Query: ${key}`, key)}
                    className={`py-2 px-3 text-center border rounded-xl text-[10px] font-bold tracking-wider uppercase transition cursor-pointer ${
                      isDarkMode ? 'border-white/10 text-slate-400 hover:border-orange-500 hover:text-orange-500' : 'bg-white border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-500'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-600 to-orange-400 flex items-center justify-center text-white shadow-xl shadow-orange-500/20 cursor-pointer"
        >
          {isChatOpen ? <span className="text-xl font-bold">✕</span> : <span className="text-2xl">🤖</span>}
        </motion.button>
      </div>

    </div>
  );
}

export default App;