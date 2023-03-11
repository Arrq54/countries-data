import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Menu from '../Menu';
import "../../styles/CountryInfo.css"
import Chart from '../Charts/Chart';
import ChartEmission from '../Charts/ChartEmission';
import { Emissions } from '../../interfaces/Emissions';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { CountryNameCode } from '../../interfaces/CountryNameCode';
import ChartLifeExpectancy from '../Charts/ChartLifeExpectancy';
import { CountryLifeExpectancyInfo } from '../../interfaces/CountryNameLifeExpectancy';
export default function CountryInfo() {
    let {code} = useParams();

    const [emissionData, setEmissionData] = useState<Emissions[]>([]);
    const [expectancydata, setExpectancy] = useState<CountryLifeExpectancyInfo[]>([]);

    const [name, setName] = useState<string>("");
    const [allCountries, setAllCountries] = useState<CountryNameCode[]>([]);
    const [chartType, setChartType] = useState<string>("");
    const changeChart = (c:string)=>{

      setChartType(c)
      
    }
    if(code == undefined){
      code = "PL";
    }

    useEffect(()=>{
      fetch("/getCountryInfo", {method: "POST", headers:  {'Accept': 'application/json','Content-Type': 'application/json'},body: JSON.stringify({code: code}) }).then(data=>data.json()).then((data)=>{setName(data.name)})
    },[])

    let chart;
    if(chartType == "Emission"){
      if(emissionData.length===0){
          fetch("/getCountryEmissionInfo", {method: "POST", headers:  {'Accept': 'application/json','Content-Type': 'application/json'},body: JSON.stringify({code: code}) }).then(data=>data.json()).then((data)=>{setEmissionData(data.emission);setName(data.name);setAllCountries(data.countries)})
      }
      chart = <ChartEmission name={name} width={1200} height={500} data={emissionData} countries={allCountries}/>

    }else if(chartType == "Life expectancy"){
      if(expectancydata.length===0){
        fetch("/getCountryLifeExpectancyInfo", {method: "POST", headers:  {'Accept': 'application/json','Content-Type': 'application/json'},body: JSON.stringify({code: code}) }).then(data=>data.json()).then((data)=>{setExpectancy(data.life_exp);setAllCountries(data.countries)})
      }
      let type = "chart"
      if(expectancydata.length == 0){
        type="no-data"
      }
      chart = <ChartLifeExpectancy type={type} name={name} width={1200} height={500} data={expectancydata} countries={allCountries}/>
    }else if(chartType == "Emission2"){
      if(emissionData.length===0){
        fetch("/getCountryEmissionInfo2", {method: "POST", headers:  {'Accept': 'application/json','Content-Type': 'application/json'},body: JSON.stringify({code: code}) }).then(data=>data.json()).then((data)=>{setEmissionData(data.emission);setAllCountries(data.countries)});
      }
      chart = <ChartEmission name={name} width={1200} height={400} data={emissionData} countries={allCountries.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })}/>

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
                <MenuItem value={"Life expectancy"}>Life expectancy</MenuItem>
                <MenuItem value={"Emission2"}>Emission</MenuItem>
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
