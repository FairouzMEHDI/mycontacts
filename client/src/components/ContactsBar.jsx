import React, { useState } from "react";
import ContactsCard from "./ContactsCard";
import { AiOutlineUserAdd, AiOutlineSearch } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import PopupDelete from "./PopupDelete";

const ContactsBar = ({ contacts }) => {
  const [showModal, setShowModal] = useState(false);
  const [sortedBy, setSortedBy] = useState("A-Z");
  const [searchValue, setSearchValue] = useState("");
  const [contactsToDelete, setContactsToDelete] = useState([]);
  const [selectAllClicked, setSelectAllClicked] = useState(false);

  sortedBy === "A-Z"
    ? contacts?.sort((a, b) => a.firstName.localeCompare(b.firstName))
    : contacts
        ?.sort((a, b) => a.firstName.localeCompare(b.firstName))
        .reverse();

  const contactSearched = contacts?.filter(
    (item) =>
      item.firstName.includes(searchValue) ||
      item.lastName.includes(searchValue),
  );

  const handleChange = (e) => {
    if (!contactsToDelete.includes(e.target.value)) {
      setContactsToDelete([...contactsToDelete, e.target.value]);
    } else {
      setContactsToDelete(
        contactsToDelete.filter((item) => item !== e.target.value),
      );
      setSelectAllClicked(false);
    }
  };

  const handleSelectAll = () => {
    !selectAllClicked
      ? setContactsToDelete(contacts?.map((item) => item.id))
      : setContactsToDelete([]);
    setSelectAllClicked(!selectAllClicked);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  return (
    <div className=" mt-1 h-[88vh] max-w-[1240px]  overflow-auto rounded-lg bg-gray-100 px-2 py-8 shadow-xl ">
      {contacts?.length > 0 ? (
        <>
          <div className="mb-3 flex flex-col gap-3 px-8">
            <div className="relative flex items-center justify-center ">
              <AiOutlineSearch
                size={22}
                color="gray"
                className="absolute  left-4 z-10 text-gray-700"
              />
              <input
                value={searchValue}
                type="text"
                placeholder="Search contact"
                className="mx-auto  w-full rounded-lg px-12 py-2"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            <div className="mb-14 flex justify-end gap-2">
              <h5 className="text-base text-gray-700  xl:text-lg">Sort by</h5>
              <select
                id="filter"
                name="select"
                className="px-3 text-center text-gray-600"
                onChange={(e) => setSortedBy(e.target.value)}
              >
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <input
                  id="selectAll"
                  type="checkbox"
                  className="mr-2 mt-1 h-6 w-6 rounded-full"
                  onChange={handleSelectAll}
                  checked={
                    selectAllClicked ||
                    contacts
                      ?.map((contact) => contact.id)
                      .every((item) => contactsToDelete.includes(item))
                      ? true
                      : false
                  }
                />
                <label
                  htmlFor="selectAll"
                  className="text-md text-gray-700  xl:text-xl"
                >
                  Select all
                </label>
              </div>
              <div className="cursor-pointer">
                {contactsToDelete?.length > 0 && (
                  <RiDeleteBin6Line
                    color="red"
                    size={24}
                    onClick={handleDelete}
                  />
                )}
              </div>
            </div>
          </div>
          <div />
          {contactSearched?.map((item, index) => (
            <ContactsCard
              handleChange={handleChange}
              key={index}
              contact={item}
              selectAllClicked={selectAllClicked}
              contactsToDelete={contactsToDelete}
            />
          ))}
        </>
      ) : (
        <Link
          to="/create"
          className="mt-[30vh] flex w-full cursor-pointer items-center justify-center gap-2 text-2xl lg:text-4xl"
        >
          <AiOutlineUserAdd />
          <h6>Add new contact</h6>
        </Link>
      )}
      {showModal && (
        <PopupDelete id={contactsToDelete} setShowModal={setShowModal} />
      )}
    </div>
  );
};

export default ContactsBar;
