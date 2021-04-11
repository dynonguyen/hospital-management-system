import { Tooltip } from 'antd';
import accountSalaryIcon from 'assets/icons/accounting-salary.png';
import adminIcon from 'assets/icons/admin.png';
import doctorIcon from 'assets/icons/doctor.png';
import pharmacistIcon from 'assets/icons/pharmacist.png';
import receptionistIcon from 'assets/icons/receptionist.png';
import logoUrl from 'assets/images/logo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

function Navigation() {
  return (
    <div className="navigation">
      {/* logo, name hospital */}
      <div className="header p-b-18 flex-center--ver justify-content-center">
        <Link to="/">
          <img className="header-logo" src={logoUrl} alt="Photo" />
        </Link>

        <h1 className="header-name p-l-12">Hệ thống quản lý bệnh viện HOPMS</h1>
      </div>

      {/* navigation */}
      <nav>
        <ul className="control h-100 d-flex">
          <li className="control-item active">
            <Tooltip title="Quản trị viên" placement="bottom">
              <img src={adminIcon} alt="Icon" />
              <h3>Quản lý</h3>
            </Tooltip>
          </li>
          <li className="control-item">
            <Tooltip title="Tiếp tân" placement="bottom">
              <img src={receptionistIcon} alt="Icon" />
              <h3>Tiếp tân</h3>
            </Tooltip>
          </li>
          <li className="control-item">
            <Tooltip title="Kế toán" placement="bottom">
              <img src={accountSalaryIcon} alt="Icon" />
              <h3>Kế toán</h3>
            </Tooltip>
          </li>
          <li className="control-item">
            <Tooltip title="Bác sĩ" placement="bottom">
              <img src={doctorIcon} alt="Icon" />
              <h3>Bác sĩ</h3>
            </Tooltip>
          </li>
          <li className="control-item">
            <Tooltip title="Nhân viên bán thuốc" placement="bottom">
              <img src={pharmacistIcon} alt="Icon" />
              <h3>Nhân viên bán thuốc</h3>
            </Tooltip>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
