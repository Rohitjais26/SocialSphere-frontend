import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// FIX: Added FaCheckCircle to the imports
import { FaChartBar, FaCogs, FaLightbulb, FaClipboardCheck, FaCheckCircle, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaTiktok, FaPinterest, FaYoutube } from 'react-icons/fa';

export default function SocialMediaAudit() {
    
    const auditSteps = [
        { icon: FaCogs, title: "1. Data Acquisition", description: "Our AI securely fetches mock metrics, top posts, and audience demographics." },
        { icon: FaLightbulb, title: "2. Gap Analysis", description: "Gemini compares your current performance against industry benchmarks." },
        { icon: FaClipboardCheck, title: "3. Report Generation", description: "A concise, four-part report (Summary, Strengths, Weaknesses, Action Plan) is created." },
        { icon: FaChartBar, title: "4. Actionable Strategy", description: "Receive three high-priority steps you can implement immediately." }
    ];

    return (
        <div className="min-h-screen bg-black text-gray-200 font-sans relative overflow-hidden">
            
            {/* ================= BACKGROUND GLOW ANIMATION (Thematic) ================= */}
            <div className="absolute inset-0 z-0 opacity-20">
                {/* Pink Glow */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                />
                {/* Purple Glow */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                />
            </div>
            
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative z-10">
                
                {/* --- Header & Intro --- */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <p className="text-indigo-400 font-semibold mb-2 tracking-widest uppercase">Strengths. Weaknesses. Opportunities.</p>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                        Social Media <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">Audit</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Instantly generate a concise, AI-powered audit report that cuts through the noise and delivers clear, implementable next steps.
                    </p>
                    {/* Get Started Button */}
                    <Link to="/dashboard">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-6 px-10 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg shadow-xl shadow-purple-500/40 hover:opacity-90 transition transform hover:scale-105"
                        >
                            Run Your First Audit on the Dashboard
                        </motion.button>
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    
                    {/* --- Left Column: Audit Process Visualization --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="w-full bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-8 space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4">Our 4-Step Audit Process</h3>
                        <div className="space-y-6">
                            {auditSteps.map((step, index) => (
                                <div key={index} className="flex items-start p-4 bg-black/40 rounded-lg border-l-4 border-indigo-500">
                                    <step.icon className="text-indigo-400 text-3xl mr-4 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-white text-lg">{step.title}</h4>
                                        <p className="text-sm text-gray-400">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    
                    {/* --- Right Column: Key Benefits --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="space-y-8 p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10"
                    >
                        <h2 className="text-3xl font-bold text-pink-500 border-b border-pink-500/50 pb-2">Why Our AI Audit is Essential</h2>
                        
                        <p className='text-gray-400 text-lg'>
                            Stop wasting time sifting through spreadsheets. The SocialSphere Audit delivers a focused **Executive Summary** and a prioritized **Action Plan** based on the success of your top-performing content, ensuring every change you make directly contributes to growth.
                        </p>
                        
                        <div className='space-y-4'>
                            <h4 className='text-xl font-semibold text-white'>Key Report Sections:</h4>
                            <ul className='space-y-2 text-gray-300'>
                                {/* FaCheckCircle MUST be imported to be used here */}
                                <li className='flex items-center'><FaCheckCircle className='text-pink-400 mr-3' /> Executive Performance Summary</li>
                                <li className='flex items-center'><FaCheckCircle className='text-pink-400 mr-3' /> Three Key Strengths & Weaknesses</li>
                                <li className='flex items-center'><FaCheckCircle className='text-pink-400 mr-3' /> Prioritized, Actionable Improvement Plan</li>
                                <li className='flex items-center'><FaCheckCircle className='text-pink-400 mr-3' /> Content Strategy Recommendations</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

            </div>

            {/* ================= Footer (Consistent with Home/Dashboard) ================= */}
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
                            <li><Link to="/performance-analytics" className="hover:text-pink-500">Performance Analytics</Link></li>
                            <li><Link to="/ai-assistance" className="hover:text-pink-500">AI-Powered Assistance</Link></li>
                            <li><Link to="/social-audit" className="hover:text-pink-500">Social Media Audit</Link></li>
                            <li><Link to="/sentiment-analysis" className="hover:text-pink-500">Sentiment Analysis</Link></li>
                            <li><Link to="/post-scheduler" className="hover:text-pink-500">Automated Post Scheduler</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="hover:text-pink-500">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-pink-500">Contact</Link></li>
                            <li><Link to="/integrations" className="hover:text-pink-500">Integrations</Link></li>
                            <li><Link to="/pricing" className="hover:text-pink-500">Pricing</Link></li>
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
                        {[FaFacebook, FaInstagram, FaLinkedin, FaTwitter,  FaYoutube].map((Icon, i) => (
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
        </div>
    );
}