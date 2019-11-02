import React from "react";
import Typeahead from "./Typeahead";
import './App.css';
import {optionItems} from './optionItems'

function App() {
  return (
    <div>
      <h1>Sesame react typeahead</h1>
      <h2>Type into the input and receive suggestions</h2>

      <Typeahead
        suggestions={optionItems}
      />

    </div>
  );
}

export default App;
