import React, { useState } from 'react'
import { CountryPopulationName } from '../../interfaces/CountryPopulationName'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import "../../styles/Chart.css"
import { Emissions } from '../../interfaces/Emissions';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { CountryNameCode } from '../../interfaces/CountryNameCode';
import { StackedEmissionChart } from '../../interfaces/StackedEmissionChart';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

export default function ChartEmission(props: {name:string, data: Emissions[], width:number, height:number, countries: CountryNameCode[]}) {
    const [otherCountry, setOtherCountry] = useState<string>("");
    const [twoCountriesData, setTwoCountriesData] = useState<StackedEmissionChart[]>([])
    const [charType, setCharType] = useState<string>("single");
    const handleChange = (e:string)=>{
        setOtherCountry(e)

        }
    
    let chart;

    const addToChart = async ()=>{
        let dataToMerge = await fetch("/getCountryEmissionInfo2", {method: "POST", headers:  {'Accept': 'application/json','Content-Type': 'application/json'},body: JSON.stringify({code: otherCountry}) }).then(data=>data.json())

        let newData:StackedEmissionChart[] = []

        dataToMerge.emission.map((e:Emissions,i:number)=>{
            newData.push({
              year: e.year,
              c2_name: dataToMerge.name,
              c2_value: e.emission,
              c1_name: props.name,
              c1_value: props.data[i].emission
            })
        })
        setTwoCountriesData(newData)
        setCharType("double")
    }

    const CustomTooltip = ({
      active,
      payload,
      label,
    }: TooltipProps<ValueType, NameType>) => {
      if (active) {
        return (
          <div className="custom-tooltip">
            <p className="year">{payload?.[0].payload.year}</p>
            <p className="label c1">{`${payload?.[0].payload.c1_name} : ${payload?.[0].value}`}</p>
            <p className="label c2">{`${payload?.[0].payload.c2_name} : ${payload?.[1].value}`}</p>
          </div>
        );
      }
    
      return null;
    };

    if(charType == "single"){
      chart = <LineChart
      width={props.width}
      height={props.height}
      data={props.data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="year" />
      <Line type="monotone" dataKey="emission" stroke="#8884d8"  />
    </LineChart>
    }else{
      chart = <LineChart
      width={props.width}
      height={props.height}
      data={twoCountriesData}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      {/* <Tooltip content={<CustomTooltip/>} /> */}
      <Legend verticalAlign="top" height={36}/>
      <Line type="monotone" label="c1_name" name='Main country'  dataKey="c1_value"  stroke="#8884d8" fill="#8884d8" />
      <Line type="monotone" label="c2_name" name='Added country' dataKey="c2_value"  stroke="#82ca9d" fill="#82ca9d" />
    </LineChart>
    }

    
    return (
    <div className='chart-emission'>
      <h1 className='chart-title'>Emissions</h1>
      <div className='chart-e'>

      {chart}

          
          <FormControl className='select'>
            <InputLabel id="demo-simple-select-label">Another country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={otherCountry}
              label="Another country"
              onChange={(e)=>handleChange(e.target.value)}
            >
              {props.countries.map((e,i)=>{
                return  <MenuItem key={i} value={e.code}>{e.name.split("_").join(" ")}</MenuItem>
              })}
             
            </Select>
        </FormControl>
        <Button variant="contained" onClick={addToChart}>Add to chart</Button>
      </div>
         
    </div>
  )
}
