import { useState } from 'react';
import { BlockchainMeetingScheduler_backend } from 'declarations/BlockchainMeetingScheduler_backend';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    BlockchainMeetingScheduler_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }
  
  return (
    <main>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
