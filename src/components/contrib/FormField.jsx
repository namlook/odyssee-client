import React, { PropTypes } from 'react';

const FormField = (props) => {
  const { label, placeholder, name, value, onChange, onlyInput, className, pattern, type } = props;
  const fieldClassName = `${className || ''} field`;
  const input = (
    <input
      name={name}
      type={type || 'text'}
      pattern={pattern}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(props.name, e.target.value)} />
  );

  if (onlyInput) {
    return input;
  }

  return (
    <div className={fieldClassName}>
      {label ? <label>{label}</label> : null}
      {input}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  onlyInput: PropTypes.bool, // if true, don't wrap the input into a field
  pattern: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  inputStyle: PropTypes.object,
};

export default FormField;
