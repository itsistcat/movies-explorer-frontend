import React from "react";
import PropTypes from "prop-types";

function Input({
  label,
  htmlFor,
  id,
  name,
  type,
  minLength,
  maxLength,
  autoComplete,
  onChange,
  errorCondition,
  errorMessage,
  pattern,
 }) {
  return (
    <div className="wrapper-input">
      <label className="label" htmlFor={htmlFor}>
        {label}
      </label>
      <input
        className="input input__auth"
        id={id}
        name={name}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={onChange}
        pattern={pattern}
        required
      />
    <span className={`error${(errorCondition && " error_visible") || ""}`}>
        {errorMessage}
      </span>
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  pattern: PropTypes.string,
  htmlFor: PropTypes.string,
  type: PropTypes.string,
  errorCondition: PropTypes.string,
  errorMessage: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  autoComplete: PropTypes.string,
};

export default Input;
