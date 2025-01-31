import React from "react";
import Button from "../ui/button";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { signOut } = useAuth();
  return (
    <div className="bg-white border-b p-4 flex justify-between items-center">
      <div className="text-lg font-bold ">Welcome, Darshan</div>
      <div className="text-lg font-bold ">
        <Button variant="contained" onClick={signOut}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
