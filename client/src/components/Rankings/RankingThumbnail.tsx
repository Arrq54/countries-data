import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import React from 'react'
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome"
import "../../styles/Ranking.css"
export default function RankingThumbnail(props: {name:string, icon:IconDefinition}) {
  return (
    <div className='ranking-thumbnail'>
        <div className='icon'><FontAwesomeIcon icon={props.icon} /></div>
        <div className='ranking-thumbnail-label'>{props.name}</div>
    </div>
  )
}
