import React, { useEffect, useRef, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";

const ChatContainer = ({ selectedUser, shows }) => {
  const currentUserId = "680f50e4f10f3cd28382ecf9";
  const scrollEnd = useRef();
  const clicked = () => {
    shows((prev) => !prev);
  };

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedUser]);

  return selectedUser ? (
    <div className="flex flex-col h-full bg-gradient-to-b from-black/80 to-gray-900/80 rounded-2xl overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 py-3 px-4 border-b border-gray-700 bg-gray-900/90 backdrop-blur-sm">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt={selectedUser?.fullName || "User"}
          className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
        />
        <p className="flex-1 text-lg font-semibold text-white flex items-center gap-2">
          {selectedUser?.fullName || "User"}
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
        </p>
        <img
          onClick={clicked}
          src={assets.help_icon}
          alt="Help"
          className="w-6 max-md:hidden hover:scale-110 transition-transform"
        />
      </div>

      {/* Chat body */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {messagesDummyData.map((msg, index) => {
          if (!msg.text && !msg.image) return null;

          const isCurrentUser = msg.senderId === currentUserId;
          const senderAvatar = isCurrentUser
            ? assets.avatar_icon
            : selectedUser?.profilePic || assets.avatar_icon;

          return (
            <div key={index} className="flex flex-col gap-1">
              <div
                className={`flex items-end gap-2 ${
                  isCurrentUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {!isCurrentUser && (
                  <img
                    src={senderAvatar}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-gray-600"
                  />
                )}

                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="Sent"
                    className="max-w-[220px] rounded-lg border border-gray-700 shadow-md"
                  />
                ) : (
                  <p
                    className={`p-2 max-w-[220px] text-sm rounded-lg break-words font-medium ${
                      isCurrentUser
                        ? "bg-emerald-500/80 text-white rounded-br-none shadow-md"
                        : "bg-gray-700/50 text-white rounded-bl-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </p>
                )}

                {isCurrentUser && (
                  <img
                    src={senderAvatar}
                    alt="You"
                    className="w-8 h-8 rounded-full border-2 border-gray-600"
                  />
                )}
              </div>

              <p
                className={`text-xs text-gray-400 ${
                  isCurrentUser ? "text-right" : "text-left"
                }`}
              >
                {msg.createdAt}
              </p>
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Input field */}
      <div className="flex-shrink-0 p-3 border-t border-gray-700 bg-gray-900/90 backdrop-blur-sm">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-3 rounded-2xl bg-gray-800/70 text-white outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400 shadow-inner"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full bg-gray-900 rounded-2xl shadow-lg">
      <img src="/logo.png" alt="" className="w-40 animate-bounce" />
      <p className="text-xl font-semibold text-white mt-4">Get started</p>
    </div>
  );
};

export default ChatContainer;
