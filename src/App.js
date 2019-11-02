import React from "react";
import Typeahead from "./Typeahead";
import './App.css';
import logo from './logo.svg'
import {optionItems} from './optionItems'

function App() {
  return (
    <main className={'container'}>

      <img src={logo} alt="Sesame logo"/>

      <h1>Sesame react typeahead</h1>
      <h2>Type and receive suggestions</h2>

      <Typeahead
        suggestions={optionItems}
      />

    </main>
  );
}

export default App;
