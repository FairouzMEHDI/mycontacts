import React from "react";
import { useSelector } from "react-redux";
import ContactsBar from "../components/ContactsBar";

const Home = () => {
  const { contacts } = useSelector((state) => state);

  return (
   
      <div className="relative mx-auto mt-[100px]  max-w-[1240px] overflow-auto ">
        <ContactsBar contacts={contacts} />
      </div>

  );
};

export default Home;
