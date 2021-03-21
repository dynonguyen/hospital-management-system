import AdminView from 'components/AdminView';
import Header from 'components/Header';
import React from 'react';

function HomePage() {
  return (
    <>
      <Header />

      <div className="container">
        <AdminView />
      </div>
    </>
  );
}

export default HomePage;
