import { NavLink } from 'react-router-dom';
import './styles.css';
import { hasAnyRoles } from 'util/auth';

const Navbar = () => {
  return (
    <nav className="admin-nav-conteiner">
      <ul>
        <li>
          <NavLink to="/admin/products" className="admin-nav-item">
            <p>Produtos</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" className="admin-nav-item">
            <p>Categorias</p>
          </NavLink>
        </li>
        <li>{hasAnyRoles(['ROLE_ADMIN']) && (
          <NavLink to="/admin/users" className="admin-nav-item">
            <p>Usuários</p>
          </NavLink>
        )}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
