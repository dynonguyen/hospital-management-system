import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;

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

export default {
  renderMenu,
};
