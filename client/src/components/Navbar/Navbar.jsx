import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="fixed top-0 w-full bg-green-700 text-white">
      <div className="mx-auto flex max-w-[1440px] justify-between px-6 py-7">
        <Link to="/" className="w-full text-xl  font-bold lg:text-4xl ">
          My Contacts
        </Link>
        <Link
          to="/create"
          className="text-md flex w-full cursor-pointer items-center  justify-end gap-2 lg:text-2xl"
        >
          <AiOutlineUserAdd />
          <h6>Add new contact</h6>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
