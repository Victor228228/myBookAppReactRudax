import {useState} from "react";
import WithFireBaseService from "../../../hoc/with-fireBase-service";

import "./registration.css";
import registrationPic from "./registrationPic.png";


const Registration = ({FireBase}) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);


    const handleName = (event) => {
        setName(event.target.value);
        setError(false);
    }
    const handleLastName = (event) => {
        setLastName(event.target.value);
        setError(false);
    }
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
        if (name === "" || lastName === "" || email === "" || !email.includes("@") || password === "") {
            setError(true);
        } else {
            const data = {
                email: email,
                password: password,
                returnSecureToken: true
            }
            FireBase.sendData("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdHfW-Ph-UOuZhIpU-OFVk8izoFVHN3wc", data)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem("localId", data.localId);
                    localStorage.setItem("idToken", data.idToken);
                    localStorage.setItem("timeSessionLeft", data.expiresIn);
                    let userInformForMyDataBase = {
                        id: data.localId,
                        name: name,
                        lastName: lastName,
                        email: email,
                        readLater: "null",
                        favorite: "null",
                        lastOpen: "null"
                    }
                    FireBase.getData("https://appbook-932c6-default-rtdb.firebaseio.com/users.json")
                        .then(data => {
                            console.log(data);
                            let sameUser = false;
                            for (let key in data) {
                                if (data[key].id === userInformForMyDataBase.id) {
                                    sameUser = true;
                                    localStorage.setItem("userIdInBase", data[key].userIdInBase.userIdInBase);
                                }
                            }
                            if(sameUser === false) {
                                FireBase.sendData("https://appbook-932c6-default-rtdb.firebaseio.com/users.json", userInformForMyDataBase)
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log(data);
                                        FireBase.sendData(`https://appbook-932c6-default-rtdb.firebaseio.com/users/${data.name}/userIdInBase.json`, {userIdInBase:data.name}, "PUT");
                                        window.location.replace("/");
                                    })
                            }
                        })
                })
            setName("")
            setLastName("")
            setEmail("")
            setPassword("")
            /*console.log(email, password)
            window.location.replace("/");*/
        }
    }
    const errorDisplay = () => {
        return (
            <p className="login_error">You need to enter the correct data</p>
        )
    }

    return(
        <div className="registration">
            <img className="registration_pic" src={registrationPic} alt=""/>

            <form className="registration_form">
                <label className="form_label">First name</label>
                <input onChange={handleName} className="form_input"
                       value={name} type="text" />

                <label className="form_label">Last name</label>
                <input onChange={handleLastName} className="form_input"
                       value={lastName} type="text" />

                <label className="form_label">Email</label>
                <input onChange={handleEmail} className="form_input"
                       value={email} type="email" />

                <label className="form_label">Password</label>
                <input onChange={handlePassword} className="form_input"
                       value={password} type="password" />

                <button onClick={handleSubmit} className="button_registration"
                        type="submit">
                    Sing Up
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

export default WithFireBaseService()(Registration);