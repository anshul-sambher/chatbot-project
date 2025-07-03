import RobotProfileImage from './assets/robot.png'
import UserProfileImage from './assets/user.png'

function ChatMessage({ message, sender }) {
  return (
    <div className={'chat-message-' + sender}>
      {sender === 'robot' &&
      <img src={RobotProfileImage} className="chat-message-profile" />}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === 'user' &&
      <img src={UserProfileImage} className="chat-message-profile" />}
    </div>
  );
}

export default ChatMessage;