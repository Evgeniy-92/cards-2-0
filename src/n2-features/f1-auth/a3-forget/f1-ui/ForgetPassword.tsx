import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import SuperInputText
    from "../../../../n1-main/m1-ui/common/c2-SuperInputText/SuperInputText";
import SuperButton from "../../../../n1-main/m1-ui/common/c1-SuperButton/SuperButton";
import {forgotPassword} from "../f2-bll/recoveryReducer";
import {FormikErrorType} from "../f3-dall/recoveryAPI";


export const ForgetPassword = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: Partial<FormikErrorType> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(forgotPassword(values.email))
            console.log(values.email)
        },
    })
    return (
        <div>
            <h1>Forgot your password?</h1>
            <form onSubmit={formik.handleSubmit}>
                <SuperInputText
                    type='email'
                    {...formik.getFieldProps('email')}
                />
                <SuperButton type={'submit'}>Send Instructions</SuperButton>
            </form>
        </div>
    )
}