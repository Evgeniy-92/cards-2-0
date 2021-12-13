import styles from './styles.module.scss'
import SuperInputText from "../../../n1-main/m1-ui/common/c2-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c1-SuperButton/SuperButton";

export const Login = () => {
    return (
        <div className={styles.loginMain}>
            <div className={styles.wrapper}>
                <div className={styles.login}>

                    <div className={styles.intro}>
                        <h1>It-incubator</h1>
                        <h3> Sign In</h3>
                    </div>

                    <div className={styles.inputs}>
                        <div className={styles.inputsBox}>
                            <label>Email</label>
                            <SuperInputText type={"text"} className={styles.input}
                            /></div>
                        <div className={styles.inputsBox}>
                            <label>Password</label>
                            <SuperInputText type={'password'} className={styles.input}
                            /></div>
                        <div className={styles.forgot}>
                            <p>
                                Forgot Password
                            </p>
                        </div>
                    </div>

                    <div className={styles.next}>
                        <SuperButton className={styles.btn}>Login</SuperButton>
                        <span className={styles.notAccount}>
                            Don’t have an account?
                        </span>
                        <p className={styles.singUp}>
                            Sing Up
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}