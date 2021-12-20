import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../../m2-bll/store";
import ContainerAuth from "../common/c4-containerAuth";
import React, {useEffect} from "react";
import styles from "./styles.profile.module.scss";
import LeftPage from "./LeftPage";
import RightPage from "./RightPage";
import {getCardsPack} from "./profileReducer";

export const Profile = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCardsPack())
    }, [])

    const inAuth = useSelector<AppRootStateType, boolean>((state) => state.app.inAuth)
    // @ts-ignore
    const cards = useSelector<AppRootStateType, boolean>((state) => state.profile.cards)
    if (!inAuth) return <Navigate to={'/login'}/>
    console.log(cards)

    return (
        <ContainerAuth>
            <div className={styles.main}>
                <LeftPage/>
                <RightPage/>
            </div>
        </ContainerAuth>

    )
}