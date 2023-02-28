import React from 'react'
import { CountryPopulationName } from '../../interfaces/CountryPopulationName'
import {PieChart, Pie,Cell,Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import "../../styles/Chart.css"
export default function Chart(props: {data: CountryPopulationName[], type:string, width:number, height:number, radius:number}) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    let renderLabel = function(entry:CountryPopulationName) {
        return entry.name;
    }
    let chart;
    switch(props.type){
        case "piechart20":
            chart = <PieChart width={props.width} height={props.height}>
            <Pie
              dataKey="population"
              isAnimationActive={false}
              data={props.data}
              cx="50%"
              cy="50%"
              outerRadius={props.radius}
              fill="#8884d8"
              nameKey="name"
              // label={renderLabel}
            >
              {props.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
            break;
        case "barchart20":
            chart = <BarChart
            
            width={props.width}
            height={props.height}
            data={props.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" tick={false} />
            <Tooltip />
            <Bar dataKey="population" fill="#8884d8"  >
            {props.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
              ))}
            </Bar>
          </BarChart>
            break;
        default: break;
    }

    return (
    <div className='m-20'>
         {chart}
    </div>
  )
}
