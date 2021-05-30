import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Chat from './components/Chat/Chat';
import ChatRooms from './components/ChatRoom/ChatRooms';
import Banner from './components/Banner';
import {useAuthState} from 'react-firebase-hooks/auth';
import heroimage from './asset/heroimage.svg';
import {googleProvider, projectAuth} from './config/firebase';
import {motion} from 'framer-motion';
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
            <ChatRooms user={user} />
            <Switch>
              <Route path='/room/:roomId'>
                <Chat user={user} />
              </Route>
            </Switch>
          </div>
        ) : (
          <div className='app-landing'>
            <motion.div
              initial={{opacity: 0, x: '-100vw'}}
              animate={{opacity: 1, x: '0'}}
              transition={{duration: 0.5}}
              className='landing-left'
            >
              <h1>fullhouse</h1>
              <h3>"A cloud moderated room based chat applications"</h3>
              <motion.button
                whileHover={{scale: 1.1}}
                whileTap={{scale: 1}}
                transition={{duration: 0.5}}
                onClick={googleSignIn}
              >
                Sign In With Google
              </motion.button>
            </motion.div>
            <motion.div
              initial={{opacity: 0, x: '100vw'}}
              animate={{opacity: 1, x: '0'}}
              transition={{duration: 0.5}}
              className='landing-right'
            >
              <img src={heroimage} alt='Chat Application' />
            </motion.div>
          </div>
        )}
      </Router>
    </>
  );
}

export default App;
