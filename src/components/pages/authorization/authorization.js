


import "./authorization.css"
import logoAuth from "./logoAuth.png"
import {Link} from "react-router-dom";



const Authorization = () => {


    return (
        <div className={"authorization"}>
            <img className="authorization_logo" src={logoAuth} alt=""/>
            <div>
                <h1 className="authorization_title">
                    Welcome
                </h1>
                <h3 className="authorization_description">
                    Read without limits
                </h3>
            </div>
            <div className="authorization_buttons_wrapper">
                <Link className="authorization_button_registration" to={"./registration"}>Create account</Link>
                <Link className="authorization_button_login" to={"./login"}>Log In</Link>
            </div>
        </div>

    )
}


export default Authorization;
