import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Navigate,
  redirect,
  useNavigate,
  useParams,
} from "react-router-dom";
import FileBase from "react-file-base64";
import { useFormik } from "formik";
import * as yup from "yup";
import ContactsBar from "../components/ContactsBar";
import { createContact, editContact } from "../actions/contactsAction";
import { CountryDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  phoneNumber: yup.string().required("Required").max(10),
  birthday: yup.string().required("Required"),
  address: yup.string().required("Required"),
  country: yup.string().required("Required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contacts } = useSelector((state) => state);
  const { id } = useParams();

  const idContacts = contacts?.map((item) => item.id);
  useEffect(() => {
    if (id) {
      if (!idContacts.includes(id)) {
        console.log("navigate");
        navigate("/", { replace: true });
      }
    }
  }, []);

  const contactSelected = contacts.filter((item) => item.id == id)[0];
  const CreateInitialValue = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthday: "",
    address: "",
    country: "",
    avatar: "",
    favorite: false,
  };

  const EditInitialValue = {
    firstName: contactSelected?.firstName,
    lastName: contactSelected?.lastName,
    phoneNumber: contactSelected?.phoneNumber,
    birthday: contactSelected?.birthday,
    address: contactSelected?.address,
    country: contactSelected?.country,
    avatar: contactSelected?.avatar,
    favorite: contactSelected?.favorite,
  };

  const initialValues = id ? EditInitialValue : CreateInitialValue;

  const onSubmit = (values) => {
    console.log("values", values);
    id ? dispatch(editContact(values, id)) : dispatch(createContact(values));
    navigate("/");
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <>
      <div className="mt-[100px] grid lg:grid-cols-3">
        <div className="col-span-1 hidden  lg:grid">
          <ContactsBar contacts={contacts} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="col-span-2  mx-auto my-1 flex h-[88vh] w-[90vw] flex-col justify-center gap-1 overflow-auto px-10 text-sm font-bold text-gray-700 shadow-xl md:px-32  lg:w-[50vw] lg:text-lg"
        >
          <h1 className="mb-4 mt-3 text-center text-2xl text-gray-700 lg:text-3xl">
            {id ? "Edit contact" : "Create new contact"}
          </h1>

          <label htmlFor="firstName" className="text-gray-700">
            First Name
          </label>
          <input
            value={values.firstName}
            onChange={handleChange}
            id="firstName"
            placeholder="Enter your first name"
            onBlur={handleBlur}
            className="rounded-md px-3 py-2 text-gray-600 shadow-lg outline-none "
          />
          {errors.firstName && touched.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}

          <label className="mt-4 text-gray-700" htmlFor="lastName">
            Last Name
          </label>
          <input
            value={values.lastName}
            onChange={handleChange}
            id="lastName"
            placeholder="Enter your last name"
            onBlur={handleBlur}
            className="rounded-md px-3 py-2 text-gray-600 shadow-lg  outline-none   "
          />
          {errors.lastName && touched.lastName && (
            <p className="text-sm text-red-500 ">{errors.lastName}</p>
          )}

          <label className="mt-4 text-gray-700" htmlFor="phoneNumber">
            Number phone
          </label>
          <PhoneInput
            id="phoneNumber"
            country="fr"
            value={values.phoneNumber}
            onChange={(phoneNumber) =>
              setFieldValue("phoneNumber", phoneNumber)
            }
            placeholder="Enter your phone number"
            onBlur={handleBlur}
            className=" h-[50px] rounded-md  text-4xl  text-gray-600 shadow-lg "
            inputStyle={{
              height: "100%",
              width: "100%",
              border: "1px solid transparent",
              fontSize: "19px",
            }}
            buttonStyle={{
              background: "white",
              height: "100%",
              border: "1px solid transparent",
            }}
          />
          {errors.phoneNumber && touched.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber}</p>
          )}

          <label className="mt-4 text-gray-700" htmlFor="birthday">
            Birthday
          </label>
          <input
            type="date"
            value={values.birthday}
            onChange={handleChange}
            id="birthday"
            onBlur={handleBlur}
            className=" rounded-md px-3 py-2 text-gray-600  shadow-lg outline-none"
          />
          {errors.birthday && touched.birthday && (
            <p className="text-sm text-red-500">{errors.birthday}</p>
          )}

          <label className="mt-4 text-gray-700" htmlFor="address">
            Address
          </label>
          <input
            value={values.address}
            onChange={handleChange}
            id="address"
            placeholder="Enter your address"
            onBlur={handleBlur}
            className="rounded-md px-3 py-2 text-gray-600 shadow-lg outline-none  "
          />
          {errors.address && touched.address && (
            <p className="text-sm text-red-500">{errors.address}</p>
          )}

          <label className="mt-4 text-gray-700" htmlFor="country">
            Country
          </label>

          <CountryDropdown
            value={values.country}
            onChange={(country) => setFieldValue("country", country)}
            id="country"
            onBlur={handleBlur}
            className="rounded-md bg-white px-3 py-2 text-gray-600 shadow-lg outline-none "
          />
          {errors.country && touched.country && (
            <p className="text-sm text-red-500">{errors.country}</p>
          )}

          <label className="mt-4 text-gray-700" htmlFor="avatar">
            Avatar
          </label>
          <div className="rounded-md px-3 py-1 text-gray-600 shadow-lg outline-none ">
            <FileBase
              value={values.avatar}
              id="avatar"
              onBlur={handleBlur}
              type="file"
              multiple={false}
              onDone={({ base64 }) => setFieldValue("avatar", base64)}
            />
          </div>

          <div className="mb-2 mt-9 flex justify-between font-bold text-white">
            <Link
              to="/"
              className="rounded-lg bg-slate-400 px-8 py-3 shadow-lg duration-300 hover:scale-105 hover:bg-slate-500  "
            >
              Cancel{" "}
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-green-500 px-8 py-3 shadow-lg duration-300 hover:scale-105 hover:bg-green-600 "
            >
              Save{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
