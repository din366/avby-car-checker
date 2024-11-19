import styles from './Header.module.scss';
import {useTheme} from "../../hooks/ThemeContext.jsx";
import {Link, NavLink} from "react-router-dom";
import headerLogo from './../../assets/header-logo.png';
import moonIcon from './../../assets/theme-icons/moon.png'
import sunIcon from './../../assets/theme-icons/sun.png'
import {useDispatch, useSelector} from "react-redux";
import {getToken, logout} from "../../store/loginSlice.js";

const Header = () => {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const token = useSelector(getToken);

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
              <NavLink className={styles.loginButton} onClick={() => {dispatch(logout())}} to={token ? 'categories' : 'login'}>{token ? 'Выйти' : 'Войти'}</NavLink>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Header;