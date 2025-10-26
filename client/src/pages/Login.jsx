import React, { useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const { login } = React.useContext(AuthContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currentState === "Sign Up") {
      // signup first
      await login("signup", { fullName, email, password, bio });
      // then switch to login automatically
      setCurrentState("Login");
      setFullName("");
      setBio("");
    } else {
      // login
      await login("login", { email, password });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] sm:w-[400px]">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-14 w-14" />
        </div>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-center text-gray-700">
            {currentState}
          </h2>

          {currentState === "Sign Up" && (
            <>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                placeholder="Full Name"
                required
                className="border rounded-lg px-4 py-2"
              />
              <input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                type="text"
                placeholder="Bio / Where You From"
                className="border rounded-lg px-4 py-2"
              />
            </>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="border rounded-lg px-4 py-2"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md"
          >
            {currentState === "Sign Up" ? "Create Account" : "Login Now"}
          </button>

          <div className="flex justify-center text-sm mt-2">
            {currentState === "Sign Up" ? (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-violet-500 font-medium"
                  onClick={() => setCurrentState("Login")}
                >
                  Login Here
                </button>
              </span>
            ) : (
              <span>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-violet-500 font-medium"
                  onClick={() => setCurrentState("Sign Up")}
                >
                  Create Account
                </button>
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
