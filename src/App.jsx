import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import Contact from "./pages/Contact";
import ConnectAccounts from "./pages/ConnectAccounts"; 
import Pricing from "./pages/Pricing.jsx";
import InstaCloneFeed from "./pages/InstaCloneFeed"; 
import AIAssistance from "./pages/AIAssistance"; 
import PerformanceAnalysis from "./pages/PerformanceAnalysis"; 
import SocialMediaAudit from "./pages/SocialMediaAudit"; 
import SentimentAnalysis from "./pages/SentimentAnalysis"; 
import PostScheduler from "./pages/PostScheduler"; 
import Integrations from "./pages/Integrations"; 
import About from "./pages/About"; // <--- NEW IMPORT
import { AuthProvider } from "./context/AuthContext";
// Component Imports for Markdown Rendering
import MarkdownRenderer from "./components/MarkdownRenderer"; 
import PrivacyPolicyContent from "./pages/PrivacyPolicy.md?raw"; 
import TermsOfServiceContent from "./pages/TermsOfService.md?raw";
import UserDataDeletionContent from "./pages/UserDataDeletion.md?raw";


// FIX: Functional components now use the MarkdownRenderer
function PrivacyPolicy() {
  return <MarkdownRenderer title="Privacy Policy" content={PrivacyPolicyContent} />;
}

function TermsOfService() {
  return <MarkdownRenderer title="Terms of Service" content={TermsOfServiceContent} />;
}

function UserDataDeletion() {
  return <MarkdownRenderer title="User Data Deletion" content={UserDataDeletionContent} />;
}

// Placeholder for unbuilt feature pages
function Placeholder({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-200">
      <div className="text-2xl">{title} page coming soon…</div>
    </div>
  );
}

function Layout() {
  return (
    <>
      <Navbar />
      <div className="pt-0">
        <Outlet />
      </div>
    </>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          {/* Pages WITHOUT Navbar: Home, Feed, Register, Login */}
          <Route path="/" element={<Home />} /> 
          <Route path="/feed" element={<InstaCloneFeed />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Pages WITH Navbar (All internal/dashboard pages) */}
          <Route element={<Layout />}>
            {/* Public pages that should still show the Navbar/Global Nav */}
            
            {/* Feature Routes */}
            <Route path="/performance-analytics" element={<PerformanceAnalysis />} /> 
            <Route path="/features" element={<PerformanceAnalysis />} />

            <Route path="/social-audit" element={<SocialMediaAudit />} /> 
            <Route path="/sentiment-analysis" element={<SentimentAnalysis />} /> 
            <Route path="/post-scheduler" element={<PostScheduler />} /> 


            <Route path="/pricing" element={<Pricing />} /> 
            <Route path="/integrations" element={<Integrations />} />
            
            {/* NEW ROUTE: About Page */}
            <Route path="/about" element={<About />} /> 
            
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/ai-assistance" element={<AIAssistance />} /> 
            <Route path="/socialai" element={<AIAssistance />} /> 


            {/* New Routes for legal documents */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/user-data-deletion" element={<UserDataDeletion />} />

            {/* Protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/connect" element={<ConnectAccounts />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
