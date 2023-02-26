import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '../MainPage/Menu'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CountryPopulationName } from '../../interfaces/CountryPopulationName';

export default function Charts() {
  const [data, setData] = useState<CountryPopulationName[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
      fetch("/countryNamePopulation").then(data=>data.json()).then((data)=>{
        // data.map((i:CountryPopulationName)=>{i.population = parseInt(parseInt(i.population.replace(",",""))/1000000)})
      setData(data)})
      
      
    },[])
  return (
    <div> 
        <Menu chosen={"Charts"} onItemClick={navigate}/>
          <BarChart width={900} height={500} data={data}>
            <Bar type="monotone" dataKey="population" fill="#333333" layout='vertical' />
            <XAxis dataKey="name" />
            <YAxis />
          </BarChart>
        </div>
  )
}
