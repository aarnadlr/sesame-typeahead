import React from "react";
import Typeahead from "./Typeahead";
import './App.css';

function App() {
  return (
    <div>
      <h1>Sesame react typeahead</h1>
      <h2>type into the input and receive suggestions</h2>
      <Typeahead
        suggestions={[
          "This",
          "is",
          "a",
          "sample",
          "set",
          "of",
          "keyword",
          "phrases"
        ]}
      />
    </div>
  );
}

export default App;
