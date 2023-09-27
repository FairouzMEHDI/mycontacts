import express from "express";
import {
  getContacts,
  createContact,
  editContact,
  deleteContact,
} from "../controllers/contactsControllers.js";

const router = express.Router();

router.get("/", getContacts);
router.post("/", createContact);
router.put("/:id", editContact);
router.delete("/:id", deleteContact);

export default router;
