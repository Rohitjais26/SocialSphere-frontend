import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api"; 

import {
  FaInstagram,
  FaUserCircle,
  FaEllipsisH,
  FaRegHeart, // Changed to outline heart for realistic "like" button
  FaComment,
  FaRegBookmark, // Added bookmark icon
  FaShare,
  FaSpinner,
  FaHome,
  FaSearch,
  FaCompass,
  FaVideo,
  FaEnvelope,
  FaBell,
  FaPlusSquare,
  FaUser,
} from "react-icons/fa";

// Constants
const BASE_URL = "http://localhost:4000";

// NEW: Use dynamic data for the current user (if available)
const MOCK_AVATAR = "https://placehold.co/40x40/c13584/ffffff?text=U"; 
const MOCK_SUGGESTIONS = [
    { name: "creative_mind_daily", isFollowing: true },
    { name: "socialsphere_official", isFollowing: false },
    { name: "product_design_tips", isFollowing: false },
    { name: "biz_insights_2025", isFollowing: true },
    { name: "travel_guru_x", isFollowing: false },
];


// =======================================================
// INSTAGRAM-STYLE POST CARD COMPONENT
// =======================================================
const InstaPostCard = ({ post, index, currentUsername }) => {
    // Generate mock likes/comments consistently for a single post based on its ID
    const postIdSeed = post._id.slice(-5);
    const likes = (parseInt(postIdSeed, 16) % 500) + 100;
    const comments = (parseInt(postIdSeed, 16) % 15) + 5;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="w-full bg-white border border-gray-300 rounded-lg shadow-sm mb-6 text-gray-800"
        >
            {/* Header */}
            <div className="flex items-center p-3">
                <div className="w-8 h-8 rounded-full bg-pink-600 border-2 border-pink-300 mr-3">
                    {/* Placeholder for a dynamic user avatar */}
                    <FaUser className="w-full h-full p-1 text-white opacity-80" />
                </div>
                <span className="font-semibold text-sm">{currentUsername || "Socialsphere_User"}</span>
                <FaEllipsisH className="w-5 h-5 text-gray-500 ml-auto cursor-pointer hover:text-gray-800" />
            </div>

            {/* Media Display */}
            {post.mediaUrl ? (
                <div className="w-full bg-gray-100 aspect-square flex items-center justify-center">
                    <img
                        src={`${BASE_URL}/${post.mediaUrl}`}
                        alt="Published Post Media"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/f0f0f0/808080?text=Media+Error'; }}
                    />
                </div>
            ) : (
                <div className="w-full bg-pink-50 aspect-square flex items-center justify-center">
                    <p className="text-md font-bold text-pink-600 p-4 text-center">
                        Post Scheduled Successfully (No Media)
                    </p>
                </div>
            )}

            {/* Actions and Metrics */}
            <div className="p-3">
                <div className="flex justify-between items-center text-gray-800 mb-2">
                    <div className="flex space-x-4">
                        {/* Realistic Instagram action icons */}
                        <FaRegHeart className="w-6 h-6 cursor-pointer hover:text-red-500 transition" title="Like" />
                        <FaComment className="w-6 h-6 cursor-pointer hover:scale-105 transition" title="Comment" />
                        <FaShare className="w-6 h-6 cursor-pointer hover:scale-105 transition" title="Share" />
                    </div>
                    <FaRegBookmark className="w-6 h-6 cursor-pointer hover:scale-105 transition" title="Save" />
                </div>
                
                <p className="text-sm font-bold text-gray-700 mb-2">
                    {likes.toLocaleString()} likes
                </p>

                {/* Caption/Content */}
                <p className="text-sm text-gray-800">
                    <span className="font-semibold mr-1">{currentUsername || "Socialsphere_User"}</span>
                    {post.content}
                </p>
                <p className="text-xs text-gray-500 mt-2 cursor-pointer hover:underline">
                    View all {comments} comments
                </p>
                <p className="text-xs text-gray-500 mt-2">
                    {new Date(post.scheduledAt).toLocaleDateString()}
                </p>
            </div>
        </motion.div>
    );
};


