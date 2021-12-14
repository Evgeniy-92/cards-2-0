import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../n1-main/m2-bll/store";
import styles from "./CheckEmail.module.scss";
import ContainerAuth from "../../../../n1-main/m1-ui/common/c4-containerAuth";

export const CheckEmail = () => {
    const email = useSelector<AppRootStateType, string>(state => state.recovery.email)
    return (
        <ContainerAuth>
            <div className={styles.container}>
                <div className={styles.intro}>
                    <h1>It-incubator</h1>
                    <h3>Check Email</h3>
                    <div className={styles.message}>{`We sent an Email with instructions to ${email}, you can close this tab`}</div>
                </div>
            </div>
        </ContainerAuth>
    )
}
