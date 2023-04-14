import { ToastContainer } from 'react-toastify';
import { AuthContext, AuthContextData } from 'AuthContext';
import React, { useState } from 'react';
import Routes from 'Routes';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/custom.scss';
import './App.css';

const App = () => {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });
  return (
    <>
      <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
        <Routes />
        <ToastContainer />
      </AuthContext.Provider>
    </>
  );
};

export default App;
