import { Button, Modal, Table } from 'antd';
import helper from 'helper';
import PropTypes from 'prop-types';
import React from 'react';

let list = [];
for (let i = 0; i < 20; ++i) {
  list.push({
    key: i,
    id: `NV0${i}`,
    userName: `user0${i}`,
    name: 'Nhân viên ' + i,
    age: i + 18,
    address: 'Hồ Chí Minh',
    phone: `037775757${i}`,
    department: 'Phòng ban ' + i,
  });
}

let columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'user name',
    dataIndex: 'userName',
  },
  {
    title: 'Tên',
    dataIndex: 'name',
  },
  {
    title: 'Tuổi',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
    responsive: ['sm'],
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    responsive: ['sm'],
  },
  {
    title: 'Sđt',
    dataIndex: 'phone',
    responsive: ['md'],
  },
  {
    title: 'Phòng ban',
    dataIndex: 'department',
    responsive: ['lg'],
  },
];

function ListModal(props) {
  const { keyItem, onClose } = props;

  if (window.innerWidth < 767)
    columns.push({
      responsive: null,
      render: () => <Button type="link">Xem chi tiết</Button>,
    });

  return (
    <Modal
      className="w-100"
      visible={true}
      onCancel={onClose}
      centered
      title={<h3>{helper.convertModalKeyItem(keyItem)}</h3>}
      footer={[
        <Button key={0} type="primary" onClick={onClose}>
          OK
        </Button>,
      ]}>
      <Table columns={columns} dataSource={list} />
    </Modal>
  );
}

ListModal.propTypes = {
  keyItem: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ListModal;
