import { AuthContext } from 'AuthContext';
import './styles.css';
import 'bootstrap/js/src/collapse.js';
import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import history from 'util/history';
import { isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';
import { getTokenData } from 'util/token';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
        <div className="container-fluid">
          <Link to={'/'} className="nav-logo-text">
            <h4>DS Catalog</h4>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#dscatalog-navbar"
            aria-controls="dscatalog-navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="dscatalog-navbar">
            <ul className="navbar-nav offset-md-2 main-menu">
              <li>
                <NavLink to="/" activeClassName="active" exact>
                  Home
                </NavLink>
              </li>
              <NavLink to="/products" activeClassName="active">
                Catálogo
              </NavLink>
              <NavLink to="/admin" activeClassName="active">
                Admin
              </NavLink>
            </ul>
          </div>
          <div className="nav-login-logout">
            {authContextData.authenticated ? (
              <>
                <span className="nav-username">
                  {'Olá, ' + authContextData.tokenData?.user_name + '!'}
                </span>
                <a href="#logout" onClick={handleLogoutClick}>
                  LOGOUT
                </a>
              </>
            ) : (
              <Link to="/admin/auth">LOGIN</Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
