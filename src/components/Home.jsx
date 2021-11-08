import LogIn from './LogIn';

function Home({ logout, loggedIn, setLoggedIn, facade, setErrorMessage }) {
  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => {
        setLoggedIn(true);
        setErrorMessage('Logged in');
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => setErrorMessage(e.code + ': ' + e.message));
        } else {
          setErrorMessage('Network error');
        }
      });
  };
  return (
    <div>
      <h1>Home</h1>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <button onClick={logout}>Logout</button>
          Role: {facade.getUserRoles()}
        </div>
      )}
    </div>
  );
}

export default Home;
