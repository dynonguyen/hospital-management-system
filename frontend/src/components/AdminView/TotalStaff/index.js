import { Col, Row } from 'antd';
import React from 'react';
import TotalStaffItem from './TotalStaffItem';

const list = [
  {
    title: 'Số lượng Quản trị viên',
    amount: 8,
  },
  {
    title: 'Số lượng Bác sĩ',
    amount: 232,
  },
  {
    title: 'Số lượng NV tài vụ',
    amount: 15,
  },
  {
    title: 'Số lượng NV tiếp tân',
    amount: 1000,
  },
  {
    title: 'Số lượng NV bán thuốc',
    amount: 150,
  },
  {
    title: 'Số lượng NV kế toán',
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
                />
              </div>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default TotalStaff;
