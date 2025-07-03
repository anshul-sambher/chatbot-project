import { useState } from 'react'
import LoadingSpinnerGif from '../assets/loading-spinner.gif'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'

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
    const userMessage = {
      message: inputText,
      sender: 'user',
      id: crypto.randomUUID()
    }

    const loadingMessage = {
      message: <img src={LoadingSpinnerGif}
                className='loading-gif' />,
      sender: 'robot',
      id: crypto.randomUUID()
    }

    const preLoadMessages = [
      ...chatMessages,
      userMessage,
      loadingMessage
    ];

    setChatMessages(preLoadMessages);
    setInputText('');

    setIsLoading(true);
    const response = await Chatbot.getResponseAsync(inputText);
    setIsLoading(false);

    const robotMessage = {
      message: response,
      sender: 'robot',
      id: crypto.randomUUID()
    }

    const postLoadMessages = [
      ...chatMessages,
      userMessage,
      robotMessage
    ];
    
    setChatMessages(postLoadMessages);

    localStorage.setItem('chat-messages', JSON.stringify(postLoadMessages));
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
      <button
        onClick={() => {
          setChatMessages([]);
          localStorage.setItem('chat-messages', JSON.stringify([]));
        }}
        className='clear-button'
      >Clear</button>
    </div>
  );
}

export default ChatInput;