import './App.css';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Jokes from './components/Jokes.jsx';
import Webscraper from './components/Webscraper';
import NoMatch from './components/NoMatch.jsx';
import facade from './facade';
import { Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('All is good ... so far');

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setErrorMessage('Logged out.')
  };

  return (
    <Container>
      <Router>
        <Header facade={facade} loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Home
              logout={logout}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              facade={facade}
              setErrorMessage={setErrorMessage}
            />
          </Route>
          <Route path="/jokes">
            {facade.hasUserAccess('user', loggedIn) && 
              <Jokes facade={facade} setErrorMessage={setErrorMessage} />}
          </Route>
          <Route path="/webscraper">
            {facade.hasUserAccess('admin', loggedIn) && 
              <Webscraper facade={facade} setErrorMessage={setErrorMessage} />}
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
      <Alert className="mt-4" >Status: {errorMessage}</Alert>
    </Container>
  );
}

export default App;
