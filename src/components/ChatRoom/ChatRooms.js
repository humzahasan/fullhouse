import {TextField} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {RiMenuUnfoldFill} from 'react-icons/ri';
import {BiMessageRoundedAdd} from 'react-icons/bi';
import './ChatRooms.css';
import {projectFirestore, timestamp} from '../../config/firebase';
const ChatRooms = () => {
  const roomRef = projectFirestore.collection('chatrooms');

  const [showingChat, setshowingChat] = useState(true);
  const [chatRoom, setChatRoom] = useState([]);
  const [roomInput, setRoomInput] = useState('');
  const [chatRoom, setChatRoom] = useState([]);
  

  const showChat = () => {
    setshowingChat(!showingChat);
  };

  const addRoom = (e) => {
    e.preventDefault();
    const roomExist = chatRoom.includes(roomInput);
    console.log(roomExist);
    roomRef.add({name: roomInput, createdAt: timestamp(), createdBy: 'user'});
    setRoomInput('');
  };

  useEffect(() => {
    roomRef.orderBy('createdAt', 'desc').onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({...doc.data(), id: doc.id});
      });
      setChatRoom(documents);
    });
  }, []);
  console.log(chatRoom);

  return (
    <div className='chatroom'>
      <span onClick={showChat}>
        <RiMenuUnfoldFill fontSize='2rem' />
      </span>
      <div className={showingChat ? 'chatroom-show' : 'chatroom-hide'}>
        <form>
          <TextField
            id='standard-basic'
            label='Enter Chat Room Name'
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
          />
          <button onClick={addRoom} disabled={!roomInput}>
            <BiMessageRoundedAdd fontSize='1.5rem' />
          </button>
        </form>
        <div className='chatroom_chatlist'>
          {chatRoom?.map((room) => (
            <div>
              <p>#{room.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatRooms;
