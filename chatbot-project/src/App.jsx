import { Chatbot } from 'supersimpledev'
import { useState, useRef, useEffect } from 'react'
import './App.css'

function useAutoScroll([ chatMessages ]) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [ chatMessages ]);

  return elementRef;
}

function WelcomeMessage() {
  return (
    <p
      className="welcome-message"
    >Welcome to the chatbot project! Send a message using the textbox below.</p>
  );
}

function ChatInput({
  chatMessages, setChatMessages, isLoading, setIsLoading
}) {
  const [ inputText, setInputText ] = useState('');

  function saveInputText(event) {
    if (event.key === 'Enter') {
      if (!isLoading && inputText) {
        sendMessage();
      }
    } else if (event.key === 'Escape') {
      setInputText('');
    } else {
      setInputText(event.target.value);
    }
  }

  async function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessages);
    setInputText('');

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src="images/loading-spinner.gif"
                  className="loading-gif" />,
        sender: "robot",
        id: crypto.randomUUID()
      }
    ]);

    setIsLoading(true);
    const response = await Chatbot.getResponseAsync(inputText);
    setIsLoading(false);
    
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID()
      }
    ]);
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={saveInputText}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={() => {
          if (!isLoading && inputText) {
            sendMessage();
          }
        }}
        className="send-button"
      >Send</button>
    </div>
  );
}

function ChatMessage({ message, sender }) {
  return (
    <div className={'chat-message-' + sender}>
      {sender === 'robot' &&
      <img src="images/robot.png" className="chat-message-profile" />}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === 'user' &&
      <img src="images/user.png" className="chat-message-profile" />}
    </div>
  );
}

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div
      className="chat-messages-container"
      ref={chatMessagesRef}
    > {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage 
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

function App() {
  const [ chatMessages, setChatMessages ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  return (
    <div className="app-container">
      {!chatMessages.length && <WelcomeMessage />}
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default App
