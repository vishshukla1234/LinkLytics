import React from "react";
import { motion } from "framer-motion";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";

const features = [
  {
    icon: FaLink,
    title: "Simple URL Shortening",
    desc: "Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle.",
  },
  {
    icon: FaShareAlt,
    title: "Powerful Analytics",
    desc: "Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies.",
  },
  {
    icon: FaEdit,
    title: "Enhanced Security",
    desc: "Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure.",
  },
  {
    icon: FaChartLine,
    title: "Fast and Reliable",
    desc: "Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users.",
  },
];

const AboutPage = () => {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-64px)] font-roboto">
      <div className="max-w-7xl mx-auto lg:px-14 sm:px-8 px-4 pt-16 pb-20">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-accent-orange font-bold tracking-wider text-xs uppercase mb-3 block">
            About Us
          </span>

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-black font-montserrat text-primary-navy md:text-5xl sm:text-4xl text-3xl md:leading-[60px] leading-snug tracking-tight"
          >
            About LinkLytics
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 text-base sm:text-lg my-5 leading-relaxed"
          >
            LinkLytics simplifies URL shortening, link management, and click
            tracking so you can share smarter, optimize your marketing, and
            build trust. Easily generate, manage, and track every shortened
            link from a single, streamlined dashboard.
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div className="mt-14 grid xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 lg:gap-8 gap-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 mb-4">
                <Icon className="text-accent-orange text-xl" />
              </div>
              <h2 className="text-lg font-bold font-montserrat text-primary-navy mb-2 leading-snug">
                {title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;