import './App.css';
import Chat from './components/Chat/Chat';
import ChatRooms from './components/ChatRoom/ChatRooms';

function App() {
  return (
    <div className='app'>
      <ChatRooms />
      <Chat />
    </div>
  );
}

export default App;
