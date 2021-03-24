import React from 'react';
import PropTypes from 'prop-types';

function FieldInput({
  name,
  register,
  placeholder,
  errors,
  isLarge,
  type,
  ...rest
}) {
  return (
    <>
      <input
        name={name}
        type={type}
        ref={register}
        placeholder={placeholder}
        className={`field-cus ${isLarge ? 'large' : ''} ${
          errors ? 'input-error ani-error' : ''
        }`}
        {...rest}
      />
      <p className="text-error">{errors?.message}</p>
    </>
  );
}

FieldInput.propTypes = {
  errors: PropTypes.object,
  isLarge: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.any,
  type: PropTypes.string,
};

FieldInput.defaultProps = {
  isLarge: true,
  type: 'text',
};

export default FieldInput;
