import React from "react";
import { shallow } from "enzyme";
import RouteFinder from "../index";
import  apiService from '../Services/index';
import {API_CALL_ITERERATION, IN_PROGRESS, FAILURE} from '../Constants/index';

describe("RouteFinder Component Test Case ", () => {
  let wrapper;

  /**
   * Renders a shallow version of the RouteFinder component
   */
  function renderShallow() {
    wrapper = shallow(<RouteFinder />);
  }

  it("RouteFinder Component render", () => {
    renderShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it("Default map object is not available", () => {
    renderShallow();
    expect(wrapper.state().map).toBe(null);
  });

  
  it("Map Object is set", () => {
    renderShallow();
    wrapper.setState({
      map: {}
    });
    expect(wrapper.state().map).toBeDefined();
  });

  it("Fetch api test", () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 
    renderShallow();
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });

  it("API success for token call", () => {
    renderShallow();
    apiService('url');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    global.fetch.mockClear(); // 7
  });

  it("For Fetch api call", async () => {
    const windowFetch = jest.spyOn(global, 'fetch');
    renderShallow();
    const mockData = {data: { token: 1}};
    const { data: { token } } = mockData;

    windowFetch.mockImplementation(() => Promise.resolve({
      token: 1,
      status: 200,
      json: () => Promise.resolve(mockData),
    }))

    const response = await apiService('url');
    
    expect(response.data.token).toBe(token)
    global.fetch.mockClear();

  });

  it("For Fetch failure", async () => {
    const windowFetch = jest.spyOn(global, 'fetch');
    renderShallow();
    const errorMessage = 'New Error'
    windowFetch.mockImplementation(() => Promise.reject(errorMessage))
    try {
      await apiService('url');
    }
    catch(e) {
      expect(e.message).toBe(errorMessage);
    }
    global.fetch.mockClear();
  });

  it("getRouteOnToken post call on success", async () => {
    const mockDirectionResponse = {
      status: "success",
      path: [
        ["22.47", "114.47"],
        ["22.48", "114.48"],
        ["22.49", "114.49"]
      ],
      total_distance: 20000,
      total_time: 1800
    };
    const {total_distance, total_time} = mockDirectionResponse;
    renderShallow();
    const instance = wrapper.instance();
    const windowFetch = jest.spyOn(global, 'fetch');
    windowFetch.mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockDirectionResponse),
    }));

    await instance.getRouteOnToken('token');
    
    expect(instance.state.totalDistance).toBe(total_distance);
    expect(instance.state.totalTime).toBe(total_time);
    global.fetch.mockClear();
  });

  it("getRouteOnToken post call on inprogress", async () => {
    const mockDirectionResponseRetry = {
      status: IN_PROGRESS
    };
    renderShallow();
    const instance = wrapper.instance();
    const windowFetch = jest.spyOn(global, 'fetch');
    windowFetch.mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockDirectionResponseRetry),
    }));
    await instance.getRouteOnToken('token');

    expect(instance.state.showErr).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(API_CALL_ITERERATION);
    global.fetch.mockClear();
  });

  it("getRouteOnToken post call on failure", async () => {
    const mockDirectionFailure = {
      status: FAILURE
    };
    renderShallow();
    const instance = wrapper.instance();
    const windowFetch = jest.spyOn(global, 'fetch');
    windowFetch.mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockDirectionFailure),
    }));
    await instance.getRouteOnToken('token');
    expect(instance.state.showErr).toBe(true);
  });

  it("getRouteOnToken post call on error", async () => {
    const windowFetch = jest.spyOn(global, 'fetch');
    renderShallow();
    const instance = wrapper.instance();
    const errorMessage = 'New Error'
    windowFetch.mockImplementation(() => Promise.reject(errorMessage))
    try {
      await instance.getRouteOnToken('token');
    }
    catch(e) {
      expect(e.message).toBe(errorMessage);
    }
  });
});
