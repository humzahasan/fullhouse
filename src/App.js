import './App.css';
import Chat from './components/Chat/Chat';
import ChatRoom from './components/ChatRoom/ChatRoom';

function App() {
  return (
    <div className='app'>
      <ChatRoom />
      <Chat />
    </div>
  );
}

export default App;
