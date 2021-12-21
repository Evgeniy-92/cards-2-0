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
    const sortCards = useSelector<AppRootStateType, number>((state) => state.profile.sortByCards)
    const sortName = useSelector<AppRootStateType, string>((state) => state.profile.sortName)
    const minValue = useSelector<AppRootStateType, number>(state => state.profile.min)
    const maxValue = useSelector<AppRootStateType, number>(state => state.profile.max)

    useEffect(() => {
        dispatch(getCardsPack(sortCards, sortName, minValue, maxValue))
    }, [dispatch, sortCards, sortName, minValue, maxValue])

    const inAuth = useSelector<AppRootStateType, boolean>((state) => state.app.inAuth)
    if (!inAuth) return <Navigate to={'/login'}/>

    return (
        <ContainerAuth>
            <div className={styles.main}>
                <LeftPage/>
                <RightPage/>
            </div>
        </ContainerAuth>

    )
}