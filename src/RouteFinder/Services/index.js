  /**
   * @method apiService
   * @description All api call use apiService method
   * @param {string} url api endPath
   * @param {Object} params parameter need to pass default blank object
   * @param {Object} data user data
   * @returns {Object} API response
   */
  const apiService = async (url, params = {}, data = {}) => {
    const defaultParams = {
      method: "get",
      headers: { "Content-type": "application/json" },
      data: data,
      ...params
    };
    return await fetch(url, defaultParams)
      .then(async response => await response.json())
      .catch((err) => err );
  };

  export default apiService;