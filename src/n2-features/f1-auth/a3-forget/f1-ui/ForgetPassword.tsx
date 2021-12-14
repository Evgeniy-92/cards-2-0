import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import SuperInputText
    from "../../../../n1-main/m1-ui/common/c2-SuperInputText/SuperInputText";
import SuperButton from "../../../../n1-main/m1-ui/common/c1-SuperButton/SuperButton";
import {forgotPassword} from "../f2-bll/recoveryReducer";
import {FormikErrorRecoveryType} from "../f3-dall/recoveryAPI";
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../../../../n1-main/m2-bll/store";


export const ForgetPassword = () => {
    const dispatch = useDispatch()
    const isSuccess = useSelector<AppRootStateType, boolean>(state => state.recovery.isSuccess)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.recovery.isLoading)
    const error = useSelector<AppRootStateType, string>(state => state.recovery.error)
    const disabled = useSelector<AppRootStateType, boolean>(state => state.recovery.isDisabledBtn)
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: Partial<FormikErrorRecoveryType> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(forgotPassword(values.email))
            formik.resetForm()
        },
    })

    if (isSuccess) {
        return <Navigate to={'/check-email'}/>
    }
    return (
        <div>
            <h1>Forgot your password?</h1>
            {isLoading && <div>Loading...</div>}
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <SuperInputText
                    type='email'
                    {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email
                        && formik.errors.email
                        && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                    <div style={{color: 'red'}}>{error}</div>
                </div>
                <div>
                    <SuperButton disabled={disabled} type={'submit'}>Send Instructions</SuperButton>
                </div>
            </form>
        </div>
    )
}