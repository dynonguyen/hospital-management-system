import Header from 'components/Header';
import ManageView from 'components/ManageView';
import SystemAdmin from 'components/SystemAdmin';
import React from 'react';

function HomePage() {
  return (
    <>
      <Header />
      <div className="container">
        <ManageView />
      </div>
    </>
  );
}

export default HomePage;
