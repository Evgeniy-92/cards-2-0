import React from "react";
import s from './Header.module.scss'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {logoutTC} from "../../../n2-features/f1-auth/a1-login/loginReducer";

export const Header = () => {
    const isLogin = useSelector<AppRootStateType, boolean>((state) => state.login.isLogin)
    const dispatch = useDispatch()
    const logout = () => isLogin && dispatch(logoutTC())

    return (
        <div className={s.headerContainer}>
            <nav className={s.navigate}>
                <Link to={'/login'} onClick={logout}>{isLogin ? 'log Out' : 'Login'}</Link>
                <Link to={'/profile'}>Profile</Link>
                <Link to={'/test'}>Test component</Link>
            </nav>
        </div>
    )
}