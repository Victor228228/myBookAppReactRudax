import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {footerActiveLink, lastReadBook} from "../../../actions/index"

import home from "./img/home.svg"
import homeActive from "./img/homeActive.svg"
import favorite from "./img/favorite.svg"
import favoriteActive from "./img/favoriteActive.svg"
import profile from "./img/profile.svg"
import profileActive from "./img/profileActive.svg"

import './footer.css';
import WithFireBaseService from "../../hoc";



const Footer = ({footerActiveLink, changeFooterLink, lastReadBook, FireBase, lastReadBookAction}) => {

    useEffect(() => {
        if (localStorage.getItem("idToken")) {
            FireBase.getData(`https://appbook-932c6-default-rtdb.firebaseio.com/users/${localStorage.getItem("userIdInBase")}/lastOpen.json`)
                .then(data => {
                    console.log(data.bookId)
                    lastReadBookAction(data.bookId)
                })
        }
        switch (window.location.pathname) {
            case "/": return  changeFooterLink("Home");
            case "/favorite": return  changeFooterLink("Favorite");
            case "/profile": return  changeFooterLink("Profile");
        }


    }, [])
    const changeIcon = (event) => {
        changeFooterLink(event.target.textContent);
    }

    return (
        <footer className="footer">
            <Link className="footerLink" to="/" onClick={changeIcon}>
                <img src={footerActiveLink === "Home"? homeActive: home} alt="" className={"footerLink_img"}/>
                <p className={"footerLink_text"}>Home</p>
            </Link>
            <Link className="footerLink" to="/favorite" onClick={changeIcon}>
                <img src={footerActiveLink === "Favorite"? favoriteActive: favorite} alt="" className={"footerLink_img"}/>
                <p className={"footerLink_text"}>Favorite</p>
            </Link>
            <Link className="footerLink" to={`/lastReadBook/${lastReadBook}/read`} onClick={changeIcon}>
                <img src={footerActiveLink === "Profile"? profileActive: profile} alt="" className={"footerLink_img"}/>
                <p className={"footerLink_text"}>Read</p>
            </Link>

        </footer>
    )
}

const mapStateToProps = (state) => {
    return {
        footerActiveLink: state.footerActiveLink,
        lastReadBook: state.lastReadBook
    }
}
const mapToDispatchToProps = (dispatch) => {
    return {
        changeFooterLink: (active) => {
            dispatch(footerActiveLink(active));
        },
        lastReadBookAction: (book) => {
            dispatch(lastReadBook(book));
        }
    }
}

export default connect(mapStateToProps, mapToDispatchToProps)(WithFireBaseService()(Footer));