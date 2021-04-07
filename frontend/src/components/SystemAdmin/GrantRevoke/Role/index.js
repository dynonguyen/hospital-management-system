import { Input } from 'antd';
import React, { useState } from 'react';

function CreateRoleGrantRevoke() {
  const [inputError, setInputError] = useState('');

  const checkInput = (e) => {
    const { value } = e.target;
    const regex = /^([a-z]|[A-Z])+(_|\d|\w)*$/gi;
    if (regex.test(value.trim())) {
      setInputError('');
    } else {
      setInputError(
        'Tên Role không hợp lệ ! Ví dụ tên đúng: Role, Role01, Role_01',
      );
    }
  };

  return (
    <div className="m-tb-16">
      <div className="d-flex">
        <label htmlFor="roleName" style={{ width: 180 }}>
          Role Name:
        </label>
        <div className="w-100">
          <Input autoFocus onChange={checkInput} name="roleName" size="large" />
          <p className="text-error m-t-8">{inputError}</p>
        </div>
      </div>
    </div>
  );
}

export default CreateRoleGrantRevoke;
