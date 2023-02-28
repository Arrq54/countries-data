import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../MainPage/Menu';
import "../../styles/CountryInfo.css"
export default function CountryInfo() {
    let {code} = useParams();
    const [data, setData] = useState();

    if(code == undefined){
      code = "pl";
    }

    useEffect(()=>{

      fetch("/getCountryInfo", {method: "POST", headers:  {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({code: code}) }).then(data=>data.json()).then((data)=>console.log(data)
      )}
      
    ,[])

  return (
    <div>
      <Menu chosen=''/>
      <div className='f-center'>
        <div className='country-profile'>
        <img src={`https://flagcdn.com/w320/${code.toLowerCase()}.png`} />
        </div>
      </div>
      
    </div>
  )
}
