import {Avatar, CircularProgress, TextField} from '@material-ui/core';
import './Chat.css';
import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {projectFirestore, timestamp} from '../../config/firebase';
import {motion} from 'framer-motion';

const Chat = ({user}) => {
  const roomRef = projectFirestore.collection('chatrooms');
  const {roomId} = useParams();
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [roomMessages, setRoomMessages] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [roomMessages]);

  const sendMessage = (e) => {
    e.preventDefault();
    projectFirestore.collection(roomData.name).add({
      username: user.displayName,
      senderImage: user.photoURL,
      senderId: user.uid,
      message: messageInput,
      sentAt: timestamp(),
    });
    setMessageInput('');
  };

  useEffect(() => {
    const fetchData = async () => {
      let room = await roomRef.doc(roomId).get();
      room = room.data();
      setRoomData(room);
      setRoomName(room.name);
    };
    fetchData();
    
  }, [roomId, roomRef]);

  useEffect(() => {
    const fetchMessage = async () => {
      if (roomName) {
        projectFirestore
          .collection(roomName)
          .orderBy('sentAt', 'asc')
          .onSnapshot((snap) => {
            let messages = [];
            snap.forEach((doc) => {
              messages.push({...doc.data(),id : doc.id});
            });
            setRoomMessages(messages);
          });
      }
    };
    fetchMessage();
  }, [roomName, messageInput]);

  return (
    <>
      {roomData ? (
        <div className='chat'>
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 2}}
            className='chat__info'
          >
            <h3>{roomData.name}</h3>
            <h6>Last Activity: </h6>
          </motion.div>
          {roomMessages ? (
            <div>
              <motion.div
                initial={{opacity: 0, x: '-100vw'}}
                animate={{opacity: 1, x: '0'}}
                transition={{duration: 0.5}}
                className='chat__body'
              >
                {roomMessages.map((message) => (
                  <motion.div
                    whileHover={{scale: 0.98}}
                    whileTap={{scale: 1}}
                    transition={{duration: 1}}
                    className={
                      message.senderId === user.uid
                        ? 'chat__messagesent'
                        : 'chat__messagereceived'
                    }
                  >
                    <Avatar src={message.senderImage}>
                      {String(message.username)[0]}
                    </Avatar>
                    <div className='chat_user'>
                      <p>{message.username}</p>
                      <p>{message.message}</p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </motion.div>
              <div className='chat__messageInput'>
                <form onSubmit={sendMessage}>
                  <TextField
                    id='chat-message'
                    label='Type a message'
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                </form>
              </div>
            </div>
          ) : (
            <div className='loading'>
              <h3>Fetching the room message</h3>
              <CircularProgress />
            </div>
          )}
        </div>
      ) : (
        <div className='loading'>
          <h3>Initilizing the room</h3>
          <CircularProgress />
        </div>
      )}
    </>
  );
};
export default Chat;
