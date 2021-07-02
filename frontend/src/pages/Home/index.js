import Header from 'components/Header';
import ManageView from 'components/ManageView';
import NotFound from 'components/NotFound';
import constant from 'constant';
import React from 'react';
import { useSelector } from 'react-redux';
const { ROLES } = constant;

function renderComponent(role = '') {
  switch (role.toLowerCase()) {
    case ROLES.ACCOUNTING_MANAGER:
    case ROLES.HR:
    case ROLES.SPECIALIZE_MANAGER:
      return <ManageView />;

    case ROLES.RECEPTIONIST:
      return <>Tiếp tân</>;

    case ROLES.DOCTOR:
      return <>Bác sĩ</>;

    case ROLES.ACCOUNTING_STAFF:
    case ROLES.FINANCE_STAFF:
      return <>Nhân viên kế toán</>;

    case ROLES.PHARMACIST:
      return <>Dược sĩ</>;

    default:
      return <NotFound />;
  }
}

function HomePage() {
  const { role } = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <div className="container">{renderComponent(role)}</div>
    </>
  );
}

export default HomePage;
