import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

// This is a simple Toast component for temporary feedback
const CustomToast = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-yellow-500';
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      className={`fixed top-4 right-4 p-4 rounded-lg text-white shadow-xl flex items-center space-x-4 z-[100] ${bgColor}`}
    >
      <span>{message}</span>
      <button onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </motion.div>
  );
};


export default function ConnectAccounts() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type) => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // NEW INSTACLONE LOGIC: Calls the protected backend route to instantly connect
  const handleConnectInstaClone = async () => {
    showToast("Connecting InstaClone account...", "info");
    try {
        // Step 1: Call the protected backend route to instantly generate and save the mock token
        await API.get('/social/instaclone/auth');
        
        // Step 2: Skip the unstable double-redirect and navigate directly to dashboard
        showToast("InstaClone connected successfully!", "success");
        navigate('/dashboard'); 

    } catch (error) {
        // If the API call fails (e.g., backend is down, token unauthorized)
        console.error("Error initiating InstaClone mock OAuth:", error);
        showToast("Failed to connect InstaClone. Please ensure your backend is running.", "error");
    }
  };
  
  // Existing placeholder for Facebook login
  const handleConnectFacebook = () => {
   /* if (!window.FB) {
        showToast("Facebook SDK not loaded. Please try again.", "error");
        return;
    }
    
    // Check the user's login status first
    window.FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        // User is logged in and has authorized the app
        sendFacebookTokenToBackend(response.authResponse.accessToken);
      } else {
        // User is not authorized, open the login pop-up
        window.FB.login(function(loginResponse) {
          if (loginResponse.authResponse) {
            // User successfully authorized the app
            sendFacebookTokenToBackend(loginResponse.authResponse.accessToken);
          } else {
            showToast("Facebook login failed. User cancelled the process.", "error");
          }
        }, { scope: 'email,public_profile,pages_show_list,pages_read_engagement,pages_manage_posts' });
      }
    });
  };*/

  // REPLACEMENT MOCK LOGIC: Just show a toast and navigate immediately
    showToast("Placeholder: Attempting connection...", "info");
    setTimeout(() => {
        navigate('/dashboard');
    }, 500); 
  };

  // FIX: Removed complex useEffect logic, as direct navigation handles the flow now.
  // We only keep the original error handling for callback links.
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const status = urlParams.get('status');

    if (code) {
      // This path is for the *old* (and failing) Instagram OAuth flow.
      showToast("Authorization code received. Processing connection...", "info");
      
      API.get(`/social/instagram/callback?code=${code}`)
        .then(response => {
          console.log("Instagram connected successfully:", response.data);
          showToast("Instagram connected via OAuth!", "success");
          navigate('/dashboard');
        })
        .catch(error => {
          console.error("Failed to connect Instagram via OAuth:", error);
          showToast("Connection via OAuth failed. Please use InstaClone button.", "error");
          navigate('/connect');
        });
    } else if (status === 'error') {
        showToast(`Connection failed. Please try again.`, "error");
        navigate('/connect', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#120412] to-[#240a24] text-white relative flex items-center justify-center py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl border border-white/10 text-center max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Connect Your Social Media Accounts
        </h2>
        <p className="text-gray-400 mb-8">
          Connect at least one social media account to view your analytics and begin scheduling posts.
        </p>
        <div className="flex justify-center gap-6 text-4xl text-gray-500 mb-6">
          <motion.div
            whileHover={{ scale: 1.5, color: "#ec4899" }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={handleConnectInstaClone}
            className="cursor-pointer"
          >
            {/* InstaClone (replaces Instagram) */}
            <FaInstagram className="h-10 w-10"/> 
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.5, color: "#4267B2" }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={handleConnectFacebook}
            className="cursor-pointer"
          >
            {/* Facebook SVG */}
            <FaFacebook className="h-10 w-10"/>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.5, color: "#1DA1F2" }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => handleConnectAccount("twitter")}
            className="cursor-pointer"
          >
            {/* Twitter SVG */}
            <FaTwitter className="h-10 w-10"/>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.5, color: "#0077B5" }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => handleConnectAccount("linkedin")}
            className="cursor-pointer"
          >
            {/* LinkedIn SVG */}
            <FaLinkedin className="h-10 w-10"/>
          </motion.div>
        </div>
        
        <Link
            to="/dashboard"
            className="mt-8 inline-block px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition"
        >
            Go to Dashboard
        </Link>
      </motion.div>
      <AnimatePresence>
        {toastMessage && (
          <CustomToast 
            message={toastMessage.message} 
            type={toastMessage.type} 
            onClose={() => setToastMessage(null)} 
          />
        )}
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
}
