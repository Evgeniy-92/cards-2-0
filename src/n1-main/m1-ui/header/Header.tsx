import React from "react";
import s from './Header.module.scss'
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <div className={s.headerContainer}>
            <nav className={s.navigate}>
                <Link to={'/login'}>Login</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/test'}>Test component</Link>
            </nav>
        </div>
    )
}