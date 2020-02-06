import React, { Component } from  'react';
import config from '../config'
import './AddBookmark.css';
//import { withRouter } from 'react-router-dom';
import BookmarksContext from '../BookmarksContext';
import PropTypes from 'prop-types';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class AddBookmark extends Component {
  //static defaultProps = {
    //onAddBookmark: () => {}
  //};
  static contextType = BookmarksContext;

  state = {
    error: null,
  };

  handleSubmit = e => {
    e.preventDefault()
    // get the form fields from the event
    const { title, url, description, rating } = e.target
    const bookmark = {
      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating.value,
    }
    this.setState({ error: null })
    fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        title.value = ''
        url.value = ''
        description.value = ''
        rating.value = ''
        this.context.addBookmark(data)
        this.props.history.push('/')
        //this.props.onAddBookmark(data)
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  render() {
    const { error } = this.state
    //const { onClickCancel } = this.props
    return (
      <section className='AddBookmark'>
        <h2>Create a bookmark</h2>
        <form
          className='AddBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Great website!'
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder='https://www.great-website.com/'
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue='1'
              min='1'
              max='5'
              required
            />
          </div>
          <div className='AddBookmark__buttons'>
            {/*<button type='button' onClick={onClickCancel}>*/}
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

AddBookmark.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  rating: PropTypes.number,
  description: PropTypes.string
}

AddBookmark.defaultProps = {
  rating: 1, 
  description: ''
};

export default AddBookmark;


/*Updating context with API data (#4 ) ===== */

/*Refactor the bookmarks app to use context = FINAL */
//Steps:
//We don't need the withRouter anymore 
//Because the AddBookmark is passed to the component prop of Route 
//Which gives it history as prop
//We'll swap props.onAddBookmark for context.addBookmark
//We'll implemnet cancel button directly inside this component 
//Instead of accepting an onClickCancel prop 
//That's it for refactoring 
//We've swapped teh prop-drilling for context to provide the data from the API response
//AddBookmark.js ===> BookmarkItem.js

//DefaultProps (#2)
//Bookmark components is more involved that the Rating component (expecting 4 props instead of 1)
//We can add PropTypes to AddBookmark component to ensure that these rules are followed (Lines: 151-156)
//We can also add the defaultProps as well (Lines:158-161)
//AddBookMark.js ===> BookMarkList.js