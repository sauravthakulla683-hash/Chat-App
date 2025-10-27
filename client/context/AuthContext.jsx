import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import io from "socket.io-client";

export const AuthContext = createContext();

const backendurl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendurl;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authuser, setAuthuser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const checkAuth = async () => {
    if (!token) return;
    try {
      axios.defaults.headers.common["token"] = token;
      const { data } = await axios.get("/api/auth/check");
      if (data.success) setAuthuser(data.user);
    } catch (err) {
      toast.error(err.message || "Auth check failed");
    }
  };

  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["token"] = data.token;
        setAuthuser(data.user);
        toast.success(data.message || "Login successful");
        connectSocket(data.user);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error(err.message || "Network error");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthuser(null);
    setToken(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["token"] = null;

    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    toast.success("Logged out successfully");
  };

  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/updateprofile", body);
      if (data.success) {
        setAuthuser(data.user);
        toast.success("Profile updated successfully");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error(err.message || "Profile update failed");
    }
  };

  const connectSocket = (userdata) => {
    if (!userdata || socket?.connected) return;

    const newSocket = io(backendurl, {
      query: { userId: userdata._id },
    });
    setSocket(newSocket);

    newSocket.on("get-online-users", (userIds) => {
      setOnlineUsers(userIds);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  };

  useEffect(() => {
    checkAuth();
  }, [token]);

  const value = {
    axios,
    authuser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
