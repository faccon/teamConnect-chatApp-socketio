import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatView from "./View/ChatView";
import JoinView from "./View/JoinView";
import NotFound from "./View/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<JoinView />} />
      <Route path="/invite/:room" element={<JoinView />} />
      <Route path="/chat" element={<ChatView />} />
      <Route path="" element={<ChatView />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
