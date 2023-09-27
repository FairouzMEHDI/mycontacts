import axios from "axios";

export const getContacts = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://my-contacts-51c9b-default-rtdb.europe-west1.firebasedatabase.app/contacts.json"
    );
    if (!data) {
      res.status(404).json({ message: "data not founded", contacts: [] });
      return;
    }

    const contacts = Object.keys(data).map((item) => {
      return { id: item, ...data[item] };
    });
    res.status(200).json({ message: "OK!", contacts });
  } catch (error) {
    res.status(500).json({ message: "error happened" });
  }
};

export const createContact = async (req, res) => {
  try {
    const { body } = req;

    const contactKeys = [
      "lastName",
      "firstName",
      "birthday",
      "address",
      "country",
      "phoneNumber",
      "avatar",
      "favorite",
    ];

    if (
      !Object.keys(body).every((item) => contactKeys.includes(item)) ||
      Object.keys(body).length !== 8
    ) {
      res.status(400).json({
        message:
          "Enter : lastName, firstName, birthday, address, country, phoneNumber, avatar, favorite",
      });
      return;
    }

    if (isNaN(body.phoneNumber) || body.phoneNumber.split("").length !== 10) {
      res.status(400).json({
        message: "Enter a valid phoneNumber",
      });
      return;
    }

    if (!isNaN(body.lastName) || !isNaN(body.firstName)) {
      res.status(400).json({
        message: "Enter a valid lastName and firstName",
      });
      return;
    }

    if (body.address.split(" ").length < 3) {
      res.status(400).json({
        message: "Enter a valid address",
      });
      return;
    }

    if (body.country.split("").length < 1) {
      res.status(400).json({
        message: "Enter a valid country",
      });
      return;
    }

    if (
      isNaN(body.birthday.split("/").join("")) ||
      body.birthday.split("/").length !== 3 ||
      body.birthday.split("/")[0].split("").length !== 2 ||
      body.birthday.split("/")[1].split("").length !== 2 ||
      body.birthday.split("/")[2].split("").length !== 4
    ) {
      res.status(400).json({
        message: "Enter a valid birthday",
      });
      return;
    }

    const {
      data: { name: id },
    } = await axios.post(
      "https://my-contacts-51c9b-default-rtdb.europe-west1.firebasedatabase.app/contacts.json",
      body
    );
    res.status(200).json({ message: "OK!", contact: { id, ...body } });
  } catch (error) {
    res.status(500).json({ message: "error happened" });
  }
};

export const editContact = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const contactKeys = [
      "lastName",
      "firstName",
      "birthday",
      "address",
      "country",
      "phoneNumber",
      "avatar",
      "favorite",
    ];

    if (
      !Object.keys(body).every((item) => contactKeys.includes(item)) ||
      Object.keys(body).length !== 8
    ) {
      res.status(400).json({
        message:
          "you can edit just : lastName, firstName, birthday, address, country, phoneNumber, avatar, favorite",
      });
      return;
    }

    const contacts = await axios.get(
      "https://my-contacts-51c9b-default-rtdb.europe-west1.firebasedatabase.app/contacts.json"
    );
    const contactsObj = contacts.data;
    const arrayOfContacts = Object.keys(contactsObj).map((item) => {
      return { id: item, ...contactsObj[item] };
    });
    const arrayOfContactsIds = arrayOfContacts.map((item) => item.id);

    if (!arrayOfContactsIds.includes(id)) {
      res.status(400).json({
        message: "please enter a valid contactId",
      });
      return;
    }

    if (isNaN(body.phoneNumber) || body.phoneNumber.split("").length !== 10) {
      res.status(400).json({
        message: "Enter a valid phoneNumber",
      });
      return;
    }

    if (!isNaN(body.lastName) || !isNaN(body.firstName)) {
      res.status(400).json({
        message: "Enter a valid lastName and firstName",
      });
      return;
    }

    if (body.address.split(" ").length < 3) {
      res.status(400).json({
        message: "Enter a valid address",
      });
      return;
    }

    if (body.country.split("").length < 1) {
      res.status(400).json({
        message: "Enter a valid country",
      });
      return;
    }

    if (
      isNaN(body.birthday.split("/").join("")) ||
      body.birthday.split("/").length !== 3 ||
      body.birthday.split("/")[0].split("").length !== 2 ||
      body.birthday.split("/")[1].split("").length !== 2 ||
      body.birthday.split("/")[2].split("").length !== 4
    ) {
      res.status(400).json({
        message: "Enter a valid birthday",
      });
      return;
    }

    const { data } = await axios.put(
      `https://my-contacts-51c9b-default-rtdb.europe-west1.firebasedatabase.app/contacts/${id}.json`,
      body
    );
    res.status(200).json({ message: "OK!", contact: { id, ...data } });
  } catch (error) {
    res.status(500).json({ message: "error happened" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const { data } = await axios.get(
      "https://my-contacts-51c9b-default-rtdb.europe-west1.firebasedatabase.app/contacts.json"
    );
    const arrayOfContacts = Object.keys(data).map((item) => {
      return { id: item, ...data[item] };
    });
    const arrayOfContactsIds = arrayOfContacts.map((item) => item.id);

    if (!arrayOfContactsIds.includes(id)) {
      res.status(400).json({
        message: "please enter a valid contactId",
      });
      return;
    }

    await axios.delete(
      `https://my-contacts-51c9b-default-rtdb.europe-west1.firebasedatabase.app/contacts/${id}.json`
    );

    res.status(200).json({ message: "OK!", id });
  } catch (error) {
    res.status(500).json({ message: "error happened" });
  }
};
