import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home'
import Play from './Play'
import Leaderboard from './Leaderboard'
import Result from './Result'
import SelectCategory from './SelectCategory';
import { BrowserRouter, Routes,Route } from "react-router-dom";
import Multiplayer from './SocketIO/Multiplayer';
import MultiplayerChoice from './SocketIO/MultiplayerChoice';
import './TableDesign.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/selectCategory" element={<SelectCategory />} />
        <Route path="/play" element={<Play />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="join" element={<JoinQuiz />} />
        <Route path='multiplayer' element={<Multiplayer/>}>
          <Route path='choice' element={<MultiplayerChoice/>}/>

        </Route>
    </Routes>
  </BrowserRouter>
);
