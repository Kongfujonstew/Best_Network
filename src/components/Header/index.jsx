import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import styles from './styles.scss';

const {
  headerContainer
} = styles;

export default () => (
  <Navbar light className={headerContainer}>
    <NavbarBrand href="/" className="mr-auto">The Best Network.  Just the best.  FIX this color</NavbarBrand>
  </Navbar>
);
