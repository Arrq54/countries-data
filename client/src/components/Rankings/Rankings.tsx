import React from 'react'
import Menu from '../Menu'
import {faPeopleGroup, IconDefinition, faHandcuffs, faFaceSadTear,faPersonArrowUpFromLine, faFaceLaughBeam, faChampagneGlasses, faMoneyBillWave, faStethoscope, faSmog, faBuildingColumns} from "@fortawesome/free-solid-svg-icons"
import RankingThumbnail from './RankingThumbnail'
import "../../styles/Rankings.css"
import { Link } from 'react-router-dom'
export default function Rankings() {
    let rankingsList:{name:string, icon:IconDefinition}[] = [
        {name: "Population", icon: faPeopleGroup},
        {name: "Crime rate", icon: faHandcuffs},
        {name: "Happiness", icon: faFaceLaughBeam},
        {name: "Alcohol consumption", icon: faChampagneGlasses},
        {name: "Costs of living", icon: faMoneyBillWave},
        {name: "Health care", icon: faStethoscope},
        {name: "Quality of life", icon: faPersonArrowUpFromLine},
        {name: "Pollution", icon: faSmog},
        {name: "Suicide rates", icon: faFaceSadTear},
        {name: "HDI", icon: faBuildingColumns},
    ]
  return (
    <div>
        <Menu chosen='Rankings'/>
        <div className='rankings'>
            {rankingsList.map((element,i)=>{
                return <Link to={`/rankings/${element.name.replaceAll(" ","-")}`} key={i}><RankingThumbnail  name={element.name} icon={element.icon}/></Link>
            })}
        </div>
        
    </div> 
  )
}
