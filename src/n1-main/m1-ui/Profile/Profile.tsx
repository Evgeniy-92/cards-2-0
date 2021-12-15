import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../../m2-bll/store";

export const Profile = () => {
    const inAuth = useSelector<AppRootStateType, boolean>((state) => state.app.inAuth)
    if (!inAuth) return <Navigate to={'/login'}/>

    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}