import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { fetchStats } from '../services/api';
import { FaUsers, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    eligibleCount: 0,
    ineligibleCount: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchStats();
      if (data) setStats(data);
    };
    loadStats();

    // Auto-refresh every 10 seconds
    const interval = setInterval(loadStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const pieData = [
    { name: "Eligible", value: stats.eligibleCount, fill: "#22c55e" },
    { name: "Not Eligible", value: stats.ineligibleCount, fill: "#ef4444" }
  ];

  const barData = [
    { name: "Total Candidates", value: stats.totalCandidates },
    { name: "Eligible", value: stats.eligibleCount },
    { name: "Not Eligible", value: stats.ineligibleCount }
  ];

  return (
    <div className="min-h-screen rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">Analytics Dashboard</h1>
        <p className="text-gray-300">Real-time recruitment insights and statistics</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[ 
          { title: "Total Candidates", value: stats.totalCandidates, icon: FaUsers, color: "blue" },
          { title: "Eligible Candidates", value: stats.eligibleCount, icon: FaUserCheck, color: "green" },
          { title: "Not Eligible", value: stats.ineligibleCount, icon: FaUserTimes, color: "red" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-yellow-400">{stat.value}</h3>
              </div>
              <stat.icon className={`text-2xl text-${stat.color}-500`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/10 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">Eligibility Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/10 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">Candidate Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
