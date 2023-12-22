import {useState} from "react";
import WithFireBaseService from "../../../hoc/with-fireBase-service";

import "./login.css";
import loginPic from "./loginPic.png"


const Login = ({FireBase}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleEmail = (event) => {
        setEmail(event.target.value);
        setError(false);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
        setError(false);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === "" || !email.includes("@") || password === "") {
            setError(true);
        } else {
            const data = {
                email: email,
                password: password,
                returnSecureToken: true
            }
            FireBase.sendData("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdHfW-Ph-UOuZhIpU-OFVk8izoFVHN3wc", data)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem("localId", data.localId);
                    localStorage.setItem("idToken", data.idToken);
                    localStorage.setItem("timeSessionLeft", data.expiresIn);
                    const idUser = data.localId;
                    FireBase.getData("https://appbook-932c6-default-rtdb.firebaseio.com/users.json")
                        .then(data => {
                            for (let key in data) {
                                if (data[key].id === idUser) {
                                    localStorage.setItem("userIdInBase", data[key].userIdInBase.userIdInBase);
                                }
                            }
                            window.location.replace("/");
                        })
                })
                .catch(error => {
                    console.log(error);
                    setError(true);
                })
            setEmail("")
            setPassword("")
            /*window.location.replace("/");*/
        }
    }
    const errorDisplay = () => {
        return (
            <p className="login_error">You need to enter the correct data or something wrong</p>
        )
    }

    return(
        <div className="login">
            <img className="login_pic" src={loginPic} alt=""/>

            <form className="login_form">
                <label className="form_label">Email</label>
                <input onChange={handleEmail} className="form_input"
                       value={email} type="email" />

                <label className="form_label">Password</label>
                <input onChange={handlePassword} className="form_input"
                       value={password} type="password" />

                <button onClick={handleSubmit} className="button_singIn"
                        type="submit">
                    Sing In
                </button>
            </form>
            <div>
                {
                    error ? errorDisplay() : ""
                }
            </div>
        </div>
    )
}

export default WithFireBaseService()(Login);