import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaTiktok, FaPinterest, FaYoutube, FaCog, FaCheckCircle, FaPlug } from 'react-icons/fa';

export default function Integrations() {
    
    const platforms = [
        { icon: FaInstagram, name: "Instagram (InstaClone)", color: "text-pink-500", status: "Connected (Mock)", description: "Centralized scheduling, publishing, and deep analytics." },
        { icon: FaFacebook, name: "Facebook", color: "text-blue-600", status: "In Development", description: "Manage Page posts, campaigns, and group updates." },
        { icon: FaTwitter, name: "X (Twitter)", color: "text-gray-400", status: "In Development", description: "Schedule engaging tweets and monitor real-time trends." },
        { icon: FaLinkedin, name: "LinkedIn", color: "text-blue-400", status: "In Development", description: "Automate company page and personal updates for professional growth." },
        // TikTok and Pinterest removed as requested.
        { icon: FaYoutube, name: "YouTube", color: "text-red-700", status: "Coming Soon", description: "Video publishing and long-term content organization." },
    ];

    return (
        <div className="min-h-screen bg-black text-gray-200 px-6 py-32 font-sans relative overflow-hidden">
            
            {/* ================= BACKGROUND GLOW ANIMATION (Thematic) ================= */}
            <div className="absolute inset-0 z-0 opacity-20">
                {/* Blue Glow */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                />
                {/* Purple Glow */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                />
            </div>
            
            <div className="max-w-7xl mx-auto text-center relative z-10">
                
                {/* --- Header & Intro --- */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <p className="text-purple-400 font-semibold mb-2 tracking-widest uppercase">Connect Everything</p>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                        Seamless <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Integrations</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Manage all your social media accounts and workflows from one powerful dashboard.
                    </p>
                    {/* Get Started Button */}
                    <Link to="/connect">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-6 px-10 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold rounded-lg shadow-xl shadow-purple-500/40 hover:opacity-90 transition transform hover:scale-105"
                        >
                            Connect Your Accounts
                        </motion.button>
                    </Link>
                </motion.div>

                {/* --- Platforms Grid --- */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {platforms.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl flex flex-col items-center border border-white/10 hover:border-purple-500/50 transition duration-300"
                        >
                            <p.icon className={`text-6xl mb-4 ${p.color}`} />
                            <h3 className="text-2xl font-bold mb-2 text-white">{p.name}</h3>
                            <p className="text-sm text-gray-400 mb-4">{p.description}</p>
                            
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                p.status === "Connected (Mock)" ? "bg-green-600/20 text-green-400" :
                                p.status === "In Development" ? "bg-yellow-600/20 text-yellow-400" :
                                "bg-gray-600/20 text-gray-400"
                            }`}>
                                {p.status}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* --- Integration Benefits Section --- */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mt-12 p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10"
                >
                    <h2 className="text-3xl font-bold mb-6 text-purple-400">Why Centralized Integration Matters</h2>
                    <div className='grid md:grid-cols-3 gap-6 text-left'>
                        <div className='flex items-start space-x-4'>
                            <FaCog className='text-blue-400 text-3xl mt-1 flex-shrink-0' />
                            <div>
                                <h4 className='font-semibold text-white'>Simplified Workflow</h4>
                                <p className='text-sm text-gray-400'>No more logging into multiple apps. Manage scheduling, posting, and analytics from a single tab.</p>
                            </div>
                        </div>
                        <div className='flex items-start space-x-4'>
                            <FaCheckCircle className='text-blue-400 text-3xl mt-1 flex-shrink-0' />
                            <div>
                                <h4 className='font-semibold text-white'>Consistent Branding</h4>
                                <p className='text-sm text-gray-400'>Ensure tone, message, and visuals are perfectly consistent across every platform.</p>
                            </div>
                        </div>
                        <div className='flex items-start space-x-4'>
                            <FaPlug className='text-blue-400 text-3xl mt-1 flex-shrink-0' />
                            <div>
                                <h4 className="font-semibold text-white">Future-Proofed</h4>
                                <p className='text-sm text-gray-400'>We continuously add new social channels and features so your stack stays current.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* ================= Footer (Consistent with Home/Dashboard) ================= */}
            <footer className="py-12 bg-black border-t border-white/10 text-center mt-24">
            
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
