import React from 'react';
import {connect} from "react-redux";
import AuthorizationInApp from "../pages/authorization/authorization";
import MainPage from '../pages/main-page';
import AppHeader from '../app-header/app-header';
import BookDescription from "../pages/book-description/book-description"
import SearchBooks from "../pages/searchBooks/searchBooks";
import ReadBook from "../pages/readBook/readBook";
import Footer from "../pages/footer/footerMenu";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "../pages/authorization/login/login";
import Registration from "../pages/authorization/registration/registration";
import Favorite from "../pages/favorite/favorite";
import Profile from "../pages/profile/profile";

const App = ({selectBook, lastReadBook}) => {

    return (
        <BrowserRouter>
            {/*<div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">*/}
            <div className="app">
                <AppHeader/>
                <Routes>
                    <Route path="/authorization" element={<AuthorizationInApp/>} />
                    <Route path="/authorization/login" element={<Login/>} />
                    <Route path="/authorization/registration" element={<Registration/>} />

                    <Route path="/" element={<MainPage/>} />
                    <Route path="/books/:bookId" element={<BookDescription id={selectBook}/>} />
                    <Route path="/books/:bookId/read" element={<ReadBook id={selectBook}/>} />
                    <Route path="/lastReadBook/:bookId/read" element={<ReadBook id={lastReadBook}/>} />
                    <Route path="/search/:searchId" element={<SearchBooks/>} />
                    <Route path="/favorite" element={<Favorite/>} />
                    <Route path="/profile" element={<Profile/>} />
                </Routes>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}
const mapStateToProps = (state) => {
    return {
       selectBook: state.selectBook,
        lastReadBook:state.lastReadBook
    }
}
export default connect(mapStateToProps)(App);