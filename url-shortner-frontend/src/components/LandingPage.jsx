import { useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Card from './Card'
import { useStoreContext } from "../contextApi/ContextApi";
import api from '../api/api';
import toast from 'react-hot-toast';
import { FaLink, FaCopy, FaCheck } from "react-icons/fa";

const LandingPage = () => {
    const navigate = useNavigate();
    const { token } = useStoreContext();

    const [longUrl, setLongUrl] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const dashboardNavigateHandler = () => {
        navigate("/dashboard");
    };

    const handleShortenSubmit = async (e) => {
        e.preventDefault();
        if (!longUrl) return;

        if (!token) {
            toast.error("Please log in or sign up to shorten links!", {
                duration: 4000,
                position: "bottom-center"
            });
            navigate("/register", { state: { prefilledUrl: longUrl } });
            return;
        }

        setLoading(true);
        setIsCopied(false);
        try {
            const { data: res } = await api.post("/api/urls/shorten", { originalUrl: longUrl }, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            const generated = `${import.meta.env.VITE_REACT_FRONT_END_URL}/${res.shortUrl}`;
            setShortenedUrl(generated);
            toast.success("Short URL created successfully!");
        } catch (error) {
            toast.error("Failed to shorten link. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!shortenedUrl) return;
        navigator.clipboard.writeText(shortenedUrl).then(() => {
            setIsCopied(true);
            toast.success("Copied to clipboard!");
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <div className="bg-slate-50 min-h-[calc(100vh-64px)] font-roboto">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto lg:px-14 sm:px-8 px-4 pt-16 pb-20">
                <div className="lg:flex-row flex-col lg:gap-16 gap-10 flex justify-between items-center">
                    <div className="flex-1 text-left">
                        <span className="text-accent-orange font-bold tracking-wider text-xs uppercase mb-3 block">
                            LinkLytics Link Platform
                        </span>

                        <motion.h1
                            initial={{ opacity: 0, y: -40 }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className='font-black font-montserrat text-primary-navy md:text-5xl sm:text-4xl text-3xl md:leading-[60px] leading-snug tracking-tight lg:w-full md:w-[90%] w-full'
                        >
                            Build stronger connections with every link.
                        </motion.h1>

                        <p className='text-slate-600 text-base sm:text-lg my-5 leading-relaxed'>
                            LinkLytics simplifies URL shortening, link management, and click tracking so you can share smarter, optimize your marketing, and build trust.
                        </p>

                        <div className='flex flex-wrap items-center gap-4 pt-2'>
                            <motion.button
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                onClick={dashboardNavigateHandler}
                                className='btn-gradient flex-1 min-w-[140px] max-w-[200px] text-white font-semibold rounded-lg py-3 cursor-pointer text-sm shadow-md transition text-center'
                            >
                                {token ? "Go to Dashboard" : "Get Started for Free"}
                            </motion.button>

                            <motion.a
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                href="#quick-shortener"
                                className='border-primary-navy border-2 flex-1 min-w-[140px] max-w-[200px] text-primary-navy hover:bg-primary-navy hover:text-white transition rounded-lg py-3 cursor-pointer text-sm font-semibold text-center block'
                            >
                                Paste a Link
                            </motion.a>
                        </div>
                    </div>

                    <div className='flex-1 flex justify-center w-full overflow-hidden'>
                        <motion.img
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            src="/logo2.png"
                            alt="Link illustration"
                            className="w-full max-w-[95%] lg:max-w-[95%] object-contain"
                        />
                    </div>
                </div>

                {/* Inline Quick Shortener Card (Bitly style) */}
                <div id="quick-shortener" className="mt-20 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-lg"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold font-montserrat text-primary-navy mb-4">
                            Shorten a long link
                        </h2>

                        <form onSubmit={handleShortenSubmit} className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 relative flex items-center">
                                <FaLink className="absolute left-4 text-slate-400 text-lg" />
                                <input
                                    type="url"
                                    required
                                    value={longUrl}
                                    onChange={(e) => setLongUrl(e.target.value)}
                                    placeholder="Paste your long link here... (e.g. https://example.com/very-long-url)"
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-accent-orange focus:bg-white rounded-xl text-slate-800 text-sm outline-none transition"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-accent-orange hover:bg-accent-orange-hover text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition shadow-md shadow-orange-100 disabled:opacity-75 cursor-pointer"
                            >
                                {loading ? "Shortening..." : "Shorten URL"}
                            </button>
                        </form>

                        {/* Display Result if successful */}
                        {shortenedUrl && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4"
                            >
                                <div className="text-left w-full sm:w-auto">
                                    <span className="text-xs font-semibold text-accent-orange uppercase block mb-1">Your Shortened Link:</span>
                                    <a
                                        href={shortenedUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-base font-bold text-primary-navy hover:underline break-all"
                                    >
                                        {shortenedUrl}
                                    </a>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto justify-end">
                                    <button
                                        onClick={copyToClipboard}
                                        className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-slate-50 transition cursor-pointer"
                                    >
                                        {isCopied ? <FaCheck className="text-green-600" /> : <FaCopy className="text-slate-500" />}
                                        {isCopied ? "Copied!" : "Copy"}
                                    </button>
                                    <button
                                        onClick={dashboardNavigateHandler}
                                        className="bg-primary-navy hover:bg-primary-navy-dark text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition cursor-pointer"
                                    >
                                        Manage
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Why Choose Section */}
            <div className='bg-slate-100/50 border-t border-slate-200/50 py-20'>
                <div className="max-w-7xl mx-auto lg:px-14 sm:px-8 px-4">
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-primary-navy font-montserrat font-black text-3xl text-center mb-12"
                    >
                        Trusted link platform for individuals.
                    </motion.p>

                    <div className="grid lg:gap-8 gap-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                        <Card
                            title="Simple URL Shortening"
                            desc="Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface ensures you can start shortening URLs without any hassle."
                        />
                        <Card
                            title="Powerful Analytics"
                            desc="Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, referral sources, and timeline data to optimize your reach."
                        />
                        <Card
                            title="Enhanced Security"
                            desc="Rest assured with our robust security measures. All shortened URLs are protected and served reliably, ensuring your destination links remain safe."
                        />
                        <Card
                            title="Fast and Reliable"
                            desc="Enjoy lightning-fast redirects and high uptime. Your shortened URLs will always be available and responsive, ensuring a seamless experience for visitors."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage