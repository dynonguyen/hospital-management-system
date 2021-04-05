import { Button, Modal, Table } from 'antd';
import helper from 'helper';
import PropTypes from 'prop-types';
import React from 'react';

const columns = [
  {
    key: 'USER_ID',
    title: 'User Id',
    dataIndex: 'USER_ID',
  },
  {
    title: 'User name',
    dataIndex: 'USERNAME',
    key: 'USERNAME',
  },
  {
    title: 'Status',
    dataIndex: 'ACCOUNT_STATUS',
    key: 'ACCOUNT_STATUS',
    responsive: ['sm'],
  },
  {
    title: 'Lock date',
    dataIndex: 'LOCK_DATE',
    key: 'LOCK_DATE',
    render: (date) => (date ? helper.formateDate(date) : '__'),
    responsive: ['md'],
  },
  {
    title: 'Expiry date',
    dataIndex: 'EXPIRY_DATE',
    key: 'EXPIRY_DATE',
    render: (date) => (date ? helper.formateDate(date) : '__'),
    responsive: ['md'],
  },
  {
    title: 'Created',
    dataIndex: 'CREATED',
    key: 'CREATED',
    render: (date) => (date ? helper.formateDate(date) : '__'),
    responsive: ['sm'],
  },
  {
    title: 'Default table',
    dataIndex: 'DEFAULT_TABLESPACE',
    key: 'DEFAULT_TABLESPACE',
    responsive: ['lg'],
  },
  {
    title: 'Temporary table',
    dataIndex: 'TEMPORARY_TABLESPACE',
    key: 'TEMPORARY_TABLESPACE',
    responsive: ['lg'],
  },
  {
    title: 'Profile',
    dataIndex: 'PROFILE',
    key: 'PROFILE',
    responsive: ['lg'],
  },
  {
    title: 'Authentication type',
    dataIndex: 'AUTHENTICATION_TYPE',
    key: 'AUTHENTICATION_TYPE',
    responsive: ['lg'],
  },
];

function UserDetailModal({ username, data, onClose }) {
  return (
    <Modal
      className="w-100"
      visible={true}
      centered
      title={`Thông tin chi tiết của ${username}`}
      onCancel={onClose}
      footer={[
        <Button key="0" type="primary" onClick={onClose}>
          Ok
        </Button>,
      ]}>
      <Table columns={columns} dataSource={data} pagination={false}></Table>
    </Modal>
  );
}

UserDetailModal.propTypes = {
  data: PropTypes.any,
  onClose: PropTypes.func,
  username: PropTypes.string,
};

UserDetailModal.defaultProps = {
  onClose: function () {},
  data: [],
  username: 'User',
};

export default UserDetailModal;
