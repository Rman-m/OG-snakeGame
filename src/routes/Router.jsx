import Menu from "../components/mainMenu/Menu";
import Snake from "../components/game/Snake"
import { Routes, Route } from "react-router-dom";
import React from 'react'
import Scores from "../components/scores/Scores";

function Router() {
  return (
    <Routes>
        <Route path="/" element={<Menu/>}/>
        <Route path="/game" element={<Snake/>}/>
        <Route path="/scores" element={<Scores/>}/>
    </Routes>
  )
}

export default Router