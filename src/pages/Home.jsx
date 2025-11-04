import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/socialSphere-org.png";
import {
FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaTiktok,
  FaPinterest,
  FaYoutube,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaCalendarAlt, // <-- NEW ICON
  FaRecycle, // <-- NEW ICON
  FaClock, // <-- NEW ICON
  FaClipboardList, // <-- NEW ICON
  FaChartLine, // <-- NEW ICON
  FaRobot, // <-- NEW ICON
  FaClipboardCheck, // <-- NEW ICON for Audit
  FaCogs, 
} from "react-icons/fa";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spline from '@splinetool/react-spline'; 
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'; // <-- NEW IMPORT


const SPLINE_URL = "https://prod.spline.design/9IXWiwbSDcBJAHyB/scene.splinecode"; // Robot URL
// Mock Data for the Home Page Chart Demo
const chartDemoData = [
    { name: 'Mon', followers: 120, engagement: 8 },
    { name: 'Tue', followers: 180, engagement: 12 },
    { name: 'Wed', followers: 150, engagement: 10 },
    { name: 'Thu', followers: 220, engagement: 15 },
    { name: 'Fri', followers: 300, engagement: 25 },
    { name: 'Sat', followers: 250, engagement: 18 },
    { name: 'Sun', followers: 350, engagement: 30 },
];


