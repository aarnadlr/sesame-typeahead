import React, { useState } from 'react';

const Typeahead = ({ suggestions }) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');

  // When the input value is changed
  const onChange = e => {
    const userInput = e.currentTarget.value;

    // Filter suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

		// Update the filtered suggestions
    setFilteredSuggestions(filteredSuggestions);
		// Show the suggestions
    setShowSuggestions(true);
    // Update the user input
    setUserInput(e.currentTarget.value);
  };

  // Event fired when the user clicks on a suggestion
  const onClick = e => {
		// reset
    setFilteredSuggestions([]);
		// reset
    setShowSuggestions(false);
    // Update the user input
    setUserInput(e.currentTarget.innerText);
  };

  // When the user presses a key down
  const onKeyDown = e => {

    // If user pressed the enter key:
		// update the input
    if (e.keyCode === 13) {
      setFilteredSuggestions([]);
			// close the suggestions
      setShowSuggestions(false);
      setUserInput(filteredSuggestions[activeSuggestion]);
    }

    // If user pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
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

            // Add active suggestion class
            if (index === activeSuggestion) {
              className = 'suggestion-active';
            }

            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );

          })}
        </ul>
      );

    } else {

      suggestionsListComponent = (
        <div className="no-suggestions">
          <p>No suggestions <span role={'img'} aria-label={'sad face emoji.'}>😢</span></p>
        </div>
      );

    }
  }

  return (
    <>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />

      {suggestionsListComponent}
    </>
  );

};

export default Typeahead;
