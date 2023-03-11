import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Menu from '../Menu';
import "../../styles/RankingPage.css"
import LoadingScreen from '../LoadingScreen';
export default function () {
    let {ranking} = useParams();
    const [data, setData] = useState<{name:string, value:number}[]>([])
    let th2:string="";
    switch(ranking){
        case "Population":
            th2 = "Population"
            break;
        case "Crime-rate":
            th2 = "Crime rate"
            break;
        case "Happiness":
            th2 = "Hapinness score"
            break;
        case "Alcohol-consumption":
            th2 = "Alcohol consumption per capita"
            break;
        case "Costs-of-living":
            th2 = "Cost of Living Index"
            break;
        case "Health-care":
            th2 = "Health care index"
            break;
        case "Quality-of-life":
            th2 = "Quality of Life Index"
            break;
        case "Pollution":
            th2 = "Pollution Index"
            break; 
        case "Suicide-rates":
            th2 = "Suicide rate"
            break;  
        case "HDI":
            th2 = "HDI"
            break;   
            
        default:break;
    }
    useEffect(()=>{
        fetch("/getRanking", {method: "POST", headers:  {'Accept': 'application/json','Content-Type': 'application/json'},body: JSON.stringify({ranking: ranking}) }).then(data=>data.json()).then((data)=>{setData(data)})
      },[])
  return (
    <div>
        <Menu chosen=''/>
        {data.length==0?<LoadingScreen/>:<div/>}
        <div className='center'>
            <table>
                <thead>
                    <tr>
                    <th>Lp.</th>
                    <th>Country name</th>
                    <th>{th2}</th>
                    </tr>
                
                </thead>
                <tbody>
                {data.map((element, index)=>{
                    return <tr key={index}>
                        <td>{index+1}</td>
                        <td> {element.name}</td>
                        <td> {element.value}</td>
                    </tr>
                })}
                </tbody>
            
            </table>
        </div>
       
       
    </div>
  )
}
