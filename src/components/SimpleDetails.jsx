import React from 'react';

export default function SimpleDetails(props) {
  return <div style={{width:"100%",height:"100%"}}>
            {props.cityYouChoose[0].LocalizedName}
            <br />
            <br />
            {props.cityTemperatur[0].Temperature.Metric.Value}{"°"+props.cityTemperatur[0].Temperature.Metric.Unit.toLowerCase()}
         </div>;
}
