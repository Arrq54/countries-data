import React, { useState } from 'react'
import "../../styles/Searchbar.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
export default function SearchBar(props: {search:(event:string)=>void, sort:(sort:string)=>void}) {
  const [sort, setSort] = useState<string>("pop-desc")
  const changeSort = (e:string)=>{
      setSort(e)
      props.sort(e);
      
  }
  return (
    <div className='searchbar'>
        <div className='searchbar-content'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbar-icon"/>
            <input className='searchbar-input' placeholder='Search in countries' type="text" onChange={(e)=>props.search(e.target.value)} />
            <FormControl  className='select'>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Chart"
                onChange={(i)=>changeSort(i.target.value)}
              >
                <MenuItem value={"pop-asc"}>Sort by population (ascending)</MenuItem>
                <MenuItem value={"pop-desc"}>Sort by population (descending)</MenuItem>
                <MenuItem value={"alph-asc"}>Sort alphabetically (ascending)</MenuItem>
                <MenuItem value={"alph-desc"}>Sort alphabetically (descending)</MenuItem>
              </Select>
            </FormControl>
        </div>
      
    </div>
  )
}
