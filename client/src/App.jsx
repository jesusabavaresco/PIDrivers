import React from 'react';
import { Routes, Route } from "react-router-dom";
import Landing from './components/landing/Landing';
import HomePage from './components/home/Home.jsx';
import CreateDrivers from './components/form/Form.jsx';
import DetailPage from '../src/components/detail/Detail.jsx';
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing/>}/> 
        <Route path="/home" element={<HomePage/>}/> 
        <Route path="/form" element={<CreateDrivers/>}/> 
        <Route path="/detail/:id" element={<DetailPage/>}/> 
      </Routes>
    </div>
  )
}

export default App