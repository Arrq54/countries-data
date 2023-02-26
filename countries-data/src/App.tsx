import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './styles/App.css';
import MainPage from './components/MainPage/MainPage';
import Charts from './components/Charts/Charts';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/charts" element={<Charts />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
