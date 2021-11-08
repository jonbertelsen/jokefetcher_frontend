import { NavLink } from 'react-router-dom';

function Header({ facade }) {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        {facade.hasUserAccess('user') && (
          <li>
            <NavLink activeClassName="active" to="/jokes">
              Jokes
            </NavLink>
          </li>
        )}
        {facade.hasUserAccess('admin') && (
          <li>
            <NavLink activeClassName="active" to="/webscraper">
              Webscraper
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
