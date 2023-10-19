import React from "react";
import { useDispatch } from "react-redux";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { deleteContact } from "../../actions/contactsAction";

const PopupDelete = ({ setShowModal, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const handleClickDelete = () => {
    dispatch(deleteContact(id));
    navigate("/");
    setShowModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-transparent shadow-[0_2px_15px_-3px_rgba(0,0,0,0.5),0_10px_20px_-2px_rgba(0,0,0,0.2)] sm:text-[40px]">
        <div className="relative mx-auto my-6 w-auto max-w-xs rounded-xl  border-2 border-solid md:max-w-3xl">
          <div className="border-1 relative flex w-full flex-col rounded-lg bg-white shadow-lg outline-none focus:outline-none">
            <div className="flex content-center items-center justify-between rounded-t border-b border-solid border-slate-200  px-3 pb-3 pt-1 md:px-6 md:pb-6 md:pt-3">
              <div className="text-lg font-semibold text-gray-900 md:text-2xl">
                Confirm deletion
              </div>

              <div
                className="cursor-pointer text-xl  text-red-500 md:text-3xl"
                onClick={() => setShowModal(false)}
              >
                <IoIosCloseCircleOutline />
              </div>
            </div>

            <div className="relative flex-auto p-3 md:p-6">
              <p className="my-4 text-sm leading-relaxed text-slate-500 md:text-lg">
                Are you sure you would like delete this contact ?
              </p>
            </div>

            <div className="flex items-center  justify-center gap-3 rounded-b border-t border-solid border-slate-200 p-3 md:justify-end md:p-6">
              <button
                className="mb-1  mr-1 rounded bg-gray-500 px-5 py-2 text-xs font-bold  uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none md:px-6 md:py-3 md:text-sm"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="mb-1 mr-1 rounded bg-red-500  px-5 py-2  text-xs font-bold  uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600 md:px-6 md:py-3 md:text-sm"
                type="button"
                onClick={handleClickDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
};

export default PopupDelete;
