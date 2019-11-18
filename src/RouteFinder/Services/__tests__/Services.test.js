
import apiService from '../index';
import  {IN_PROGRESS, FAILURE, SUCCESS} from '../../Constants/index';


describe('Service test case', () => {
  /**
   * Service api test
   */

  it("Api call initiated with post data", async () => {
    const windowFetch = jest.spyOn(global, 'fetch');
    const mockData = {data: { token: 1}};
    const { data: { token } } = mockData;

    windowFetch.mockImplementation(() => Promise.resolve({
      token: 1,
      status: 200,
      json: () => Promise.resolve(mockData),
    }))
    const params = {method: 'post'};
    const data = {source: 'xyz', destination: 'dest'};
    const response = await apiService('url', params, data);
    expect(response.data.token).toBe(token)
    global.fetch.mockClear();
  });

  it("Service call with success resolve", async () => {
    const windowFetch = jest.spyOn(global, 'fetch');
    const mockData = {data: {status: SUCCESS}};
    const { data: { status }  } = mockData;

    windowFetch.mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockData),
    }));
    const response = await apiService('url');
    expect(response.data.status).toBe(status)
    global.fetch.mockClear();
  });

  it("Service call with inprogress resolve", async () => {
    const windowFetch = jest.spyOn(global, 'fetch');
    const mockData = {data: {status: IN_PROGRESS}};
    const { data: { status }  } = mockData;

    windowFetch.mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockData),
    }));
    const response = await apiService('url');
    expect(response.data.status).toBe(status)
    global.fetch.mockClear();
  });

  it("Service call with failure rejected", async () => {
    const windowFetch = jest.spyOn(global, 'fetch');
    windowFetch.mockImplementation(() => Promise.reject({
      status: FAILURE,
    }));
    const errorRespose = await apiService('url');
    expect(errorRespose.status).toBe(FAILURE)
    global.fetch.mockClear();
  });

});
