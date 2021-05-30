import React, {useState} from 'react';
import {BsInfoCircle} from 'react-icons/bs';
import {motion} from 'framer-motion';
import {Avatar} from '@material-ui/core';
import moment from 'moment';

const ChatInfo = ({roomData, participants}) => {
  const [openInfo, setOpenInfo] = useState(false);

  const showInfo = () => {
    setOpenInfo(!openInfo);
  };

  return (
    <>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 2}}
        className='chatinfo'
      >
        <div className='chatinfo__left'>
          <h3>{String(roomData.name)}</h3>
          <h6>Last Activity: </h6>
        </div>

        <div className='chatinfo__right'>
          <span onClick={showInfo}>
            <BsInfoCircle fontSize='1.5rem' values={{color: 'white'}} />
          </span>
        </div>
      </motion.div>
      {openInfo && (
        <motion.div
          initial={{opacity: 0, y: '-100vh'}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
          className='chatinfo__modal'
        >
          <h4>Room Details</h4>
          <p>Room Owner : {roomData.createdBy}</p>
          <p>Created : {moment(roomData.createdAt.toDate()).fromNow()}</p>
          <hr />
          <h3 style={{textAlign: 'center'}}>Participants</h3>
          {participants.map((key) => (
            <div className='chatinfo__participants' key={key.senderImage}>
              <Avatar src={key.senderImage} />
              <p>{key.username}</p>
            </div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default ChatInfo;
