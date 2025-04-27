import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RecruitmentList from "./pages/RecruitmentList";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recruitment-list" element={<RecruitmentList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
