import { Input } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCreateRoleName } from 'redux/slices/sql.slice';

let timeout = null;

function CreateRoleGrantRevoke({ isEdit, roleName }) {
  const [inputError, setInputError] = useState('');
  const dispatch = useDispatch();
  const checkInput = (e) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      const { value } = e.target;
      const regex = /^([a-z]|[A-Z])+(_|\d|\w)*$/gi;
      if (regex.test(value.trim())) {
        setInputError('');
        dispatch(setCreateRoleName(value));
      } else {
        setInputError(
          'Tên Role không hợp lệ ! Ví dụ tên đúng: Role, Role01, Role_01',
        );
        dispatch(setCreateRoleName(''));
      }
    }, 300);
  };

  return (
    <div className="m-tb-16">
      <div className="d-flex">
        <label htmlFor="roleName" style={{ width: 180 }}>
          Role Name:
        </label>
        <div className="w-100">
          <Input
            disabled={isEdit}
            autoFocus
            onChange={checkInput}
            defaultValue={isEdit ? roleName : ''}
            name="roleName"
            size="large"
          />
          <p className="text-error m-t-8">{inputError}</p>
        </div>
      </div>
    </div>
  );
}

CreateRoleGrantRevoke.propTypes = {
  isEdit: PropTypes.bool,
  roleName: PropTypes.string,
};

CreateRoleGrantRevoke.defaultProps = {
  isEdit: false,
  roleName: '',
};

export default CreateRoleGrantRevoke;
