import React from "react";
import { shallow } from "enzyme";
import UsernameField from "./UsernameField";

describe("<UsernameField />", () => {
  const username = {
    value: "",
    onChange: () => {},
  };
  const props = {
    username,
    switchChannelsToggle: jest.fn(),
  };
  const wrapper = shallow(<UsernameField {...props} />);

  it("should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("[button] should call switchChannelToggle onClick", () => {
    wrapper.find("div.channels-toggle").simulate("click");
    expect(props.switchChannelsToggle).toHaveBeenCalledTimes(1);
  });
});
