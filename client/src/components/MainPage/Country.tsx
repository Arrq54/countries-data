import { count } from 'console'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CountryPopulationData } from '../../interfaces/CountryPopulationData'
import "../../styles/CountryItem.css"
export default function Country(props: {country: CountryPopulationData}) {
  const navigate = useNavigate();
  return (
    <div className='country-item' onClick={()=>navigate(`/country/${props.country.code}`)}>
        <div className='flag' >
          <img src={`https://flagcdn.com/w320/${props.country.code.toLowerCase()}.png`} alt={props.country.code}/>
        </div>
        

        <h4 className='country-name'>{props.country.country_name.split('_').join(' ')}</h4>
        <div className='info'>
          <div className='info-label'>Population: </div>
          <div className='info-value'>{props.country.current_population}</div>
        </div>
        <div className='info'>
          <div className='info-label'>Capital: </div>
          <div className='info-value'>{props.country.capital}</div>
        </div>
        <div className='info'>
          <div className='info-label'>Currency: </div>
          <div className='info-value'>{props.country.currency}</div>
        </div>
        <div className='hover-indicator'></div>
    </div>
  )
}
