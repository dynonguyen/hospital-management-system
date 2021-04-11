import { message } from 'antd';
import systemApi from 'apis/systemApi';
import GrantRevoke from 'components/SystemAdmin/GrantRevoke';
import helper from 'helper';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetGrantedRoles } from 'redux/slices/sql.slice';

function CreateRole() {
  const dispatch = useDispatch();
  const {
    createRoleName,
    createRoleRoles,
    createRolePrivs,
    createUserTable,
  } = useSelector((state) => state.sql);
  const onCreateRole = async () => {
    try {
      if (createRoleName === '') {
        message.error('Vui lòng nhập tên Role !', 2);
        return;
      }

      const sqlList = [
        ...helper.convertRoleSql(createRoleRoles, createRoleName, 0, true),
        ...helper.convertPrivSql(createRolePrivs, createRoleName, true),
        ...helper.convertTablePrivilege(createUserTable, createRoleName, true),
      ];

      const createRes = await systemApi.postCreateRole(
        `CREATE ROLE ${createRoleName}`,
        sqlList,
      );
      if (createRes) {
        message.success('Tạo role thành công.');
      }
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message, 2);
      } else {
        message.error('Tạo role thất bại', 2);
      }
    }
  };

  useEffect(() => {
    dispatch(resetGrantedRoles({ isUser: false }));
  }, []);

  return (
    <GrantRevoke isUser={false} onCreateRole={onCreateRole} isEdit={false} />
  );
}

export default CreateRole;
