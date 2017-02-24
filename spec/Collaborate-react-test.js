import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';

import Collaborate from '../client/Components/Collaborate';

describe("Collaborate component", function() {

//import ace must be commented out for the tests to run
  it("contain two video tags", function() {
    expect(shallow(<Collaborate />).find('video').length).to.equal(2);
  });

  it("contains a single button", function() {
    expect(shallow(<Collaborate />).find('button').length).to.equal(1);
  });

});