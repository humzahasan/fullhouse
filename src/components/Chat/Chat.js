import {Avatar, CircularProgress, TextField} from '@material-ui/core';
import './Chat.css';
import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {projectFirestore, timestamp} from '../../config/firebase';
import {motion} from 'framer-motion';

const Chat = () => {
  const roomRef = projectFirestore.collection('chatrooms');
  const {roomId} = useParams();
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [roomMessages, setRoomMessages] = useState(null);
  const user = 'USER';

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
      username: 'BRAVO',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    const fetchMessage = async () => {
      console.log(roomName);
      if (roomName) {
        projectFirestore
          .collection(roomName)
          .orderBy('sentAt', 'asc')
          .get()
          .then((querySnapshot) => {
            let messages = [];
            querySnapshot.forEach((doc) => {
              messages.push(doc.data());
            });
            setRoomMessages(messages);
            console.log('INSIDE', messages);
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
                      message.username === user
                        ? 'chat__messagesent'
                        : 'chat__messagereceived'
                    }
                  >
                    <Avatar>{String(message.username)[0]}</Avatar>
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
              <h1>Loading Message</h1>
              <CircularProgress />
            </div>
          )}
        </div>
      ) : (
        <div className='loading'>
          <h1>Loading Room</h1>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Chat;
