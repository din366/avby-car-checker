import styles from './Header.module.scss';
import {useTheme} from "../../hooks/useTheme.js";
import {Link, NavLink} from "react-router-dom";
import headerLogo from './../../assets/header-logo.png';
import moonIcon from './../../assets/theme-icons/moon.png'
import sunIcon from './../../assets/theme-icons/sun.png'

const Header = () => {
  const [theme, setTheme] = useTheme();
  const token = null;

  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  }
  return (
    <div>
      <div className={styles.headerWrapper}>
        <div className="container">
          <div className={styles.header}>
            <Link to='/'>
              <div className={styles.logoWrapper}>
                <img className={styles.headerLogo} src={headerLogo} alt=""/>
                <span>Car Checker</span>
              </div>
            </Link>
            <div className={styles.navigationWrapper}>
              <button className={styles.toggleTheme} onClick={toggleTheme}>
                {theme === 'dark' ?
                  <img src={moonIcon} alt=""/> :
                  <img src={sunIcon} alt=""/>}

              </button>
              <NavLink className={styles.loginButton} to={token ? 'categories' : 'login'}>{token ? 'Выйти' : 'Войти'}</NavLink>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;