import React from 'react'
import { CartesianGrid, Line, LineChart, XAxis, Tooltip } from 'recharts'
import { CountryNameCode } from '../../interfaces/CountryNameCode'
import { CountryLifeExpectancyInfo } from '../../interfaces/CountryNameLifeExpectancy'

export default function ChartLifeExpectancy(props: {name:string, data: CountryLifeExpectancyInfo[], width:number, height:number, countries: CountryNameCode[]}) {
  return (
    <div>

    <LineChart
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
      <Line type="monotone" dataKey="value" stroke="#8884d8"  />
    </LineChart>  
      
    </div>
  )
}
