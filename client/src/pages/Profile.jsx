import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const Profile = ({ selectedUser, setSelectedUser }) => {
  const [name, setname] = useState("Saurabh");
  const [bio, setbio] = useState("Hello");
  const [pic, setpic] = useState(null);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center">
      <div className="absolute top-6 left-8 flex items-center gap-2">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-10 w-10 rounded-md shadow-md"
        />
        <h1 className="text-xl font-semibold text-emerald-600 tracking-wide">
          Aeigos
        </h1>
      </div>

      {!selectedUser ? (
        <div className="w-[420px] bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-emerald-100 p-8 flex flex-col items-center transition-transform duration-300 hover:scale-[1.01]">
          <h2 className="text-2xl font-bold text-emerald-600 mb-4">
            Edit Your Profile
          </h2>

          <form
            onSubmit={handlesubmit}
            className="flex flex-col items-center gap-4 w-full"
          >
            <label className="cursor-pointer flex flex-col items-center">
              <input
                onChange={(e) => setpic(e.target.files[0])}
                type="file"
                hidden
              />
              <img
                src={pic ? URL.createObjectURL(pic) : assets.avatar_icon}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-emerald-400 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
              />
              <span className="text-emerald-600 text-sm mt-2 hover:underline">
                Change Picture
              </span>
            </label>

            <input
              onChange={(e) => setname(e.target.value)}
              type="text"
              value={name}
              placeholder="Update your name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 placeholder-gray-400"
            />

            <textarea
              onChange={(e) => setbio(e.target.value)}
              value={bio}
              placeholder="Write something about yourself..."
              rows={4}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 placeholder-gray-400 resize-none"
            />

            <button
              type="submit"
              className="w-full mt-2 bg-emerald-500 text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-600 transition duration-200 shadow-md"
            >
              Save Profile
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center text-lg text-red-600 font-semibold">
          Please Login First
        </div>
      )}
    </div>
  );
};

export default Profile;
