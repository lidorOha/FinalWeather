import React from 'react'
import ShowFavorites from './ShowFavorites'



export default function Favorites(props) {
 const show = ()=>{
     if(props.yourFavorites === "Your favorites is empty"){
         return <h1>Your favorites is empty</h1>
     }
     else{
         return props.yourFavorites.map((element,i)=>{
             return <ShowFavorites setMyFavorite={props.setMyFavorite} key={`${i}`} element={element} i={i}/>
        })
     }
 }
 
    return (
        <div style={{display:"flex",width:"100%",height:"100%",flexDirection:"row",justifyContent:"center"}}>
            {show()}
        </div>
    )
}
