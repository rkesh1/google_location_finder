import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Button = (props) => {
  const { value, clickHandler, additionClass, disabled } = props;
  return (
    <button type="button" onClick={clickHandler} className={additionClass} disabled={disabled}>{value}</button>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  additionClass: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  additionClass: '',
  disabled: false
};
export default Button;
