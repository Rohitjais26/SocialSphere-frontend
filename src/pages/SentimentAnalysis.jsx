import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaSmile, FaFrown, FaMeh, FaCloudUploadAlt, FaFileImage, FaVideo, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaTiktok, FaPinterest, FaYoutube } from 'react-icons/fa';

export default function SentimentAnalysis() {
    
    const analysisFeatures = [
        { icon: FaFileImage, title: "Image Analysis", description: "Detect sentiment embedded in photos and graphics, accounting for visual tone." },
        { icon: FaVideo, title: "Video & GIF Processing", description: "Scan short video clips for emotional cues and overall user reaction context." },
        { icon: FaCloudUploadAlt, title: "Text Nuance Detection", description: "Go beyond keywords to accurately judge sarcasm, sarcasm, and complex opinions." },
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
                {/* Yellow/Orange Glow */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
                    <p className="text-yellow-400 font-semibold mb-2 tracking-widest uppercase">Understand the Vibe</p>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                        Sentiment <span className="bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">Analysis</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Measure the emotional impact of your content instantly by analyzing text, images, and videos using powerful AI.
                    </p>
                    {/* Get Started Button */}
                    <Link to="/dashboard">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-6 px-10 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold rounded-lg shadow-xl shadow-pink-500/40 hover:opacity-90 transition transform hover:scale-105"
                        >
                            Analyze Your Content Now
                        </motion.button>
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12 items-start">
                    
                    {/* --- Column 1: Core Categories --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="w-full bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 p-8 space-y-6 lg:col-span-1"
                    >
                        <h3 className="text-2xl font-bold text-white border-b border-pink-500/50 pb-2">Sentiment Categories</h3>
                        <div className="space-y-4">
                            <div className="flex items-center p-3 bg-green-900/40 rounded-lg">
                                <FaSmile className="text-green-400 text-3xl mr-4" />
                                <div>
                                    <h4 className="font-semibold text-white">Positive</h4>
                                    <p className="text-sm text-gray-400">Content that evokes satisfaction, excitement, or approval.</p>
                                </div>
                            </div>
                            <div className="flex items-center p-3 bg-red-900/40 rounded-lg">
                                <FaFrown className="text-red-400 text-3xl mr-4" />
                                <div>
                                    <h4 className="font-semibold text-white">Negative</h4>
                                    <p className="text-sm text-gray-400">Content expressing disappointment, criticism, or distress.</p>
                                </div>
                            </div>
                            <div className="flex items-center p-3 bg-yellow-900/40 rounded-lg">
                                <FaMeh className="text-yellow-400 text-3xl mr-4" />
                                <div>
                                    <h4 className="font-semibold text-white">Neutral</h4>
                                    <p className="text-sm text-gray-400">Factual, informative, or mixed-tone content without strong emotion.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* --- Column 2 & 3: Multimodal Features --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="space-y-8 lg:col-span-2"
                    >
                        <h2 className="text-3xl font-bold text-pink-500 border-b border-pink-500/50 pb-2">Multimodal Analysis Power</h2>
                        
                        <p className='text-gray-400 text-lg'>
                            SocialSphere utilizes AI vision models to interpret media alongside text. This means your posts are evaluated for emotional context, ensuring you never miss a subtle change in audience perception or content performance.
                        </p>
                        
                        <div className='grid md:grid-cols-3 gap-6'>
                            {analysisFeatures.map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(236, 72, 153, 0.2)" }}
                                    className="p-6 bg-white/5 rounded-xl border border-white/10 h-full text-center"
                                >
                                    <item.icon className="text-yellow-400 text-4xl mx-auto mb-3" />
                                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                    <p className="text-sm text-gray-400">{item.description}</p>
                                </motion.div>
                            ))}
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
