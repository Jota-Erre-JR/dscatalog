import React, { useState } from 'react';
import './assets/styles/custom.scss';
import './App.css';
import Routes from 'Routes';
import { AuthContext, AuthContextData } from 'AuthContext';

const App = () => {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });
  return (
    <>
      <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
        <Routes />
      </AuthContext.Provider>
    </>
  );
};

export default App;
