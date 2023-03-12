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
import { Countrysummary } from '../../interfaces/Countrysummary';
import LoadingScreen from '../LoadingScreen';
export default function CountryInfo() {
    let {code} = useParams();

    const [emissionData, setEmissionData] = useState<Emissions[]>([]);
    const [expectancydata, setExpectancy] = useState<CountryLifeExpectancyInfo[]>([]);
    const [countrySummaryData, setCountrySummary] = useState<Countrysummary>();
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
      fetch(`https://restcountries.com/v2/alpha?codes=${code}`).then(data=>data.json()).then(data=>setCountrySummary({
        altSpellings: data[0].altSpellings.join(", ") as string,
        capital: data[0].capital,
        nativeName: data[0].nativeName,
        region: data[0].region,
        subregion: data[0].subregion,
        area: data[0].area

      }));
      
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
       
        {countrySummaryData==null?<LoadingScreen/>: <div className='info-country'><div className='info-element'>
                <div className='info-label'>Native name: </div>
                <div className='info-value'>{countrySummaryData.nativeName}</div>
            </div>
            <div className='info-element'>
                <div className='info-label'>Alternative names: </div>
                <div className='info-value'>{countrySummaryData.altSpellings}</div>
            </div>
            <div className='info-element'>
                <div className='info-label'>Capital city: </div>
                <div className='info-value'>{countrySummaryData.capital}</div>
            </div>
            <div className='info-element'>
                <div className='info-label'>Region: </div>
                <div className='info-value'>{countrySummaryData.region}</div>
            </div>
            <div className='info-element'>
                <div className='info-label'>Subregion: </div>
                <div className='info-value'>{countrySummaryData.subregion}</div>
            </div>
            <div className='info-element'>
                <div className='info-label'>Area: </div>
                <div className='info-value'>{countrySummaryData.area}km²</div>
            </div></div>}
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
