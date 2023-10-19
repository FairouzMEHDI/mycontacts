import { screen, render } from "@testing-library/react";
import ContactsBar from "./ContactsBar";

describe("ContactsBar", () => {
  test.only("ContactsBar without props", () => {
   render(<ContactsBar />)
   // eslint-disable-next-line testing-library/no-debugging-utils
   screen.debug()

  });

  test("ContactsBar with props", () => {});
});
