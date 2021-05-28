import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Chat from './components/Chat/Chat';
import ChatRooms from './components/ChatRoom/ChatRooms';
import Banner from './components/Banner';
import {useAuthState} from 'react-firebase-hooks/auth';
import {googleProvider, projectAuth} from './config/firebase';
function App() {
  const [user] = useAuthState(projectAuth);

  const googleSignIn = () => {
    projectAuth.signInWithPopup(googleProvider);
  };
  return (
    <>
      <Banner />
      <Router>
        {user ? (
          <div className='app'>
            <ChatRooms user={user}/>
            <Switch>
              <Route path='/room/:roomId'>
                <Chat user={user} />
              </Route>
            </Switch>
          </div>
        ) : (
          <div className='app-landing'>
            <h1>fullhouse</h1>
            <h3>a cloud moderated room based chat applications</h3>
            <button onClick={googleSignIn}>Sign In With Google</button>
          </div>
        )}
      </Router>
    </>
  );
}

export default App;
