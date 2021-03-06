import React from 'react';
import './Rating.css';
import PropTypes from 'prop-types';

export default function Rating(props) {
  const stars = [0, 0, 0, 0, 0].map((_, i) =>
    (i < props.value)
      ? <span key={i}>&#9733; </span>
      : <span key={i}>&#9734; </span>
  );
  return (
    <div className="rating">
      {stars}
    </div>
  );
}

Rating.defaultProps = {
  value: 1
}

Rating.propTypes = {
  value: PropTypes.number.isRequired
};


//PropTypes (#1)
//Rating components accepts a single prop named value that should be a # between 1 & 5
//However, the current version of the Rating component 
//..doesn't handle the case where the value prop does not meet this criteria 

//Issue: 
//A developer using the Rating component may pass invalid values to this prop
//Mat not even be aware that there is a problem 

//Solution:
//We can prevent that by adding propTypes propert to the component 
//import propTypes
//Add a propTypes property (Lines: 18-20)
//Make sure that the value prop is a number (Line: 19)
//Rating.js ===> App.js

//DefaultProps (#1)
//Default props are evaluated before PropTypes 
//So the value prvided by the defaultProps are type checked by PropTypes
//We can add a defaultProps property to Rating component & set value to 1
// Now even if parent invokes the component with no value like this: <Rating />
//It will automatically  be assigned the value 1 
//Rating.js ===> AddBookMmark.js