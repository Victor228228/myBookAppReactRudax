import {useNavigate} from "react-router-dom";
import WithFireBaseService from "../../hoc/with-fireBase-service";
import {booksSearch} from "../../../actions";
import {connect} from "react-redux";

import "./search.css"
import searchPic from "./img/search-normal.png"


const Search = ({FireBase, booksSearch}) => {
    const navigate = useNavigate();
    const checkEnterInEvent = (event) => {
        if (event.key === "Enter") {
            const nameSearch = event.target.value.toLowerCase();
            const books = [];
            FireBase.getData("https://appbook-932c6-default-rtdb.firebaseio.com/books.json")
                .then(data => {
                    console.log(data)
                    for (let key in data) {
                        if (data[key].title.toLowerCase().indexOf(nameSearch) >= 0 || data[key].author.first_name.toLowerCase().indexOf(nameSearch) >= 0 || data[key].author.last_name.toLowerCase().indexOf(nameSearch) >= 0) {
                            books.push(data[key]);
                        }
                    }
                    booksSearch(books);
                    navigate('/search/' + nameSearch)
                })

        }
    }
    return (
        <div className={"searchBox"}>
            <input className="searchTxt" type="text" name="search" placeholder="Type to search" onKeyDown={checkEnterInEvent}/>
            <a className="searchBtn" href="#">
                <img className="searchBtn_pic" src={searchPic} alt=""/>
            </a>
        </div>
    )
}

const mapToDispatchToProps = (dispatch) => {
    return {
        booksSearch: (books) => {
            dispatch(booksSearch(books));
        },

    }
}

export default connect(null, mapToDispatchToProps)(WithFireBaseService()(Search));
