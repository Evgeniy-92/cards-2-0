import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../../m2-bll/store";
import ContainerAuth from "../common/c4-containerAuth";
import {EditableSpan} from "../common/c6-EditableSpan/editableSpan";
import {changeUserNameTC} from "./profileReducer";
import styles from './styles.profile.module.scss'
import React from "react";

export const Profile = () => {
    const inAuth = useSelector<AppRootStateType, boolean>((state) => state.app.inAuth)
    const userName = useSelector<AppRootStateType, string>(state => state.profile.name)
    const avatar = useSelector<AppRootStateType, string>(state => state.profile.avatar)
    const dispatch = useDispatch()

    const ChangeUserName = (newName: string) => {
        dispatch(changeUserNameTC({name: newName}))
    }

    if (!inAuth) return <Navigate to={'/login'}/>

    return (
        <ContainerAuth>
            <div className={styles.profile}>
                <div className={styles.intro}>
                    <h1>Profile</h1>
                </div>
                <div className={styles.profileInfo}>
                    <div>
                        <img className={styles.avatar} src={avatar} alt=""/>
                    </div>

                    <div>
                        <EditableSpan value={userName} onChange={ChangeUserName}/>
                    </div>
                </div>

            </div>
        </ContainerAuth>

    )
}