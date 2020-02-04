import React, { Component } from 'react';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import BookmarksContext from '../BookmarksContext';
import './BookmarkList.css'

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

export default BookmarkList;

/*Updating context with API data (#4) ===== */

/*Refactor the bookmarks app to use context */
//Now we can use context in BookmarkList.js
//Instead of the bookmarks prop (Lines: 3, 11, 15 )
//BookmarkList.js ===> AddBookMark.js