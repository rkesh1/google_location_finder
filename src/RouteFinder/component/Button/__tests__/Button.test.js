import React from 'react';
import { shallow } from 'enzyme';
import Button from '../index';


describe('<Button /> Component Test Case ', () => {
  let wrapper;
  const props = {
    value: 'Some Value',
    clickHandler: () => { },
    additinalClass: '',
  };
  /**
   * Renders a shallow version of the Button
   */
  function renderShallow() {
    wrapper = shallow(<Button {...props} />);
  }


  it('Button Component render', () => {
    renderShallow();
    expect(wrapper).toMatchSnapshot();
  });

});