// =======================================================
// MAIN FEED COMPONENT
// =======================================================
export default function InstaCloneFeed() {
    const [publishedPosts, setPublishedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    // NEW STATE: To hold the current user's connected InstaClone details
    const [userInstaData, setUserInstaData] = useState({ username: "SocialSphere_App", userId: null });


    useEffect(() => {
        const fetchPublishedPosts = async () => {
            try {
                // Fetch ALL posts/data, including the user's connection status (via Dashboard/Analytics)
                const [dashboardRes, postsRes] = await Promise.all([
                    API.get("/dashboard"),
                    API.get("/posts/published")
                ]);
                
                // Extract InstaClone username from user data
                const userData = dashboardRes.data.user;
                const connectedUsername = userData.socialAccounts?.instaclone?.username;
                if (connectedUsername) {
                    setUserInstaData({ username: connectedUsername, userId: userData.socialAccounts.instaclone.userId });
                }

                // Filter and sort published posts (now correctly includes evergreen posts via the new logic)
                const published = postsRes.data.filter(
                    p => p.platforms.includes('instaclone') && (p.status === 'published' || p.isEvergreen === true)
                ).sort((a, b) => new Date(b.scheduledAt) - new Date(a.scheduledAt)); 

                setPublishedPosts(published);
            } catch (err) {
                console.error("Error fetching published feed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPublishedPosts();
        
        // Polling to refresh the feed every 30 seconds
        const intervalId = setInterval(fetchPublishedPosts, 30000); 

        return () => clearInterval(intervalId);
    }, []);


    return (
        // Changed background to white/gray for more realistic Instagram look
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            
            {/* ================= 1. LEFT NAVIGATION BAR (Desktop Only) ================= */}
            <div className="fixed top-0 left-0 h-full w-20 md:w-60 bg-white border-r border-gray-200 p-4 hidden md:flex flex-col z-20">
                <div className="mb-10 p-2">
                    {/* NEW: Reverted to H1 and applied custom font styling */}
                    <h1 
                        className="text-4xl text-gray-800 hidden md:block"
                        style={{ 
                            // Use a script/cursive font stack to mimic the style
                            fontFamily: "'Brush Script MT', 'Lucida Handwriting', 'cursive'" 
                        }}
                    >
                        Instagram
                    </h1>
                    
                    {/* Original icon for collapsed view */}
                    <FaInstagram className="text-3xl text-gray-800 md:hidden" />
                </div>
                
                <nav className="flex flex-col space-y-4 text-lg">
                    {/* Renamed internal link for better user context */}
                    <Link to="/feed" className="flex items-center p-2 font-bold text-gray-800 rounded-lg bg-gray-100">
                        <FaHome className="w-6 h-6 mr-3" /> <span className="hidden md:block">Home</span>
                    </Link>
                    <div className="flex items-center p-2 text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <FaSearch className="w-6 h-6 mr-3" /> <span className="hidden md:block">Search</span>
                    </div>
                    <div className="flex items-center p-2 text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <FaCompass className="w-6 h-6 mr-3" /> <span className="hidden md:block">Explore</span>
                    </div>
                    <div className="flex items-center p-2 text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <FaVideo className="w-6 h-6 mr-3" /> <span className="hidden md:block">Reels</span>
                    </div>
                    <div className="flex items-center p-2 text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <FaEnvelope className="w-6 h-6 mr-3" /> <span className="hidden md:block">Messages</span>
                    </div>
                    <div className="flex items-center p-2 text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <FaBell className="w-6 h-6 mr-3" /> <span className="hidden md:block">Notifications</span>
                    </div>
                    {/* Link back to your scheduler dashboard */}
                    <Link to="/dashboard" className="flex items-center p-2 text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <FaPlusSquare className="w-6 h-6 mr-3" /> <span className="hidden md:block">Create Post</span>
                    </Link>
                    <div className="flex items-center p-2 text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <FaUser className="w-6 h-6 mr-3" /> <span className="hidden md:block">Profile</span>
                    </div>
                </nav>

                <div className="mt-auto">
                    <div className="flex items-center p-2 text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg">
                        <FaEllipsisH className="w-6 h-6 mr-3" /> <span className="hidden md:block">More</span>
                    </div>
                </div>
            </div>

            {/* ================= 2. MAIN CONTENT FEED (Center Column) ================= */}
            {/* Adjusted padding/margins for better centering */}
            <main className="flex-1 md:ml-60 pt-4 md:pt-10 pb-10">
                <div className="max-w-xl mx-auto px-4">
                    
                    {/* Top Stories (Mock UI Element) - Enhanced styling */}
                    <div className="flex space-x-4 overflow-x-auto p-4 border-b border-gray-200 mb-6 bg-white rounded-lg shadow-sm">
                        {MOCK_SUGGESTIONS.map((s, i) => (
                            <div key={i} className="text-center flex-shrink-0 w-16 cursor-pointer">
                                {/* Story Ring Effect */}
                                <div className="w-14 h-14 bg-white rounded-full p-0.5 mx-auto border-2 border-pink-500 overflow-hidden">
                                    <FaUserCircle className="w-full h-full text-gray-400" />
                                </div>
                                <p className="text-xs mt-1 truncate">{s.name}</p>
                            </div>
                        ))}
                    </div>

                    {/* Published Posts */}
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <FaSpinner className="animate-spin text-pink-500 text-3xl" />
                        </div>
                    ) : publishedPosts.length > 0 ? (
                        <div className="space-y-6">
                            {publishedPosts.map((post, index) => (
                                <InstaPostCard 
                                    key={post._id} 
                                    post={post} 
                                    index={index} 
                                    currentUsername={userInstaData.username}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-white">
                            <p className="text-lg text-gray-500">
                                No posts found. Schedule a post from the 
                                <Link to="/dashboard" className="text-pink-600 hover:underline ml-1">Dashboard</Link>
                                to see it appear here!
                            </p>
                        </div>
                    )}
                </div>
            </main>
            
            {/* ================= 3. RIGHT SUGGESTIONS BAR (Desktop Only) ================= */}
            <aside className="hidden lg:block w-72 pt-10 sticky top-0 h-screen pr-4">
                <div className="p-4">
                    {/* Current User */}
                    <div className="flex items-center mb-6">
                        <img src={MOCK_AVATAR} alt="Avatar" className="w-12 h-12 rounded-full mr-3 border border-gray-300" />
                        <div>
                            <p className="font-semibold text-sm">{userInstaData.username}</p>
                            <p className="text-xs text-gray-500">Managed by SocialSphere</p>
                        </div>
                        <button className="text-xs text-pink-600 font-semibold ml-auto hover:text-pink-800">Switch</button>
                    </div>

                    {/* Suggestions Section */}
                    <div className="mb-4 flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-500">Suggested for you</p>
                        <button className="text-xs font-semibold text-gray-800 hover:text-gray-500">See All</button>
                    </div>

                    {/* Suggested List */}
                    <div className="space-y-3">
                        {MOCK_SUGGESTIONS.map((s, i) => (
                            <div key={i} className="flex items-center">
                                <FaUserCircle className="w-8 h-8 text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm font-semibold">{s.name}</p>
                                    <p className="text-xs text-gray-500">{s.isFollowing ? "Followed by you" : "New to Instagram"}</p>
                                </div>
                                <button className="text-xs text-pink-600 font-semibold ml-auto hover:text-pink-800">
                                    {s.isFollowing ? "Following" : "Follow"}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Footer Links */}
                    <div className="mt-8 text-xs text-gray-400 space-y-1">
                        <p>About · Help · Press · API · Jobs · Privacy · Terms</p>
                        <p>Locations · Language · Meta Verified</p>
                        <p className="mt-4">© {new Date().getFullYear()} INSTAGRAM from Meta</p>
                    </div>
                </div>
            </aside>
            
            {/* Mobile Footer Navigation (Hidden on Desktop) */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 flex justify-around md:hidden z-20">
                <Link to="/feed" className="text-xl text-gray-800"><FaHome /></Link>
                <div className="text-xl text-gray-800"><FaSearch /></div>
                <div className="text-xl text-gray-800"><FaPlusSquare /></div>
                <div className="text-xl text-gray-800"><FaRegHeart /></div>
                <div className="text-xl text-gray-800"><FaUser /></div>
            </div>

        </div>
    );
}