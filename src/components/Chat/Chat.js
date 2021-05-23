import {Avatar, TextField} from '@material-ui/core';
import './Chat.css';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {BiMessageRoundedAdd} from 'react-icons/bi';
import {useParams} from 'react-router-dom';
import {projectFirestore} from '../../config/firebase';

const Chat = () => {
  const [roomData, setRoomData] = useState({});
  const {roomId} = useParams();
  const roomRef = projectFirestore.collection('chatrooms');

  useEffect(() => {
    async function loadRoomData() {
      let note = await roomRef.doc(roomId).get();
      note = note.data();
      setRoomData(note);
    }
    loadRoomData();
  }, [roomId, roomRef]);

  return (
    <div className='chat'>
      <div>
        <p>This is the parent div which contains the div we are testing</p>

        <div>
          <p>
            This example shows that changing the background color of a div does
            not affect the border and margin of the div.
          </p>
        </div>
      </div>
      {/* 
      <div className='chat__body'>
        <div className='chat__messages'>
          <Avatar>A</Avatar>
        </div>
        <div className='chat__form'>
          <form>
            <TextField id='standard-basic' label='Enter message' />
            <button>
              <BiMessageRoundedAdd fontSize='1.5rem' />
            </button>
          </form>
        </div>
      </div> */}
    </div>
  );
};

export default Chat;
