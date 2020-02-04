import React from 'react';
import Rating from '../Rating/Rating';
import BookmarksContext from '../BookmarksContext';
import config from '../config';
import './BookmarkItem.css';

function deleteBookmarkRequest(bookmarkId, cb) {
  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'authorization': `bearer ${config.API_KEY}`
    }
  })
  .then(res => {
    if(!res.ok) {
      //get the error message from the response,
      return res.json().then(error => {
        //then throw it
        throw error
      })
    }
    return res.json()
  })
  .then(data => {
    // call the callback when the request is successful
    // this is where the App component can remote it from state
    cb(bookmarkId)
  })
  .catch(error => {
    console.error(error)
  })
}

export default function BookmarkItem(props) {
  return (
    <BookmarksContext.Consumer>
      {(context) => (
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a
            href={props.url}
            target='_blank'
            rel='noopener noreferrer'>
            {props.title}
          </a>
        </h3>
        <Rating value={props.rating} />
      </div>
      <p className='BookmarkItem__description'>
        {props.description}
      </p>
      <div className='BookmarkItem__buttons'>
        <button
          className='BookmarkItem__description'
          //onClick={() => props.onClickDelete(props.id)}
          onClick={() => {
            deleteBookmarkRequest(
              props.id,
              context.deleteBookmark
            )
          }}
        >
          Delete
        </button>
      </div>
    </li>
    )}
    </BookmarksContext.Consumer>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
}

/*Updating context with API data (#5) ===== */

/*Implementing th delete button*/
//First step = writing the logic for the DELETE request inside BookmarkItem
//...Which owns the buttons (Lines: 3, 11, 15, 6-31)
//Note: swapped the word callback word to cb (common for dev teams)
//Next Step:
//Now we can use this function when the button is clicked
//Lines: 3, 36-37, 57-62
//That's it for the BookmarkItem component 
//It'll also be completely woeking at this point to delete a bookmark
//Only problem = is that we have a copy of the bookmarks in an array in state
//BookmarkItem ===> App.js