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

// fn : chuyển đổi mảng granted role thành sql query
function convertRoleSql(roles = [], username = '', type = 0) {
  let sqlList = [],
    sqlDefaultGrant = '';
  roles.forEach((item, index) => {
    const { roleName, granted, admin, default: isDefault } = item;
    if (granted) {
      sqlList.push(
        `GRANT "${roleName}" TO "${username}"${
          admin ? ' WITH ADMIN OPTION' : ''
        }`,
      );
    }
    if (isDefault) {
      if (sqlDefaultGrant === '')
        sqlDefaultGrant = `ALTER USER "${username}" DEFAULT ROLE "${roleName}"`;
      else sqlDefaultGrant += `,"${roleName}"`;
    }
  });
  if (sqlDefaultGrant !== '') {
    if (type === 0) {
      sqlList.push(sqlDefaultGrant);
      return sqlList;
    } else {
      return { sqlList, defaultRole: sqlDefaultGrant };
    }
  } else {
    if (type === 0) return sqlList;
    return { sqlList, defaultRole: '' };
  }
}

// fn : chuyển đổi mảng granted role thành sql query
function convertPrivSql(privs = [], username = '') {
  let sqlList = [];
  privs.forEach((item, index) => {
    const { privilege, granted, admin } = item;
    if (granted) {
      sqlList.push(
        `GRANT ${privilege} TO "${username}"${
          admin ? ' WITH ADMIN OPTION' : ''
        }`,
      );
    }
  });

  return sqlList;
}

// fn: chuyển đổi created user info
function convertCreateUserInfo(userInfo) {
  const {
    username,
    password,
    defaultTableSpace,
    tempTableSpace,
    isLocked,
    isEdition,
  } = userInfo;
  return `CREATE USER "${username}" IDENTIFIED BY "${
    password !== '' ? password : 'null'
  }" ${
    defaultTableSpace !== '' ? `DEFAULT TABLESPACE "${defaultTableSpace}"` : ''
  } ${
    tempTableSpace !== '' ? `TEMPORARY TABLESPACE "${tempTableSpace}"` : ''
  } ACCOUNT ${isLocked ? 'LOCK' : 'UNLOCK'} ${
    isEdition ? 'ENABLE EDITIONS' : ''
  }`;
}

export default {
  renderMenu,
  convertModalKeyItem,
  analystRole,
  formateDate,
  renderOptions,
  convertRoleSql,
  convertPrivSql,
  convertCreateUserInfo,
};
