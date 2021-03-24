import { Col, Row } from 'antd';
import React, { useState } from 'react';
import ListModal from './ListModal';
import TotalStaffItem from './TotalStaffItem';

const list = [
  {
    title: 'Số lượng Quản trị viên',
    key: 'admin',
    amount: 8,
  },
  {
    title: 'Số lượng Bác sĩ',
    key: 'doctor',
    amount: 232,
  },
  {
    title: 'Số lượng NV tài vụ',
    key: 'financial',
    amount: 15,
  },
  {
    title: 'Số lượng NV tiếp tân',
    key: 'receptionist',
    amount: 1000,
  },
  {
    title: 'Số lượng NV bán thuốc',
    key: 'pharmacist',
    amount: 150,
  },
  {
    title: 'Số lượng NV kế toán',
    key: 'accounting',
    amount: 24,
  },
];

const colorSchemes = [
  '#DC3F4D',
  '#F79279',
  '#36A693',
  '#8B3D88',
  '#487EF4',
  '#937465',
];

function TotalStaff() {
  const [viewList, setViewList] = useState({ visible: false, keyItem: null });
  // event on click view list in TotalStaffItem
  const onViewList = (keyItem) => {
    setViewList({ visible: true, keyItem });
  };

  // rendering ...
  return (
    <>
      {list.length && (
        <Row gutter={[16, 32]}>
          {list.map((item, index) => (
            <Col key={index} span={24} sm={12} lg={8}>
              <div>
                <TotalStaffItem
                  title={item.title}
                  amount={item.amount}
                  bgColor={colorSchemes[parseInt(index % list.length)]}
                  keyItem={item.key}
                  onViewList={onViewList}
                />
              </div>
            </Col>
          ))}
        </Row>
      )}

      {viewList.visible && (
        <ListModal
          keyItem={viewList.keyItem}
          onClose={() => setViewList({ visible: false, keyItem: null })}
        />
      )}
    </>
  );
}

export default TotalStaff;
