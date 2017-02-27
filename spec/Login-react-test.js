import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
import Login from '../client/Components/Auth/Login';

describe("Login component", function() {

  it("should have a handle log in function", function() {
    const wrapper = shallow(<Login />);
    expect(wrapper.instance().handleLogIn).to.be.a('function');
  });


});