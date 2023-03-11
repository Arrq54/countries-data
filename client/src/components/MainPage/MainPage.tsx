import React, { useEffect, useState } from 'react'
import { CountryPopulationData } from '../../interfaces/CountryPopulationData'
import { useNavigate } from "react-router-dom";
import Country from './Country'
import "../../styles/MainPage.css"
import Menu from '../Menu'
import LoadingScreen from '../LoadingScreen';
import SearchBar from './SearchBar';
export default function MainPage() {
  
  const [countries, setCountries] = useState<CountryPopulationData[]>([])
  const [visibleCountries, setVisibleCountries] = useState<CountryPopulationData[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(()=>{

    fetch("/getNames").then(data=>data.json()).then((data)=>{setCountries(data);setLoading(false); setVisibleCountries(data)})
    
  },[])

  const handleSearch = (e:string)=>{
    if(e!=""){
      setVisibleCountries([...countries.filter((i)=>{return i.country_name.toLowerCase().includes(e.toLowerCase().replaceAll(" ","_"))})])
      return;
    }
   
    setVisibleCountries([...countries])
    
  }
  const changeSort = (sort:string)=>{
    switch(sort){
      case "pop-asc":
        setVisibleCountries([...visibleCountries.sort(function(a, b) {
          return parseInt(String(a.current_population).replaceAll(",","")) - parseInt(String(b.current_population).replaceAll(",",""));
        })]);
        break;
      case "pop-desc":
        setVisibleCountries([...visibleCountries.sort(function(a, b) {
          return parseInt(String(b.current_population).replaceAll(",","")) - parseInt(String(a.current_population).replaceAll(",",""));
        })]);
        break;
      case "alph-asc":
        setVisibleCountries([...visibleCountries.sort(function (a, b) {
          if (a.country_name < b.country_name) {
            return -1;
          }
          if (a.country_name > b.country_name) {
            return 1;
          }
          return 0;
        })])
        break;
      case "alph-desc":
        setVisibleCountries([...visibleCountries.sort(function (a, b) {
          if (b.country_name < a.country_name) {
            return -1;
          }
          if (b.country_name > a.country_name) {
            return 1;
          }
          return 0;
        })])
        break;
      default:break;
    }
    
  }

  return (
    <div className=''>
      {loading?<LoadingScreen/>:<div/>}
      <Menu chosen={"All countries"}/>
      <SearchBar search={handleSearch} sort={changeSort}/>
      <div className='countries'>
      {visibleCountries?.map((element,index)=>{
      return <div key={index}><Country country={element}/></div>
    })}</div>
      </div>
     
  )
}
