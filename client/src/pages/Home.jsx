import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSide from "../components/RIghtside";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div
        className={`w-[95%] sm:w-[85%] h-[90%] backdrop-blur-xl bg-white/10 border border-gray-600 shadow-2xl rounded-3xl grid ${
          selectedUser
            ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
            : "md:grid-cols-[1fr_1fr]"
        }`}
      >
        {/* Sidebar */}
        <div className="bg-white/5 h-full border-r border-gray-700 overflow-hidden">
          <Sidebar
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>

        {/* Chat */}
        <div className="bg-transparent h-full overflow-hidden">
          <ChatContainer
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>

        {/* Right side */}
        {selectedUser && (
          <div className="bg-white/5 border-l border-gray-700 hidden md:block overflow-hidden">
            <RightSide
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
