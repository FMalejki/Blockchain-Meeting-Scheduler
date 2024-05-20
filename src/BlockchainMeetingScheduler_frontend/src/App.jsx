import { useState } from 'react';
import { BlockchainMeetingScheduler_backend } from 'declarations/BlockchainMeetingScheduler_backend';
import { BrowserRouter as Router, Route, Switch,Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import MeetingCreator from './components/Meeting-Creator.jsx';
import MeetingNumberAdd from './components/Meeting-Number-Add.jsx';
import MeetingNumberView from './components/Meeting-Number-View.jsx';



function App() {
  const [greeting, setGreeting] = useState('');
  const [meetings, setMeetings] = useState([]);


  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    BlockchainMeetingScheduler_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;

  }

  const createMeeting = (meeting) => {
    // Generate a unique link for the meeting
    const uniqueLink = generateUniqueLink();
    const newMeeting = { ...meeting, link: uniqueLink };
    setMeetings([...meetings, newMeeting]);
  };

  const generateUniqueLink = () =>{
    const uniqueLink = "SYA246";
    return uniqueLink;
  };
  
  return (
    <main>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/meeting-creator">
            <MeetingCreator/>
          </Route>
          <Route path="/meeting-add/:uuid" component={MeetingNumberAdd}>
          </Route>
          <Route path="/meeting-view/:uuid" component={MeetingNumberView}>
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
