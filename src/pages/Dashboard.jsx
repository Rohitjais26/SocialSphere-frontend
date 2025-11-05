import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineSmartToy } from "react-icons/md";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaTiktok,
  FaPinterest,
  FaYoutube,
  FaRegThumbsUp,
  FaRegCommentDots,
  FaRobot, 
  FaTrashAlt, 
} from "react-icons/fa";

// =========================================================================
// FIX 1A: Update BASE_URL to read from Vercel environment variable (VITE_RENDER_BASE_URL)
// This is critical for images (Cloudinary URLs) to display on the live site.
// =========================================================================
const BASE_URL = import.meta.env.VITE_RENDER_BASE_URL;

// =========================================================================
// FIX 1B: Helper function to determine the correct source URL
// If the URL already starts with http/https, it's a Cloudinary link (use it directly)
// Otherwise, assume it's a local upload path (prepend BASE_URL)
// =========================================================================
const getMediaSrc = (mediaUrl) => {
    if (!mediaUrl) return '';
    if (mediaUrl.startsWith('http')) return mediaUrl;
    return `${BASE_URL}/${mediaUrl}`;
};

export default function Dashboard() {
  // ====== States ======
  const [user, setUser] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loadingState, setLoadingState] = useState({
    analytics: true,
    posts: true,
    drafts: true,
    aiSummary: true,
  });

  // Post Scheduler
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleTime, setScheduleTime] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [mediaFile, setMediaFile] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState(["instaclone"]);
  const [isEvergreen, setIsEvergreen] = useState(false);

  // Sentiment Analysis
  const [sentiment, setSentiment] = useState(null);
  const [loadingSentiment, setLoadingSentiment] = useState(false);
  const [showSentimentAnalysis, setShowSentimentAnalysis] = useState(false);

  // Chatbot
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I’m SocialSphere Co-Pilot. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); 

  // AI Summary
  const [aiSummary, setAiSummary] = useState(
    "Generating an AI summary of your recent performance..."
  );

  // AI Recommendation (NOTE: This state needs to be added if it was missed in a previous step)
  const [aiRecommendation, setAiRecommendation] = useState(
    "Generating actionable recommendation..."
  );

  // Social Media Audit (NEW)
  const [auditReport, setAuditReport] = useState(null);
  const [loadingAudit, setLoadingAudit] = useState(false);
  const [accountConnected, setAccountConnected] = useState(false);

  const navigate = useNavigate();

  // Helper function for toast notifications
  const showToast = (message, type) => {
    toast(message, {
      type: type,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // NEW: Function to toggle chatbot visibility
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  // ====== Fetch Dashboard Data & Scheduled Posts ======
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardRes, analyticsRes, postsRes, draftsRes] =
          await Promise.all([
            API.get("/dashboard"),
            API.get("/analytics"),
            API.get("/posts"),
            API.get("/posts/drafts"),
          ]);

        setUser(dashboardRes.data?.user || { name: "User" });
        setAnalyticsData(analyticsRes.data.analytics);
        setChartData(analyticsRes.data.chartData);
        setPosts(postsRes.data);
        setDrafts(draftsRes.data);
        
        // Capture AI Recommendation (if available from analytics endpoint)
        setAiRecommendation(analyticsRes.data.aiRecommendation);


        // Fetch AI Summary after other data is loaded
        const summaryRes = await API.post("/ai/summary", {
          analyticsData: analyticsRes.data.analytics,
        });
        setAiSummary(summaryRes.data.summary);
      } catch (err) {
        console.error("Dashboard error:", err.response?.data || err.message);
        showToast("Error loading dashboard data. Please log in again.", "error");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } finally {
        setLoadingState({
          analytics: false,
          posts: false,
          drafts: false,
          aiSummary: false,
        });
      }
    };
    fetchData();
  }, [navigate]); 

  // ====== Handle Post Scheduler ======
  const handlePost = async () => {
    if (
      !newPost.trim() ||
      !scheduleDate ||
      !scheduleTime ||
      selectedPlatforms.length === 0
    ) {
      showToast("Please fill all required fields.", "warning");
      return;
    }

    const scheduledDateTime = new Date(
      `${scheduleDate.toDateString()} ${scheduleTime}`
    ).toISOString();

    const formData = new FormData();
    formData.append("content", newPost);
    formData.append("scheduledAt", scheduledDateTime);
    formData.append("platforms", JSON.stringify(selectedPlatforms));
    if (mediaFile) {
      formData.append("media", mediaFile);
    }
    formData.append("isEvergreen", isEvergreen);
    formData.append("status", "scheduled");

    try {
      const res = await API.post("/posts/schedule", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Post scheduled:", res.data.post);
      setPosts((prevPosts) => [...prevPosts, res.data.post]);
      setNewPost("");
      setScheduleDate(null);
      setScheduleTime("");
      setMediaFile(null);
      setIsEvergreen(false);
      showToast("Post scheduled successfully!", "success");
    } catch (err) {
      console.error("Post scheduling failed:", err.response?.data || err.message);
      showToast("Failed to schedule post.", "error");
    }
  };

  // ====== Handle Save as Draft ======
  const handleSaveDraft = async () => {
    if (!newPost.trim()) {
      showToast("Draft content cannot be empty.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("content", newPost);
    formData.append("platforms", JSON.stringify(selectedPlatforms));
    if (mediaFile) {
      formData.append("media", mediaFile);
    }
    formData.append("isEvergreen", isEvergreen);
    formData.append("status", "draft");
    formData.append("scheduledAt", new Date().toISOString());

    try {
      const res = await API.post("/posts/schedule", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDrafts((prevDrafts) => [res.data.post, ...prevDrafts]);
      setNewPost("");
      setMediaFile(null);
      setIsEvergreen(false);
      showToast("Draft saved successfully!", "success");
    } catch (err) {
      console.error("Failed to save draft:", err.response?.data || err.message);
      showToast("Failed to save draft.", "error");
    }
  };

  // ====== Handle Delete Post/Draft ======
  const handleDeletePost = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
        return;
    }

    try {
        await API.delete(`/posts/${id}`);
        
        // Update the correct state array
        if (type === 'scheduled post') {
            setPosts((prevPosts) => prevPosts.filter(p => p._id !== id));
            showToast("Scheduled post deleted successfully!", "success");
        } else {
            setDrafts((prevDrafts) => prevDrafts.filter(d => d._id !== id));
            showToast("Draft deleted successfully!", "success");
        }
    } catch (err) {
        console.error("Delete failed:", err.response?.data || err.message);
        showToast("Failed to delete post. Check permissions.", "error");
    }
  };


  // ====== Chatbot Send Message ======
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const newMessageList = [...messages, userMessage];
    setMessages(newMessageList);
    setInput("");

    // Convert chat history to Gemini API format
    const history = newMessageList.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    try {
      const res = await API.post("/ai/chat", {
        history: history,
        message: input,
      });

      const botResponse = res.data.response;
      const newBotMessage = { sender: "bot", text: botResponse };
      setMessages((prev) => [...prev, newBotMessage]);
    } catch (err) {
      console.error("Chatbot API call failed:", err.response?.data || err.message);
      const botMessage = {
        sender: "bot",
        text: "Sorry, I couldn't get a response. Please try again later.",
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  // ====== Platform Toggle Handler ======
  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  // =========================================================================
  // FIX 2: Updated Sentiment Analysis Handler for Multimodal Upload
  // =========================================================================
  const handleAnalyzeSentiment = async () => {
    // FIX 2A: Check if EITHER text OR media exists
    if (!newPost.trim() && !mediaFile) { 
      showToast("Please write a post or upload media to analyze its sentiment.", "warning");
      return;
    }

    setLoadingSentiment(true);
    setSentiment(null);
    setShowSentimentAnalysis(true);

    // FIX 2B: Use FormData for multimodal upload
    const formData = new FormData();
    formData.append("text", newPost.trim()); 
    if (mediaFile) {
        formData.append("media", mediaFile); 
    }

    try {
      // FIX 2C: Send FormData with correct headers
      const res = await API.post("/sentiment/analyze", formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Essential for file uploads
        }
      });
      setSentiment(res.data.sentiment);
    } catch (err) {
      console.error("Sentiment analysis failed:", err.response?.data || err.message);
      setSentiment("Analysis failed. Please try again.");
    } finally {
      setLoadingSentiment(false);
    }
  };

  // ====== Social Media Audit Handler (NEW) ======
  const handleGenerateAudit = async () => {
    setLoadingAudit(true);
    setAuditReport(null);
    try {
      const res = await API.post("/audit/generate");
      setAuditReport(res.data.report);
      showToast("Social media audit generated successfully!", "success");
    } catch (err) {
      console.error("Audit generation failed:", err);
      showToast("Failed to generate audit report.", "error");
    } finally {
      setLoadingAudit(false);
    }
  };

  // ====== Logout ======
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Primary Gradient Button Class
  const PRIMARY_BTN_CLASS = "px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-xl shadow-pink-500/40 hover:shadow-pink-500/80";

  // Secondary/Draft Button Class
  const SECONDARY_BTN_CLASS = "px-6 py-3 bg-gray-700 text-gray-200 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:bg-gray-600";
    
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* ================= BACKGROUND GLOW ANIMATION (From Home Page) ================= */}
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

      {/* ================= Navbar (Fixed and High Z-Index) ================= */}
      <header className="fixed top-0 w-full bg-black/70 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            SocialSphere
          </Link>
          <nav className="hidden md:flex gap-8 text-gray-300">
            {/* Connect Accounts Button */}
            <Link 
                to="/connect" 
                className="py-2 px-4 bg-gray-800 text-pink-400 font-semibold rounded-xl transition-all duration-300 hover:bg-gray-700 hover:text-pink-300" // Subtly styled
            >
              Connect Accounts
            </Link>
            <Link to="" className="hover:text-pink-500 transition">
              Your Dashboard
            </Link>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={SECONDARY_BTN_CLASS.replace("px-6", "px-4").replace("py-3", "py-2")} // Apply secondary style, size adjusted
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* ================= Dashboard Content (Relative Z-10) ================= */}
      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-10"
        >
          Hello, {user?.name || "Guest"} 👋
        </motion.h1>

        {/* Dashboard Content */}
        {loadingState.analytics ? (
          <p className="text-center text-gray-400">Loading dashboard...</p>
        ) : (
          <div className="space-y-12">
            {/* ================= Performance Analysis ================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Performance Analysis</h2>
              {loadingState.analytics ? (
                <p className="text-center text-gray-400">Loading analysis data...</p>
              ) : (
                <>
                  {/* AI-Generated Summary & Recommendation Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-black/40 border border-white/10 rounded-xl shadow-inner">
                      <p className="text-sm font-semibold text-pink-500 mb-2">AI Summary</p>
                      <p className="text-sm text-gray-300">
                        {loadingState.aiSummary
                          ? "Generating an AI summary of your recent performance..."
                          : aiSummary}
                      </p>
                    </div>
                    {/* AI Recommendation Card */}
                    <div className="p-4 bg-black/40 border border-white/10 rounded-xl shadow-inner">
                      <p className="text-sm font-semibold text-orange-400 mb-2">AI Recommendation</p>
                      <p className="text-sm text-gray-300">
                        {loadingState.aiSummary 
                          ? "Analyzing performance data..."
                          : aiRecommendation}
                      </p>
                    </div>
                  </div>
                    
                  {/* High-Level Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-10">
                    {[
                      { label: "Posts", value: analyticsData?.posts },
                      { label: "Followers", value: analyticsData?.followers },
                      { label: "Engagement", value: analyticsData?.engagement },
                      { label: "Reach", value: analyticsData?.reach },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="p-4 bg-black/40 rounded-lg shadow-md border border-white/10"
                      >
                        <p className="text-2xl font-bold text-pink-500">
                          {stat.value}
                        </p>
                        <p className="text-gray-400">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Post Performance Over Time Chart */}
                  <h3 className="text-xl font-semibold mb-6 text-white">Post Performance over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid stroke="#333" />
                      <XAxis dataKey="name" stroke="#aaa" />
                      <YAxis stroke="#aaa" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="posts"
                        stroke="#ec4899"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="engagement"
                        stroke="#f97316"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </>
              )}
            </motion.div>

            {/* ================= Social Media Audit ================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Social Media Audit</h2>
              <p className="text-gray-400 mb-6">
                Get a comprehensive AI-powered report on your social media performance with actionable insights.
              </p>
              {/* Generate Audit Report Button */}
              <button
                onClick={handleGenerateAudit}
                disabled={loadingAudit}
                className={`${PRIMARY_BTN_CLASS} disabled:opacity-50`} // Apply primary style
              >
                {loadingAudit ? "Generating Report..." : "Generate Audit Report"}
              </button>
              {auditReport && (
                <div className="mt-8 p-6 bg-black/40 rounded-xl border border-white/10 whitespace-pre-wrap">
                  <h3 className="text-xl font-bold mb-4 text-pink-500">Your Audit Report</h3>
                  <p>{auditReport}</p>
                </div>
              )}
            </motion.div>

            {/* ================= POST DETAILS LIST (RESTORED) ================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Post Details</h2>
              <p className="text-sm text-gray-400 mb-6">
                View detailed metrics for your individual posts.
              </p>
                
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2 px-4 font-semibold text-gray-400">Content</th>
                      <th className="py-2 px-4 font-semibold text-gray-400 text-center">Platforms</th>
                      <th className="py-2 px-4 font-semibold text-gray-400 text-center">Engagement</th>
                      <th className="py-2 px-4 font-semibold text-gray-400 text-center">Likes</th>
                      <th className="py-2 px-4 font-semibold text-gray-400 text-center">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.length > 0 ? (
                      posts.map((post, index) => (
                        <tr
                          key={post._id || index}
                          className="border-b border-gray-800"
                        >
                          <td className="py-3 px-4 text-sm text-gray-300 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                            {post.content}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex justify-center gap-2 text-lg text-gray-400">
                              {post.platforms.includes("instaclone") && <FaInstagram className="text-pink-400" title="InstaClone" />}
                              {post.platforms.includes("facebook") && <FaFacebook />}
                              {post.platforms.includes("twitter") && <FaTwitter />}
                              {post.platforms.includes("linkedin") && <FaLinkedin />}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center text-gray-300">~5%</td>
                          <td className="py-3 px-4 text-center text-gray-300 flex items-center justify-center gap-1">
                            <FaRegThumbsUp /> 20
                          </td>
                          <td className="py-3 px-4 text-center text-gray-300 flex items-center justify-center gap-1">
                            <FaRegCommentDots /> 5
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-4 text-center text-gray-400">
                          No posts found to analyze.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
              
            {/* ================= Sentiment Analysis Card ================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Sentiment Analysis Module</h2>
              <div className="flex flex-col gap-4">
                {/* Post Content Input Area */}
                <textarea
                  value={newPost}
                  onChange={(e) => {
                    setNewPost(e.target.value);
                    setShowSentimentAnalysis(false);
                  }}
                  placeholder="Write a post to analyze its sentiment..."
                  className="w-full p-4 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                />
                
                {/* File Upload Input (Retained from Post Scheduler) */}
                <div className="mt-4">
                    <label className="block text-sm font-medium mb-2 text-white">
                    Upload Media (Optional)
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setMediaFile(e.target.files[0])}
                        className="w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-xl file:border-0 
                            file:text-sm file:font-semibold
                            file:bg-pink-500/10 file:text-pink-400 
                            hover:file:bg-pink-500/20"
                    />
                </div>

                {/* Analyze Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleAnalyzeSentiment}
                    className={`${PRIMARY_BTN_CLASS.replace("px-6", "px-4").replace("py-3", "py-2")} disabled:opacity-50`} // Apply primary style, size adjusted
                    disabled={loadingSentiment || (!newPost.trim() && !mediaFile)} // Check for EITHER text OR media
                  >
                    {loadingSentiment ? "Analyzing..." : "Analyze Sentiment"}
                  </button>
                </div>

                {/* Analysis Result Display */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={
                    showSentimentAnalysis
                      ? { opacity: 1, height: "auto", marginTop: "1rem" }
                      : { opacity: 0, height: 0, marginTop: "0rem" }
                  }
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-black/40 border border-white/10 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-pink-500 mb-2">
                      Analysis Result
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Your post's emotional nuance, analyzed by our AI.
                    </p>
                    {loadingSentiment ? (
                      <p className="text-gray-300">Analyzing your post...</p>
                    ) : (
                      <p className="text-lg text-gray-100">{sentiment}</p>
                    )}
                    <button
                      onClick={() => setShowSentimentAnalysis(false)}
                      className={`${SECONDARY_BTN_CLASS.replace("px-6", "px-4").replace("py-3", "py-2")} text-sm`} // Apply secondary style, size adjusted
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* ================= Post Scheduler ================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10"
            >
              <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Post Scheduler</h2>

              {/* Platform Selection */}
              <div className="flex gap-4 mb-6 justify-center">
                {[
                  { icon: FaInstagram, name: "instaclone", label: "InstaClone" }, 
                  { icon: FaFacebook, name: "facebook", label: "Facebook" },
                  { icon: FaTwitter, name: "twitter", label: "Twitter" },
                  { icon: FaLinkedin, name: "linkedin", label: "LinkedIn" },
                ].map(({ icon: Icon, name, label }) => (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePlatformToggle(name)}
                    className={`p-3 rounded-full cursor-pointer transition ${
                      selectedPlatforms.includes(name)
                        ? "bg-pink-500 text-black shadow-lg" // <-- ENHANCED STYLE
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                    title={label}
                  >
                    <Icon className="text-2xl" />
                  </motion.div>
                ))}
              </div>

              {/* Post Content */}
              <textarea
                value={newPost}
                onChange={(e) => {
                  setNewPost(e.target.value);
                  setShowSentimentAnalysis(false);
                }}
                placeholder="Compose your post content..." // <-- UPDATED TEXT
                rows={4} // <-- SET ROWS FOR BETTER LOOK
                className="w-full p-4 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-pink-500/50 transition resize-none mb-4" // <-- ENHANCED STYLE
              />
                
              {/* Media Upload (remains the same) */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2 text-white">
                  Upload Media (Image or Video)
                </label>
                <input
                  type="file"
                  onChange={(e) => setMediaFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-xl file:border-0 // <-- ENHANCED STYLE
                    file:text-sm file:font-semibold
                    file:bg-pink-500/10 file:text-pink-400 // <-- ENHANCED STYLE
                    hover:file:bg-pink-500/20"
                />
              </div>

              {/* Evergreen Content Checkbox */}
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="isEvergreen"
                  checked={isEvergreen}
                  onChange={(e) => setIsEvergreen(e.target.checked)}
                  className="h-4 w-4 text-pink-500 bg-gray-900 rounded border-gray-700 focus:ring-pink-500"
                />
                <label htmlFor="isEvergreen" className="ml-2 block text-sm text-gray-300">
                  Mark as Evergreen Content (This post will be recycled)
                </label>
              </div>

              {/* Calendar + Time Picker */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-black/40 rounded-lg border border-white/20">
                  <Calendar
                    onChange={(date) => setScheduleDate(date)}
                    value={scheduleDate || new Date()}
                    className="rounded-lg w-full bg-black/40 text-white border-0"
                  />
                  <p className="mt-2 text-sm text-gray-400">
                    Selected:{" "}
                    {scheduleDate
                      ? scheduleDate.toDateString()
                      : "No date chosen"}
                  </p>
                </div>

                <div className="flex flex-col justify-center">
                  <label className="mb-2 text-gray-300">Select Time:</label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="p-3 rounded-xl bg-black/40 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 transition" // <-- ENHANCED STYLE
                  />
                </div>
              </div>

              {/* Schedule and Save as Draft Buttons */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handlePost}
                  className={`${PRIMARY_BTN_CLASS} flex-1`} // Apply primary style, flex-1 ensures it fills space
                >
                  Schedule Post
                </button>
                <button
                  onClick={handleSaveDraft}
                  className={`${SECONDARY_BTN_CLASS} flex-1`} // Apply secondary style, flex-1 ensures it fills space
                >
                  Save as Draft
                </button>
              </div>

              {/* Drafts and Scheduled Posts List */}
              <div className="mt-10 space-y-4">
                <h3 className="text-xl font-semibold text-pink-500 border-b border-pink-500/30 pb-2">Scheduled Posts ({posts.length})</h3>
                {loadingState.posts ? (
                  <p className="text-center text-gray-400">
                    Loading scheduled posts...
                  </p>
                ) : (
                  posts.map((p, i) => (
                    <motion.div
                      key={p._id || i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-black/40 rounded-xl border border-white/10 relative" // <-- ENHANCED STYLE
                    >
                      <p className="font-medium mb-2 pr-12">{p.content}</p>
                      {p.mediaUrl && (
                        <img
                          src={getMediaSrc(p.mediaUrl)} // FIX APPLIED HERE
                          alt="Post media"
                          className="mt-2 rounded-lg w-full max-h-40 object-cover"
                        />
                      )}
                      <span className="text-xs text-gray-500 block mt-2">
                        Scheduled for:{" "}
                        {new Date(p.scheduledAt).toLocaleDateString()} at{" "}
                        {new Date(p.scheduledAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => handleDeletePost(p._id, 'scheduled post')}
                        className="absolute top-4 right-4 text-red-400 hover:text-red-500 transition p-1 rounded-full bg-black/50"
                        title="Delete Scheduled Post"
                      >
                        <FaTrashAlt className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
                {posts.length === 0 && !loadingState.posts && (
                  <p className="text-center text-gray-400 py-4">
                    No scheduled posts found.
                  </p>
                )}

                <h3 className="text-xl font-semibold text-gray-400 mt-8 border-b border-gray-400/30 pb-2">Drafts ({drafts.length})</h3>
                {loadingState.drafts ? (
                  <p className="text-center text-gray-400">Loading drafts...</p>
                ) : (
                  drafts.map((d, i) => (
                    <motion.div
                      key={d._id || i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-black/40 rounded-xl border border-white/10 relative" // <-- ENHANCED STYLE
                    >
                      <p className="font-medium mb-2 pr-12">{d.content}</p>
                      {d.mediaUrl && (
                        <img
                          src={getMediaSrc(d.mediaUrl)} // FIX APPLIED HERE
                          alt="Post media"
                          className="mt-2 rounded-lg w-full max-h-40 object-cover"
                        />
                      )}
                      <span className="text-xs text-gray-500 block mt-2">
                        Saved: {new Date(d.createdAt).toLocaleDateString()}
                      </span>
                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => handleDeletePost(d._id, 'draft')}
                        className="absolute top-4 right-4 text-red-400 hover:text-red-500 transition p-1 rounded-full bg-black/50"
                        title="Delete Draft"
                      >
                        <FaTrashAlt className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
                {drafts.length === 0 && !loadingState.drafts && (
                  <p className="text-center text-gray-400 py-4">No drafts found.</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* ================= Chatbot Pop-out Button ================= */}
<button
    onClick={toggleChatbot}
    className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl transition-transform duration-300 hover:scale-110 active:scale-95"
    style={{
        background: "linear-gradient(45deg, #8A2BE2, #DA70D6)", // A rich, deep purple gradient
        boxShadow: "0 8px 25px rgba(138, 43, 226, 0.4)", // Purple-toned shadow
    }}
>
    <MdOutlineSmartToy className="text-white text-3xl" />
</button>

{/* ================= Conditional Chatbot UI ================= */}

<AnimatePresence>
    {isChatbotOpen && (
        <motion.div
            key="chatbot-window"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg flex flex-col overflow-hidden border border-white/10 z-50"
        >
            <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-3 font-bold text-lg flex justify-between items-center">
                SocialSphere Co-Pilot
                <button onClick={toggleChatbot} className="text-white hover:text-gray-200">
                    &times;
                </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm bg-black/40">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`p-3 rounded-lg w-fit max-w-[80%] ${
                            msg.sender === "user"
                                ? "bg-pink-500 text-white self-end ml-auto"
                                : "bg-black/40 text-white self-start"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="p-3 border-t border-white/10 flex gap-2 bg-black/40">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                    }}
                    placeholder="Ask Co-Pilot..."
                    className="flex-1 p-2 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition"
                >
                    Send
                </button>
            </div>
        </motion.div>
    )}
</AnimatePresence>

      {/* ================= Footer ================= */}
      <footer className="py-12 bg-black/40 border-t border-white/10 text-center mt-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-gray-400">
          <div>
            <h3 className="text-pink-500 font-bold text-xl mb-4">
              SocialSphere
            </h3>
            <p>Manage all your social presence in one place.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
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
              <Link to="/connect" className="hover:text-pink-500 transition font-semibold text-pink-400">
              Connect Accounts
            </Link>
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
            <h4 className="font-semibold mb-4 text-white">Features</h4>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">
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