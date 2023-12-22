import React, {Component} from "react";
import {connect} from "react-redux";
import {newArrivalsBooksLoaded, booksError, newArrivalsBooksLoading, selectBook} from "../../actions";
import WithFireBaseService from "../hoc/with-fireBase-service";
import Spinner from "../spinner";
import Error from "../error";
import {Link} from "react-router-dom";

import "./newArrivals.css"
import defaultPic from "../slider/image 103.png";




class NewArrivals extends Component {
    componentDidMount() {
        const {FireBase, newArrivalsBooksLoaded, newArrivalsBooksLoading, booksError} = this.props;
        /*newArrivalsBooksLoading();*/

        const dataWithBooks = [];
        FireBase.getData("https://appbook-932c6-default-rtdb.firebaseio.com/books.json")
            .then(data => {
                for (let key in data) {
                    dataWithBooks.push(data[key]);
                    console.log(data)
                }
                newArrivalsBooksLoaded(dataWithBooks);
            })
            .catch(err => {
                booksError()
            })
    }
    renderBooksArrivals = (item) => {
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
        const {newArrivalsBooks, loadingNewArrivals, error} = this.props
        if (loadingNewArrivals) {
            return <Spinner/>
        }
        if (error) {
            return <Error/>
        }
        if (newArrivalsBooks.length === 0) {
            return (
                <p>There are not books</p>
            )
        }
        const newMassiveBooks = newArrivalsBooks.reverse().slice(0, 4)
        return(
            <div className="newArrivals_content">
                {
                    newMassiveBooks.map(item => (
                        this.renderBooksArrivals(item)
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newArrivalsBooks: state.newArrivals,
        loadingNewArrivals: state.loadingNewArrivals,
        error: state.error,
    }
}
const mapToDispatchToProps = (dispatch) => {
    return {
        newArrivalsBooksLoaded: (books) => {
            dispatch(newArrivalsBooksLoaded(books));
        },
        newArrivalsBooksLoading: () => {
            dispatch(newArrivalsBooksLoading());
        },
        selectBook: (id) => {
            dispatch(selectBook(id));
        },
        booksError: () => {
            dispatch(booksError());
        },
    }
}

export default connect(mapStateToProps, mapToDispatchToProps)(WithFireBaseService()(NewArrivals));