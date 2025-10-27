import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({ selectedUser, setSelectedUser, users }) => {
  const navigate = useNavigate();
  const { authuser, logout } = useContext(AuthContext);
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
          <img
            src={authuser?.profilePic || "/default-avatar.png"}
            alt="logo"
            className="w-10 h-10 rounded-md"
          />
          <h1 className="ml-2 text-lg font-semibold tracking-wide">Chat App</h1>

          {/* Menu */}
          <div className="ml-auto relative">
            <button
              onClick={menu}
              className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
            >
              ☰
            </button>
            {open && (
              <div className="absolute top-full right-0 z-20 w-36 p-3 mt-2 rounded-md bg-gray-900/95 border border-gray-700 shadow-lg">
                <p
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer text-sm py-1 px-2 rounded hover:bg-emerald-600/30 transition-colors"
                >
                  Edit Profile
                </p>
                <hr className="my-1 border-gray-600" />
                <p
                  onClick={logout}
                  className="cursor-pointer text-sm py-1 px-2 rounded hover:bg-red-500/30 transition-colors"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-gray-800 rounded-full flex items-center gap-2 py-2 px-4 mt-5 shadow-inner">
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-sm placeholder-gray-400 flex-1"
            placeholder="Search friends"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex flex-col mt-3 space-y-2">
        {users?.map((user) => (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`relative flex items-center gap-3 p-2 pl-4 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors ${
              selectedUser?._id === user._id ? "bg-gray-700/50" : ""
            }`}
          >
            <img
              src={user?.profilePic || "/default-avatar.png"}
              alt={user.fullName}
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
            />
            <div className="flex flex-col leading-5">
              <p className="font-medium">{user.fullName}</p>
              <span
                className={`text-xs ${
                  user.isOnline ? "text-green-400" : "text-gray-400"
                }`}
              >
                {user.isOnline ? "online" : "offline"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
