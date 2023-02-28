import React, { useEffect, useState } from 'react'
import { CountryPopulationData } from '../../interfaces/CountryPopulationData'
import { useNavigate } from "react-router-dom";
import Country from './Country'
import "../../styles/MainPage.css"
import Menu from './Menu'
import LoadingScreen from '../LoadingScreen';
export default function MainPage() {
  
  const [countries, setCountries] = useState<CountryPopulationData[]>()
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(()=>{

    fetch("/getNames").then(data=>data.json()).then((data)=>{setCountries(data);setLoading(false)})
    
  },[])

  return (
    <div className=''>
      {loading?<LoadingScreen/>:<div/>}
      <Menu chosen={"All countries"}/>
      <div className='countries'>
      {countries?.map((element,index)=>{
      return <div key={index}><Country country={element}/></div>
    })}</div>
      </div>
     
  )
}
