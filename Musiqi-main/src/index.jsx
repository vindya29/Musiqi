import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { store } from './redux/store';
import Signup from './pages/Signup';
import Login from './pages/Login';

const Root = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app/*" element={<App />} />
          
          {/* Redirect to the app if someone tries to access any other route */}
          <Route path="*" element={<Navigate to="/app/*" />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
