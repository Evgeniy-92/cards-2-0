import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../n1-main/m2-bll/store";

export const CheckEmail = () => {
    const email = useSelector<AppRootStateType, string>(state => state.recovery.email)
    return (
        <div>
            <h1>Check Email</h1>
            <span>{`We sent an Email with instructions to ${email}, you can close this tab`}</span>
        </div>
    )
}
