import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaRecycle, FaClock, FaCheckCircle, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaTiktok, FaPinterest, FaYoutube } from 'react-icons/fa';

export default function PostScheduler() {
    
    const capabilities = [
        { icon: FaRecycle, title: "Evergreen Recycling", description: "Automatically re-queue your top-performing content so your feeds never go silent." },
        { icon: FaCalendarAlt, title: "Visual Calendar", description: "Manage your entire monthly content plan with a simple drag-and-drop interface." },
        { icon: FaClock, title: "Bulk Scheduling", description: "Schedule dozens of posts across multiple platforms in minutes, not hours." },
        { icon: FaCheckCircle, title: "Cross-Platform Publishing", description: "Set your post once and publish it natively across all connected social accounts." }
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
                {/* Orange Glow */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
                    <p className="text-pink-500 font-semibold mb-2 tracking-widest uppercase">Set it and forget it.</p>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                        Automated Post <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Scheduler</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Maintain a continuous, optimized presence across all networks without spending hours creating new posts every day.
                    </p>
                    {/* Get Started Button */}
                    <Link to="/dashboard">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-6 px-10 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold rounded-lg shadow-xl shadow-pink-500/40 hover:opacity-90 transition transform hover:scale-105"
                        >
                            Start Scheduling Now
                        </motion.button>
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    
                    {/* --- Left Column: Evergreen Feature Focus --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="w-full bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-8 space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-white mb-4 border-b border-pink-500/50 pb-2">Our Key Differentiator: Evergreen Content</h3>
                        <p className='text-lg text-gray-400'>
                            Unlike basic schedulers, SocialSphere maintains a **Content Library**. Mark your best posts as *Evergreen*, and our system will intelligently recycle them into your schedule, ensuring your most valuable content reaches new segments of your audience continuously.
                        </p>
                        <div className="space-y-4 pt-4">
                            {capabilities.slice(0, 1).map((item, index) => (
                                <div key={index} className="flex items-start p-4 bg-black/40 rounded-lg border-l-4 border-pink-500">
                                    <item.icon className="text-pink-400 text-3xl mr-4 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-white text-lg">{item.title}</h4>
                                        <p className="text-sm text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h4 className='text-xl font-semibold text-white pt-4'>Supported Platforms:</h4>
                        <div className="flex flex-wrap gap-4 text-3xl text-gray-400">
                            <FaFacebook className='hover:text-pink-500 transition' />
                            <FaInstagram className='hover:text-pink-500 transition' />
                            <FaTwitter className='hover:text-pink-500 transition' />
                            <FaLinkedin className='hover:text-pink-500 transition' />
                            <FaPinterest className='hover:text-pink-500 transition' />
                        </div>
                    </motion.div>
                    
                    {/* --- Right Column: Capabilities & Workflow --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl font-bold text-orange-400 border-b border-orange-400/50 pb-2">Workflow Efficiency</h2>
                        
                        <div className='grid grid-cols-2 gap-6'>
                            {capabilities.slice(1).map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(249, 115, 22, 0.2)" }}
                                    className="p-4 bg-white/5 rounded-xl border border-white/10 h-full"
                                >
                                    <item.icon className="text-orange-400 text-3xl mb-3" />
                                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                    <p className="text-sm text-gray-400">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-pink-500 pt-4 border-b border-pink-500/50 pb-2">Maximize Reach, Minimize Effort</h3>
                        <p className='text-gray-400 text-lg'>
                            SocialSphere ensures your posts go out at the optimal time, every time. By centralizing content, scheduling, and recycling, we cut your daily social media workload by up to 80%.
                        </p>
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
                        {[FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube].map((Icon, i) => (
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