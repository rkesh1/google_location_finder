import React from 'react';
import { shallow } from 'enzyme';
import GoogleMapRoute from '../index';


describe('GoogleMap Component Test Case ', () => {
  let wrapper;
  const props = {
    map:{},
    cordinateData:[],
    zoom: 12,
    center: { lat: 22.372081, lng: 114.107877 },
  };

  /**
   * Renders a shallow version of the GoogleMap Component
   */
  function renderShallow() {
    wrapper = shallow(<GoogleMapRoute {...props} />).find('GoogleMap');
  }

  it('GoogleMap Component render', () => {
    renderShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('google map without marker', () => {
    renderShallow();
    const marker = wrapper.find('Marker').length;
    expect(marker).toBe(0);
  })
});
