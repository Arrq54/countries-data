import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '../Menu'
import "../../styles/Charts.css"

import { CountryPopulationName } from '../../interfaces/CountryPopulationName';
import Chart from './Chart';

export default function Charts() {
  const [data, setData] = useState<CountryPopulationName[]>([]);
  const [largest20, setLargest20] = useState<CountryPopulationName[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
      fetch("/countryNamePopulation").then(data=>data.json()).then((data)=>{

      data.map((i:CountryPopulationName)=>{
        let x:string =String(i.population).replace(",","")
        i.population = parseInt(x);  
      })
      setData(data.sort((a:CountryPopulationName,b:CountryPopulationName)=>{return b.population - a.population}))
     
      let l10:CountryPopulationName[] = data.slice(0,15);
      let otherpop:number = 0;
      data.slice(15,data.length).map((i:CountryPopulationName)=>{
        otherpop += i.population;
      });
      l10.push({name: "Other countries", population: otherpop})

      setLargest20(l10)
      

      setData(data)})
      
      
    },[])
    
  
  return (
    <div >
       
        <Menu chosen={"Charts"}/>
        <div className='charts'>
          <div className='chart'>
            <h3>Population pie chart</h3>
            <Chart data={largest20} type={"piechart20"} width={500} height={240} radius={120} />
          </div> 

          <div className='chart'>
            <h3>Population bar chart</h3>
            <Chart data={largest20} type={"barchart20"} width={500} height={240} radius={120} />
          
          </div> 
        </div>
        
       
        </div>
  )
}
