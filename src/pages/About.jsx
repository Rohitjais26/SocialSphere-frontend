import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRocket, FaLightbulb, FaShieldAlt, FaUsers, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaTiktok, FaPinterest, FaYoutube } from 'react-icons/fa';

export default function About() {
    
    const teamStats = [
        { count: "5K+", label: "Happy Customers", icon: FaUsers },
        { count: "99.9%", label: "Uptime Reliability", icon: FaShieldAlt },
        { count: "2.5M+", label: "Posts Scheduled", icon: FaRocket },
    ];

    const values = [
        { icon: FaLightbulb, title: "AI-First Innovation", description: "We believe in leveraging the latest AI models to solve complex content strategy problems simply." },
        { icon: FaRocket, title: "Simplicity & Focus", description: "Our tools cut through the noise, offering clear workflows so you can focus on creativity, not complexity." },
        { icon: FaUsers, title: "Customer Success", description: "Your growth is our mission. We build tools that directly translate into measurable social media performance." },
    ];

    return (
        <div className="min-h-screen bg-black text-gray-200 px-6 py-32 font-sans relative overflow-hidden">
            
            {/* ================= BACKGROUND GLOW ANIMATION (Thematic) ================= */}
            <div className="absolute inset-0 z-0 opacity-20">
                {/* Green Glow */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                />
                {/* Pink Glow */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
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
                    <p className="text-green-400 font-semibold mb-2 tracking-widest uppercase">Our Story. Our Mission.</p>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
                        About <span className="bg-gradient-to-r from-pink-500 to-green-400 bg-clip-text text-transparent">SocialSphere</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        We built SocialSphere to solve a simple problem: social media management is too complex, time-consuming, and inconsistent.
                    </p>
                    {/* Get Started Button */}
                    <Link to="/dashboard">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mt-6 px-10 py-3 bg-gradient-to-r from-pink-500 to-green-400 text-white font-bold rounded-lg shadow-xl shadow-pink-500/40 hover:opacity-90 transition transform hover:scale-105"
                        >
                            Explore the Dashboard
                        </motion.button>
                    </Link>
                </motion.div>

                {/* --- Stats Section --- */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="grid md:grid-cols-3 gap-8 mb-20 p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10"
                >
                    {teamStats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <stat.icon className="text-green-400 text-5xl mx-auto mb-3" />
                            <h3 className="text-4xl font-extrabold text-white">{stat.count}</h3>
                            <p className="text-lg text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>


                {/* --- Mission & Core Values --- */}
                <div className="grid lg:grid-cols-2 gap-12 items-start text-left">
                    
                    {/* Left Column: Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-pink-500 border-b border-pink-500/50 pb-2">Our Mission: Automate Consistency</h2>
                        <p className='text-gray-300 text-lg'>
                            In a rapidly changing digital landscape, consistency is the key to growth. Our mission is to provide the most reliable, intelligent, and user-friendly automation tools. By creating features like Evergreen Recycling and AI-Powered Copywriting, we empower marketers to achieve their goals with maximum impact and minimal daily effort.
                        </p>
                        <p className='text-gray-400'>
                            Founded by a team of social media strategists and AI developers, SocialSphere is built on the philosophy that technology should simplify, not complicate, your creative workflow.
                        </p>
                    </motion.div>
                    
                    {/* Right Column: Core Values */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl font-bold text-green-400 border-b border-green-400/50 pb-2">Core Values</h2>
                        <div className='space-y-6'>
                            {values.map((v, i) => (
                                <div key={i} className='flex items-start space-x-4 p-4 bg-black/40 rounded-lg'>
                                    <v.icon className='text-pink-400 text-3xl mt-1 flex-shrink-0' />
                                    <div>
                                        <h4 className='font-semibold text-white'>{v.title}</h4>
                                        <p className='text-sm text-gray-400'>{v.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

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
