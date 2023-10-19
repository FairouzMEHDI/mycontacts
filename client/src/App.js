import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContactDetails from "./pages/ContactDetails/ContactDetails";
import ContactForm from "./pages/ContactForm/ContactForm";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { getContacts } from "./actions/contactsAction";

function App() {
  const { isLoading } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
        <div className="loader"> </div>
      </div>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<ContactForm />} />
        <Route path="/create" element={<ContactForm />} />
        <Route path="/contact/:id" element={<ContactDetails />} />
      </Routes>
    </div>
  );
}

export default App;
