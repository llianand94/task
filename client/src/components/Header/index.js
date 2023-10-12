import React from 'react';
import styles from './Header.module.scss'

const Header = ({ children }) => {
  console.log("==>", children);
  return (
    <header className={styles.header}>
        {children}
      </header>
  );
}

export default Header;
