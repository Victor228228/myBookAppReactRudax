import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {selectBook} from "../../../actions";
import Spinner from "../../spinner/spinner";
import WithFireBaseService from "../../hoc/with-fireBase-service";

import "./favorite.css";
import defaultPic from "../../slider/image 103.png";



const Favorite = ({FireBase, selectBook}) => {
    const [favBooks, setFavBooks] = useState([]);

   useEffect(() => {
       FireBase.getData(`https://appbook-932c6-default-rtdb.firebaseio.com/users/${localStorage.getItem("userIdInBase")}/favorite.json`)
           .then(data => {
               if (data !== "null") {
                   const idBooks = [];
                   const dataBooks = [];
                   for (let key in data) {
                       idBooks.push(data[key].bookId);
                   }
                   FireBase.getData("https://appbook-932c6-default-rtdb.firebaseio.com/books.json")
                       .then(data => {
                           for (let key in data) {
                               idBooks.map(item => {
                                   if (item === data[key].id) {
                                       dataBooks.push(data[key])
                                   }
                               })
                           }
                           setFavBooks(dataBooks)
                       })

               }
           })
           .catch(err => console.log(err))
   }, [])

    const favoriteBookRender = (item) => {
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

    if (!localStorage.getItem("localId") || !localStorage.getItem("idToken") || !localStorage.getItem("timeSessionLeft") > 0) {
        return (
            <h3 className="favorite_error">You need to enter in this shit</h3>
        )
    }
    if (favBooks.length <= 0) {
        return (
            <Spinner/>
        )
    }
    return(
        <div className="favorite">
            <h3 className="favorite_title">
                My favorite books
            </h3>
            <div className="favorite_book">
                {
                    favBooks.map(item => favoriteBookRender(item))
                }
            </div>
        </div>
    )
}

const mapToDispatchToProps = (dispatch) => {
    return {
        selectBook: (id) => {
            dispatch(selectBook(id));
        }
    }
}

export default connect(null, mapToDispatchToProps)(WithFireBaseService()(Favorite));