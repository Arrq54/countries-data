import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../MainPage/Menu';
import "../../styles/CountryInfo.css"
import Chart from '../Charts/Chart';
import ChartEmission from '../Charts/ChartEmission';
import { Emissions } from '../../interfaces/Emissions';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { CountryNameCode } from '../../interfaces/CountryNameCode';
export default function CountryInfo() {
    let {code} = useParams();
    const [data, setData] = useState<Emissions[]>([]);
    const [name, setName] = useState<string>("");
    const [allCountries, setAllCountries] = useState<CountryNameCode[]>([]);
    const [chartType, setChartType] = useState<string>("");
    const changeChart = (c:string)=>{

      setChartType(c)
      
    }
    if(code == undefined){
      code = "pl";
    }

    useEffect(()=>{

      fetch("/getCountryInfo", {method: "POST", headers:  {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({code: code}) }).then(data=>data.json()).then((data)=>{setData(data.emission);setName(data.name);setAllCountries(data.countries)})}
      
    ,[])

    let chart;
    if(chartType == "Emission"){
      chart = <ChartEmission name={name} width={1200} height={500} data={data} countries={allCountries}/>
    }
  return (
    <div>
      <Menu chosen=''/>
      <div className='f-center'>
        <div className='country-profile'>
          <h1 className='country-header'>{name}</h1>
        <img className='flag-country-info' src={`https://flagcdn.com/w320/${code.toLowerCase()}.png`} />
        <div className='info-country'>
            <div className='info-element'>
                <div className='info-label'>Lorem: </div>
                <div className='info-value'>Ipsum </div>
            </div>
            <div className='info-element'>
                <div className='info-label'>Lorem: </div>
                <div className='info-value'>Ipsum </div>
            </div>
            <div className='info-element'>
                <div className='info-label'>Lorem: </div>
                <div className='info-value'>Ipsum </div>
            </div>
            <div className='info-element'>
                <div className='info-label'>Lorem: </div>
                <div className='info-value'>Ipsum </div>
            </div>
            <div className='info-element'>
                <div className='info-label'>Lorem: </div>
                <div className='info-value'>Ipsum </div>
            </div>
        </div>
        <div className='country-info-charts'>
            <FormControl  className='select'>
              <InputLabel id="demo-simple-select-label">Choose chart</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={chartType}
                label="Chart"
                onChange={(i)=>changeChart(i.target.value)}
              >
                 <MenuItem value={""}>None</MenuItem>
                <MenuItem value={"Emission"}>Emission</MenuItem>
              </Select>
            </FormControl>
        </div>
        <div className='flex-c'>
          {chart}
        </div>
        
        </div>
      </div>
      
    </div>
  )
}
