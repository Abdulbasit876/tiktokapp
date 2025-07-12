
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, Router ,useNavigate} from "react-router-dom";

const Login = () => {
    const formRef = useRef(null);
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useGSAP(() => {
        gsap.fromTo(
            formRef.current,
            { y: 100, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
        );
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
     const navigate = useNavigate();
   const RouteChange=()=>{
         navigate("/");
       console.log("Redirecting to home page");
   }
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setTimeout(() => {
            setLoading(false);
            if (!form.email || !form.password) {
                setError("Please enter both email and password.");
            } else {
               
                setError("");
                RouteChange();
            }
        }, 1200);
    };

    return (
        <div className="min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-white/80 shadow-xl rounded-2xl px-10 py-12 w-full max-w-md flex flex-col gap-6 relative"
            >
                <h2 className="text-4xl font-extrabold text-center text-gray-900  tracking-tight">
                    TikTok Login
                </h2>
                <p className="text-center text-gray-500 ">Sign in to your account</p>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg transition-all"
                    autoComplete="email"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg transition-all"
                    autoComplete="current-password"
                />
                {error && (
                    <div className="text-red-500 text-center text-sm animate-pulse">{error}</div>
                )}
                <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 text-white font-bold py-3 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="animate-spin inline-block mr-2">🔄</span>
                    ) : (
                        "Login"
                    )}
                </button>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="28" stroke="#ec4899" strokeWidth="4" fill="#fff" />
                        <text x="50%" y="55%" textAnchor="middle" fill="#ec4899" fontSize="28" fontWeight="bold" dy=".3em">🎵</text>
                    </svg>
                </div>

                <p className="text-center text-gray-500 mb-4">Don't have an account? <Link to="/register" className="text-pink-500 font-semibold">Sign up</Link></p>

            </form>

        </div>
    );
};

export default Login;
