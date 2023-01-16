import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { RiVideoUploadFill } from 'react-icons/ri';
import { Fab } from '@mui/material';


export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/tbflixlogo.png" alt="Logo" />
  </div>
);

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />

    <span className="navbar-version"></span>
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const Upload = () => (
  <NavItem>
    <NavLink tag={Link} to="/video/new" className="d-flex align-items-center">
      <RiVideoUploadFill/>
      <span>
        <div>Upload</div>
      </span>
    </NavLink>
  </NavItem>
);

export const Profile = () => (
  <NavItem>
    <NavLink tag={Link} to="/video/new" className="d-flex align-items-center">
      <RiVideoUploadFill/>
      <span>
        <div>Upload</div>
      </span>
    </NavLink>
  </NavItem>
);
