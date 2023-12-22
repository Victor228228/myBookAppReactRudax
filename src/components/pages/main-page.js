import React, {Component} from 'react';
import {connect} from "react-redux";
import Search from "./search/search";
import MySlider from "../slider/mySlider";
import NewArrivals from "../newArrivals/newArrivals";
import {booksGenre, footerActiveLink} from "../../actions";

import './main-page.css';
import searchPic from "./search/img/search-normal.png";



class MainPage extends Component {
    componentDidMount() {
        const {genreForSlider, changeFooterLink} = this.props;
        document.querySelectorAll(".sliderLink").forEach(function (item) {
            if (item.textContent.toLowerCase() === genreForSlider) {
                item.classList.add("activeLink");
            } else {
                item.classList.remove("activeLink");
            }
        })
        changeFooterLink("Home");
    }

    actionWithActiveClass = (event) => {
        document.querySelectorAll(".sliderLink").forEach(function (item) {
            item.classList.remove("activeLink");
        })
        event.target.classList.add("activeLink")
    }

    render() {
        if (!localStorage.getItem("localId") || !localStorage.getItem("idToken") || !localStorage.getItem("timeSessionLeft") > 0) {
           return window.location.replace("/authorization");
        }
        return (
            <div className={"mainWrapper"}>
                <div className={"mainHeader"}>
                    <h3 className={"mainHeader_title"}>
                        Hello!
                    </h3>
                    <p className={"mainHeader_text"}>What do you want to read today?</p>
                </div>

                <Search/>

                <div className="sliderWrapper">
                    <div className="sliderLinks">
                        <p className="sliderLink" onClick={event => {
                            this.actionWithActiveClass(event)
                            this.props.selectGenre(event.target.textContent.toLowerCase())
                        }}>Fantasy</p>
                        <p className="sliderLink" onClick={event => {
                            this.actionWithActiveClass(event)
                            this.props.selectGenre(event.target.textContent.toLowerCase())
                        }}>Adv</p>
                        <p className="sliderLink" onClick={event => {
                            this.actionWithActiveClass(event)
                            this.props.selectGenre(event.target.textContent.toLowerCase())
                        }}>Horror</p>
                    </div>

                    <MySlider/>

                </div>
                <div className="newArrivals">
                    <h3 className="newArrivals_title">
                        New Arrivals
                    </h3>

                    <NewArrivals/>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        genreForSlider: state.genreForSlider,
    }
}
const mapToDispatchToProps = (dispatch) => {
    return {
        selectGenre: (genre) => {
            dispatch(booksGenre(genre));
        },
        changeFooterLink: (active) => {
            dispatch(footerActiveLink(active));
        },
    }
}
export default connect(mapStateToProps, mapToDispatchToProps)(MainPage);
