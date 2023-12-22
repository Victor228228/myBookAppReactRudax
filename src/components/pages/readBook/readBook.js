import {Link} from "react-router-dom";
import WithFireBaseService from "../../hoc";
import {useEffect, useState} from "react";
import Spinner from "../../spinner";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { ReactReader, EpubView } from "react-reader";

import "./readBook.css";
import arrowBack from "./img/arrowBack.svg"


const ReadBook = ({FireBase, id, FireBaseStorage}) => {
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);
    const [urlBook, setUrlBook] = useState('');
    const fileReader = new FileReader();

    useEffect(() => {
        FireBase.getData("https://appbook-932c6-default-rtdb.firebaseio.com/books.json")
            .then(data => {
                for (let key in data) {
                    if (data[key].id === id) {
                        setBook(data[key]);
                        setLoading(false);

                        listAll(ref(FireBaseStorage, `myBooks`))
                            .then(data => {
                                data.items.forEach(item => {
                                    if (item._location.path_ === `myBooks/${id}.epub`) {
                                        getDownloadURL(item)
                                            .then(data => {
                                                setUrlBook(data)
                                            })
                                    } else {
                                        console.log("takoi nema")
                                    }
                                })
                            })
                        break;
                    }
                }
            })

    }, [])

    if (loading) {
        return <Spinner/>
    }
    if (book.length === 0) {
        return (
            <h3>Error</h3>
        )
    }


    return (
        /*<div className="readBook">
            <div className="readBook_header">
                <Link to={"/"}>
                    <img src={arrowBack} alt="" className="readBook_header_arrowBack"/>
                </Link>
                <h3 className="readBook_header_title">
                    {book.title}
                </h3>
            </div>
            <div className="readBook_content">
                {book.text}
            </div>
        </div>*/
        <div className="readBook" >
            <ReactReader
                url={/*'https://cors-anywhere.herokuapp.com/' + */urlBook}
                title={book.title}
            />
        </div>
    )
}

export default WithFireBaseService()(ReadBook);