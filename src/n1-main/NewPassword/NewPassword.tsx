import {useFormik} from "formik";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import SuperInputText from "../m1-ui/common/c2-SuperInputText/SuperInputText";
import SuperButton from "../m1-ui/common/c1-SuperButton/SuperButton";
import {FormikErrorNewPasswordType} from "./newPasswordAPI";
import {setPassword} from "./newPassReducer";
import {AppRootStateType} from "../m2-bll/store";
import React from "react";

export const NewPassword = () => {

    const dispatch = useDispatch()
    const {token} = useParams<string>()
    const error = useSelector<AppRootStateType, string>(state => state.newPass.error)
    const success = useSelector<AppRootStateType, boolean>(state => state.newPass.success)


    const formik = useFormik({
        initialValues: {
            password: '',
            password2: ''
        },
        validate: (values) => {
            const errors: Partial<FormikErrorNewPasswordType> = {};
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 8) {
                errors.password = 'Invalid email address';
            }
            if (!values.password2) {
                errors.password2 = 'Required';
            } else if (values.password.length < 8) {
                errors.password2 = 'Invalid email address';
            }
            return errors
        },
        onSubmit: values => {
            if (token) {
                dispatch(setPassword(token, values.password, values.password2))
            }
            formik.resetForm()
        },
    })


    return (
        success
            ? <div>
                <div style={{color: 'green', fontSize: '30px'}}>SUCCESS</div>
                <Link to={'/login'}>Login</Link>
            </div>

            : <div>
                <h1>Create new password?</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <SuperInputText
                            type='password'
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password
                            && formik.errors.password
                            && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        {/*<div style={{color: 'red'}}>{error}</div>*/}
                    </div>
                    <div>
                        <SuperInputText
                            type='password'
                            {...formik.getFieldProps('password2')}
                        />
                        {formik.touched.password2
                            && formik.errors.password2
                            &&
                            <div style={{color: 'red'}}>{formik.errors.password2}</div>}
                        {/*<div style={{color: 'red'}}>{error}</div>*/}
                    </div>
                    <div style={{color: 'red'}}>{error}</div>
                    <div>
                        <SuperButton type={'submit'}>Send Instructions</SuperButton>
                    </div>
                </form>
            </div>
    )
}