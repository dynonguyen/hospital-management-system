import GrantRevoke from 'components/SystemAdmin/GrantRevoke';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetGrantedRoles } from 'redux/slices/sql.slice';

function CreateRole() {
  const dispatch = useDispatch();
  const onCreateRole = (v) => {
    try {
      console.log(v);
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(resetGrantedRoles({ isUser: false }));
  }, []);

  return (
    <GrantRevoke isUser={false} onCreateRole={onCreateRole} isEdit={false} />
  );
}

export default CreateRole;
