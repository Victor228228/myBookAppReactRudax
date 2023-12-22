import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import "./searchBooks.css"
import defaultPic from "../../slider/image 103.png";
import {selectBook} from "../../../actions";




const SearchBooks = ({booksSearch, selectBook}) => {
    const renderBooks = (item) => {
        let imgDefault = defaultPic;
        if (item.imgBase64 !== "" && item.imgBase64 !== undefined) {
            imgDefault = "data:image/png;base64,"+item.imgBase64;
        }
        return (
            <Link key={item.id} className="card" to={"/books/" + item.id} id={item.id} onClick={() => selectBook(item.id)}>
                <img src={imgDefault} alt="" className="cardImg"/>
                <h3 className="cardTitle">{item.title}</h3>
                <p className="cardText">{item.author.first_name} {item.author.last_name}</p>
            </Link>
        )
    }

    if (booksSearch.length === 0) {
        return <p className="search_books_error">There are not books of your searched</p>
    }
    return (
        <div className="search_books">
            <h3 className="search_books_title">The result of searching</h3>
            <div className="search_books_content">
                {
                    booksSearch.map(item => renderBooks(item))
                }
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        booksSearch: state.booksSearch,
    }
}
const mapToDispatchToProps = (dispatch) => {
    return {
        selectBook: (id) => {
            dispatch(selectBook(id));
        },
    }
}
export default connect(mapStateToProps, mapToDispatchToProps)(SearchBooks);