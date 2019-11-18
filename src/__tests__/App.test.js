import React from "react";
import { shallow } from "enzyme";
import App from "../App";

describe("App Component Test Case ", () => {
  let wrapper;

  /**
   * Renders a shallow version of the App component
   */
  function renderShallow() {
    wrapper = shallow(<App />);
  }

  it("App Component render", () => {
    renderShallow();
    expect(wrapper).toMatchSnapshot();
  });
});
