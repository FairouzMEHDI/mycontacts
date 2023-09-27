export default function contactsReducer(
  state = { isLoading: true, contacts: [], error: null },
  action,
) {
  switch (action.type) {
    case "IS_LOADING":
      return { ...state, isLoading: true };

    case "GET_ERRORS":
      return { ...state, isLoading: false, error: action.payload };

    case "GET_CONTACTS":
      return { ...state, contacts: action.payload, isLoading: false };

    case "CREATE_CONTACT":
      const stateContacts = [...state.contacts];
      return { ...state, contacts: [...stateContacts, action.payload] };

    case "FAVORITE_CONTACT":
      return state;

    case "EDIT_CONTACT":
      const prevStateContact = [...state.contacts];
      const newStateContacts = prevStateContact.map((item) =>
        item.id === action.payload.id ? action.payload : item,
      );
      return { ...state, contacts: newStateContacts };

    case "DELETE_CONTACT":
      const arrayOfIds = action.payload;
      const arrayOfContacts = [...state.contacts];
      const contactsFiltered = arrayOfContacts.filter(
        (contact) => !arrayOfIds.includes(contact.id),
      );

      return { ...state, contacts: contactsFiltered };

    default:
      return state;
  }
}
