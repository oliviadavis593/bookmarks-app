import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import BookmarksContext from './BookmarksContext';
import Rating from './Rating/Rating';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

//const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
  // {
  //   id: 1,
  //   title: 'Thinkful',
  //   url: 'http://www.thinkful.com',
  //   rating: '5',
  //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  // },
  // {
  //   id: 2,
  //   title: 'Github',
  //   url: 'http://www.github.com',
  //   rating: '4',
  //   desc: 'brings together the world\'s largest community of developers.'
  // }
//];

class App extends Component {
  state = {
    //bookmarks,
    bookmarks: [],
    error: null,
  };


  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  deleteBookmark = bookmarkId => {
    const newBookmarks = this.state.bookmarks.filter(bm =>
      bm.id !== bookmarkId  
    )
    this.setState({
      bookmarks: newBookmarks
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  render() {
    //const { bookmarks } = this.state
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
    }
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        {/*<Nav /> */}
        {/*<div className='content' aria-live='polite'> */}
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
          <Route 
            path='/add-bookmark'
            //render={({ history }) => {
              //return <AddBookmark 
              //onAddBookmark={this.addBookmark}
              //onClickCancel={() => history.push('/')}
              component={AddBookmark}
              />
           
          <Route 
          exact path='/'
          //render={() => 
          //<BookmarkList 
          //bookmarks={bookmarks}
          component={BookmarkList}
          />
          
        </div>
        </BookmarksContext.Provider>
        {/*</div> */}
        <Rating />
        <BookmarkList />
      </main>
    );
  }
}

export default App;

/*Updating context with API data (#2) ===== */

/*Refactor the bookmarks app to use context */
//Swapped the state of bookmarks for context (Lines: 5, 37, 75-78, 84-86, 104, 105)
//render method inside App is using render prop on each Route
//..so that props can be specified on the AddBookmark & BookmarkList component instances

/*Updating context with API data (#3 ) ===== */

/*Refactor the bookmarks app to use context */
//We can use context inside of these components instead of expecting props 
//So let's swap the render callback prop 
//For the more simple component approach to routing (Lines: 93 & 102)
//A the App component is using state to store the bookmarks 
//And we're populating the context from the state 
// We don't need to make anymore changes to the App component 
// App.js ===> BookmarkList.js

/*Updating context with API data (#6) FINAL STEP ===== */

/*Implementing th delete button*/
//Delete button is working 
//But we have a copy of the bookmarks in an array in state 
//We also need to remote the deleted bookmark from bookmarks array in state
//This is where context.deleteBookmark callback comes in 
//Implement the function to remove a bookmark from state (Lines: 55-62)
//Add the implementation to override the empty deleteBookmark function that's in context (Line: 87)
//And now everything is working completely 

//PropTypes (#2)
//Testing Solution:
//Place a value that isn't a number value inside the Rating component (Lines: 118)
//In browser console tab = warning produced because we passed a string instead of a number
//If you change string to a number = warning disappears 
//If you don't have a value at all = warning is still not present 
//This is because we didn't specify that this prop was required
//Fix: 
//Add isRequired validator - chaining to the PropTypes validator (Rating.js)

//PropTypes (#3)
//PropTypes.number & PropTypes.isRequired are examples of validators 
//Some of the other primititve validators provided by PropTypes:
/*
- PropTypes.array - optional array 
- PropTypes.book - optional boolean value (true, false)
- PropTypes.func - optional function
- PropTypes.object - optional object
- PropTypes.string - optional String
*/