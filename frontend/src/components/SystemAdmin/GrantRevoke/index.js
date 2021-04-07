import {
  ShareAltOutlined,
  TableOutlined,
  TeamOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import React from 'react';
import './index.scss';
import UserGrantRevoke from './User';
const { TabPane } = Tabs;

function GrantRevoke() {
  return (
    <div className="p-32">
      <h1 className="sa-grant-title m-b-8">Create User</h1>
      <div className="sa-grant">
        <Tabs defaultActiveKey="user" type="card">
          <TabPane
            tab={
              <span>
                <UserAddOutlined />
                User
              </span>
            }
            key="user">
            <UserGrantRevoke />
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
          </TabPane>
          <TabPane
            tab={
              <span>
                <TeamOutlined />
                Granted Roles
              </span>
            }
            key="role">
            phân quyền theo vai trò
          </TabPane>
          <TabPane
            tab={
              <span>
                <ShareAltOutlined />
                System Privileges
              </span>
            }
            key="priv">
            Phân quyền theo quyền hệ thống
          </TabPane>
          <TabPane
            tab={
              <span>
                <TableOutlined />
                Table Privileges
              </span>
            }
            key="table">
            Phân quyền theo bảng
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default GrantRevoke;
