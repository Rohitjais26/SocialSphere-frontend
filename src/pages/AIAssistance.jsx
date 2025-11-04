import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link for footer navigation
import { FaComments, FaCheckCircle, FaLightbulb, FaRobot, FaBullhorn, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaTiktok, FaPinterest, FaYoutube } from 'react-icons/fa';
// NOTE: You must run 'npm install @splinetool/react-spline'
import Spline from '@splinetool/react-spline'; 

// Constants
const SPLINE_URL = "https://prod.spline.design/9IXWiwbSDcBJAHyB/scene.splinecode";

export default function AIAssistance() {
    
    const benefits = [
        { icon: FaComments, title: "24/7 Availability", description: "Get instant support and content ideas around the clock, eliminating wait times." },
        { icon: FaLightbulb, title: "Enhanced Creativity", description: "Break writer’s block with AI-generated captions and strategic content suggestions." },
        { icon: FaRobot, title: "Data-Driven Strategy", description: "Leverage personalized AI recommendations based on your performance analytics." },
        { icon: FaBullhorn, title: "Faster Onboarding", description: "Quickly learn platform features and troubleshoot issues without leaving the Dashboard." }
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
                    <p className="text-pink-500 font-semibold mb-2 tracking-widest uppercase">AI-Powered Content & Strategy</p>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                        Meet Your <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">SocialMind AI</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Your dedicated AI Co-Pilot for mastering the SocialSphere platform and maximizing your content performance with ease.
                    </p>
                    {/* NEW: Get Started Button (below header) */}
                    <Link to="/dashboard">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-6 px-10 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg shadow-xl shadow-pink-500/40 hover:opacity-90 transition transform hover:scale-105"
                        >
                            Access Dashboard & Co-Pilot
                        </motion.button>
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* --- LEFT COLUMN: Instructions & Benefits (Swapped Position) --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl font-bold text-white border-b border-pink-500/50 pb-2">How to Use the Co-Pilot</h2>
                        
                        {/* Usage Instructions */}
                        <div className="space-y-6">
                            <div className="flex items-start text-lg text-gray-300">
                                <FaCheckCircle className="text-pink-500 mt-1 mr-4 text-xl flex-shrink-0" />
                                <div>
                                    <h4 className='font-semibold text-white'>1. Access the Chatbot</h4>
                                    <p className='text-sm text-gray-400'>Click the **floating robot icon** at the bottom right of your Dashboard screen to open the chat window.</p>
                                </div>
                            </div>
                            <div className="flex items-start text-lg text-gray-300">
                                <FaCheckCircle className="text-pink-500 mt-1 mr-4 text-xl flex-shrink-0" />
                                <div>
                                    <h4 className='font-semibold text-white'>2. Ask Specific Queries</h4>
                                    <p className='text-sm text-gray-400'>Ask direct questions about platform features (e.g., "How do I schedule an evergreen post?") or ask for content ideas (e.g., "Give me 5 post ideas for Twitter about coffee.").</p>
                                </div>
                            </div>
                            <div className="flex items-start text-lg text-gray-300">
                                <FaCheckCircle className="text-pink-500 mt-1 mr-4 text-xl flex-shrink-0" />
                                <div>
                                    <h4 className='font-semibold text-white'>3. Get Strategy Insights</h4>
                                    <p className='text-sm text-gray-400'>The bot knows your performance and can give contextual strategy advice and troubleshooting support.</p>
                                </div>
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <h3 className="text-2xl font-bold text-pink-500 pt-4 border-b border-pink-500/50 pb-2">Why Use SocialMind?</h3>
                        <div className="grid grid-cols-2 gap-6">
                            {benefits.map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(236, 72, 153, 0.2)" }}
                                    className="p-4 bg-white/5 rounded-xl border border-white/10"
                                >
                                    <item.icon className="text-pink-400 text-3xl mb-3" />
                                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                    <p className="text-sm text-gray-400">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* --- RIGHT COLUMN: 3D Model (Swapped Position) --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        // UPDATED: Increased height to lg:h-[700px] and added flex/translate for upward movement
                        className="w-full h-96 lg:h-[700px] flex items-center justify-center -translate-y-10" 
                    >
                        {/* Embed the Spline 3D Model */}
                        <Spline scene={SPLINE_URL} />
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