import React from 'react';


const BookmarksContext = React.createContext({
    bookmarks: [],
    addBookmark: () => {},
    deleteBookmark: () => {},
    updateBookmark: () => {},
})

export default BookmarksContext; 

/*Updating context with API data (#1) ===== */

/*Refactor the bookmarks app to use context */
//Make a context instance to store the bookmarks 
//We should create the shape for all the methods we'll intend to implement
//As well as an empty array of bookmarks
//We intend to make addBookmark & deleteBookmark 
//So we've put them in as empty function 
//so that we have the shape of context ready

