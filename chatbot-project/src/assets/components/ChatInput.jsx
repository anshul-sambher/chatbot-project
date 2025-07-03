import { useState } from 'react'
import LoadingSpinnerGif from './assets/loading-spinner.gif'
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
        message: <img src={LoadingSpinnerGif}
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

export default ChatInput;