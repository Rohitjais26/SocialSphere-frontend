import { useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Register user
      await API.post("/auth/register", form);

      // Auto-login after register
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-gray-200 px-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
          Register
        </h2>

        <input
          placeholder="Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none transition"
        />

        <input
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none transition"
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 outline-none transition"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
        >
          Register
        </motion.button>
        
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 hover:underline">
            Login Here
          </Link>
        </p>
      </motion.form>
    </div>
  );
}