import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';
import linkStyles from './components/link.module.css'

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <NavLink className={linkStyles.navigation} to="">Home</NavLink>
      <NavLink className={linkStyles.navigation} to="foos">foos</NavLink>
      <NavLink className={linkStyles.navigation} to="cats">cats</NavLink>
    </nav>
  );
}
