import axios from "axios";
const url = "http://localhost:5000/contacts";

export const getContacts = () => async (dispatch) => {
  try {
    dispatch({ type: "IS_LOADING" });
    const { data } = await axios.get(url);
    dispatch({ type: "GET_CONTACTS", payload: data.contacts });
  } catch (error) {
    if (error.message === "Request failed with status code 404") {
      return dispatch({ type: "GET_CONTACTS", payload: [] });
    } else {
      console.log(error.message);
    }
  }
};

export const createContact = (contact) => async (dispatch) => {
  try {
    const { data } = await axios.post(url, contact);

    dispatch({ type: "CREATE_CONTACT", payload: data.contact });
  } catch (error) {
    console.log(error.message);
  }
};

export const editContact = (contact, id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`${url}/${id}`, contact);

    dispatch({ type: "EDIT_CONTACT", payload: data.contact });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    const promises = [];
    id.forEach((item) => promises.push(axios.delete(`${url}/${item}`)));
    await Promise.all(promises);

    dispatch({ type: "DELETE_CONTACT", payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
