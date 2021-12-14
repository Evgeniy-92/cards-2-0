import React from 'react'
import styles from './style.regist.module.scss'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import SuperInputText from "../../../n1-main/m1-ui/common/c2-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c1-SuperButton/SuperButton";
import {registrateTC} from "./registerReducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store";

type FormikErrorType = {
    email?: string
    password?: string
    repeatPassword?: string
}


export const Registration = () => {
    const isRegistrate = useSelector<AppRootStateType, boolean>(state => state.register.isRegistrate)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',

        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 2) {
                errors.password = 'Invalid password';
            }
            if (!values.repeatPassword) {
                errors.repeatPassword = 'Required';
            } else if (values.repeatPassword != values.password) {
                errors.repeatPassword = 'Invalid repeat password';
            }
            return errors;
        },

        onSubmit: values => {
            formik.resetForm()
            //dispatch(loginTC(values))
            //registrationAPI.registration(values)
            dispatch(registrateTC(values))
        },
    })


    if (isRegistrate) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div className={styles.test}>
            <form onSubmit={formik.handleSubmit}>

                <div className={styles.inputs}>
                    <div className={styles.inputsBox}>
                        <label className={styles.label}>Email</label>
                        <SuperInputText className={styles.input}
                                        name="email"
                                        type="email"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                        />
                    </div>
                    {
                        formik.touched.email &&
                        formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}

                    <div className={styles.inputsBox}>
                        <label className={styles.label}>Password</label>
                        <SuperInputText className={styles.input}
                                        name="password"
                                        type="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                        />
                    </div>
                    {
                        formik.touched.email &&
                        formik.errors.password ? <div style={{color: "red"}}>{formik.errors.repeatPassword}</div> : null}

                    <div className={styles.inputsBox}>
                        <label className={styles.label}>Repeat assword</label>
                        <SuperInputText className={styles.input}
                                        name="repeatPassword"
                                        type="repeatPassword"
                                        onChange={formik.handleChange}
                                        value={formik.values.repeatPassword}
                        />
                    </div>
                    {
                        formik.touched.email &&
                        formik.errors.repeatPassword ?
                            <div style={{color: "red"}}>{formik.errors.repeatPassword}</div> : null}

                    <div className={styles.next}>
                        <SuperButton className={styles.btn}
                                     type={'submit'}>
                            Registration
                        </SuperButton>
                    </div>

                </div>


            </form>
        </div>

    )
}
