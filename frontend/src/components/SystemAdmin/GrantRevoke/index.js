import {
  ShareAltOutlined,
  TableOutlined,
  TeamOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './index.scss';
import CreateRoleGrantRevoke from './Role';
import RoleGrantRevoke from './RolePrivileges';
import SystemPrivGrantRevoke from './SystemPrivileges';
import TablePrivGrantRevoke from './TablePrivileges';
import UserGrantRevoke from './User';

const { TabPane } = Tabs;

function GrantRevoke({ isUser, isEdit, username }) {
  const title = `${isEdit ? 'Edit ' : 'Create '} ${isUser ? 'User' : 'Role'} ${
    isEdit ? username : ''
  }`;
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
            {isUser ? <UserGrantRevoke /> : <CreateRoleGrantRevoke />}
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
            <RoleGrantRevoke isEdit={isEdit} />
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
            <SystemPrivGrantRevoke />
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
            <TablePrivGrantRevoke />
          </TabPane>
        </Tabs>

        <div className="t-right w-100">
          <Button
            type="dashed"
            style={{ width: 200 }}
            size="large"
            danger
            className="m-r-12">
            Reset
          </Button>
          <Button
            type="primary"
            style={{ width: 200 }}
            size="large"
            className="m-tb-8">
            Apply
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
};

GrantRevoke.defaultProps = {
  isUser: true,
  isEdit: false,
  username: '',
};

export default GrantRevoke;
