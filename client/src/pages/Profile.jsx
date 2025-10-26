import React, { useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up"); // "Sign Up" or "Login"
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const { login } = React.useContext(AuthContext);

  const onsubmithandler = (event) => {
    event.preventDefault();

    const credentials =
      currentState === "Sign Up"
        ? { fullName, email, password, bio }
        : { email, password };

    login(currentState === "Sign Up" ? "signup" : "login", credentials);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] sm:w-[400px]">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-14 w-14" />
        </div>

        <form onSubmit={onsubmithandler} className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-center text-gray-700 flex items-center justify-center gap-2">
            {currentState}
          </h2>

          {currentState === "Sign Up" && (
            <>
              <input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your full name"
                required
              />

              <input
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                type="text"
                placeholder="Where you from"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter your password"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
            type="submit"
          >
            {currentState === "Sign Up" ? "Create Account" : "Login Now"}
          </button>

          <div>
            <input type="checkbox" required />
            <p>Agree to the terms and services</p>
          </div>

          <div className="flex flex-col gap-2 text-center">
            {currentState === "Sign Up" ? (
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={() => setCurrentState("Login")}
                  className="font-medium text-violet-500 cursor-pointer"
                >
                  Login Here
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Create an account?{" "}
                <span
                  onClick={() => setCurrentState("Sign Up")}
                  className="font-medium text-violet-500 cursor-pointer"
                >
                  Click Here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
