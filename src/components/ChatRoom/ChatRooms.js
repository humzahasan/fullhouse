import {TextField, Tooltip} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {RiMenuUnfoldFill} from 'react-icons/ri';
import {BiLogOut, BiMessageRoundedAdd} from 'react-icons/bi';
import './ChatRooms.css';
import {projectAuth, projectFirestore, timestamp} from '../../config/firebase';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';

const ChatRooms = ({user}) => {
  const roomRef = projectFirestore.collection('chatrooms');
  const [showingChat, setshowingChat] = useState(true);
  const [chatRoom, setChatRoom] = useState([]);
  const [roomInput, setRoomInput] = useState('');
  const [existingRoom, setExistingRoom] = useState([]);
  const showChat = () => {
    setshowingChat(!showingChat);
  };

  const logout = () => {
    projectAuth.signOut();
  };
  const addRoom = (e) => {
    e.preventDefault();
    const roomExist = existingRoom.includes(roomInput);
    if (!roomExist) {
      roomRef.add({
        name: roomInput,
        createdAt: timestamp(),
        createdBy: user.displayName,
        creatorPhoto: user.photoURL,
        creatorId: user.uid,
        participant: [],
      });
    } else {
      alert('Room Already Exist');
    }
    setRoomInput('');
  };

  useEffect(() => {
    const fetchRoom = roomRef
      .orderBy('createdAt', 'desc')
      .onSnapshot((snap) => {
        let documents = [];
        let roomName = [];
        snap.forEach((doc) => {
          documents.push({...doc.data(), id: doc.id});
          roomName.push(doc.data().name);
        });
        setChatRoom(documents);
        setExistingRoom(roomName);
      });

    return () => fetchRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 2}}
      className='chatroom'
    >
      <Tooltip title={showingChat ? 'Hide Rooms' : 'Show Rooms'}>
        <span onClick={showChat}>
          <RiMenuUnfoldFill fontSize='2rem' values={{color: 'white'}} />
        </span>
      </Tooltip>

      <Tooltip title='Logout'>
        <span onClick={logout}>
          <BiLogOut fontSize='2rem' values={{color: 'white'}} />
        </span>
      </Tooltip>

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 3}}
        className={showingChat ? 'chatroom-show' : 'chatroom-hide'}
      >
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
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 2}}
          className='chatroom_chatlist'
        >
          {chatRoom?.map((room) => (
            <Link to={`/room/${room.id}`} key={room.id} onClick={showChat}>
              <motion.div
                whileHover={{scale: 1.2}}
                whileTap={{scale: 0.8}}
                className='chatlist__div'
                key={room.id}
              >
                <p className='chatlist__name'>#{room.name}</p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ChatRooms;
