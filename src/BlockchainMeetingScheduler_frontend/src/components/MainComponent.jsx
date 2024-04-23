import React from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Home from './Home'; // Załóżmy, że to jest komponent strony głównej
import About from './About'; // Załóżmy, że to jest komponent strony "O nas"
// Importuj inne komponenty

function MainComponent() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      {/* Dodaj inne trasy */}
    </Router>
  );
}

export default MainComponent;