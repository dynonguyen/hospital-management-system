import React from 'react';
import 'antd/dist/antd.css';
import 'utils/scss/index.scss';
import Header from 'components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>
    </Router>
  );
}

export default App;
