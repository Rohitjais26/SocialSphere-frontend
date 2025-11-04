import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/socialSphere-org.png";
import React, { useEffect, useRef } from "react";
import API from "../services/api";

// The time in milliseconds to check for new published posts (e.g., 5 seconds)
const POLLING_INTERVAL = 5000; 

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthed, logout } = useAuth();
  const lastPostCountRef = useRef(null); // Initialize to null to distinguish from 0 posts
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // =======================================================
  // GLOBAL POLLING LOGIC FOR REDIRECTION
  // =======================================================
  useEffect(() => {
    if (!isAuthed) {
        lastPostCountRef.current = null; // Reset when logged out
        return; 
    } 

    const checkPublishedFeed = async () => {
        try {
            // FIX: Polling the new endpoint that returns all active posts (published/evergreen-scheduled)
            const response = await API.get("/posts/published"); 
            const posts = response.data;
            
            // Filter for posts that are currently marked as published to InstaClone.
            const publishedInstaClonePosts = posts.filter(
                p => p.platforms.includes('instaclone') && 
                (p.status === 'published' || p.isEvergreen === true) // <-- FIX IS HERE
            ); 
            
            const currentPublishedCount = publishedInstaClonePosts.length;
            
            if (lastPostCountRef.current === null) {
                // Initial load: Set the starting count and do nothing else.
                lastPostCountRef.current = currentPublishedCount;
            } else if (currentPublishedCount > lastPostCountRef.current) {
                // REDIRECTION TRIGGER: A new post was just published!
                lastPostCountRef.current = currentPublishedCount; 
                
                // Navigate instantly to the beautiful feed page
                // This redirection happens immediately after the backend publishes the post at the scheduled time.
                navigate('/feed', { replace: true });
            }

        } catch (err) {
            // Log errors but don't stop the app
            console.error("Polling error:", err.message);
        }
    };

    // Set up the polling interval
    const intervalId = setInterval(checkPublishedFeed, POLLING_INTERVAL);

    // Cleanup function
    return () => {
        clearInterval(intervalId);
    };
  }, [isAuthed, navigate]);
  // =======================================================

  return (
    <nav className="fixed top-0 w-full bg-white/5 backdrop-blur-lg border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-1">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="SocialSphere Logo" className="h-14 w-auto hover:opacity-90 transition" />
        </Link>

        <div className="flex gap-4">
          {isAuthed ? (
            <>
              <Link
                to="/dashboard"
                className="px-5 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-full hover:opacity-90 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-white/5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 bg-white/5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-full hover:opacity-90 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}