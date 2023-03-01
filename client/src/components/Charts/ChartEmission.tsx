import React, { useState } from 'react'
import { CountryPopulationName } from '../../interfaces/CountryPopulationName'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "../../styles/Chart.css"
import { Emissions } from '../../interfaces/Emissions';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
export default function ChartEmission(props: {data: Emissions[], width:number, height:number, countries: string[]}) {
    let renderLabel = function(entry:CountryPopulationName) {
        return entry.name;
    }
    const [otherCountry, setOtherCountry] = useState<string>("");
    const handleChange = (e:string)=>{
        setOtherCountry(e)
    }

    const addToChart = ()=>{
        //TODO ANOTHER COUNTRY TO CHART
        //https://recharts.org/en-US/examples/StackedAreaChart
    }

    return (
    <div className='chart-emission'>
      <h1 className='chart-title'>Emissions</h1>
      <div className='chart-e'>
        <AreaChart
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <Tooltip />
            <Area type="monotone" dataKey="emission" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>

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
                return  <MenuItem key={i} value={e}>{e.split("_").join(" ")}</MenuItem>
              })}
             
            </Select>
        </FormControl>
        <Button variant="contained" onClick={addToChart}>Add to chart</Button>
      </div>
         
    </div>
  )
}
