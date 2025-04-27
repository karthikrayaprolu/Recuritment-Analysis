import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaList, FaInfoCircle,FaChartBar } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/recruitment-list", label: "Recruitment List", icon: FaList },
    { path: "/dashboard", label: "Dashboard", icon: FaChartBar },
    { path: "/about", label: "About", icon: FaInfoCircle },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 
                 text-white fixed h-full shadow-2xl flex flex-col p-6 
                 border-r border-white/10 backdrop-blur-lg"
    >
      {/* Logo Section */}
      <Link to="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
            <span className="text-blue-900 font-bold text-xl">H</span>
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text 
                         bg-gradient-to-r from-yellow-400 to-yellow-200">
            HireVista
          </h1>
        </motion.div>
      </Link>

      {/* Navigation Links */}
      <nav className="space-y-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link to={item.path} key={item.path}>
              <motion.div
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                           ${isActive 
                             ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' 
                             : 'hover:bg-white/10'
                           }`}
              >
                <item.icon className={`text-xl ${isActive ? 'text-yellow-400' : 'text-gray-400'}`} />
                <span className={`font-medium ${isActive ? 'text-yellow-400' : 'text-gray-300'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute right-0 w-1 h-8 bg-yellow-400 rounded-l-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-400 text-center"
        >
          <p>HireVista v1.0</p>
          <p className="mt-1">© {new Date().getFullYear()}</p>
        </motion.div>
      </div>
    </motion.aside>
  );
}