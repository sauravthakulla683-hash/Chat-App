import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { updateprofile, authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [preview, setPreview] = useState("/default-avatar.png");
  const [loading, setLoading] = useState(false);

  // Prefill data when authUser is available
  useEffect(() => {
    if (authUser) {
      setName(authUser.fullName || "");
      setBio(authUser.bio || "");
      setPreview(authUser.pic || "/default-avatar.png");
    }
  }, [authUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImg(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const onsubmithandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { fullName: name, bio };

      if (selectedImg) {
        data.pic = await convertToBase64(selectedImg);
      }

      // Make sure updateprofile returns a Promise
      await updateprofile(data);

      // Navigate after update completes
      navigate("/");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-[90%] max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Edit Profile
        </h2>

        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-purple-400">
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <form onSubmit={onsubmithandler} className="flex flex-col gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            type="text"
            placeholder="Bio / Where you from"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            onChange={handleImageChange}
            type="file"
            accept="image/*"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white font-semibold rounded-xl hover:scale-105 transform transition duration-200"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
