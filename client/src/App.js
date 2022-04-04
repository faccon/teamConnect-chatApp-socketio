import "./App.css";
import React from 'react'
import {Route, Routes } from 'react-router-dom'
import ChatView from './View/ChatView'
import JoinView from './View/JoinView'

function App() {
  return (
      <Routes>
        <Route path="/" element={<JoinView />} />
        <Route path="/chat" element={<ChatView />} />
      </Routes>
  )
}

export default App
