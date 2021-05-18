import React from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';

const Chat = () => {
  const {roomId} = useParams();
  
  useEffect(() => {
    
  }, [roomId])
  return <div className='chat'>{roomId} HIGHER!!!</div>;
};

export default Chat;
