import {TextField} from '@material-ui/core';
import React, {useState} from 'react';
import {RiMenuUnfoldFill} from 'react-icons/ri';
import {BiMessageRoundedAdd} from 'react-icons/bi';
import './ChatRooms.css';
const ChatRoom = () => {
  const [showingChat, setshowingChat] = useState(true);
  const [chatRoom, setchatRoom] = useState('');
  const showChat = () => {
    setshowingChat(!showingChat);
  };

  const addRoom = (e) => {
    e.preventDefault();
    console.log(chatRoom);
    setchatRoom('');
  };
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
            value={chatRoom}
            onChange={(e) => setchatRoom(e.target.value)}
          />
          <button onClick={addRoom}>
            <BiMessageRoundedAdd fontSize='1.5rem' />
          </button>
        </form>
        <div className='chatroom_chatlist'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, esse
          rerum! Rem modi perferendis provident doloribus nisi itaque autem,
          culpa quos, porro maiores temporibus minus? Corporis atque eveniet
          itaque nihil? Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Tempora dicta, explicabo eveniet odit repellendus officiis
          similique nulla nihil inventore, iste earum repudiandae eum nemo
          accusantium perferendis, unde expedita quisquam error! Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Amet distinctio ipsa
          mollitia, quisquam, molestiae ab rerum maxime fugit assumenda
          laboriosam rem eveniet facere nihil veritatis nulla aliquam possimus a
          dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ratione voluptatem omnis architecto odio officia consequatur,
          accusantium pariatur exercitationem dolore voluptas nemo nesciunt,
          impedit, dolor incidunt inventore laudantium asperiores iusto
          mollitia? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Unde non, vel magnam rem in repellendus fugiat consequuntur, eligendi
          ipsam voluptatem ratione omnis beatae consectetur incidunt ab autem
          velit cupiditate dolorem!
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
