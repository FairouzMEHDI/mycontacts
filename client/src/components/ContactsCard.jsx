import React from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { editContact } from "../actions/contactsAction";
import { useDispatch } from "react-redux";

const ContactsCard = ({
  contact: { id, lastName, firstName, phoneNumber, avatar, favorite },
  contact,
  handleChange,
  selectAllClicked,
  contactsToDelete,
}) => {
  const dispatch = useDispatch();
  const handleFavorite = () => {
    dispatch(editContact({ ...contact, favorite: !favorite }, id));
  };

  return (
    <div
      className={
        contactsToDelete.includes(id)
          ? "my-3 flex border-spacing-1 content-center items-center  justify-between border-l-8 border-green-700 px-7"
          : "flex content-center items-center justify-between px-8"
      }
    >
      <input
        id={id}
        value={id}
        type="checkbox"
        className={
          "mr-4 mt-1 h-6 w-6 rounded-full border-l border-green-500 xl:h-6 xl:w-6"
        }
        onChange={handleChange}
        checked={
          selectAllClicked || contactsToDelete.includes(id) ? true : false
        }
      />
      <Link
        className="flex w-full cursor-pointer items-center gap-4 border-b py-6 duration-100 hover:scale-y-105 hover:bg-gray-100 "
        to={`/contact/${id}`}
      >
        <div>
          {avatar?.length > 0 ? (
            <img
              src={avatar}
              alt="firstName"
              className="h-[51px] w-[51px]  rounded-full border border-green-800 object-cover shadow-lg xl:h-[63px]  xl:w-[63px] "
            />
          ) : (
            <div className=" flex h-[51px] w-[51px] items-center justify-center rounded-full border  border-green-800 bg-white  text-2xl  font-bold text-gray-700 shadow-lg xl:h-[63px] xl:w-[63px] ">
              <p>{firstName?.split("")[0].toUpperCase()}</p>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-lg  font-bold text-green-800 xl:text-2xl ">
            {firstName} {lastName}
          </h1>

          <p className="text-md text-gray-500 xl:text-lg">{phoneNumber}</p>
        </div>
      </Link>

      <div className="text-2xl xl:text-3xl" onClick={handleFavorite}>
        {favorite ? <AiFillStar /> : <AiOutlineStar />}
      </div>
    </div>
  );
};

export default ContactsCard;
