import {
  ShareAltOutlined,
  TableOutlined,
  TeamOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { resetCreateUserInfo } from 'redux/slices/sql.slice';
import './index.scss';
import CreateRoleGrantRevoke from './Role';
import RoleGrantRevoke from './RolePrivileges';
import SQLTab from './SQLTab';
import SystemPrivGrantRevoke from './SystemPrivileges';
import TablePrivGrantRevoke from './TablePrivileges';
import UserGrantRevoke from './User';
const { TabPane } = Tabs;

function GrantRevoke(props) {
  const {
    isUser,
    isEdit,
    username,
    onCreateUser,
    onCreateRole,
    onEditUserRolePriv,
  } = props;
  const dispatch = useDispatch();
  const title = `${isEdit ? 'Edit ' : 'Create '} ${isUser ? 'User' : 'Role'} ${
    isEdit ? username : ''
  }`;

  const userForm = useRef(null);
  const handleForm = (form) => {
    userForm.current = form;
  };

  const btnProps = isUser
    ? isEdit
      ? { onClick: onEditUserRolePriv }
      : { htmlType: 'submit', form: 'grant-form' }
    : {
        onClick: onCreateRole,
      };

  // reset create user form
  const resetUserForm = () => {
    userForm.current.resetFields();
    dispatch(resetCreateUserInfo());
  };

  return (
    <div className="p-32">
      <h1 className="sa-grant-title m-b-8">{title}</h1>
      <div className="sa-grant">
        <Tabs defaultActiveKey="user" type="card">
          {/* user */}
          <TabPane
            tab={
              <span>
                <UserAddOutlined />
                {isUser ? 'User' : 'Role'}
              </span>
            }
            key="user">
            {isUser ? (
              <UserGrantRevoke
                onCreateUser={onCreateUser}
                isEdit={isEdit}
                name={username}
                handleForm={handleForm}
              />
            ) : (
              <CreateRoleGrantRevoke
                isEdit={isEdit}
                roleName={username}
                onCreateRole={onCreateRole}
              />
            )}
          </TabPane>

          {/* granted roles */}
          <TabPane
            tab={
              <span>
                <TeamOutlined />
                Granted Roles
              </span>
            }
            key="role">
            <RoleGrantRevoke isEdit={isEdit} isUser={isUser} />
          </TabPane>

          {/* system privileges */}
          <TabPane
            tab={
              <span>
                <ShareAltOutlined />
                System Privileges
              </span>
            }
            key="priv">
            <SystemPrivGrantRevoke isUser={isUser} isEdit={isEdit} />
          </TabPane>

          {/* table privileges */}
          <TabPane
            tab={
              <span>
                <TableOutlined />
                Table Privileges
              </span>
            }
            key="table">
            <TablePrivGrantRevoke isUser={isUser} isEdit={isEdit} />
          </TabPane>

          {/* sql */}
          <TabPane
            tab={
              <span>
                <TableOutlined />
                SQL
              </span>
            }
            key="sql">
            <SQLTab isUser={isUser} isEdit={isEdit} />
          </TabPane>
        </Tabs>

        {/* button action */}
        <div className="t-right w-100">
          {isUser && !isEdit && (
            <Button
              type="dashed"
              style={{ width: 200 }}
              size="large"
              danger
              onClick={resetUserForm}
              className="m-r-12">
              Reset
            </Button>
          )}
          <Button
            type="primary"
            style={{ width: 200 }}
            size="large"
            {...btnProps}
            className="m-tb-8">
            {isEdit ? 'Apply' : 'Create'}
          </Button>
        </div>
      </div>
    </div>
  );
}

GrantRevoke.propTypes = {
  isUser: PropTypes.bool,
  isEdit: PropTypes.bool,
  username: PropTypes.string,
  onCreateUser: PropTypes.func,
  onCreateRole: PropTypes.func,
  onEditUserRolePriv: PropTypes.func,
};

GrantRevoke.defaultProps = {
  isUser: true,
  isEdit: false,
  username: '',
  onCreateUser: () => {},
  onCreateRole: () => {},
  onEditUserRolePriv: () => {},
};

export default GrantRevoke;
