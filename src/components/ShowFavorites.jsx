import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function ShowFavorites(props) {

  return <div id='favoritecard' >
             <div  style={{borderWidth: "3px",border:"black",borderStyle:"groove",width:"60%",height:"70%",display:"flex",justifyContent:"center",fontWeight:"bold",flexDirection:"column",paddingTop:"5%"}}>
                <Link to="/FinalWeather" onClick={()=>{props.setMyFavorite(props.element)}} style={{width:"100%",height:"100%",textDecoration:"none",color:"black"}}>
                      <div style={{width:"100%",height:"40%",textAlign:"center"}}>
                            {props.element.City}
                     </div>
                     <div style={{width:"100%",height:"10%",textAlign:"center",alignItems:"center",display:"flex",justifyContent:"center"}}>
                            {props.element.Temperature}{props.element.Unit}
                     </div>
                      <div style={{width:"100%",height:"50%",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            {props.element.Cloudmode}
                     </div>
                </Link>
             </div>
        </div>
}
