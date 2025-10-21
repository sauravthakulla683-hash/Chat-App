import React, { useState } from "react";

const Profile = ({ selectedUser, setSelectedUser }) => {
  const [name, setname] = useState("");
  const [bio, setbio] = useState("");
  const [pic, setpic] = useState("null");

  return (
    <div>
      {!selectedUser ? (
        <div>
          <div className="First flex justify-center items-center h-screen">
            <div className="flex justify-center items-center w-[400px] h-[440px] bg-zinc-600 ">
              <form
                onSubmit={(e) => e.preventDefault()}
                action="/"
                className="flex flex-col justify-center items-center bg-emerald-200"
              >
                <input
                  onChange={(e) => {
                    setname(e.target.value);
                    console.log(e.target.value);
                  }}
                  type="text"
                  value={name}
                  placeholder="Update Your name "
                />

                <input
                  onChange={(e) => setbio(e.target.value)}
                  type="text"
                  value={bio}
                  placeholder="Update Your Bio"
                />

                <input
                  onChange={(e) => setpic(e.target.value)}
                  type="file"
                  placeholder="Update Your Pic"
                />

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>

          <div className="secound"></div>
        </div>
      ) : (
        <div>Please Login First</div>
      )}
    </div>
  );
};

export default Profile;
