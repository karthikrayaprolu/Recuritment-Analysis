import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from 'react';

export default function About() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <div className="min-h-screen rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-16"
      >
        <h1 className="text-5xl font-extrabold tracking-wide text-gray-100 drop-shadow-lg">
          About <span className="text-yellow-400">HireViste</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          AI-powered recruitment eligibility platform that streamlines hiring
          decisions for students and recruiters.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-12 px-6 md:px-16"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "AI-Powered Predictions",
              desc: "Fast and accurate assessment of job eligibility.",
            },
            {
              title: "Data-Driven Insights",
              desc: "Evaluates candidates based on key academic and technical skills.",
            },
            {
              title: "Seamless Integration",
              desc: "Works effortlessly with existing hiring processes.",
            },
            {
              title: "User-Friendly UI",
              desc: "Intuitive interface for students and recruiters.",
            },
            {
              title: "Smart Shortlisting",
              desc: "Filters the best candidates instantly.",
            },
            {
              title: "Continuous Learning",
              desc: "Improves over time with machine learning enhancements.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-md hover:bg-opacity-20 transition duration-300"
            >
              <h3 className="text-xl font-semibold text-yellow-400">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 text-center px-6 md:px-20"
      >
        <h2 className="text-3xl font-bold text-yellow-400">Our Vision</h2>
        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
          Our goal is to revolutionize the hiring process using AI. Future
          updates will include resume analysis, mock interviews, and
          company-specific assessments.
        </p>
      </motion.div>

      {/* Technologies Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 px-6 md:px-16"
      >
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">
          Technologies Used
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {[
            { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend" },
            { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg", category: "Build Tool" },
            { name: "Tailwind CSS", icon: "https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg", category: "Styling" },
            { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", category: "Backend" },
            { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Database" },
            { name: "Pymongo", icon: "https://www.python.org/static/favicon.ico", category: "Database Connector" },
            { name: "Scikit-learn", icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg", category: "Machine Learning" },
            { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", category: "Data Processing" },
            { name: "Axios", icon: "https://axios-http.com/assets/favicon.ico", category: "API Requests" },
          ].map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg hover:bg-opacity-20 transition-all duration-300 flex flex-col items-center"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-12 h-12 object-contain mb-3 filter invert"
              />
              <h3 className="text-lg font-semibold text-yellow-400">
                {tech.name}
              </h3>
              <span className="text-sm text-gray-300">{tech.category}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 px-6 md:px-16"
      >
        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Meet the Team
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {[
            {
              name: "Lalitha",
              role: "Developer",
              img: "https://media.licdn.com/dms/image/v2/D5635AQEltCqyl_p34Q/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1725528664104?e=1740639600&v=beta&t=Sm3dX0Qb53ltruL8ExH1tenSvp0Cy0sv2TJbyUPjxJ4",
            },
            {
              name: "Karthik Rayaprolu",
              role: "Developer",
              img: "https://media.licdn.com/dms/image/v2/D5603AQEsOHXaQ3LkhQ/profile-displayphoto-shrink_400_400/B56ZPT3CWdHIAk-/0/1734426241622?e=1745452800&v=beta&t=OV3myD0VJNcQd2pdGRdX5spYK33vXquT_I9mkkoU3_w",
            },
            {
              name: "Sushma",
              role: "Developer",
              img: "https://media.licdn.com/dms/image/v2/D5635AQHnnpdsPZnSuA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1734883055536?e=1740639600&v=beta&t=MOQ7xddj0kV2mP9Z6qh4hdtiycdOswxkMdRPJwm7n6U",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="p-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full shadow-lg"
              />
              <h3 className="text-lg font-semibold text-yellow-400 mt-3 text-center">
                {member.name}
              </h3>
              <p className="text-gray-300 text-center">{member.role}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollButton ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 bg-yellow-400 text-blue-900 
                   rounded-full shadow-lg hover:bg-yellow-500 
                   transition-all duration-300 cursor-pointer
                   hover:shadow-yellow-400/30 group
                   ${showScrollButton ? 'translate-y-0' : 'translate-y-28'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaArrowUp className="text-xl group-hover:-translate-y-1 transition-transform duration-300" />
      </motion.button>

      {/* Footer */}
      <div className="mt-20 text-center pb-6">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} HireViste. All rights reserved.
        </p>
      </div>
    </div>
  );
}
