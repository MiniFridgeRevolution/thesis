import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
import Signup from '../client/Components/Auth/Signup';

describe("Signup component", function() {

  it("should have a handle sign up function", function() {
    const wrapper = shallow(<Signup />);
    expect(wrapper.instance().handleSignup).to.be.a('function');
  });


});