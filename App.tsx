import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, CheckCircle, BarChart3, Settings, Users, FileCheck, ChevronRight, ShieldCheck, Star, ChevronDown, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components defined in-file for simplicity given strict single-XML constraint, 
// but organized as if they were separate files in a real project.

// --- CONSTANTS & TYPES ---
const NAVIGATION = [
  { name: 'Methodology', href: '#methodology' },
  { name: 'Services', href: '#services' },
  { name: 'Case Studies', href: '#case-studies' },
];

const EMAIL_ADDRESS = "nexa.advisory9@gmail.com";

// --- HELPERS ---
const smoothScrollTo = (e: React.MouseEvent, href: string) => {
  e.preventDefault();
  const targetId = href.replace('#', '');
  if (!targetId) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const element = document.getElementById(targetId);
  if (element) {
    const headerOffset = 85; // Matches scroll-padding but ensures JS accuracy
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// --- UI COMPONENTS ---

const NexaLogo: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Nexa Advisory Logo">
    {/* Navy Blue Background */}
    <rect width="100" height="100" rx="22" fill="#1E3A8A" />
    
    {/* Stylized N Construction */}
    {/* Left Stem and Diagonal - Light Grey/White for contrast */}
    <path 
      d="M32 72V28L68 72" 
      stroke="#F1F5F9" 
      strokeWidth="11" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      fill="none"
    />
    
    {/* Right Stem - Slate Grey */}
    <path 
      d="M68 72V28" 
      stroke="#64748B" 
      strokeWidth="11" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
}> = ({ children, variant = 'primary', className = '', onClick, href }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-navy-800 text-white hover:bg-navy-900 shadow-lg shadow-navy-800/20 focus:ring-navy-800",
    secondary: "bg-white text-navy-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm focus:ring-slate-200",
    outline: "bg-transparent border border-white/30 text-white hover:bg-white/10 focus:ring-white",
    gold: "bg-gold-500 text-white hover:bg-gold-600 shadow-lg shadow-gold-500/20 focus:ring-gold-500",
  };

  const Component = href ? 'a' : 'button';
  const props = href ? { href, onClick } : { onClick };

  return (
    // @ts-ignore
    <Component 
      {...props} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  );
};

const SectionHeading: React.FC<{
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}> = ({ title, subtitle, center = false, light = false }) => (
  <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
    <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${light ? 'text-white' : 'text-navy-900'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg md:text-xl max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-slate-300' : 'text-slate-600'}`}>
        {subtitle}
      </p>
    )}
    <div className={`h-1 w-20 bg-gold-500 mt-6 ${center ? 'mx-auto' : ''}`} />
  </div>
);

