import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("NavBar", () => {
  test("check navbar content link for Home page", async () => {
    render(<Navbar />);
    const myContacts = await screen.findByRole("link", {
      name: /my contacts/i,
    });

    expect(myContacts).toBeInTheDocument();
  });

  test("check navbar content link for Form page", async () => {
    render(<Navbar />);
    const addNewContact = await screen.findByRole("link", {
      name: /add new contact/i,
    });

    expect(addNewContact).toBeInTheDocument();
  });
});
