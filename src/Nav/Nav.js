import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav(props) {
  return (
    <nav className='Nav'>
      <Link to={'/'}>
        BookMark List
      </Link>
      <Link to={'/add-bookmark'}>
        Add Bookmark
      </Link>
    </nav>
  );
}