function NavLink({ to, children }) {
  return (
    <Link to={to} className="relative group overflow-hidden">
      <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute inset-0 block text-pink-400 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
        {children}
      </span>
    </Link>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = (
    <>
      {/* Features Dropdown for Desktop */}
      <div
        className="relative hidden md:block"
        onMouseEnter={() => setFeaturesDropdownOpen(true)}
        onMouseLeave={() => setFeaturesDropdownOpen(false)}
      >
        <button className="flex items-center gap-1 text-gray-300 hover:text-pink-400 transition">
          Features
          <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${featuresDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>
        <motion.div
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={featuresDropdownOpen ? { opacity: 1, height: "auto", y: 0 } : { opacity: 0, height: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-64 bg-white/5 backdrop-blur-lg rounded-lg shadow-xl border border-white/10 overflow-hidden z-20"
        >
          <Link
            to="/performance-analytics"
            className="block px-4 py-2 text-gray-200 hover:bg-white/10 hover:text-pink-400 transition"
            onClick={() => setFeaturesDropdownOpen(false)}
          >
            Performance Analytics
          </Link>
          <Link
            to="/ai-assistance" 
            className="block px-4 py-2 text-gray-200 hover:bg-white/10 hover:text-pink-400 transition"
            onClick={() => setFeaturesDropdownOpen(false)}
          >
            AI-Powered Assistance
          </Link>
          <Link
            to="/social-audit"
            className="block px-4 py-2 text-gray-200 hover:bg-white/10 hover:text-pink-400 transition"
            onClick={() => setFeaturesDropdownOpen(false)}
          >
            Social Media Audit
          </Link>
          <Link
            to="/sentiment-analysis"
            className="block px-4 py-2 text-gray-200 hover:bg-white/10 hover:text-pink-400 transition"
            onClick={() => setFeaturesDropdownOpen(false)}
          >
            Sentiment Analysis
          </Link>
          <Link
            to="/post-scheduler"
            className="block px-4 py-2 text-gray-200 hover:bg-white/10 hover:text-pink-400 transition"
            onClick={() => setFeaturesDropdownOpen(false)}
          >
            Automated Post Scheduler
          </Link>
        </motion.div>
      </div>

      <NavLink to="/pricing">Pricing</NavLink>
      <NavLink to="/integrations">Integrations</NavLink>
      {/* Removed standalone AI Assistance link */}
      
      {/* Company Dropdown for Desktop */}
      <div
        className="relative hidden md:block"
        onMouseEnter={() => setCompanyDropdownOpen(true)}
        onMouseLeave={() => setCompanyDropdownOpen(false)}
      >
        <button className="flex items-center gap-1 text-gray-300 hover:text-pink-400 transition">
          Company
          <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${companyDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
        </button>
        <motion.div
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={companyDropdownOpen ? { opacity: 1, height: "auto", y: 0 } : { opacity: 0, height: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-48 bg-white/5 backdrop-blur-lg rounded-lg shadow-xl border border-white/10 overflow-hidden z-20"
        >
          <Link
            to="/about"
            className="block px-4 py-2 text-gray-200 hover:bg-white/10 hover:text-pink-400 transition"
            onClick={() => setCompanyDropdownOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 text-gray-200 hover:bg-white/10 hover:text-pink-400 transition"
            onClick={() => setCompanyDropdownOpen(false)}
          >
            Contact
          </Link>
        </motion.div>
      </div>
    </>
  );

  return (
    <div className="bg-black text-gray-200 font-sans overflow-x-hidden">
      {/* ================= Navbar ================= */}
      <header className="fixed top-0 w-full bg-white/5 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-1 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="SocialSphere Logo"
              className="h-14 w-auto hover:opacity-90 transition"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-gray-300">
            {navLinks}
          </nav>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2 bg-white/5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-full hover:opacity-90 transition"
            >
              New User
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-pink-500 text-2xl"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* ================= Mobile Menu Overlay ================= */}
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/90 z-40 flex flex-col items-center justify-center space-y-8 text-2xl md:hidden"
      >
        <button
          onClick={toggleMobileMenu}
          className="absolute top-6 right-6 text-pink-500 text-2xl"
        >
          <FaTimes />
        </button>
        <nav className="flex flex-col space-y-8 text-gray-300 text-center">
          <div className="relative">
            <button
              onClick={() => setFeaturesDropdownOpen(!featuresDropdownOpen)}
              className="flex items-center gap-1 text-gray-300 hover:text-pink-500 transition"
            >
              Features
              <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${featuresDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={featuresDropdownOpen ? { opacity: 1, height: "auto" } : {}}
              className="flex flex-col items-center mt-4 space-y-4 text-xl"
            >
              <Link to="/performance-analytics" className="hover:text-pink-500" onClick={() => { setMobileMenuOpen(false); setFeaturesDropdownOpen(false); }}>
                Performance Analytics
              </Link>
              <Link to="/ai-assistance" className="hover:text-pink-500" onClick={() => { setMobileMenuOpen(false); setFeaturesDropdownOpen(false); }}>
                AI-Powered Assistance
              </Link>
              <Link to="/social-audit" className="hover:text-pink-500" onClick={() => { setMobileMenuOpen(false); setFeaturesDropdownOpen(false); }}>
                Social Media Audit
              </Link>
              <Link to="/sentiment-analysis" className="hover:text-pink-500" onClick={() => { setMobileMenuOpen(false); setFeaturesDropdownOpen(false); }}>
                Sentiment Analysis
              </Link>
              <Link to="/post-scheduler" className="hover:text-pink-500" onClick={() => { setMobileMenuOpen(false); setFeaturesDropdownOpen(false); }}>
                Automated Post Scheduler
              </Link>
            </motion.div>
          </div>
          <NavLink to="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</NavLink>
          <NavLink to="/integrations" onClick={() => setMobileMenuOpen(false)}>Integrations</NavLink>
          {/* Removed standalone AI Assistance link from mobile menu */}
          
          <div className="relative">
            <button
              onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
              className="flex items-center gap-1 text-gray-300 hover:text-pink-500 transition"
            >
              Company
              <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${companyDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={companyDropdownOpen ? { opacity: 1, height: "auto" } : {}}
              className="flex flex-col items-center mt-4 space-y-4 text-xl"
            >
              <Link to="/about" className="hover:text-pink-500" onClick={() => { setMobileMenuOpen(false); setCompanyDropdownOpen(false); }}>
                About Us
              </Link>
              <Link to="/contact" className="hover:text-pink-500" onClick={() => { setMobileMenuOpen(false); setCompanyDropdownOpen(false); }}>
                Contact
              </Link>
            </motion.div>
          </div>
        </nav>
        <div className="flex flex-col space-y-4">
          <Link
            to="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="px-8 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-full font-semibold hover:opacity-90 transition"
          >
            New User
          </Link>
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="px-8 py-3 bg-white/5 border border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition"
          >
            Login
          </Link>
        </div>
      </motion.div>

      {/* ================= Hero Section (Original Text-Only Structure) ================= */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden pt-40 md:pt-48">
        
        {/* Futuristic Background Animation */}
        <div className="absolute inset-0 flex justify-center items-center opacity-30">
          <motion.svg
            viewBox="0 0 600 600"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Polygon mesh */}
            <motion.polygon
              points="300,50 400,150 350,300 250,300 200,150"
              stroke="#ec4899"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            />

            {/* Circular face core */}
            <motion.circle
              cx="300"
              cy="250"
              r="40"
              stroke="#ec4899"
              strokeWidth="2"
              fill="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* Scanning laser line */}
            <motion.line
              x1="0"
              y1="250"
              x2="600"
              y2="250"
              stroke="#ec4899"
              strokeWidth="1"
              initial={{ x: -600, opacity: 0.3 }}
              animate={{ x: 600, opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.svg>
        </div>

        {/* Hero Content (Original Text-Only Structure) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl px-6 relative z-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Social Media Simplified
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10">
            Create, schedule, and optimize your online presence in minutes with
            our AI-powered platform.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-8 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Get Started
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-8 py-3 bg-white/5 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Login
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= NEW: DASHBOARD OVERVIEW SECTION ================= */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg space-y-6"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    Your Central <span className="bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent">Dashboard Hub</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                    Manage your workflow, view metrics, and utilize AI tools all from one screen. It's the mission control for your entire social strategy.
                </p>
                <div className="flex flex-wrap justify-center gap-6 pt-4">
                    {[
                        { icon: FaCalendarAlt, label: "Scheduler" },
                        { icon: FaChartLine, label: "Analytics" },
                        { icon: FaRobot, label: "AI Co-Pilot" },
                        { icon: FaRecycle, label: "Evergreen" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center space-x-2 text-gray-300">
                            <item.icon className="text-pink-500 text-xl" />
                            <span className="font-semibold">{item.label}</span>
                        </div>
                    ))}
                </div>
                <Link to="/dashboard">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-8 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-lg"
                    >
                        Go to Dashboard
                    </motion.button>
                </Link>
            </motion.div>
        </div>
      </section>

      {/* ================= NEW: 3D Robot Showcase Section (Placed Below Toolkit) ================= */}
      <section className="py-20 bg-black overflow-hidden border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text and CTA */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-center lg:text-left space-y-6"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    Power Your Strategy with <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">SocialMind AI</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0">
                    Our dedicated AI Co-Pilot automates content generation, analyzes sentiment, and provides data-driven recommendations to ensure your brand always stands out.
                </p>
                <Link to="/ai-assistance">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-lg shadow-purple-500/30"
                    >
                        See How SocialMind Works
                    </motion.button>
                </Link>
            </motion.div>
            
            {/* Right Column: 3D Model */}
            <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
                className="w-full h-90 lg:h-[650px] flex items-center justify-center"
            >
                <Spline scene={SPLINE_URL} />
            </motion.div>
        </div>
      </section>

      {/* ================= NEW: POST SCHEDULING SHOWCASE SECTION (Added here) ================= */}
      <section className="py-20 bg-black overflow-hidden border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Key Scheduling Features */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-center lg:text-left space-y-6"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    Schedule Once, <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Post Forever</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0">
                    Leverage our **Evergreen Recycling** technology to keep your social feeds consistently active, maximizing the life and reach of your best content.
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                        { icon: FaRecycle, title: "Evergreen Recycling" },
                        { icon: FaCalendarAlt, title: "Visual Calendar" },
                        { icon: FaClock, title: "Optimal Timing" },
                        { icon: FaClipboardList, title: "Content Library" },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 bg-white/10 rounded-lg text-left border-l-4 border-green-400"
                        >
                            <feature.icon className="text-green-400 text-xl mb-1" />
                            <h4 className="text-sm font-semibold text-white">{feature.title}</h4>
                        </motion.div>
                    ))}
                </div>

                <Link to="/post-scheduler">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-lg shadow-green-500/30"
                    >
                        See Scheduler Features
                    </motion.button>
                </Link>
            </motion.div>
            
            {/* Right Column: Visual Mockup (Simple) */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="w-full h-80 lg:h-[450px] flex items-center justify-center p-4"
            >
                <div className="w-full h-full bg-white/5 rounded-2xl p-6 shadow-2xl border border-white/10 flex flex-col justify-between">
                    <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-pink-500 text-xl" />
                        <span className="text-lg font-bold text-pink-500">Queue Status</span>
                    </div>
                    <div className="space-y-3">
                        <div className="w-full h-8 bg-gray-700 rounded-lg animate-pulse" />
                        <div className="w-4/5 h-8 bg-gray-700 rounded-lg animate-pulse delay-100" />
                        <div className="w-3/5 h-8 bg-gray-700 rounded-lg animate-pulse delay-200" />
                    </div>
                    <div className="text-sm text-gray-400">Next Post: [Evergreen] Today @ 4:00 PM</div>
                </div>
            </motion.div>
        </div>
      </section>


      {/* ================= NEW: ANALYSIS CHART SHOWCASE SECTION ================= */}
      <section className="py-20 bg-gray-900 overflow-hidden border-t border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Chart Visualization */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="w-full bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-6"
            >
                <h3 className="text-xl font-bold text-white mb-4 text-left">Follower Growth vs. Engagement Rate (Mock Data)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartDemoData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="#aaa" />
                        <YAxis yAxisId="left" stroke="#ec4899" />
                        <YAxis yAxisId="right" orientation="right" stroke="#f97316" />
                        <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
                        <Area yAxisId="left" type="monotone" dataKey="followers" stroke="#ec4899" fillOpacity={1} fill="url(#colorFollowers)" strokeWidth={2} />
                        <Area yAxisId="right" type="monotone" dataKey="engagement" stroke="#f97316" fillOpacity={1} fill="url(#colorEngagement)" strokeWidth={2} />
                        <defs>
                            <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>
            
            {/* Right Column: Text and CTA */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-center lg:text-left space-y-6"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    See the <span className="bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent">Numbers That Matter</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0">
                    Stop guessing what works. Our live analytics showcase follower growth, content reach, and peak engagement times so you can optimize your next post instantly.
                </p>
                <Link to="/performance-analytics">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 px-8 py-3 bg-gradient-to-r from-pink-600 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-lg shadow-pink-500/30"
                    >
                        Explore Full Analytics Suite
                    </motion.button>
                </Link>
            </motion.div>
        </div>
      </section>

      {/* ================= NEW: SOCIAL MEDIA AUDIT SHOWCASE SECTION ================= */}
      <section className="py-20 bg-gray-900 overflow-hidden border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Audit Process Highlights */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="text-center lg:text-left space-y-6"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    Get an Instant <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">AI Audit Report</span>
                </h2>
                <p className="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0">
                    Stop guessing your strategy. Our AI-powered audit delivers a concise summary of strengths, weaknesses, and a prioritized action plan.
                </p>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                        { icon: FaClipboardCheck, title: "Action Plan" },
                        { icon: FaCogs, title: "Data Acquisition" },
                        { icon: FaChartLine, title: "Performance Gaps" },
                        { icon: FaRobot, title: "AI-Powered Report" },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 bg-white/10 rounded-lg text-left border-l-4 border-purple-500"
                        >
                            <feature.icon className="text-purple-400 text-xl mb-1" />
                            <h4 className="text-sm font-semibold text-white">{feature.title}</h4>
                        </motion.div>
                    ))}
                </div>

                <Link to="/social-audit">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-lg shadow-purple-500/30"
                    >
                        View Audit Details
                    </motion.button>
                </Link>
            </motion.div>
            
            {/* Right Column: Visual Mockup (Simple) */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="w-full h-80 lg:h-[450px] flex items-center justify-center p-4"
            >
                <div className="w-full h-full bg-white/5 rounded-2xl p-6 shadow-2xl border border-white/10 flex flex-col justify-center items-center">
                    <FaClipboardCheck className="text-indigo-400 text-6xl mb-4" />
                    <h4 className="text-2xl font-bold text-white">Report Ready</h4>
                    <p className="text-sm text-gray-400 mt-2 text-center">Executive Summary generated by SocialMind.</p>
                </div>
            </motion.div>
        </div>
      </section>


      

      

      {/* ================= What do you get Section (Replicated) ================= */}
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-black text-center relative py-20 overflow-hidden">
  {/* Background glow and animation */}
  <div className="absolute inset-0 z-0 opacity-20">
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
    />
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
      className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"
    />
  </div>

  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="max-w-6xl mx-auto px-6 relative z-10"
  >
    <p className="text-lg md:text-xl font-semibold text-pink-500 mb-4 tracking-widest uppercase">
      The SocialSphere Advantage
    </p>
    <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white leading-tight">
      Unleash the full power of your brand with our <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">AI-driven toolkit.</span>
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: "Brand Insights",
          description: "Get comprehensive analytics to inform and refine your social media strategy.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25a2.25 2.25 0 0 0 2.25-2.25V3M3.75 3h7.5" />
            </svg>
          ),
        },
        {
          title: "Intelligent Scheduling",
          description: "Visualize and plan your content with an intuitive, monthly content calendar.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5" />
            </svg>
          ),
        },
        {
          title: "Dynamic Copywriting",
          description: "Create engaging, on-brand social media copy instantly with our AI-powered tool.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 18.07a4.5 4.5 0 0 1-1.897 1.13l-2.654.887a.75.75 0 0 1-.952-.952l.887-2.654a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          ),
        },
        {
          title: "Visual Creation",
          description: "Generate stunning graphics and videos that capture attention and drive engagement.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0L15.75 18m-1.254-7.252a4.5 4.5 0 1 1 0 7.491m-2.318-5.323a2.25 2.25 0 0 1 3.182 0L15.75 18" />
            </svg>
          ),
        },
        {
          title: "24/7 Creative Hub",
          description: "Access a library of creative edits and assets, available whenever inspiration strikes.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          ),
        },
        {
          title: "Performance Analytics",
          description: "Track your social media performance in real-time and adapt your strategy with data-driven insights.",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5h18M3 9h18m-14.25 4.5 9-9" />
            </svg>
          ),
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
          className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 flex flex-col items-start text-left hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.03]"
        >
          <div className="p-3 mb-4 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-white">
            {item.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-gray-400">{item.description}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>



      {/* ================= Social Media Co-Pilot Section (Title Updated) ================= */}
      <section className="min-h-screen flex flex-col justify-center items-center py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Social Media <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Co-Pilot</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
            Combining AI-Powered Innovation with Every Essential Tool Social Media Managers Rely On.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: "Brand Guidelines",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5a2.25 2.25 0 0 0-2.25 2.25v16.5a2.25 2.25 0 0 0 2.25 2.25h12.75a2.25 2.25 0 0 0 2.25-2.25V5.25a2.25 2.25 0 0 0-2.25-2.25H14.5m-3.125 12.75h3.75m-9 0h.008v.008h-.008v-.008Zm9-1.5h.008v.008h-.008v-.008ZM12.375 15h2.25m-11.25 0h.008v.008h-.008v-.008Zm.008-1.5h-.008v.008h.008v-.008Zm.008 1.5H3.375m11.25-1.5h.008v.008h-.008v-.008Z" />
                  </svg>
                ),
              },
              {
                title: "Platform Specific Mandates",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21 3 16.5m0 0-.008-.008A2.25 2.25 0 0 1 2.25 15V9.563c0-.896.34-1.75.955-2.375l1.626-1.625A2.25 2.25 0 0 1 5.438 5.25h12.124a2.25 2.25 0 0 1 1.59 4.09l-1.625 1.626A2.25 2.25 0 0 0 18.75 12.75v1.007a3 3 0 0 1-.879 2.122L15.75 21 12 17.25m-4.5 0h-1.5" />
                  </svg>
                ),
              },
              {
                title: "Content Strategy",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.096 0-2.152.174-3.143.514C2.518 4.053 2.25 4.35 2.25 4.723v2.115l.69.23c.365.122.682.353.953.659c-.43 2.193-.956 4.357-1.397 6.464-.047.22.052.45.244.57c.745.401 1.512.684 2.308.847L5.5 18h2.75a2.25 2.25 0 0 0 2.25-2.25V12.75a2.25 2.25 0 0 0-2.25-2.25H8.35L7.75 9.421c-.244-.27-.478-.549-.692-.835C8.016 7.039 9.873 5.41 12 5.25a7.487 7.487 0 0 1 7.5 7.5c0 1.944-.863 3.744-2.253 4.965-1.045.922-2.348 1.455-3.697 1.455H12V21" />
                  </svg>
                ),
              },
              {
                title: "Content Creation",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.654.887a.75.75 0 0 1-.952-.952l.887-2.654a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                ),
              },
              {
                title: "Calendar Scheduling",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5" />
                  </svg>
                ),
              },
              {
                title: "Brand Engagement",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 10.5h.008v.008h-.008v-.008ZM12 10.5h.008v.008H12v-.008ZM6.75 10.5h.008v.008H6.75v-.008ZM18.75 13.5h.008v.008h-.008v-.008ZM12 13.5h.008v.008H12v-.008ZM6.75 13.5h.008v.008H6.75v-.008ZM18.75 16.5h.008v.008h-.008v-.008ZM12 16.5h.008v.008H12v-.008ZM6.75 16.5h.008v.008H6.75v-.008Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
                  </svg>
                ),
              },
              {
                title: "Reviews & Approvals",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                ),
              },
              {
                title: "Analytics & Reporting",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5h18M3 9h18m-14.25 4.5 9-9" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl p-px bg-gradient-to-br from-purple-800 to-pink-500 overflow-hidden shadow-lg transition-transform hover:scale-[1.03]"
              >
                <div className="absolute inset-0 z-0 bg-black/40 rounded-[15px] group-hover:bg-black/60 transition" />
                <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Brief description about {item.title}.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Call to action for the new page */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16"
          >
             <Link
                to="/ai-assistance" 
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition shadow-lg shadow-purple-500/30"
            >
                Learn More About SocialMind AI
            </Link>
          </motion.div>
        </div>
      </section>

     {/* ================= Pricing CTA Section ================= */}
<section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black px-6">
  <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
    {/* Left Column - CTA */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="text-center md:text-left"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-pink-500">
        Supercharge your Social Media
      </h2>
      <p className="text-lg text-white/80 mt-6 mb-8">
        Get your free trial, pay later
      </p>
      <Link
        to="/register"
        className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
      >
        Register Here
      </Link>
    </motion.div>

    {/* Right Column - Placeholder for Contact */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 text-center"
    >
      <h3 className="text-2xl font-semibold text-pink-500 mb-6">
        Have a question?
      </h3>
      <p className="text-lg text-gray-400 mb-6">
        Visit our Contact Us page to send us a message or find our details.
      </p>
      <Link
        to="/contact"
        className="px-6 py-3 bg-pink-500 text-black font-semibold rounded-lg hover:bg-pink-400 transition"
      >
        Go to Contact Page
      </Link>
    </motion.div>
  </div>
</section>


      {/* ================= Footer ================= */}
      <footer className="py-12 bg-black border-t border-white/10 text-center">
      
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-gray-400">
          <div>
            <h3 className="text-pink-500 font-bold text-xl mb-4">
              SocialSphere
            </h3>
            <p>Manage all your social presence in one place.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/performance-analytics" className="hover:text-pink-500">
                  Performance Analytics
                </Link>
              </li>
              <li>
                <Link to="/ai-assistance" className="hover:text-pink-500"> 
                  AI-Powered Assistance
                </Link>
              </li>
              <li>
                <Link to="/social-audit" className="hover:text-pink-500">
                  Social Media Audit
                </Link>
              </li>
              <li>
                <Link to="/sentiment-analysis" className="hover:text-pink-500">
                  Sentiment Analysis
                </Link>
              </li>
              <li>
                <Link to="/post-scheduler" className="hover:text-pink-500">
                  Automated Post Scheduler
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-pink-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-pink-500" onClick={() => { setMobileMenuOpen(false); setCompanyDropdownOpen(false); }}>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="hover:text-pink-500">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-pink-500">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>
         {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 max-w-5xl mx-auto relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Seamless Integrations
          </h2>
          <div className="flex flex-wrap justify-center gap-12 text-5xl text-gray-500">
            {[
              FaFacebook,
              FaInstagram,
              FaLinkedin,
              FaTwitter,
              
              FaYoutube,
            ].map((Icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 2, color: "#ec4899" }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Icon />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <div className="mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} SocialSphere. All rights reserved.
        </div>
       
      </footer>
      <ToastContainer />
    </div>
  );
}