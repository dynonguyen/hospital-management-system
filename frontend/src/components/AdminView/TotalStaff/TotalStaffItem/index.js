import { Button } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './index.scss';

function TotalStaffItem(props) {
  const { title, amount, bgColor } = props;

  return (
    <div
      className="total-staff-item flex-dir-col w-100 flex-center p-lr-12 p-tb-32"
      style={{ backgroundColor: bgColor }}>
      <h3 className="total-staff-item-title">{title}</h3>
      <span className="total-staff-item-amount">{amount}</span>
      <p className="w-50 view-list t-center cur-pointer" size="large">
        Xem danh sách
      </p>
    </div>
  );
}

TotalStaffItem.propTypes = {
  amount: PropTypes.number,
  title: PropTypes.string,
  bgColor: PropTypes.string,
};

TotalStaffItem.defaultProps = {
  amount: 0,
  title: 'Số lượng nhân viên',
  bgColor: '#888',
};

export default TotalStaffItem;
