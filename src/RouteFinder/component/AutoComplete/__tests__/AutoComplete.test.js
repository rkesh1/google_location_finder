import React from 'react';
import { shallow } from 'enzyme';
import Autocomplete from '../index';


describe('<Autocomplete /> Component Test Case ', () => {
  let wrapper;
  const props = {
    additionClass: '',
    placeholder: '',
    type: 'text',
    id: 'xyz',
    name: 'pqr',
    labelTitle: 'Title',
  };
  /**
   * Renders a shallow version of the Autocomplete
   */
  function renderShallow() {
    wrapper = shallow(<Autocomplete {...props} />);
  }


  it('Autocomplete Component render', () => {
    renderShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('Autocomplete have label tag', () => {
    renderShallow();
    expect(wrapper.find('.input-label').length).toBe(1);
  });

  it('Autocomplete have input tag', () => {
    renderShallow();
    expect(wrapper.find('input').length).toBe(1);
  });

});
