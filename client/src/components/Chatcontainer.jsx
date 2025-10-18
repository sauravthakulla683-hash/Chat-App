import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";

const ChatContainer = ({ selectedUser }) => {
  const currentUserId = "680f50e4f10f3cd28382ecf9";
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedUser]);

  return selectedUser ? (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 py-3 px-4 border-b border-gray-700">
        <img
          src={selectedUser?.profilePic || assets.avatar_icon}
          alt={selectedUser?.fullName || "User"}
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser?.fullName || "User"}
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img src={assets.help_icon} alt="Help" className="w-5 max-md:hidden" />
      </div>

      {/* Chat body */}
      <div className="flex-1 overflow-y-auto p-4 gap-2 flex flex-col">
        {messagesDummyData.map((msg, index) => {
          if (!msg.text && !msg.image) return null; // skip empty messages

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
                    className="w-7 h-7 rounded-full"
                  />
                )}

                {msg.image ? (
                  <img
                    src={msg.image}
                    alt="Sent"
                    className="max-w-[230px] rounded-lg border border-gray-700"
                  />
                ) : (
                  <p
                    className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg break-words text-white ${
                      isCurrentUser
                        ? "bg-violet-500/70 rounded-br-none"
                        : "bg-violet-500/30 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </p>
                )}

                {isCurrentUser && (
                  <img
                    src={senderAvatar}
                    alt="You"
                    className="w-7 h-7 rounded-full"
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
      <div className="flex-shrink-0 p-3 border-t border-gray-700 bg-black/40">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded-lg bg-gray-800 text-white outline-none"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-full">
      <img src={assets.logo_icon} alt="" className="w-16" />
      <p className="text-lg font-medium text-white mt-4">Get started</p>
    </div>
  );
};

export default ChatContainer;
