import React from "react";
import PropTypes from 'prop-types';
import './index.scss';

/**
 * A component Autocomplete initilization 
 * @returns {Element} Rendered App
 */
class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    const {id} = props;
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.state = {
      [id]: false

    }
  }

  static getDerivedStateFromProps(nextProps) {
    const {clearTextField, id} = nextProps;
    if(clearTextField){
      document.getElementById([id]).value = '';
      nextProps.resetFormCompleted();
      nextProps.onPlaceChanged([id], '');
      return {
        [id]:false,
      };
    }
    return null;
  }

  async componentDidMount() {
    this.autocomplete = new window.google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  }

  /**
   * @method handlePlaceChanged
   * @description Added event on dropdown of autocomplete
   */
  handlePlaceChanged = () => {
    const {name, onPlaceChanged} = this.props;
    const place = this.autocomplete.getPlace();
    const {current:{id}} = this.autocompleteInput;
    const {name:value} = place;
    onPlaceChanged(name, value);
    this.setState({
      [id]: true
    });
  }

  /**
   * @method clearField
   * @description clear field on event of cross button
   */
  clearField = (e) => {
    const {onPlaceChanged, clearMessage} = this.props;
    const {current:{id, name}} = this.autocompleteInput;
     this.autocompleteInput.current.value = '';
     this.setState({
       [id]: false
     });
     onPlaceChanged(name, '');
     clearMessage();
  }

  changeHandler = (e) => {
    const {onPlaceChanged} = this.props;
    const {id, name, value} = e.target;
    this.setState({
      [id]: true
    });
    onPlaceChanged(name, value);
  }

  render() {
    const { labelTitle, name,  id, type, placeholder } = this.props;
    const {[id]: cross } = this.state;
    return (
        <div className="form-element">
          <label className="input-label" htmlFor={id}>{labelTitle}</label>
        <input
          ref={this.autocompleteInput}
          id={id}
          placeholder={placeholder}
          type={type}
          name={name}
          onChange={this.changeHandler}
        /> 
        {cross && <span className="cross" onClick={this.clearField}>X</span> }
      </div>
    );
  }
}

Autocomplete.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired,

  clearTextField: PropTypes.bool,
  onPlaceChanged:PropTypes.func.isRequired,
  resetFormCompleted:PropTypes.func.isRequired,
  clearMessage: PropTypes.func,
};

Autocomplete.defaultProps = {
  placeholder: '',
  id: 'xyz',
  name: 'pqr',
  labelTitle: 'Title',
  clearTextField: false,
  clearMessage: ()=>{},
};
export default Autocomplete;