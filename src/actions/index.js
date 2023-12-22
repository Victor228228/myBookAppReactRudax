const booksLoaded = (books) => {
    return {
        type: "BOOKS_LOADED",
        payload: books
    };
};
const newArrivalsBooksLoaded = (books) => {
    return {
        type: "NEW_ARRIVALS_BOOKS_LOADED",
        payload: books
    };
};
const booksSearch = (books) => {
    return {
        type: "BOOKS_SEARCH",
        payload: books
    };
};
const booksLoading = () => {
    return {
        type: "BOOKS_LOADING"
    };
};
const newArrivalsBooksLoading = () => {
    return {
        type: "NEW_ARRIVALS_BOOKS_LOADING"
    };
};
const booksError = () => {
    return {
        type: "BOOKS_ERROR"
    };
};
const selectBook = (id) => {
    return {
        type: "BOOK_SELECT",
        payload: id
    };
};
const booksGenre = (genre) => {
    return {
        type: "BOOKS_GENRE",
        payload: genre
    };
};
const lastReadBook = (book) => {
    return {
        type: "LAST_READ_BOOK",
        payload: book
    };
};
const footerActiveLink = (active) => {
    return {
        type: "FOOTER_ACTIVE_LINK",
        payload: active
    };
};




export {
    booksLoaded,
    newArrivalsBooksLoaded,
    booksSearch,
    booksLoading,
    newArrivalsBooksLoading,
    booksError,
    selectBook,
    booksGenre,
    lastReadBook,
    footerActiveLink
}