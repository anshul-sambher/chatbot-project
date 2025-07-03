import { useState } from 'react'
import WelcomeMessage from './assets/components/WelcomeMessage'
import ChatMessages from './assets/components/ChatMessages'
import ChatInput from './assets/components/ChatInput'
import './App.css' // Vite feature - allows us to import any type of file

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
