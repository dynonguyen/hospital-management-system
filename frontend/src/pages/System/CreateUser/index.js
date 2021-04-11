import { message } from 'antd';
import systemApi from 'apis/systemApi';
import GrantRevoke from 'components/SystemAdmin/GrantRevoke';
import helper from 'helper';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetGrantedRoles } from 'redux/slices/sql.slice';
function CreateUser() {
  const dispatch = useDispatch();
  const { createUserRoles, createUserPrivs, createUserTable } = useSelector(
    (state) => state.sql,
  );
  //  handle create user
  const onCreateUser = async (userInfo) => {
    try {
      const createUserSql = helper.convertCreateUserInfo(userInfo);
      const roleSql = helper.convertRoleSql(
        createUserRoles,
        userInfo.username,
        1,
      );
      const privSql = helper.convertPrivSql(createUserPrivs, userInfo.username);
      const privTable = helper.convertTablePrivilege(
        createUserTable,
        userInfo.username,
        false,
      );
      const createRes = await systemApi.postCreateUser(
        createUserSql,
        [...roleSql.sqlList, ...privSql, ...privTable],
        roleSql.defaultRole,
      );

      if (createRes) {
        message.success('Tạo user thành công', 2);
      }
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message, 2);
      } else {
        message.error('Tạo user không thành công, thử lại', 2);
      }
    }
  };

  useEffect(() => {
    dispatch(resetGrantedRoles({ isUser: true }));
  }, []);

  return (
    <GrantRevoke onCreateUser={onCreateUser} isUser={true} isEdit={false} />
  );
}

export default CreateUser;
