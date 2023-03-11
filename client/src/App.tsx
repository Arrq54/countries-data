import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './styles/App.css';
import MainPage from './components/MainPage/MainPage';
import Charts from './components/Charts/Charts';
import CountryInfo from './components/CountryInfo/CountryInfo';
import Rankings from './components/Rankings/Rankings';
import Ranking from './components/Rankings/Ranking';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/charts" element={<Charts />}></Route>
          <Route path="/country/:code" element={<CountryInfo />}></Route>
          <Route path="/rankings" element={<Rankings />}></Route>
          <Route path="/rankings/:ranking" element={<Ranking />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
