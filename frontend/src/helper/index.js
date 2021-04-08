import { Menu, Select } from 'antd';
import constant from 'constant';
import React from 'react';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;
const { Option } = Select;

// fn: Render menu 1 cấp sub menu
function renderMenu(menu = []) {
  return (
    menu.length &&
    menu.map((item, index) => {
      const { isSubMenu, title, icon } = item;

      // if exist sub menu
      return isSubMenu ? (
        <SubMenu key={index} icon={icon} title={title}>
          {item.list.map((listItem, listIndex) => (
            <Menu.Item key={`${index}${listIndex}`}>
              <Link to={listItem.to}>{listItem.title}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      ) : (
        <Menu.Item key={index} icon={icon}>
          <Link to={item.to}>{title}</Link>
        </Menu.Item>
      );
    })
  );
}

// fn: chuyển đổi keyItem sang text
function convertModalKeyItem(key = 'admin') {
  switch (key) {
    case 'admin':
      return 'Danh sách Quản trị viên';
    case 'doctor':
      return 'Danh sách Bác sĩ';
    case 'financial':
      return 'Danh sách nhân viên tài vụ';
    case 'receptionist':
      return 'Danh sách tiếp tân';
    case 'pharmacist':
      return 'Danh sách nhân viên bán thuốc';
    case 'accounting':
      return 'Danh sách nhân viên kế toán';
    default:
      return 'Danh sách Quản trị viên';
  }
}

// fn: phân tích role dựa theo role list
function analystRole(roles) {
  if (!roles) return 'default';
  const ROLE_LIST = constant.ROLES;
  for (let i = 0; i < roles.length; ++i) {
    for (let j = 0; j < ROLE_LIST.length; ++j) {
      if (roles[i].toLowerCase() === ROLE_LIST[j].toLowerCase()) {
        return roles[i].toLowerCase();
      }
    }
  }

  return 'default';
}

// fn: format date
function formateDate(dateInput = new Date()) {
  const date = new Date(dateInput);
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}

// fn: render option select antd with only value array
function renderOptions(optionList = []) {
  return optionList.map((item, key) => (
    <Option key={key} value={item}>
      {item}
    </Option>
  ));
}

export default {
  renderMenu,
  convertModalKeyItem,
  analystRole,
  formateDate,
  renderOptions,
};
