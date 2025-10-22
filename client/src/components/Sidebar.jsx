import React, { useState } from "react";
import assets, { userDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menu = () => setOpen(!open);

  return (
    <div
      className={`bg-gradient-to-b from-gray-900/80 to-gray-800/70 text-white h-full p-5 rounded-r-2xl shadow-lg overflow-y-auto transition-all ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* Header */}
      <div className="pb-5">
        <div className="flex items-center relative">
          <img src="/logo.png" alt="logo" className="w-10 h-10 rounded-md" />
          <h1 className="ml-2 text-lg font-semibold tracking-wide">Chat App</h1>

          {/* Menu */}
          <div className="ml-auto relative">
            <img
              onClick={menu}
              src={assets.menu_icon}
              alt="Menu"
              className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
            />
            <div
              className={`absolute top-full right-0 z-20 w-36 p-3 mt-2 rounded-md bg-gray-900/95 border border-gray-700 text-gray-100 shadow-lg transition-transform ${
                !open ? "hidden" : "block"
              }`}
            >
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm py-1 px-2 rounded hover:bg-emerald-600/30 transition-colors"
              >
                Edit Profile
              </p>
              <hr className="my-1 border-gray-600" />
              <p className="cursor-pointer text-sm py-1 px-2 rounded hover:bg-red-500/30 transition-colors">
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-gray-800 rounded-full flex items-center gap-2 py-2 px-4 mt-5 shadow-inner">
          <img src={assets.search_icon} alt="Search" className="w-4 h-4" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-sm placeholder-gray-400 flex-1"
            placeholder="Search friends"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex flex-col mt-3 space-y-2">
        {userDummyData.map((user, index) => (
          <div
            key={index}
            onClick={() => setSelectedUser(user)}
            className={`relative flex items-center gap-3 p-2 pl-4 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors ${
              selectedUser?._id === user._id ? "bg-gray-700/50" : ""
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt="User"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
            />
            <div className="flex flex-col leading-5">
              <p className="font-medium">{user.fullName}</p>
              <span
                className={`text-xs ${
                  index < 3 ? "text-green-400" : "text-gray-400"
                }`}
              >
                {index < 3 ? "online" : "offline"}
              </span>
            </div>

            {/* Notification Badge */}
            {index > 2 && (
              <span className="absolute top-3 right-3 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/60 shadow-md">
                {index}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
