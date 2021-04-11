import helper from 'helper';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import './index.scss';

function SQLTab({ isUser, isEdit }) {
  const {
    createUserRoles,
    createUserPrivs,
    createUserInfo,
    createRoleName,
    createRoleRoles,
    createRolePrivs,
    editUserRole,
    editName,
    createUserTable,
  } = useSelector((state) => state.sql);

  return (
    <div className="sa-grant-content sql-grant">
      {isEdit === false && (
        <>
          {isUser ? (
            <>
              {/* create user/role */}
              {createUserInfo.username !== '' && (
                <>
                  <h3 className="sql-grant-title">------ CREATE USER: </h3>
                  <p className="sql-grant-code create">
                    {helper.convertCreateUserInfo(createUserInfo)}
                  </p>
                </>
              )}
              {/* granted roles */}
              {createUserRoles.length > 0 && (
                <>
                  <h3 className="sql-grant-title">------ GRANTED ROLES: </h3>
                  {helper
                    .convertRoleSql(createUserRoles, createUserInfo.username)
                    .map((item, key) => (
                      <p key={key} className="sql-grant-code granted-roles">
                        {item};
                      </p>
                    ))}
                </>
              )}
              {/* system privileges */}
              {createUserPrivs.length > 0 && (
                <>
                  <h3 className="sql-grant-title">------ SYSTEM PRIVILEGES:</h3>
                  {helper
                    .convertPrivSql(createUserPrivs, createUserInfo.username)
                    .map((item, key) => (
                      <p key={key} className="sql-grant-code sys-privs">
                        {item};
                      </p>
                    ))}
                </>
              )}
              {/* table privileges */}
              {createUserTable.length > 0 && (
                <>
                  <h3 className="sql-grant-title">------ TABLE PRIVILEGES: </h3>
                  {helper
                    .convertTablePrivilege(
                      createUserTable,
                      createUserInfo.username,
                    )
                    .map((item, index) => (
                      <p className="sql-grant-code table-priv" key={index}>
                        {item};
                      </p>
                    ))}
                </>
              )}
            </>
          ) : (
            <>
              {createRoleName !== '' && (
                <>
                  <h3 className="sql-grant-title">------ CREATE ROLE: </h3>
                  <p className="sql-grant-code create">
                    {`CREATE ROLE ${createRoleName};`}
                  </p>
                </>
              )}
              {/* granted roles */}
              {createRoleRoles.length > 0 && (
                <>
                  <h3 className="sql-grant-title">------ GRANTED ROLES: </h3>
                  {helper
                    .convertRoleSql(createRoleRoles, createRoleName)
                    .map((item, key) => (
                      <p key={key} className="sql-grant-code granted-roles">
                        {item};
                      </p>
                    ))}
                </>
              )}
              {/* system privileges */}
              {createRolePrivs.length > 0 && (
                <>
                  <h3 className="sql-grant-title">
                    ------ SYSTEM PRIVILEGES:{' '}
                  </h3>
                  {helper
                    .convertPrivSql(createRolePrivs, createRoleName)
                    .map((item, key) => (
                      <p key={key} className="sql-grant-code sys-privs">
                        {item};
                      </p>
                    ))}
                </>
              )}
              {/* table privileges */}
              {createUserTable.length > 0 && (
                <>
                  <h3 className="sql-grant-title">------ TABLE PRIVILEGES: </h3>
                  {helper
                    .convertTablePrivilege(
                      createUserTable,
                      createRoleName,
                      true,
                    )
                    .map((item, index) => (
                      <p className="sql-grant-code table-priv" key={index}>
                        {item};
                      </p>
                    ))}
                </>
              )}
            </>
          )}
        </>
      )}

      {isEdit && (
        <>
          {/* alter  user/roles */}
          {editName !== '' && (
            <>
              <h3 className="sql-grant-title">------ ALTER USER/ROLES: </h3>
              <p className="sql-grant-code create">
                {helper.convertAlterUserRole(editName, createUserInfo)};
              </p>
            </>
          )}
          {/* granted/revoke roles */}
          {editUserRole.length > 0 && (
            <>
              <h3 className="sql-grant-title">------ GRANTED/REVOKE ROLES: </h3>
              {helper
                .convertGrantRevoke(editUserRole, editName)
                .map((item, key) => (
                  <p key={key} className="sql-grant-code granted-roles">
                    {item};
                  </p>
                ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

SQLTab.propTypes = {
  isUser: PropTypes.bool,
  isEdit: PropTypes.bool,
};

SQLTab.defaultProps = {
  isUser: true,
  isEdit: false,
};

export default SQLTab;
