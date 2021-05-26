import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Chat from './components/Chat/Chat';
import ChatRooms from './components/ChatRoom/ChatRooms';
import Banner from './components/Banner';

function App() {
  return (
    <Router>
        <Banner />
      <div className='app'>
        <ChatRooms />
        <Switch>
          <Route path='/room/:roomId'>
            <Chat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
