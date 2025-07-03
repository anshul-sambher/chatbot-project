import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css'

function ChatMessage({ message, sender }) {
  const [ time, setTime ] = useState(null);

  useEffect(() => {
    setTime(dayjs().format('hh:mma'));
  }, []);

  return (
    <div className={'chat-message-' + sender}>
      {sender === 'robot' &&
      <img src={RobotProfileImage} className="chat-message-profile" />}
      <div className="chat-message-container">
        <div className="chat-message-text">
          {message}
        </div>
        <div className="chat-message-time">
          {time}
        </div>
      </div>
      {sender === 'user' &&
      <img src={UserProfileImage} className="chat-message-profile" />}
    </div>
  );
}

export default ChatMessage;