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
  const [existingRoom, setExistingRoom] = useState([]);

  const showChat = () => {
    setshowingChat(!showingChat);
  };

  const addRoom = (e) => {
    e.preventDefault();
    const roomExist = existingRoom.includes(roomInput);
    if (!roomExist) {
      roomRef.add({name: roomInput, createdAt: timestamp(), createdBy: 'user'});
    } else {
      alert('Room Already Exist');
    }
    setRoomInput('');
  };

  useEffect(() => {
    roomRef.orderBy('createdAt', 'desc').onSnapshot((snap) => {
      let documents = [];
      let roomName = [];
      snap.forEach((doc) => {
        documents.push({...doc.data(), id: doc.id});
        roomName.push(doc.data().name);
      });
      setChatRoom(documents);
      setExistingRoom(roomName);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

            <div className='chatlist__div' key={room.id}>
              <p className='chatlist__name'>#{room.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatRooms;
