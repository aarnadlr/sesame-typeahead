import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Typeahead = ({ suggestions }) => {
  const inputEl = useRef(null);

  const [activeSuggestion, setActiveSuggestion] = useState(0);

  // array of desirable suggestions based on user input
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  // focus input on mount
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const onChange = e => {
    const userInput = e.target.value;

    // Array of suggestions that do contain the user's input
    const _filteredSuggestions = suggestions.filter(
      //for each item,
      suggestion =>
        // check if the user-typed item is in the array. If it is, add it to the array
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Set highlight to first item in list
    setActiveSuggestion(0);

    // Update the filtered suggestions
    setFilteredSuggestions(_filteredSuggestions);

    // Show the suggestions
    setShowSuggestions(true);

    // Update the user input
    setUserInput(e.target.value);
  };

  // Event fired when the user clicks on a suggestion
  const onClick = e => {
    // reset
    setActiveSuggestion(0);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    // Update the user input
    setUserInput(e.currentTarget.innerText);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // clear the suggestions array
    setFilteredSuggestions([]);

    // Populate the input with the suggestion they selected
    setUserInput(filteredSuggestions[activeSuggestion]);

    // If there are no suggestions available, the user has typed in their own entry.
    // Set the input to what they typed
    if (filteredSuggestions[activeSuggestion] === undefined) {
      setUserInput(e.target.value);
    }
    // close the suggestions
    setShowSuggestions(false);
  };

  // When the user presses a key
  const onKeyDown = e => {
    // If user pressed the enter key
    if (e.keyCode === 13) {
      handleSubmit(e);
    }

    // If user pressed the up arrow, decrement the index
    if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }

    // If user pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            // Mark the active suggestion with a class
            if (index === activeSuggestion) {
              className = 'suggestion-active';
            }

            return (
              <li className={className} key={index} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <section className="no-suggestions">
          <p>
            No suggestions{' '}
            <span role={'img'} aria-label={'sad face emoji.'}>
              😢
            </span>
          </p>
        </section>
      );
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="options">options</label>
        <input
          ref={inputEl}
          id="options"
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
      </form>

      {suggestionsListComponent}

      {userInput && (
        <p className="selection-label">You have selected: <strong>{userInput}</strong></p>
      )}
    </>
  );
};

Typeahead.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Typeahead;
