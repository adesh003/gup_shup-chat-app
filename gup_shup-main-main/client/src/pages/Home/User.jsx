import React from "react";

const User = () => {
  return (
    <div className="flex items-center">
      <div className="avatar avatar-online px-1 mb-2">
        <div className="w-13 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
        </div>
      </div>
      <div>
        <h2 className="line-clamp-1">Full name</h2>
        <p className="text-xs">username</p>
      </div>
    </div>
  );
};

export default User;
