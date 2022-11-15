import { Outlet, Link } from 'react-router-dom';
import Header from './header';
import styles from './layout.module.css';

export default function Layout() {
  return (
    <div className={''}>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
