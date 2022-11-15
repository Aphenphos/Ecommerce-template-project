import Navigation from './navigation';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.Header}>

      <h1>My App</h1>

      <div className={styles.NavigationContainer}>
        <Navigation />
      </div>

    </header>
  );
}
