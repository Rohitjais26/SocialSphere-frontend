import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaTiktok, FaPinterest, FaYoutube } from 'react-icons/fa'; // Import FaCheckCircle for consistency

// A simple SVG component to replace FaCheckCircle, ensuring compatibility
const CheckmarkIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 ${className}`}
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l1.75 1.75a.75.75 0 0 0 1.13-.082l3.75-5.25Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const pricingPlans = [
    {
      name: "Creator",
      monthlyPrice: "29",
      yearlyPrice: "290",
      description: "Best for freelancers and solopreneurs.",
      features: [
        "2 Social Accounts",
        "Unlimited Posts",
        "Basic Analytics",
        "AI Content Generation (50/month)",
        "Post Scheduling",
      ],
    },
    {
      name: "Pro",
      monthlyPrice: "99",
      yearlyPrice: "990",
      description: "Ideal for small businesses and growing teams.",
      isPopular: true,
      features: [
        "10 Social Accounts",
        "Unlimited Posts",
        "Advanced Analytics & Reporting",
        "AI Content Generation (200/month)",
        "Post & Media Scheduling",
        "Social Media Audit",
        "Sentiment Analysis",
      ],
    },
    {
      name: "Enterprise",
      monthlyPrice: "Custom",
      yearlyPrice: "Custom",
      description: "Tailored for large organizations with advanced needs.",
      features: [
        "Unlimited Social Accounts",
        "Dedicated Account Manager",
        "API Access",
        "Custom Integrations",
        "Priority Support",
        "White-labeling",
        "Unlimited AI Generation",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-200 px-6 py-32 font-sans relative overflow-hidden">
      
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

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Find the perfect plan that scales with your social media ambitions.
            No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mt-12 mb-16">
          <span className="text-lg font-semibold text-gray-400">Monthly</span>
          <div
            onClick={() => setIsYearly(!isYearly)}
            className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isYearly ? "bg-pink-500" : "bg-gray-700"}`}
          >
            <motion.div
              className={`bg-white w-6 h-6 rounded-full shadow-md ${isYearly ? "ml-6" : ""}`}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            />
          </div>
          <span className="text-lg font-semibold text-gray-400">
            Yearly
            <span className="text-green-400 text-sm ml-2">-15%</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className={`p-8 rounded-3xl shadow-xl flex flex-col items-center text-center backdrop-blur-lg border border-white/10 ${
                plan.isPopular ? "bg-gradient-to-br from-purple-800/80 to-pink-500/80 transform scale-105 relative shadow-2xl shadow-pink-500/50" : "bg-white/5"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute top-0 right-0 -mt-4 mr-4 px-4 py-1 bg-white text-black font-bold text-sm rounded-full shadow-lg">
                  Most Popular
                </span>
              )}

              <h3 className={`text-2xl font-bold mb-2 ${plan.isPopular ? "text-white" : "text-white"}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.isPopular ? "text-gray-200" : "text-gray-400"}`}>
                {plan.description}
              </p>
              
              {/* Price Display */}
              <div className="mb-8">
                <span className={`text-5xl font-bold ${plan.isPopular ? "text-white" : "bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent"}`}>
                  {plan.monthlyPrice === "Custom"
                    ? plan.monthlyPrice
                    : `$${isYearly ? plan.yearlyPrice : plan.monthlyPrice}`}
                </span>
                <span className={`text-lg font-semibold ml-1 ${plan.isPopular ? "text-gray-200" : "text-gray-400"}`}>
                  {plan.monthlyPrice !== "Custom" && `/ ${isYearly ? "year" : "month"}`}
                </span>
              </div>
              
              {/* Feature List */}
              <ul className={`text-left w-full space-y-3 ${plan.isPopular ? "text-gray-200" : "text-gray-400"}`}>
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckmarkIcon className={`text-sm ${plan.isPopular ? "text-green-300" : "text-pink-500"}`} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* CTA Button */}
              <Link
                to={plan.monthlyPrice === "Custom" ? "/contact" : "/register"}
                className={`mt-10 w-full py-3 rounded-lg font-semibold transition-all duration-300 transform shadow-md ${
                  plan.isPopular
                    ? "bg-white text-black hover:scale-[1.03]"
                    : "bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:scale-[1.03]"
                }`}
              >
                {plan.monthlyPrice === "Custom" ? "Contact Sales" : "Start Free Trial"}
              </Link>
            </motion.div>
          ))}
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
