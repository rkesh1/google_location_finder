import React from 'react';
import { shallow } from 'enzyme';
import SearchForm from '../index';


describe('<SearchForm /> Component Test Case ', () => {
  let wrapper;
  const props = {
    submitFormHandler: () => { },
    resetFormHandler: () => { },
    clearTextField: false,
    message: 'input',
  }
  /**
   * Renders a shallow version of the SearchForm
   */
  function renderShallow() {
    wrapper = shallow(<SearchForm {...props} />);
  }


  it('SearchForm Component render', () => {
    renderShallow();
    expect(wrapper).toMatchSnapshot();
  });

  
  it("change in form field", async () => {
    renderShallow();
    const instance = wrapper.instance();
    await instance.showPlaceDetails('xyz', '123');
    expect(instance.state.formData.xyz).toBe('123');
  });

  it("DOM varified on based of props", async () => {
    const message={
      renderPath: true,
      showErr: true,
    }
    wrapper = shallow(<SearchForm {...props} message={message} />);
    expect(wrapper.find('.info').length).toBe(1);
    expect(wrapper.find('.error-container').length).toBe(1);
  });
});
