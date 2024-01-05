// Import the 'React' library for creating React components
import React from 'react';

// Import the 'render' function from 'react-dom' to render React components into the DOM
import { render } from 'react-dom';

// Import the 'App' component from the './App' file
import App from './App';

// Render the 'App' component and mount it to the HTML element with the id 'root'
render(<App />, document.getElementById('root'));
