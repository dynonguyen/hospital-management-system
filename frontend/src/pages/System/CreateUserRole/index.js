import PropTypes from 'prop-types';
import GrantRevoke from 'components/SystemAdmin/GrantRevoke';
import React from 'react';

function CreateUserRole({ isUser }) {
  return <GrantRevoke isUser={isUser} />;
}

CreateUserRole.propTypes = {
  isUser: PropTypes.bool,
};

CreateUserRole.defaultProps = {
  isUser: true,
};

export default CreateUserRole;
