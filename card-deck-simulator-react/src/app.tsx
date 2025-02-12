// Below is importing React module from 'react'.
import React from "react";

// Importing the Deck component from './deck'
import Deck from './deck';

// Functional component App.
function App() {
  // Below is return the JSX containing the header and the Deck component.
  return (
    <div className="App">
      <h1>Card Deck Simulator</h1> {/* Displaying a header */}
      <Deck /> {/* Rendering the Deck component */}
    </div>
  );
}

// Below is exporting the App component as the default export.
export default App;