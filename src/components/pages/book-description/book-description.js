import {Component} from "react";
import {connect} from "react-redux";
import WithFireBaseService from "../../hoc/with-fireBase-service";
import Spinner from "../../spinner/spinner";
import {Link} from "react-router-dom";
import {lastReadBook} from "../../../actions";


import "./bock-description.css";
import 'font-awesome/css/font-awesome.min.css';
import arrowBack from "./img/arrowBack.svg";
import likeActive from "./img/likeActive.svg";
import defaultImg from "./img/defaultImg.png"
import like from "./img/like.svg";
import defaultPic from "../../slider/image 103.png";





class BookDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: null,
            bookLike: false,
            bookRating: 0
        }
        this.renderBook = this.renderBook.bind(this);
        this.likeChange = this.likeChange.bind(this);
        this.changeBookRating = this.changeBookRating.bind(this);
        this.lastOpenBook = this.lastOpenBook.bind(this);
    }

    componentDidMount() {
        const {FireBase, id} = this.props;
        FireBase.getData("https://appbook-932c6-default-rtdb.firebaseio.com/books.json")
            .then(data => {
                for (let key in data) {
                    if (data[key].id === id) {
                        console.log(data[key])
                        this.setState({
                            book: data[key]
                        })
                        if (localStorage.getItem("userIdInBase")) {
                            FireBase.getData(`https://appbook-932c6-default-rtdb.firebaseio.com/users/${localStorage.getItem("userIdInBase")}/favorite.json`)
                                .then(data => {
                                    if (data !== "null") {
                                        for (let key in data) {
                                            if (data[key].bookId === id) {
                                                this.setState({
                                                    bookLike: true
                                                })
                                            }
                                        }
                                    }
                                })
                            FireBase.getData(`https://appbook-932c6-default-rtdb.firebaseio.com/users/${localStorage.getItem("userIdInBase")}/yourRatingBooks.json`)
                                .then(data => {
                                    if (data !== "null") {
                                        for (let key in data) {
                                            if (data[key].bookId === id) {
                                                this.setState({
                                                    bookRating: data[key].bookRating
                                                })
                                            }
                                        }
                                    }
                                })
                        }
                    }
                }
            })
    }
    componentWillUnmount() {
        const {FireBase, id} = this.props;
        console.log("unmaunt")
        if (localStorage.getItem("userIdInBase")) {
            let same = false;
            FireBase.getData(`https://appbook-932c6-default-rtdb.firebaseio.com/users/${localStorage.getItem("userIdInBase")}/favorite.json`)
                .then(data => {
                    for (let key in data) {
                        if (data[key].bookId === id) {
                            same = true;
                            if (this.state.bookLike === false) {
                                FireBase.sendData(`https://appbook-932c6-default-rtdb.firebaseio.com/users/${localStorage.getItem("userIdInBase")}/favorite/${key}.json`, {bookId: id}, "DELETE")
                            }
                        }
                    }
                    if (!same && this.state.bookLike) {
                        FireBase.sendData(`https://appbook-932c6-default-rtdb.firebaseio.com/users/${localStorage.getItem("userIdInBase")}/favorite.json`, {bookId: id}, "POST")
                            .then(response => response.json())
                            .then(data => console.log(data))
                    }
                })
            if (this.state.bookRating > 0) {
                let same = false
                FireBase.getData(`https://appbook-932c6-default-rtdb.firebaseio.com/users/${localStorage.getItem("userIdInBase")}/yourRatingBooks.json`)
                    .then(data => {
                        if (data !== "null") {
                            for (let key in data) {
                                if (data[key].bookId === id) {
                                    same = true
                                    console.log(same)
                                    FireBase.sendData(`https://appbook-932c6-default-rtdb.firebaseio.com/users/${localStorage.getItem("userIdInBase")}/yourRatingBooks/${key}.json`, {bookId:id, bookRating: this.state.bookRating}, "PATCH")
                                }
                            }
                        }
                        if (same === false) {
                            console.log("nizyyyyyyyy")
                            FireBase.sendData(`https://appbook-932c6-default-rtdb.firebaseio.com/users/${localStorage.getItem("userIdInBase")}/yourRatingBooks.json`, {bookId:id, bookRating: this.state.bookRating}, "POST")
                                .then(response => response.json())
                                .then(data => console.log(data))
                        }
                    })

            }
        }
    }

    likeChange() {
        this.setState({
            bookLike: !this.state.bookLike
        })
    }
    changeBookRating(event) {
        this.setState({
            bookRating: event.target.id.slice(4)
        })
    }
    lastOpenBook() {
        if (localStorage.getItem("userIdInBase")) {
            this.props.lastReadBook(this.props.id)
            this.props.FireBase.sendData(`https://appbook-932c6-default-rtdb.firebaseio.com/users/${localStorage.getItem("userIdInBase")}/lastOpen.json`, {bookId: this.props.id}, "PATCH")
                .then(response => response.json())
                .then(data => console.log(data))
        }
    }

    renderBook(book) {
        let imgDefault = defaultPic;
        if (book.imgBase64 !== "" && book.imgBase64 !== undefined) {
            imgDefault = "data:image/png;base64,"+book.imgBase64;
        }
        return(
            <div className="bookDescription" key={book.id}>
                <div className="bookDescription_header">
                    <Link to={"/"}>
                        <img src={arrowBack} alt="back"/>
                    </Link>
                    <img src={this.state.bookLike? likeActive: like} alt="like" onClick={this.likeChange}/>
                </div>
                <div className="bookDescription_content">
                    <img src={imgDefault} alt={imgDefault} className="bookDescription_content_img"/>
                    <h3 className="bookDescription_content_bookName">
                        {book.title}
                    </h3>
                    <p className="bookDescription_content_author">
                        {book.author.first_name} {book.author.last_name}
                    </p>
                    <div className="bookDescription_content_rating">
                        <i className={`fa fa-star ${this.state.bookRating >=1? "checked": ""}`} id="star1" onClick={this.changeBookRating}></i>
                        <i className={`fa fa-star ${this.state.bookRating >=2? "checked": ""}`} id="star2" onClick={this.changeBookRating}></i>
                        <i className={`fa fa-star ${this.state.bookRating >=3? "checked": ""}`} id="star3" onClick={this.changeBookRating}></i>
                        <i className={`fa fa-star ${this.state.bookRating >=4? "checked": ""}`} id="star4" onClick={this.changeBookRating}></i>
                        <i className={`fa fa-star ${this.state.bookRating >=5? "checked": ""}`} id="star5" onClick={this.changeBookRating}></i>
                    </div>
                </div>
                <div className="bookDescription_aboutBook">
                    <h3 className="bookDescription_aboutBook_title">About Book</h3>
                    <p className="bookDescription_aboutBook_text">
                        {book.annotation}
                    </p>
                </div>
                <Link to={`/books/${this.props.id}/read`} className="bookDescription_buttonRead" onClick={this.lastOpenBook}>
                    Read
                </Link>
            </div>
        )
    }

    render() {
        if (this.state.book === null) {
            return (
                <>
                    <Spinner/>
                </>
            )
        }
        return (
            <div className="book">
                {
                    this.renderBook(this.state.book)
                }
            </div>
        )
    }
}

const mapToDispatchToProps = (dispatch) => {
    return {
        lastReadBook: (book) => {
            dispatch(lastReadBook(book));
        },
    }
}

export default connect(null, mapToDispatchToProps)(WithFireBaseService()(BookDescription));