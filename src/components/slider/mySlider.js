import React, {Component} from "react";
import {connect} from "react-redux";
import {booksLoaded, booksLoading, booksError, selectBook} from "../../actions";
import Spinner from "../spinner/spinner";
import Error from "../error";
import withFireBaseService from "../hoc";
import {Link} from "react-router-dom";

import BookDescription from "../pages/book-description/book-description";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import "./mySlider.css"
import defaultPic from "./image 103.png"

class MySlider extends Component {
    componentDidMount() {
        this.updateBooksInStore()
    }
    componentDidUpdate(prevProps) {
        if (this.props.genreForSlider !== prevProps.genreForSlider) {
            const updateComponent = true;
            this.updateBooksInStore(updateComponent)
        }
    }
    updateBooksInStore = (updateComponent = null) => {
        const {FireBase, booksLoaded, booksError, booksLoading, genreForSlider} = this.props;
        if (updateComponent) {
            booksLoading();
        }
        const dataWithBooks = [];
        FireBase.getData("https://appbook-932c6-default-rtdb.firebaseio.com/books.json")
            .then(data => {
                for (let key in data) {
                    for (let i = 0; i < data[key].genre.length; i++) {
                        if (data[key].genre[i].indexOf(genreForSlider) >= 0) {
                            dataWithBooks.push(data[key]);
                            break;
                        }
                    }
                }
                booksLoaded(dataWithBooks);
            })
            .catch(err => {
                booksError()
            })
    }

    renderCard = (item) => {
        let imgDefault = defaultPic;
        if (item.imgBase64 !== "" && item.imgBase64 !== undefined) {
            imgDefault = "data:image/png;base64,"+item.imgBase64;
        }
       return (
           <Link key={item.id} className="card" to={"/books/" + item.id} id={item.id} onClick={() => this.props.selectBook(item.id)}>
               <img src={imgDefault} alt="" className="cardImg"/>
               <h3 className="cardTitle">{item.title}</h3>
               <p className="cardText">{item.author.first_name} {item.author.last_name}</p>
           </Link>
       )
    }

    render() {
        const {books, loading, error} = this.props;
        const settingsSlider = {
            arrows: false,
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
        };
        /*const counterSlider = 3
        const mapBooks = (books, counter) => {
            let i = 1;
            if (counter >= i) {
                books.map(item => {
                    i++;
                    this.renderCard(item);
                })
            }
        }*/
        if (error) {
            return <Error/>
        }
        if (loading) {
            return <Spinner/>
        }
        if (books.length === 0) {
            return <p>There are not books</p>
        }
        return (
            <div className="slider">
                <Slider {...settingsSlider}>
                    {
                        books.map((item) => (
                            this.renderCard(item)
                        ))
                    }
                </Slider>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        books: state.books,
        loading: state.loading,
        error: state.error,
        genreForSlider: state.genreForSlider
    }
}
const mapToDispatchToProps = (dispatch) => {
    return {
        booksLoaded: (books) => {
            dispatch(booksLoaded(books));
        },
        booksError: () => {
            dispatch(booksError());
        },
        booksLoading: () => {
            dispatch(booksLoading());
        },
        selectBook: (id) => {
            dispatch(selectBook(id));
        },
    }
}
export default withFireBaseService()(connect(mapStateToProps, mapToDispatchToProps)(MySlider));