// --- SECTIONS ---

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setIsMobileOpen(false);
    smoothScrollTo(e, href);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => handleNavClick(e, '#')} 
          className="text-2xl font-serif font-bold text-navy-800 flex items-center gap-3"
        >
           <NexaLogo className="w-10 h-10 shadow-sm" />
           <span className={`${isScrolled ? 'text-navy-900' : 'text-navy-900'} md:${!isScrolled && 'text-white'} transition-colors`}>
             Nexa Advisory
           </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAVIGATION.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-sm font-medium hover:text-gold-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-slate-600 md:text-slate-200'}`}
            >
              {item.name}
            </a>
          ))}
          <Button 
            variant="gold" 
            href="#assessment" 
            className="px-5 py-2 text-xs uppercase tracking-wider"
            onClick={(e) => handleNavClick(e, '#assessment')}
          >
            Get Scorecard
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-navy-800"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg py-6 px-6 md:hidden border-t border-slate-100"
          >
            <div className="flex flex-col gap-4">
              {NAVIGATION.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  className="text-lg font-medium text-slate-700 hover:text-navy-800"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
              <Button 
                variant="primary" 
                href="#assessment" 
                className="w-full justify-center" 
                onClick={(e) => handleNavClick(e, '#assessment')}
              >
                Free Operations Assessment
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/20 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy-800/5 border border-navy-800/10 rounded-full text-navy-800 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            Accepting New Portfolios (50-300 Units)
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-navy-900 leading-tight mb-6">
            Stop Operational Chaos. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-800 to-blue-600">
              Start Scaling Efficiently.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
            We transform overwhelmed multifamily operators into streamlined, automated enterprises—without adding headcount.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="primary" 
              href="#assessment" 
              className="shadow-xl shadow-navy-900/10"
              onClick={(e) => smoothScrollTo(e, '#assessment')}
            >
              Get Your Free Assessment <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              variant="secondary" 
              href="#case-studies"
              onClick={(e) => smoothScrollTo(e, '#case-studies')}
            >
              View Case Studies
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-4 text-sm text-slate-500">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">
                   {/* Placeholder avatars would go here */}
                   <Users className="w-4 h-4" />
                </div>
              ))}
            </div>
            <p><span className="font-bold text-navy-800">100+</span> Portfolios Analyzed</p>
          </div>
        </motion.div>

        <div className="relative hidden md:block h-[600px]">
           {/* Abstract Visual Representation of Order from Chaos */}
           <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-full"
           >
              {/* Central "System" Card */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 p-6 z-20">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                  <span className="font-serif font-bold text-navy-900">Automation Core</span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-2"><FileCheck className="w-4 h-4"/> Leases</span>
                    <span className="font-mono text-navy-800">Auto-Sign</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-2"><Settings className="w-4 h-4"/> Maintenance</span>
                    <span className="font-mono text-navy-800">Dispatched</span>
                  </div>
                  <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gold-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                  <p className="text-xs text-right text-slate-400 mt-1">Efficiency: 85%</p>
                </div>
              </div>

              {/* Floating Metrics */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-20 right-10 bg-navy-800 text-white p-4 rounded-lg shadow-xl z-30 max-w-[160px]"
              >
                <p className="text-xs text-slate-300 uppercase tracking-wider">Hours Saved</p>
                <p className="text-3xl font-bold text-gold-400">18 hrs</p>
                <p className="text-xs text-slate-300">per week/manager</p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-0 bg-white p-4 rounded-lg shadow-xl border-l-4 border-green-500 z-30"
              >
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-green-100 rounded-full text-green-600">
                     <BarChart3 className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-800">Vacancy Cost</p>
                     <p className="text-xs text-slate-500">Reduced by 42%</p>
                   </div>
                </div>
              </motion.div>

              {/* Background elements simulating flow */}
              <svg className="absolute inset-0 w-full h-full z-0 opacity-30" viewBox="0 0 400 400">
                 <path d="M50,350 Q200,200 350,50" stroke="#1E3A8A" strokeWidth="2" fill="none" strokeDasharray="10,10" />
                 <path d="M50,50 Q200,200 350,350" stroke="#D4AF37" strokeWidth="2" fill="none" />
              </svg>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

const ValueProp: React.FC = () => {
  const cards = [
    {
      title: "Workflow Mapping",
      desc: "Uncover hidden inefficiencies draining 15-20% of team capacity.",
      icon: <Settings className="w-8 h-8 text-gold-500" />
    },
    {
      title: "Automation Implementation",
      desc: "Replace manual processes with systems that work 24/7.",
      icon: <CheckCircle className="w-8 h-8 text-gold-500" />
    },
    {
      title: "ROI Optimization",
      desc: "Turn operational savings into measurable profit growth.",
      icon: <BarChart3 className="w-8 h-8 text-gold-500" />
    }
  ];

  return (
    <section id="methodology" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="From Daily Firefighting to Strategic Growth" 
          center 
          subtitle="We identify the chaos, build the system, and verify the profit."
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-8 bg-slate-50 rounded-xl border border-slate-100 hover:border-gold-500/30 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="mb-6 p-4 bg-white rounded-lg inline-block shadow-sm group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-3">{card.title}</h3>
              <p className="text-slate-600 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-navy-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
         <SectionHeading 
            title="Elite Operational Consulting" 
            subtitle="Designed for portfolios ready to scale beyond manual limitations."
            light
          />

        <div className="space-y-20">
          {/* Service 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="order-2 md:order-1">
               <div className="bg-slate-800 p-2 rounded-xl shadow-2xl transform -rotate-1">
                  <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
                    <h4 className="text-gold-500 font-mono text-xs uppercase tracking-widest mb-4">Audit Output Example</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-sm text-slate-400">Process: Lease Renewal</span>
                        <span className="text-sm text-red-400">Manual (4hrs/wk)</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-sm text-slate-400">Process: Maintenance Triage</span>
                        <span className="text-sm text-red-400">Manual (12hrs/wk)</span>
                      </div>
                      <div className="mt-4 bg-green-900/20 border border-green-900/50 p-3 rounded">
                        <p className="text-green-400 text-sm font-semibold">Potential Annual Savings: $25,400</p>
                      </div>
                    </div>
                  </div>
               </div>
             </div>
             <div className="order-1 md:order-2">
               <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-gold-500 text-navy-900 text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">1</span>
                 Operations Automation Audit
               </h3>
               <p className="text-slate-300 mb-6 text-lg">
                 The diagnostic that uncovers your hidden profit leaks. We analyze your current state across 8 key operational dimensions.
               </p>
               <ul className="space-y-3 mb-8">
                 {["Identify 12-18+ weekly hours of recoverable time", "Quantified ROI Projections (Base vs Aggressive)", "90-Day Implementation Roadmap"].map((item, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <CheckCircle className="w-5 h-5 text-gold-500 shrink-0 mt-1" />
                     <span className="text-slate-200">{item}</span>
                   </li>
                 ))}
               </ul>
             </div>
          </div>

          {/* Service 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
               <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                 <span className="bg-gold-500 text-navy-900 text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center">2</span>
                 Workflow Automation Execution
               </h3>
               <p className="text-slate-300 mb-6 text-lg">
                 From analysis to action. We integrate systems and deploy automations that handle the grunt work, so your team handles the tenants.
               </p>
               <ul className="space-y-3 mb-8">
                 {["System Integration & Tool Consolidation", "Workflow Automation Deployment", "Team Training & Change Management"].map((item, i) => (
                   <li key={i} className="flex items-start gap-3">
                     <CheckCircle className="w-5 h-5 text-gold-500 shrink-0 mt-1" />
                     <span className="text-slate-200">{item}</span>
                   </li>
                 ))}
               </ul>
             </div>
             <div>
               <div className="bg-gradient-to-br from-blue-600 to-navy-800 p-1 rounded-xl shadow-2xl transform rotate-1">
                  <div className="bg-slate-900 p-6 rounded-lg relative overflow-hidden h-64 flex items-center justify-center">
                     {/* Abstract visual for automation */}
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                     <div className="text-center z-10">
                       <div className="inline-block p-4 bg-blue-500/20 rounded-full mb-4 animate-pulse">
                         <Settings className="w-12 h-12 text-blue-400" />
                       </div>
                       <p className="text-white font-mono">Automating Workflows...</p>
                       <p className="text-xs text-blue-300 mt-2">Connecting CRM ↔ Accounting ↔ Maintenance</p>
                     </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CaseStudies: React.FC = () => {
  const studies = [
    {
      title: "175-Unit Portfolio",
      headline: "From Chaos to Control",
      results: [
        { label: "Maintenance Response", value: "7d → 2d" },
        { label: "Tenant Inquiries", value: "-70%" },
        { label: "Weekly Saved", value: "22 Hrs" },
      ]
    },
    {
      title: "280-Unit Operation",
      headline: "Scaling Without Headcount",
      results: [
        { label: "Capacity", value: "+35%" },
        { label: "Error Reduction", value: "67%" },
        { label: "Annual Savings", value: "$47k" },
      ]
    }
  ];

  return (
    <section id="case-studies" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <SectionHeading title="Transforming Operations, Delivering Results" center subtitle="Real results from portfolios just like yours." />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {studies.map((study, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-gold-500">
              <div className="p-8">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{study.title}</div>
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-6">{study.headline}</h3>
                
                <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                  {study.results.map((res, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg md:text-xl font-bold text-navy-800">{res.value}</div>
                      <div className="text-xs text-slate-500 mt-1">{res.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center">
                 <span className="text-sm font-medium text-slate-600">Read full case study</span>
                 <ChevronRight className="w-4 h-4 text-gold-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LeadMagnet: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    units: '',
    challenge: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of API call
    setTimeout(() => {
      setSubmitted(true);
      console.log("Form submitted to:", EMAIL_ADDRESS, formData);
    }, 1000);
  };

  return (
    <section id="assessment" className="py-24 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Content */}
          <div className="md:w-5/12 bg-gold-500 p-8 md:p-12 text-navy-900 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 rotate-12 transform scale-150"></div>
             <div className="relative z-10">
               <h3 className="text-3xl font-serif font-bold mb-4">Efficiency Scorecard</h3>
               <p className="text-navy-900/80 mb-6 font-medium">
                 Benchmark your performance against top 10% of operators.
               </p>
               <ul className="space-y-3">
                 {["Customized Efficiency Score (1-10)", "Industry Benchmark Comparison", "3 Improvement Opportunities"].map((item, i) => (
                   <li key={i} className="flex items-center gap-2 text-sm font-bold">
                     <div className="bg-navy-900 text-gold-500 rounded-full p-1"><CheckCircle className="w-3 h-3" /></div>
                     {item}
                   </li>
                 ))}
               </ul>
             </div>
          </div>

          {/* Right Form */}
          <div className="md:w-7/12 p-8 md:p-12 bg-white">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h4 className="text-2xl font-bold text-navy-900 mb-1">Where does your operation stand?</h4>
                  <p className="text-slate-500 text-sm mb-6">Get your free analysis. No generic advice.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Name</label>
                      <input 
                        id="name"
                        required 
                        name="name" 
                        autoComplete="name"
                        onChange={handleChange} 
                        className="w-full border border-slate-300 rounded-md p-4 text-base focus:border-navy-800 focus:ring-1 focus:ring-navy-800 outline-none transition-shadow appearance-none" 
                        placeholder="John Doe" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email</label>
                      <input 
                        id="email"
                        required 
                        type="email" 
                        name="email" 
                        autoComplete="email"
                        onChange={handleChange} 
                        className="w-full border border-slate-300 rounded-md p-4 text-base focus:border-navy-800 focus:ring-1 focus:ring-navy-800 outline-none transition-shadow appearance-none" 
                        placeholder="john@company.com" 
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label htmlFor="units" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Portfolio Size</label>
                   <div className="relative">
                     <select 
                       id="units"
                       required 
                       name="units" 
                       onChange={handleChange} 
                       className="w-full border border-slate-300 rounded-md p-4 text-base focus:border-navy-800 focus:ring-1 focus:ring-navy-800 outline-none bg-white appearance-none text-slate-700 pr-10 cursor-pointer"
                     >
                        <option value="">Select Units...</option>
                        <option value="<50">Less than 50 Units</option>
                        <option value="50-150">50 - 150 Units</option>
                        <option value="150-300">150 - 300 Units</option>
                        <option value="300+">300+ Units</option>
                     </select>
                     <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                       <ChevronDown className="w-5 h-5" />
                     </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label htmlFor="challenge" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Biggest Challenge</label>
                   <div className="relative">
                     <select 
                       id="challenge"
                       required 
                       name="challenge" 
                       onChange={handleChange} 
                       className="w-full border border-slate-300 rounded-md p-4 text-base focus:border-navy-800 focus:ring-1 focus:ring-navy-800 outline-none bg-white appearance-none text-slate-700 pr-10 cursor-pointer"
                     >
                        <option value="">Select Challenge...</option>
                        <option value="Vacancy">Vacancy / Turnover Costs</option>
                        <option value="Communication">Communication Overload</option>
                        <option value="Maintenance">Maintenance Coordination</option>
                        <option value="Staffing">Staff Inefficiency</option>
                     </select>
                     <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                       <ChevronDown className="w-5 h-5" />
                     </div>
                   </div>
                </div>

                <Button variant="primary" className="w-full py-4 text-lg shadow-xl shadow-navy-900/10 active:scale-[0.99] transition-transform">
                  Get My Efficiency Score
                </Button>
                <p className="text-xs text-center text-slate-400 mt-4">
                  We value your privacy. No spam.
                </p>

                <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Trusted by teams at</p>
                  <div className="flex justify-center items-center gap-4 opacity-60 grayscale">
                      {['Apex', 'Urban', 'Metro', 'Summit'].map((name) => (
                          <span key={name} className="font-serif font-bold text-xs text-slate-600 flex items-center gap-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full"></div> {name}
                          </span>
                      ))}
                  </div>
                </div>
              </form>
            ) : (
              <div className="text-center h-full flex flex-col justify-center items-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-navy-900 mb-2">Assessment Sent!</h4>
                <p className="text-slate-600 mb-6">
                  Check your inbox at <span className="font-bold">{formData.email}</span>. We've sent your preliminary scorecard and next steps.
                </p>
                <Button variant="secondary" onClick={() => setSubmitted(false)}>
                  Start New Assessment
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustSection: React.FC = () => {
  return (
    <section className="py-16 border-b border-slate-200 bg-white">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted By Industry Leaders</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Placeholder Logos using text representations for the demo */}
          {['Apex Properties', 'Urban Living', 'Metro Portfolio', 'Summit Mgmt', 'Keystone Groups'].map((name) => (
             <div key={name} className="text-xl font-serif font-bold text-slate-800 flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-300 rounded-sm"></div> {name}
             </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
           <div className="flex flex-col items-center">
             <div className="flex text-gold-500 mb-2"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></div>
             <p className="font-bold text-navy-900">4.9/5 Satisfaction</p>
           </div>
           <div className="flex flex-col items-center">
             <ShieldCheck className="w-8 h-8 text-navy-800 mb-2" />
             <p className="font-bold text-navy-900">92% Success Rate</p>
           </div>
           <div className="flex flex-col items-center">
             <Users className="w-8 h-8 text-navy-800 mb-2" />
             <p className="font-bold text-navy-900">200+ Portfolios</p>
           </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Nexa Advisory completely transformed our operational workflow. We reduced vacancy rates by 40% within the first quarter.",
      author: "Sarah Jenkins",
      role: "VP of Operations",
      company: "Apex Properties"
    },
    {
      quote: "The automation audit was an eye-opener. We didn't realize how much time we were wasting on manual data entry until Nexa showed us.",
      author: "Michael Ross",
      role: "Portfolio Manager",
      company: "Urban Living"
    },
    {
      quote: "Professional, data-driven, and highly effective. Their team felt like an extension of ours during the implementation phase.",
      author: "Elena Rodriguez",
      role: "Director of Asset Management",
      company: "Metro Portfolio"
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="What Our Clients Say" 
          center 
          subtitle="Hear from the property leaders who have scaled with us."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative"
            >
              <div className="absolute top-6 right-6 text-slate-200">
                <Quote className="w-10 h-10 opacity-50" />
              </div>
              <div className="text-gold-500 mb-4 flex">
                 {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-600 mb-6 italic relative z-10 leading-relaxed">"{item.quote}"</p>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-50">
                <div className="w-10 h-10 bg-navy-800 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-navy-900 text-sm">{item.author}</h4>
                  <p className="text-xs text-slate-500">{item.role}, {item.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white border-t border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <a 
              href="#" 
              className="flex items-center gap-3 mb-6"
              onClick={(e) => smoothScrollTo(e, '#')}
            >
              <NexaLogo className="w-10 h-10 shadow-sm" />
              <span className="text-2xl font-serif font-bold text-white">Nexa Advisory</span>
            </a>
            <p className="text-slate-400 max-w-sm mb-6">
              Transforming chaotic property operations into streamlined, scalable enterprises through data-driven automation.
            </p>
            <div className="flex gap-4">
              {/* Socials placeholders */}
              {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-slate-800 hover:bg-gold-500 transition-colors cursor-pointer" />)}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-gold-500">Operations Audit</a></li>
              <li><a href="#" className="hover:text-gold-500">Workflow Automation</a></li>
              <li><a href="#" className="hover:text-gold-500">Fractional COO</a></li>
              <li><a href="#" className="hover:text-gold-500">Team Training</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>{EMAIL_ADDRESS}</li>
              <li>New York, NY</li>
              <li className="pt-4">
                 <Button variant="outline" href={`mailto:${EMAIL_ADDRESS}`} className="py-2 px-4 text-xs">
                   Contact Support
                 </Button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Nexa Advisory. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  return (
    <div className="font-sans text-slate-800">
      <Header />
      <main>
        <Hero />
        <TrustSection />
        <Testimonials />
        <ValueProp />
        <Services />
        <CaseStudies />
        <LeadMagnet />
      </main>
      <Footer />
      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-slate-200 md:hidden z-40">
        <Button 
          variant="primary" 
          href="#assessment" 
          className="w-full shadow-lg"
          onClick={(e) => smoothScrollTo(e, '#assessment')}
        >
           Get Free Assessment
        </Button>
      </div>
    </div>
  );
};

export default App;