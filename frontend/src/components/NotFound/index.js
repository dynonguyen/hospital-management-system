import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'assets/images/doctor_404.png';
function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      icon={<img src={Icon} />}
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary">
          <Link to="/">Về Trang Chủ</Link>
        </Button>
      }
    />
  );
}

export default NotFound;
