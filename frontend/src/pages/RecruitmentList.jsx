import { useEffect, useState } from "react";
import { fetchPredictions, deleteAllPredictions } from "../services/api";
import { FaSearch, FaDownload, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function RecruitmentList() {
  const [predictions, setPredictions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getPredictions = async () => {
      const data = await fetchPredictions();
      setPredictions(data);
      setFilteredData(data);
    };
    getPredictions();
  }, []);

  const filterData = (status) => {
    if (status === "reset") {
      setFilteredData(predictions);
    } else {
      setFilteredData(predictions.filter((pred) => pred.Eligibility === status));
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredData(
      predictions.filter((pred) =>
        Object.values(pred).some((val) =>
          val.toString().toLowerCase().includes(query)
        )
      )
    );
  };

  const downloadData = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RecruitmentData");
    XLSX.writeFile(wb, "recruitment_data.xlsx");
  };

  const clearPredictions = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete all predictions permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete all!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteAllPredictions();
        setPredictions([]);
        setFilteredData([]);

        Swal.fire({
          title: "Deleted!",
          text: "All predictions have been removed.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  };

  return (
    <motion.div
      className="p-6 rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Recruitment List</h2>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            className="p-3 pl-10 border border-gray-400 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <FaSearch className="absolute left-3 top-4 text-gray-500" />
        </div>
      </div>

      {/* Filter & Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
  {/* Filter Buttons Group */}
  <div className="flex flex-wrap gap-3">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => filterData("Eligible")}
      className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 
                 text-white rounded-xl shadow-lg hover:shadow-green-500/30
                 font-medium flex items-center gap-2 transition-all duration-300"
    >
      <div className="h-2 w-2 rounded-full bg-green-300 animate-pulse" />
      Eligible
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => filterData("Not Eligible")}
      className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 
                 text-white rounded-xl shadow-lg hover:shadow-red-500/30
                 font-medium flex items-center gap-2 transition-all duration-300"
    >
      <div className="h-2 w-2 rounded-full bg-red-300 animate-pulse" />
      Not Eligible
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => filterData("reset")}
      className="px-6 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 
                 text-white rounded-xl shadow-lg hover:shadow-gray-500/30
                 font-medium flex items-center gap-2 transition-all duration-300"
    >
      Reset Filters
    </motion.button>
  </div>

  {/* Action Buttons Group */}
  <div className="flex flex-wrap gap-4">
  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={downloadData}
    className="group px-6 py-3 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600
               text-blue-900 rounded-xl shadow-lg hover:shadow-yellow-400/30
               font-semibold flex items-center gap-3 transition-all duration-300
               border-2 border-yellow-400/20 hover:border-yellow-400/40"
  >
    <FaDownload className="text-lg transform group-hover:-translate-y-1 transition-transform duration-300" />
    <span className="relative">
      Export to Excel
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 group-hover:w-full transition-all duration-300"/>
    </span>
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={clearPredictions}
    className="group px-6 py-3 bg-gradient-to-br from-red-500 via-red-600 to-red-700
               text-white rounded-xl shadow-lg hover:shadow-red-500/30
               font-semibold flex items-center gap-3 transition-all duration-300
               border-2 border-red-500/20 hover:border-red-500/40"
  >
    <span className="relative">
      <FaTrash className="text-lg transform group-hover:rotate-12 transition-transform duration-300" />
    </span>
    <span className="relative">
      Clear All
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"/>
    </span>
  </motion.button>
</div>
</div>


      {/* Table */}
      <div className="overflow-x-auto shadow-2xl rounded-2xl bg-white/10 backdrop-blur-md">
  <table className="w-full border-collapse bg-transparent">
    <thead>
      <tr className="bg-blue-900/50">
        {[
          "S.No", "Name", "Roll Number", "Branch", "Email", "Phone", "CGPA", 
          "Backlogs", "DS & Algo", "System Design", "Internship", "Coding Test Score", 
          "Communication", "Aptitude Test Score",
          "LeetCode Solved", "Eligibility"
        ].map((header, index) => (
          <th key={index} className="px-4 py-3 text-left text-yellow-400 font-bold border-b border-blue-800">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {filteredData.length > 0 ? (
        filteredData.map((pred, index) => (
          <motion.tr 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="hover:bg-white/5 transition-colors duration-200"
          >
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {index + 1}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300 font-medium">
              {pred.Name}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {pred.Roll_Number}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {pred.Branch}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {pred.Email}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {pred.Phone_Number}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {pred.CGPA}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {pred.Active_Backlogs}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {pred.DS_Algo_Proficiency}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {pred.System_Design_Proficiency}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {pred.Internship_Duration}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {pred.Coding_Test_Score}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {pred.Communication_Grade}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {pred.Adaptability_Score}
            </td>
            <td className="px-4 py-3 border-b border-blue-800/30 text-gray-300">
              {pred.LeetCode_Solved}
            </td>
            <td className={`px-4 py-3 border-b border-blue-800/30 font-bold
              ${pred.Eligibility === "Eligible" 
                ? "text-green-400" 
                : "text-red-400"}`}>
              <span className={`px-3 py-1 rounded-full text-sm
                ${pred.Eligibility === "Eligible"
                  ? "bg-green-500/20"
                  : "bg-red-500/20"}`}>
                {pred.Eligibility}
              </span>
            </td>
          </motion.tr>
        ))
      ) : (
        <tr>
          <td colSpan="18" className="px-4 py-8 text-center text-gray-400">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <span className="text-lg">No data available</span>
            </motion.div>
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
    </motion.div>
  );
}
