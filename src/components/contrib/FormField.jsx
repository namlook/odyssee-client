import React, { PropTypes } from 'react';

const FormField = (props) => {
  const { label, placeholder, name, value, onChange, className, type } = props;
  const fieldClassName = `${className || ''} field`;
  return (
    <div className={fieldClassName}>
      {label ? <label>{label}</label> : null}
      <input
        name={name}
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(props.name, e.target.value)} />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FormField;
