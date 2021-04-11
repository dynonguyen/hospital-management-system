import { Col, Progress, Row, Spin, Tooltip } from 'antd';
import systemApi from 'apis/systemApi';
import dbIconUrl from 'assets/icons/db-icon.png';
import roleIconUrl from 'assets/icons/role-icon.png';
import tableIconUrl from 'assets/icons/table-icon.png';
import viewIconUrl from 'assets/icons/view-icon.png';
import pieChartUrl from 'assets/images/pie-chart.png';
import React, { useEffect, useState } from 'react';
import './index.scss';

function renderUserStatList(list, totalUser) {
  return list.map((item, index) => (
    <Col span={12} key={index}>
      <Tooltip
        title={`Number of ${item.title}: ${item.count}`}
        placement="bottom">
        <div className="sys-dash-box sys-dash-user-detail flex-center--col">
          <p>{item.title}</p>
          <Progress
            className="rate"
            strokeLinecap="square"
            type="circle"
            strokeColor={item.color}
            percent={Math.round((item.count * 100) / totalUser)}
          />
        </div>
      </Tooltip>
    </Col>
  ));
}

function renderOtherStatList(list = []) {
  return list.map((item, index) => (
    <Col span={24} md={12} xl={6} key={index}>
      <div
        className="sys-dash-box sys-dash-others-item d-flex"
        style={{ backgroundColor: item.color }}>
        <div className="icon flex-center">
          <img src={item.icon} alt="Icon" />
        </div>
        <div className="flex-col flex-grow-1">
          <p className="statistic-num flex-center">{item.count}</p>
          <p className="statistic-title flex-center">{item.title}</p>
        </div>
      </div>
    </Col>
  ));
}

function SystemDashboard() {
  const [statData, setStatData] = useState(null);
  useEffect(() => {
    let isSubscribe = true;
    (async function getStatisticDash() {
      try {
        const result = await systemApi.getStatisticDash();
        if (result) {
          const {
            TOTALSGA,
            NOROLE,
            NOVIEW,
            NOTABLE,
            NOUSER,
            NOOPENEDUSER,
            NOLOCKEDUSER,
            NOADMINUSER,
            NONEWUSER,
          } = result.data.statisticData;

          setTimeout(() => {
            if (isSubscribe) {
              setStatData({
                totalUser: NOUSER,
                userStatList: [
                  {
                    title: 'Opened User',
                    count: NOOPENEDUSER,
                    color: '#fe9897',
                  },
                  {
                    title: 'Locked User',
                    count: NOLOCKEDUSER,
                    color: '#fe9807',
                  },
                  {
                    title: 'Admin Users',
                    count: NOADMINUSER,
                    color: '#367d3a',
                  },
                  {
                    title: 'New Users',
                    count: NONEWUSER,
                    color: '#2297f8',
                  },
                ],
                otherList: [
                  {
                    title: 'Total SGA (MB)',
                    count: TOTALSGA.toFixed(2),
                    color: '#fe9807',
                    icon: dbIconUrl,
                  },
                  {
                    title: 'Number Of Role',
                    count: NOROLE,
                    color: '#fe9897',
                    icon: roleIconUrl,
                  },
                  {
                    title: 'Number Of View',
                    count: NOVIEW,
                    color: '#367d3a',
                    icon: viewIconUrl,
                  },
                  {
                    title: 'Number Of Table',
                    count: NOTABLE,
                    color: '#2297f8',
                    icon: tableIconUrl,
                  },
                ],
              });
            }
          }, 500);
        }
      } catch (error) {}
    })();
    return () => (isSubscribe = false);
  }, []);

  return (
    <>
      {!statData ? (
        <Spin
          tip="Đang thống kê dữ liệu ..."
          size="large"
          className="trans-center"
        />
      ) : (
        <Row className="p-32 sys-dash" gutter={[16, 16]}>
          <Col span={24} className="sys-dash-others m-b-32">
            <Row gutter={[16, 16]}>
              {renderOtherStatList(statData.otherList)}
            </Row>
          </Col>
          {/* users count box */}
          <Col span={24} lg={12} xl={8}>
            <Tooltip title={`Number of users: ${statData.totalUser}`}>
              <div className="sys-dash-users sys-dash-box flex-center--col">
                <img className="pos-abs" src={pieChartUrl} />
                <h2>Users</h2>
                <span>{statData.totalUser}</span>
              </div>
            </Tooltip>
          </Col>
          <Col span={24} lg={12} xl={16}>
            <Row gutter={[8, 8]}>
              {renderUserStatList(statData.userStatList, statData.totalUser)}
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
}

export default React.memo(SystemDashboard);
