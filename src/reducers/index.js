import {booksSearch} from "../actions";

const initialState = {  //редакс сторе работает не так как обычный стейт. При обычном стейте если ме перезаписываем какое-то свойство, то меняется только оно, а например второе свойство остается не изменным. А при изменении стора в редаксе он полностью перезаписывается на новый
    books: [],
    newArrivals: [],
    booksSearch: [],
    genreForSlider: "fantasy",
    selectBook: false,
    loading: true,
    loadingNewArrivals: true,
    error: false,
    footerActiveLink: "Home",
    lastReadBook: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "BOOKS_LOADED":
            return {
            ...state, //при помощи спред оператора раскрываем сюда весь предыдущий стейт, а ниже уже меняет нужные нам свойства. делается для того что бы свойства не пропали которые мы не меняем тут ниже
            books: action.payload,
            loading: false,
            error: false
        };
        case "NEW_ARRIVALS_BOOKS_LOADED":
            return {
                ...state,
                newArrivals: action.payload,
                loadingNewArrivals: false,
                error: false
            };
        case "BOOKS_SEARCH":
            return {
                ...state,
                booksSearch: action.payload,
                loadingNewArrivals: false,
                error: false
            };
        case "BOOKS_LOADING": return {
            ...state,
            books: state.books,
            loading: true,
            error: false
        };
        case "NEW_ARRIVALS_BOOKS_LOADING": return {
            ...state,
            newArrivals: state.newArrivals,
            loadingNewArrivals: true,
            error: false
        };
        case "BOOKS_ERROR": return {
            ...state,
            books: [],
            newArrivals: [],
            loading: false,
            error: true
        };
        case "BOOK_SELECT": return {
            ...state,
            selectBook: action.payload
        };
        case "BOOKS_GENRE": return {
            ...state,
            genreForSlider: action.payload
        };
        case "LAST_READ_BOOK": return {
            ...state,
            lastReadBook: action.payload
        };
        case "FOOTER_ACTIVE_LINK": return {
            ...state,
            footerActiveLink: action.payload
        };

        default: return state;
    }
}

export default reducer;