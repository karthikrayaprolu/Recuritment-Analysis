import { useState, useRef, useEffect } from "react";
import { submitPrediction } from "../services/api";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  const [formData, setFormData] = useState({
    Name: "",
    Roll_Number: "",
    Branch: "",
    Email: "",
    Phone_Number: "",
    CGPA: "",
    Active_Backlogs: "",
    DS_Algo_Proficiency: "",
    System_Design_Proficiency: "",
    Internship_Duration: "",
    Coding_Test_Score: "",
    Communication_Grade: "",
    Adaptability_Score: "",
    LeetCode_Solved: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const eligibilityRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await submitPrediction(formData);
      setResult(response?.Eligibility || "Error: Invalid response");
    } catch (error) {
      setResult("Error: Failed to connect to server");
    }
    setLoading(false);
  };

  return (
    <motion.div
      className="min-h-screen rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-6 md:p-8 lg:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Enhanced Header Section */}
      <motion.div 
        className="text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
          HireVista Eligibility Check
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Evaluate your recruitment potential with our AI-powered assessment system
        </p>
      </motion.div>

      {/* Enhanced Banner */}
      <motion.div
        className="w-full max-w-6xl mx-auto mb-12 cursor-pointer hover:transform hover:scale-[1.02] transition-transform duration-300"
        onClick={() => eligibilityRef.current?.scrollIntoView({ behavior: "smooth" })}
        whileHover={{ y: -5 }}
      >
        <img 
          src="/banner.png" 
          alt="Banner" 
          className="w-full h-[300px] md:h-[400px] rounded-2xl shadow-2xl border-4 border-yellow-400 object-cover" 
        />
      </motion.div>

      {/* Enhanced Eligibility Form Section */}
      <motion.div
        ref={eligibilityRef}
        className="bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-2xl border-2 border-yellow-400/50 w-full max-w-4xl mx-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-yellow-400 drop-shadow-lg">
          Check Your Eligibility
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Improved Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {Object.keys(formData).map((key) => (
              <motion.div 
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: Object.keys(formData).indexOf(key) * 0.05 }}
              >
                <label className="text-gray-200 font-medium block mb-2 text-sm uppercase tracking-wide">
                  {key.replace(/_/g, " ")}
                </label>
                <input
                  type={key.includes('Phone') ? 'tel' : key.includes('Age') ? 'number' : 'text'}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800/50 text-white 
                           focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none
                           transition-all duration-300 placeholder-gray-500"
                  placeholder={`Enter your ${key.replace(/_/g, " ").toLowerCase()}`}
                  required
                />
              </motion.div>
            ))}
          </div>

          {/* Enhanced Submit Button */}
          <motion.div 
            className="flex justify-center mt-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="submit"
              className={`w-full max-w-md bg-yellow-400 text-blue-900 py-4 rounded-lg 
                        shadow-lg font-bold text-lg tracking-wide
                        transition-all duration-300 transform
                        ${loading ? 'opacity-75 cursor-wait' : 'hover:bg-yellow-500 hover:shadow-xl'}`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Processing...
                </div>
              ) : 'Check Eligibility'}
            </button>
          </motion.div>
        </form>

        {/* Enhanced Result Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mt-8 p-6 text-center rounded-xl shadow-lg text-xl font-bold
                      ${result === "Eligible" 
                        ? "bg-green-500/20 text-green-400 border-2 border-green-500/50" 
                        : "bg-red-500/20 text-red-400 border-2 border-red-500/50"}`}
          >
            <span className="block text-2xl mb-2">Status: {result}</span>
            <span className="text-sm font-normal text-gray-300">
              {result === "Eligible" 
                ? "Congratulations! You meet the eligibility criteria." 
                : "Keep improving your skills and try again later."}
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollButton ? 1 : 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-yellow-400 text-blue-900 p-4 rounded-full 
                 shadow-lg hover:bg-yellow-500 transition-all duration-300 
                 hover:shadow-2xl transform hover:scale-110"
      >
        <FaArrowUp size={24} />
      </motion.button>
    </motion.div>
  );
}
