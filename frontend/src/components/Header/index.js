import Navigation from 'components/Navigation';
import UserAccount from 'components/UserAccount';
import React from 'react';
import './index.scss';
function Header() {
  return (
    <div className="w-100vw h-100 header">
      {/* user account login */}
      <div className="user-account-wrapper align-i-center p-tb-12">
        <UserAccount />
      </div>

      {/* navigation */}
      <div className="container p-t-18">
        <Navigation />
      </div>
    </div>
  );
}

export default Header;
