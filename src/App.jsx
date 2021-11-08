import './App.css';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Jokes from './components/Jokes.jsx';
import Webscraper from './components/Webscraper';
import NoMatch from './components/NoMatch.jsx';
import facade from './facade';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('All is good ... so far');

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  return (
    <Container>
      <Router>
        <Header facade={facade} />
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
            {facade.hasUserAccess('user') && <Jokes facade={facade} />}
          </Route>
          <Route path="/webscraper">
            {facade.hasUserAccess('admin') && <Webscraper facade={facade} />}
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
      <p>Status: {errorMessage}</p>
    </Container>
  );
}

export default App;
