import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home'
import Play from './Play'
import Leaderboard from './Leaderboard'
import SelectCategory from './SelectCategory';
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Multiplayer from './SocketIO/Multiplayer';
import JoinQuiz from './JoinQuiz';
import WaitingRoom from './WaitingRoom';
import './TableDesign.css'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/' element={<Multiplayer />}>
          <Route path="selectCategory" element={<SelectCategory />} />
          <Route path="join" element={<JoinQuiz />} />
          <Route path="waiting-room/:quizId" element={<WaitingRoom />} />
          <Route path="play/:quizId" element={<Play />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
    </Routes>
  </BrowserRouter>
);
