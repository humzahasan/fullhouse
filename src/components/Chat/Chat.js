import {Avatar, TextField} from '@material-ui/core';
import './Chat.css';
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {projectFirestore, timestamp} from '../../config/firebase';

const Chat = () => {
  const roomRef = projectFirestore.collection('chatrooms');
  const {roomId} = useParams();
  const [roomData, setRoomData] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [roomMessages, setRoomMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    projectFirestore.collection(roomData.name).add({
      username: 'USER',
      message: messageInput,
      sentAt: timestamp(),
    });
    setMessageInput('');
  };

  useEffect(() => {
    const fetchData = async () => {
      let note = await roomRef.doc(roomId).get();
      console.log(note);
      note = note.data();
      if (note) {
        console.log('INSIDE');
      }
      setRoomData(note);
    };
    console.log('First');
    fetchData();
    console.log('First end');
  }, [roomId]);

  useEffect(() => {
    console.log('THIRD');
    console.log(roomData);
    if (roomData) {
      console.log('COMPLICATED');
      console.log(messageInput);
      projectFirestore
        .collection(roomData.name)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
          });
        });
    }
  }, [roomRef]);
  useEffect(() => {
    console.log('SECOND');
  }, []);

  return (
    <>
      {roomData ? (
        <div className='chat'>
          <div className='chat__info'>
            <h3>{roomData.name}</h3>
            <h3>{String(roomData.createdAt)}</h3>
          </div>
          <div className='chat__body'>
            <div className='chat__messagesent'>
              <Avatar>A</Avatar>
              <div className='chat_user'>
                <p>you</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque rerum illum excepturi nam assumenda, tempora saepe.
                  Molestias, deserunt iste. Perspiciatis, soluta. Laborum earum
                  doloribus unde vel adipisci in hic dignissimos.
                </p>
              </div>
            </div>
            <div className='chat__messagereceived'>
              <Avatar>A</Avatar>
              <div className='chat_user'>
                <p>you</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque rerum illum excepturi nam assumenda, tempora saepe.
                  Molestias, deserunt iste. Perspiciatis, soluta. Laborum earum
                  doloribus unde vel adipisci in hic dignissimos.
                </p>
              </div>
            </div>
            <div className='chat__messagesent'>
              <Avatar>A</Avatar>
              <div className='chat_user'>
                <p>you</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque rerum illum excepturi nam assumenda, tempora saepe.
                  Molestias, deserunt iste. Perspiciatis, soluta. Laborum earum
                  doloribus unde vel adipisci in hic dignissimos.
                </p>
              </div>
            </div>
            <div className='chat__messagereceived'>
              <Avatar>A</Avatar>
              <div className='chat_user'>
                <p>you</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque rerum illum excepturi nam assumenda, tempora saepe.
                  Molestias, deserunt iste. Perspiciatis, soluta. Laborum earum
                  doloribus unde vel adipisci in hic dignissimos.
                </p>
              </div>
            </div>
            <div className='chat__messagesent'>
              <Avatar>A</Avatar>
              <div className='chat_user'>
                <p>you</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque rerum illum excepturi nam assumenda, tempora saepe.
                  Molestias, deserunt iste. Perspiciatis, soluta. Laborum earum
                  doloribus unde vel adipisci in hic dignissimos.
                </p>
              </div>
            </div>
            <div className='chat__messagereceived'>
              <Avatar>A</Avatar>
              <div className='chat_user'>
                <p>you</p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Itaque rerum illum excepturi nam assumenda, tempora saepe.
                  Molestias, deserunt iste. Perspiciatis, soluta. Laborum earum
                  doloribus unde vel adipisci in hic dignissimos.
                </p>
              </div>
            </div>
          </div>
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
        <h1>LOADING.......</h1>
      )}
    </>
  );
};

export default Chat;
