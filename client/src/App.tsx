import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './styles/App.css';
import MainPage from './components/MainPage/MainPage';
import Charts from './components/Charts/Charts';
import CountryInfo from './components/CountryInfo/CountryInfo';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/charts" element={<Charts />}></Route>
          <Route path="/country/:code" element={<CountryInfo />}></Route>
          
        </Routes>
      </BrowserRouter>
  );
}

export default App;
