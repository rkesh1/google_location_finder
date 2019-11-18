import React, {Fragment} from "react";
import SearchForm from "./component/SearchForm";
import GoogleMap from "./component/GoogleMap";
import apiService from "./Services/index";
import {API_CALL_ITERERATION, INTERNAL_SERVER_ERROR, ZOOM, SUCCESS, IN_PROGRESS, FAILURE, REACT_APP_BASE_URL} from './Constants/index'; 
import "./index.scss";


/**
 * A component App initilization
 * @returns {Element} Rendered App
 */
class RouteFinder extends React.Component {
  /**
   * @method constructor
   * @description By default sets the state
   * @param {object} props Incoming props
   */
  constructor(props) {
    super(props);
    this.state = {
      cordinateData: [],
      renderPath: false,
      showErr: false,
      errorResponse: "",
      loader: false,
      totalDistance: "",
      totalTime: "",
      clearTextField: false,
      map: null,
      resubmit: false,
    };
    this.iteration = 0;
  }

  componentDidMount() {
    const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
    const GoogleMAPURL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
    const scriptObj = document.createElement("script");
    scriptObj.type = "text/javascript";
    scriptObj.async = true;
    scriptObj.src = GoogleMAPURL;
    document.body.appendChild(scriptObj);

    scriptObj.addEventListener("load", () => {
      this.setState({ map: window.google.maps });
    });
  }

  /**
   * @method resetFormHandler
   * @description resetFormHandler use to clear form field
   */
  resetFormHandler = () => {
    this.setState({
      renderPath: false,
      clearTextField: true,
      showErr: false,
      resubmit: false,
    });
  };

  /**
   * @method resetFormCompleted
   * @description resetFormCompleted use for clear ref data
   */
  resetFormCompleted = () => {
    this.setState({
      clearTextField: false
    });
  };

      /**
   * @method clearField
   * @description clear field on event of cross button
   */
  clearMessage = (e) => {
    this.setState({
      renderPath: false,
      showErr: false,
    });
  }

  loaderInit = () => {
    this.setState({
      loader: true,
      showErr: false,
      renderPath: false,
    });
  }
  /**
   * @method getRouteOnToken
   * @description call api with token for get route path coordinate
   * @param {string} token geting from api
   */
  getRouteOnToken = async token => {
    this.iteration++;
    const url = `${REACT_APP_BASE_URL}route/${token}`;
    const responseData = await apiService(url);
    if (responseData.status === SUCCESS) {
      this.setState({
        cordinateData: responseData.path,
        renderPath: true,
        loader: false,
        totalDistance: responseData.total_distance,
        totalTime: responseData.total_time,
        resubmit: true
      });
    } else if (responseData.status === IN_PROGRESS && this.iteration < API_CALL_ITERERATION) {
      
      await this.getRouteOnToken(token);
    } else {
      const errorMsg =
          responseData.status === FAILURE
            ? responseData.error
            : INTERNAL_SERVER_ERROR;

      this.setState({
        showErr: true,
        errorResponse: errorMsg,
        renderPath: false,
        resubmit: true,
        loader: false,
      });
    }
  };

  /**
   * @method submitFormHandler
   * @description Submit form and and get tocken
   * @param {Object} data user form field data
   */
  submitFormHandler = async data => {
    const {source, destination} = data;
    this.iteration = 0;
    const url = `${REACT_APP_BASE_URL}route`;
    const params = {
      method: "post",
      data: { origin: source, destination: destination }
    };
    
    this.loaderInit();
    const responseData = await apiService(url, params);
    this.setState({resubmit: true});
    if (responseData.token) {
      this.getRouteOnToken(responseData.token); 
    }else{
    this.setState({
      errorResponse: INTERNAL_SERVER_ERROR,
      showErr: true,
      loader: false,
      renderPath: false
    });
    }
  };

  render() {
    const {
      cordinateData,
      renderPath,
      showErr,
      errorResponse,
      loader,
      totalDistance,
      totalTime,
      clearTextField,
      map,
      resubmit
    } = this.state;
    const message = {
      totalDistance,
      totalTime,
      renderPath,
      errorResponse,
      showErr
    };
    return (
      <div className="App">
        <div className="container">
          {loader && (
            <Fragment>
              <div className="loader-overlay">
              </div>
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            </Fragment>
          )}
          <div className="leftContainer">
            {map && (
              <SearchForm
                submitFormHandler={this.submitFormHandler}
                message={message}
                resetFormHandler={this.resetFormHandler}
                clearTextField={clearTextField}
                resetFormCompleted={this.resetFormCompleted}
                resubmit={resubmit}
                clearMessage={this.clearMessage}
              />
            )}
          </div>
          <div className="rightContainer">
            {map && (
              <GoogleMap
                cordinateData={cordinateData}
                renderPath={renderPath}
                zoom={ZOOM}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default RouteFinder;
