import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaTiktok, FaPinterest, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Assuming your backend is running on http://localhost:4000 and has a /api/contact endpoint
      await API.post('/contact', formData);
      toast.success('Message sent successfully!');
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Form submission failed:", error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 px-6 py-32 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white">
            Need help? Say <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Hello</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Feel free to reach out to us using the options below, and our dedicated team will respond to your inquiries promptly.
          </p>
          <div className="text-sm mt-4 text-gray-500">
            <Link to="/" className="hover:text-pink-500 transition">Home</Link> &gt; <span className="text-pink-500">Contact</span>
          </div>
        </motion.div>


        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="p-8 space-y-8 text-center md:text-left"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <FaMapMarkerAlt className="text-pink-500 text-3xl flex-shrink-0" />
                <p className="text-gray-400">123 SocialSphere Blvd, Mumbai, India</p>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <FaEnvelope className="text-pink-500 text-3xl flex-shrink-0" />
                <p className="text-gray-400">contact@socialsphere.com</p>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <FaPhone className="text-pink-500 text-3xl flex-shrink-0" />
                <p className="text-gray-400">+91 98765 43210</p>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-2xl font-bold text-white mb-4">Follow Us</h4>
              <div className="flex justify-center md:justify-start gap-6 text-3xl text-gray-400">
                <motion.a href="#" whileHover={{ scale: 1.2, color: "#ec4899" }}>
                  <FaFacebook />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, color: "#ec4899" }}>
                  <FaInstagram />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, color: "#ec4899" }}>
                  <FaLinkedin />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2, color: "#ec4899" }}>
                  <FaTwitter />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Embedded Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10"
        >
          <div className="relative w-full h-80 rounded-xl overflow-hidden">
            <iframe
              title="Google Map"
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15082.909650385966!2d72.87528145!3d19.07598385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306856094b%3A0x867ae221191316b2!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1692254394332!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>

      {/* ================= Footer ================= */}
      <footer className="py-12 bg-black border-t border-white/10 text-center mt-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-gray-400">
          <div>
            <h3 className="text-pink-500 font-bold text-xl mb-4">
              SocialSphere
            </h3>
            <p>Manage all your social presence in one place.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
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
              <li>
                <Link to="/about" className="hover:text-pink-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-pink-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>AI Content Generation</li>
              <li>Scheduling</li>
              <li>Analytics</li>
              <li>Social Media Auditing</li>
              <li>Calendar Management</li>
            </ul>
          </div>
        </div>

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
              FaTiktok,
              FaPinterest,
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
    </div>
  );
}
