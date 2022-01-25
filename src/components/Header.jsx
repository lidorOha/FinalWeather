import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
const [backgroundColorHome, setbackgroundColorHome] = useState("rgb(65, 208, 251)")
const [backgroundColorFavorite, setbackgroundColorFavorite] = useState("white")
const chooseHome = ()=>{
    if(backgroundColorHome==="white"){
        setbackgroundColorHome("rgb(65, 208, 251)")
        setbackgroundColorFavorite("white")
    }
}
const chooseFavorite = ()=>{
    if(backgroundColorFavorite==="white"){
        setbackgroundColorFavorite("rgb(65, 208, 251)")
        setbackgroundColorHome("white")
    }
}
const checkFavoriteClick = ()=>{
   if(props.clickOnFavorite == true){
    chooseHome()
    props.setClickOnFavorite(false)
   }
}
    return (
        <div className='header'>
            {checkFavoriteClick()}
            <div id='title'>
                <p>Weather details</p>
            </div>
            <div id='btn'>
                <Link to='/WeatherProject'><button onClick={()=>{chooseHome()}} style={{backgroundColor:`${backgroundColorHome}`,fontSize:"large"}}>Home</button></Link>
                <Link to='/favorites'><button onClick={()=>{chooseFavorite()}} style={{backgroundColor:`${backgroundColorFavorite}`,fontSize:"large"}}>Favorites</button></Link>
            </div>
        </div>
    )
}
