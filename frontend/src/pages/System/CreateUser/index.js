import GrantRevoke from 'components/SystemAdmin/GrantRevoke';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetGrantedRoles } from 'redux/slices/sql.slice';
function CreateUser() {
  const dispatch = useDispatch();
  const onCreateUser = (v) => {
    try {
      console.log(v);
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(resetGrantedRoles({ isUser: true }));
  }, []);

  return (
    <GrantRevoke onCreateUser={onCreateUser} isUser={true} isEdit={false} />
  );
}

export default CreateUser;
