import { NavLink } from 'react-router-dom';
import styles from './styles/navigation.module.css';
import linkStyles from './styles/link.module.css';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <NavLink className={linkStyles.navigation} to="">
        Home
      </NavLink>
      <NavLink className={linkStyles.navigation} to="foos">
        foos
      </NavLink>
      <NavLink className={linkStyles.navigation} to="cats">
        cats
      </NavLink>
    </nav>
  );
}
