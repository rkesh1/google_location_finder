import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '../AutoComplete';
import Button from '../Button';
import './index.scss';

class SearchForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      formData: {
        destination: '',
        source: ''
      },
      disabled: true,
    }
  }

   /**
   * @method showPlaceDetails
   * @description Get data from input field and stored in state 
   * @param {string} name is used to input field name
   * @param {string} value is return from Autocomplete value
   */
  showPlaceDetails = (name, value) => {
    const {formData} = this.state;
    const newObj = {...formData, [name]:value};
    const {source, destination} = newObj;
    const disabled = source === '' || destination === '' || value === '';
    this.setState({
      formData: {...formData, [name]:value},
      disabled
    });
  }

  /**
   * @method submitForm
   * @description Submit form handler submit form data  
   */
  submitForm = () => {
    const {submitFormHandler} = this.props;
    const {formData} = this.state;
    submitFormHandler(formData);
  }

  

  render(){
    const {formData, disabled} = this.state;
    const {source, destination} = formData;
    const {message, clearTextField, resetFormCompleted, resetFormHandler, resubmit, clearMessage }  = this.props;
    const commonProps = {
      onPlaceChanged: this.showPlaceDetails,
      clearTextField,
      resetFormCompleted,
      clearMessage
    }
    const inputField = [{
      labelTitle: 'Starting location',
      name: 'source',
      value: source,
      id: 'source',
      type: 'text',
      placeholder: 'Starting location',
      ...commonProps
    },
    {
      labelTitle: 'Drop-off point',
      name: 'destination',
      value: destination,
      id: 'destination',
      type: 'text',
      placeholder: 'Drop-off point',
      ...commonProps
    }
  ];

    const submitButton = {
      value: resubmit ? 'Re-Submit': 'Submit',
      clickHandler: this.submitForm,
    }
    
    const {showErr, errorResponse, renderPath, totalDistance, totalTime} = message;
    return (
      <div className="formContainer">
        { inputField.map((item,key) => (
          <Autocomplete {...item}  key={key}/>
        ))}
      {showErr && 
        <div className="error-container">
          <p>{errorResponse}</p>
        </div>
        }
        {renderPath && 
        <div className="info">
          <p>total distance: {totalDistance}</p>
          <p>total time: {totalTime}</p>
        </div>
        }
      <div className="form-element form-controller">
        <Button {...submitButton} disabled={disabled} additionClass="primary-btn"/>
        <Button {...submitButton} value="Reset" clickHandler={resetFormHandler} />
      </div>
    </div>
    );
  }
  
}

SearchForm.propTypes = {
  submitFormHandler: PropTypes.func.isRequired,
  resetFormHandler: PropTypes.func.isRequired,
  clearTextField: PropTypes.bool,
  message: PropTypes.object,
  resubmit:PropTypes.bool,
  clearMessage:PropTypes.func,
};

SearchForm.defaultProps = {
  message: {},
  clearTextField: false,
  resubmit: false,
  clearMessage: ()=>{},
};
export default SearchForm;
