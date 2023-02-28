import { CircularProgress } from '@mui/material'
import React from 'react'
import "../styles/LoadingScreen.css"
export default function LoadingScreen() {
  return (
    <div className='loadingScreen'>
        <CircularProgress size={200} />
        </div>
  )
}
