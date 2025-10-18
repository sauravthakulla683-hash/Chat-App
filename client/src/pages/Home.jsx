import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chatcontainer from "../components/Chatcontainer";
import RIghtside from "../components/RIghtside";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUserSelect = (user) => {
    if (!selectedUser || selectedUser.id !== user.id) {
      setSelectedUser(user);
    } else {
      setSelectedUser(null);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div
        className={`w-[95%] sm:w-[85%] h-[90%] backdrop-blur-xl bg-white/10 border border-gray-600 shadow-2xl rounded-3xl overflow-hidden grid ${
          selectedUser
            ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
            : "md:grid-cols-2"
        }`}
      >
        <div className="bg-white/5 border-r border-gray-700">
          <Sidebar setSelectedUser={handleUserSelect} />
        </div>

        <div className="bg-transparent">
          <Chatcontainer selectedUser={selectedUser} />
        </div>

        <div className="bg-white/5 border-l border-gray-700 hidden md:block">
          <RIghtside />
        </div>
      </div>
    </div>
  );
};

export default Home;
