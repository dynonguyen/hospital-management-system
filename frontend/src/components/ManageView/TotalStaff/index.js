import { Col, message, Row } from 'antd';
import manageApi from 'apis/manageApi';
import React, { useEffect, useState } from 'react';
import ListModal from './ListModal';
import TotalStaffItem from './TotalStaffItem';

const colorSchemes = [
  '#DC3F4D',
  '#F79279',
  '#36A693',
  '#8B3D88',
  '#487EF4',
  '#937465',
  '#209CFC',
  '#39981D',
  '#FFB332',
];

function TotalStaff() {
  const [viewList, setViewList] = useState({ visible: false, keyItem: null });
  const [list, setList] = useState([
    {
      title: 'Quản trị viên',
      key: 'SYS_ADMIN',
      amount: 0,
    },
    {
      title: 'QL tài vụ',
      key: 'ACCOUNTING_MANAGER',
      amount: 0,
    },
    {
      title: 'QL chuyên môn',
      key: 'SPECIALIZE_MANAGER',
      amount: 0,
    },
    {
      title: 'QL nhân lực',
      key: 'HR_MANAGER',
      amount: 0,
    },
    {
      title: 'Bác sĩ',
      key: 'DOCTOR',
      amount: 0,
    },
    {
      title: 'NV tiếp tân',
      key: 'RECEPTIONIST',
      amount: 0,
    },
    {
      title: 'NV tài vụ',
      key: 'FINANCE_STAFF',
      amount: 0,
    },
    {
      title: 'NV bán thuốc',
      key: 'PHARMACIST',
      amount: 0,
    },
    {
      title: 'NV kế toán',
      key: 'ACCOUNTING_STAFF',
      amount: 0,
    },
  ]);

  // event on click view list in TotalStaffItem
  const onViewList = (keyItem) => {
    setViewList({ visible: true, keyItem });
  };

  useEffect(() => {
    (async function () {
      try {
        const apiRes = await manageApi.getEmployeeStatistic();
        if (apiRes.status === 200) {
          const { statList } = apiRes.data;

          const newList = list.map((item) => {
            const role = statList.find(
              (i) => i.ROLE.toLowerCase() === item.key.toLowerCase(),
            );
            return { ...item, amount: role?.AMOUNT };
          });

          setList(newList);
        }
      } catch (error) {
        message.error('Thống kê thất bại, thử lại');
      }
    })();

    return () => {};
  }, []);

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
