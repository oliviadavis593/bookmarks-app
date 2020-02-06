import React, { Component } from 'react';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import BookmarksContext from '../BookmarksContext';
import PropTypes from 'prop-types';
import './BookmarkList.css';

class BookmarkList extends Component {
  //static defaultProps = {
    //bookmarks: []
  //};

  static contextType = BookmarksContext;

  render() {
    //const { bookmarks } = this.props
    const { bookmarks } = this.context;
    return (
      <section className='BookmarkList'>
        <h2>Your bookmarks</h2>
        <ul className='BookmarkList__list' aria-live='polite'>
          {bookmarks.map(bookmark =>
            <BookmarkItem
              key={bookmark.id}
              {...bookmark}
            />
          )}
        </ul>
      </section>
    );
  }
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.object)
}

export default BookmarkList;

/*Updating context with API data (#4) ===== */

/*Refactor the bookmarks app to use context */
//Now we can use context in BookmarkList.js
//Instead of the bookmarks prop (Lines: 3, 11, 15 )
//BookmarkList.js ===> AddBookMark.js

//DefaultProps (#3)
//BookmarkList accepts a single props named bookmarks - which is an array of bookmark objects 
//We can add PropTypes to BookmarkList to check that the prop is an array (Lines: 33-35 )

//Checking the contents of the array: 
//Any array will satisfy the type check (array of #s, array of string etc.)
//PropTypes gives us the ability to specify the type of element that is allowed in the array 
//We can use arrayOf validator for this (Line: 34)