import React from 'react';
import {Link} from "react-router-dom";

import burgerMenu from "./img/burgerMenu.svg"
import profilePhotoDefault from "./img/profilePhotoDefault.svg"

import './app-header.scss';

const AppHeader = () => {

    return (
        <header className="header">
            <Link className="header__link" to="/">
                <img src={burgerMenu} alt=""/>
            </Link>
            <Link className="header__link" to="/profile">
                <img src={profilePhotoDefault} alt=""/>
            </Link>

        </header>
    )
};

export default AppHeader;