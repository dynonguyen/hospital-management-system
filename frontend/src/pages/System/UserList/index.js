import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { message, Spin, Table, Tooltip } from 'antd';
import systemApi from 'apis/systemApi';
import UserDetailModal from 'components/SystemAdmin/UserDetailModal';
import helper from 'helper';
import React, { useEffect, useState } from 'react';
import './index.scss';

function SystemUserList() {
  const [data, setData] = useState([]);
  const [showUserDetail, setShowUserDetail] = useState({
    visible: false,
    username: '',
    data: [],
  });

  // event: get detail user
  const getDetailUser = async (userId, username) => {
    try {
      const response = await systemApi.getDetailUser(userId);
      if (response) {
        setShowUserDetail({
          visible: true,
          username,
          data: [{ ...response.data.user, key: 0 }],
        });
      }
    } catch (error) {
      message.error(`Lấy thông tin của người dùng ${username} thất bại`), 2;
    }
  };

  const columns = [
    {
      key: 'USER_ID',
      title: 'User Id',
      dataIndex: 'USER_ID',
      sorter: {
        compare: (a, b) => a.USER_ID - b.USER_ID,
        multiple: 1,
      },
    },
    {
      title: 'User name',
      dataIndex: 'USERNAME',
      key: 'USERNAME',
      sorter: {
        compare: (a, b) =>
          a.USERNAME > b.USERNAME ? 1 : a.USERNAME === b.USERNAME ? 0 : -1,
        multiple: 2,
      },
    },
    {
      title: 'Status',
      dataIndex: 'ACCOUNT_STATUS',
      key: 'ACCOUNT_STATUS',
      responsive: ['sm'],
      filters: [
        {
          text: 'OPEN',
          value: 'open',
        },
        {
          text: 'LOCKED',
          value: 'locked',
        },
        {
          text: 'EXPIRED & LOCKED',
          value: 'expired & locked',
        },
      ],
      onFilter: (value, record) =>
        record.ACCOUNT_STATUS.toLowerCase().indexOf(value) === 0,
    },
    {
      title: 'Lock date',
      dataIndex: 'LOCK_DATE',
      key: 'LOCK_DATE',
      render: (date) => (date ? helper.formateDate(date) : '__'),
      responsive: ['md'],
      sorter: (a, b) =>
        new Date(a.LOCK_DATE).getTime() - new Date(b.LOCK_DATE).getTime(),
    },
    {
      title: 'Expiry date',
      dataIndex: 'EXPIRY_DATE',
      key: 'EXPIRY_DATE',
      render: (date) => (date ? helper.formateDate(date) : '__'),
      responsive: ['md'],
      sorter: (a, b) =>
        new Date(a.EXPIRY_DATE).getTime() - new Date(b.EXPIRY_DATE).getTime(),
    },
    {
      title: 'Created',
      dataIndex: 'CREATED',
      key: 'CREATED',
      render: (date) => (date ? helper.formateDate(date) : '__'),
      responsive: ['sm'],
      sorter: (a, b) =>
        new Date(a.CREATED).getTime() - new Date(b.CREATED).getTime(),
    },
    {
      title: 'Default table',
      dataIndex: 'DEFAULT_TABLESPACE',
      key: 'DEFAULT_TABLESPACE',
      responsive: ['lg'],
      filters: [
        { text: 'SYSTEM', value: 'system' },
        { text: 'SYSAUX', value: 'sysaux' },
        { text: 'USER', value: 'user' },
      ],
      onFilter: (value, record) =>
        record.DEFAULT_TABLESPACE.toLowerCase().indexOf(value) === 0,
    },
    {
      title: 'Action',
      render: (record) => (
        <>
          <Tooltip title="Xem chi tiết">
            <EyeOutlined
              onClick={() => getDetailUser(record.USER_ID, record.USERNAME)}
              className="action-icon view"
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <EditOutlined className="p-lr-12 action-icon edit" />
          </Tooltip>
          <Tooltip title="Xoá">
            <DeleteOutlined className="action-icon delete" />
          </Tooltip>
        </>
      ),
    },
  ];

  useEffect(() => {
    async function getUserList() {
      try {
        const res = await systemApi.getUserList();
        if (res) {
          const userList = res.data.userList.map((item, index) => ({
            ...item,
            key: index,
          }));
          setData(userList);
        }
      } catch (error) {}
    }

    getUserList();
  }, []);

  return (
    <>
      {showUserDetail.visible && (
        <UserDetailModal
          onClose={() =>
            setShowUserDetail({ visible: false, username: '', data: [] })
          }
          username={showUserDetail.username}
          data={showUserDetail.data}
        />
      )}
      {data.length <= 0 ? (
        <Spin
          tip="Đang tải dữ liệu ..."
          size="large"
          className="trans-center"
        />
      ) : (
        <div className="p-16">
          <Table
            className="admin-box-sha"
            columns={columns}
            dataSource={data}
            pagination={{ className: 't-center p-tb-8' }}
          />
        </div>
      )}
    </>
  );
}

export default SystemUserList;
