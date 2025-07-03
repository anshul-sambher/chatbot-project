import { useState } from 'react'
import WelcomeMessage from './components/WelcomeMessage'
import ChatMessages from './components/ChatMessages'
import ChatInput from './components/ChatInput'
import './App.css' // Vite feature - allows us to import any type of file

function App() {
  const [ chatMessages, setChatMessages ] = useState(
    JSON.parse(localStorage.getItem('chat-messages')) || []
  );
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
