import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaBirthdayCake, FaCity, FaAddressBook } from "react-icons/fa";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import ContactsBar from "../components/ContactsBar";
import { editContact } from "../actions/contactsAction";
import PopupDelete from "../components/PopupDelete";

const ContactDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state);
  const navigate = useNavigate();
  const { id } = useParams();

  const idContacts = contacts?.map((item) => item.id);

  useEffect(() => {
    if (!idContacts.includes(id)) {
      navigate("/", { replace: true });
    }
  }, []);

  const contact = contacts?.filter((item) => item.id == id)[0];

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleFavorite = () => {
    dispatch(editContact({ ...contact, favorite: !contact?.favorite }, id));
  };

  return (
    <div className="mt-24 grid lg:grid-cols-3">
      <div className="col-span-1 hidden lg:grid">
        <ContactsBar contacts={contacts} />
      </div>

      <div className="col-span-2 mx-auto my-1 flex h-[88vh] w-[85vw] flex-col items-center justify-center gap-1 overflow-auto px-5 text-sm font-bold text-gray-700 shadow-xl md:w-[70vw] lg:w-[50vw]  lg:text-lg ">
        <div>
          {contact?.avatar?.length > 0 ? (
            <img
              src={contact?.avatar}
              alt="firstName"
              className="mt-5 h-[145px] w-[145px] rounded-full border border-green-800 object-cover shadow-lg xl:h-[170px] xl:w-[170px] "
            />
          ) : (
            <div className="mb-2  rounded-full border border-green-800 bg-white px-14 py-12 text-4xl font-bold text-gray-700  shadow-lg xl:px-16 xl:py-14 xl:text-5xl">
              {contact?.firstName?.split("")[0].toUpperCase()}
            </div>
          )}
        </div>
        <div className="mt-8 flex  items-center gap-4">
          <h1 className=" text-2xl font-bold uppercase text-green-800 xl:text-3xl ">
            {contact?.firstName} {contact?.lastName}
          </h1>
          <div onClick={handleFavorite}>
            {contact?.favorite ? (
              <AiFillStar className="text-2xl" />
            ) : (
              <AiOutlineStar className="text-2xl" />
            )}
          </div>
        </div>

        <div className=" mt-10 flex w-[400px] items-center justify-center  gap-5 border-b border-gray-300 py-2 text-lg shadow-md  md:py-5 xl:w-[500px] xl:text-xl">
          <BsFillTelephoneFill />
          <h6>{contact?.phoneNumber}</h6>
        </div>
        <div className=" mt-10 flex w-[400px] items-center justify-center  gap-5 border-b border-gray-300 py-2 text-lg shadow-md  md:py-5 xl:w-[500px] xl:text-xl">
          <FaBirthdayCake />
          <h6>{contact?.birthday}</h6>
        </div>
        <div className=" mt-10 flex w-[400px] items-center justify-center  gap-5 border-b border-gray-300  py-2 text-lg shadow-md  md:py-5 xl:w-[500px] xl:text-xl">
          <FaAddressBook />
          <h6>{contact?.address}</h6>
        </div>
        <div className=" mt-10 flex w-[400px] items-center justify-center  gap-5 border-b border-gray-300 py-2 text-lg  shadow-md  md:py-5 xl:w-[500px] xl:text-xl">
          <FaCity />
          <h6>{contact?.country}</h6>
        </div>
        <div className="mb-1 mt-8 flex  gap-10 font-bold text-white">
          <Link
            to={`/edit/${id}`}
            className="rounded-lg bg-slate-400 px-12 py-3 shadow-lg duration-300 hover:scale-105 hover:bg-slate-500"
          >
            Edit{" "}
          </Link>
          <button
            className="rounded-lg bg-red-500 px-8 py-3 shadow-lg duration-300 hover:scale-105 hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete{" "}
          </button>
        </div>
      </div>
      {showModal && <PopupDelete id={[id]} setShowModal={setShowModal} />}
    </div>
  );
};

export default ContactDetails;
