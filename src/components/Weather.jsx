import React , { useEffect, useState } from 'react'
import Showeather from './Showeather'


export default function Weather(props) {
    const [inputSearch, setInputSearch] = useState("");
    const [locations, setLocations] = useState([]);
    const [cityTemperatur , setCityTemperatur] = useState([{WeatherText:"Cloudy",Temperature:{Metric:{Value:"13.1",Unit:"C"},Imperial:{Value:"56",Unit:"F"}}}])
    const color = "white"
    const overColor = "rgb(65, 208, 251)"
    
    
    useEffect(()=>{
         
          if (inputSearch.length >= 3) {
             fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${props.APIKEY}&q=${inputSearch}`)
             .then((result)=>{ return result.json() })
             .then((data)=>{
                     setLocations(data);
                     console.log(data); 
             }).catch((err)=>{
                    console.log("Fetch Locations auto complite " + err);

           })
         

        }
        
    },[inputSearch])

    useEffect(()=>{
        fetch(`https://dataservice.accuweather.com/currentconditions/v1/${props.cityYouChoose[0].Key}?apikey=${props.APIKEY}`)
        .then((result)=>{ return result.json() })
        .then((data)=>{
             setCityTemperatur(data)
            console.log(cityTemperatur); 
         }).catch((err)=>{
            console.log("Fetch weather live time " + err);
        })
        for (let i = 0; i < props.yourFavorites.length; i++) {
            if (props.yourFavorites[i].City === props.cityYouChoose[0].LocalizedName){
                props.setFavoriteTitle("Reomve from favorites")
                props.setIsCityInFavorites(true)
                return;
            }
        }
        props.setFavoriteTitle("Add to favorites")
        props.setIsCityInFavorites(false)
    },[props.cityYouChoose])
    
    const changeColorOver = (id)=>{
        document.getElementById(id).style.backgroundColor = overColor
    }

    const changeColorOut = (id)=>{
        document.getElementById(id).style.backgroundColor = color
    }

    const cityChoose = (index)=>{
        props.setCityYouChoose([locations[index]])
        setLocations([])
    }
    const onlyEnglish = ()=>{
       var temp = document.getElementsByName("input")
       temp.value = "" 
    }

    return (
        <div id='homepage'>
            <br />
                <div style={{width:"100%",height:"5%",flexDirection:"row",display:"flex",justifyContent:"center",alignItems:"center",zIndex:"1"}}>
                    <div id='serchicon' >
                         <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Search_Icon.svg" alt="serch" style={{width:"100%",height:"80%"}} />
                    </div>
                    <div style={{width:"20%",height:"100%",display:"flex",alignItems:"center",flexDirection:"column"}}>
                        <div style={{width:"100%",height:"100%"}}>
                             <input name='input' value={inputSearch} onChange={(e)=>{
                                let value = e.target.value
                                console.log(value);
                                value = value.replace(/[^A-Za-z" "]/ig,"")
                                setInputSearch(value)
                                console.log(value);
                                 }} style={{fontSize:"large",width:"100%",height:"70%"}} type="text" />
                        </div> 
                    <div id='inputoptions'>
                         {locations.map((location,i)=>{
                             return <div  key={`${location.LocalizedName}`} id={`${location.LocalizedName}`}  
                                     onMouseOver={()=>{
                                      changeColorOver(location.LocalizedName)
                                     }} onMouseOut={()=>{
                                     changeColorOut(location.LocalizedName)
                                     }} style={{backgroundColor:`${color}`,fontSize:"medium",width:"100%",height:"70%",textAlign:"left",alignItems:"center",display:"flex"}}>
                                            <div  onClick={()=>{
                                             cityChoose(i)
                                            }} style={{paddingLeft:"5px",width:"100%",height:"100%",zIndex:'1'}}>{location.LocalizedName}
                                </div>
                            </div>
                             })}
                    </div>
                </div>
                </div>
            <br />
                <div id='showeathercontainer'>
                     <Showeather isCityInFavorites={props.isCityInFavorites} favoriteTitle={props.favoriteTitle} yourFavorites={props.yourFavorites} addToFavorites={props.addToFavorites} APIKEY={props.APIKEY} cityYouChoose={props.cityYouChoose} cityTemperatur={cityTemperatur}/>
                </div>
        </div>
    )
}
   
    
