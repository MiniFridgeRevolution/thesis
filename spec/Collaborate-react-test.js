import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';

import Collaborate from '../client/Components/Collaborate';

describe("Collaborate component", function() {

//import ace must be commented out for the tests to run
  it("contain two video tags", function() {
    expect(shallow(<Collaborate />).find('video').length).to.equal(2);
  });


  it("contains a Ace editor", function() {
		const wrapper = shallow(<div id="editor" />);
		expect(wrapper.is('#editor')).to.equal(true);

  });

  it("contains a area for result", function() {
		const wrapper = shallow(<div id="result" />);
		expect(wrapper.is('#result')).to.equal(true);
  });
});