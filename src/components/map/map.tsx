import React from 'react';
import {Box} from '@material-ui/core';
import GoogleMapReact from 'google-map-react';
import Ship from '../ship/ship';
import Port from '../port/port';
import {IMapProps, IShipInterface } from '../../interfaces/interfaces';

const Map = (props: IMapProps) => {
    let port_lat=0;
    let port_lng=0;

    if(props.port.location && String(props.port.location).trim()!==""){
        let portCoordinates= props.port.location.split(" ");
        let first =portCoordinates[0];
        let second =portCoordinates[1];
        if(first.length===5){
            port_lat=parseInt(first.slice(0,2))+parseInt(first.slice(2,4))/60;
        }else if(first.length===6){
            port_lng=parseInt(first.slice(0,3))+parseInt(first.slice(3,5))/60;
        }
        if(second.length===5){
            port_lat=parseInt(second.slice(0,2))+parseInt(second.slice(2,4))/60;
        }else if(second.length===6){
            port_lng=parseInt(second.slice(0,3))+parseInt(second.slice(3,5))/60;
        }
    }
    
    const defaultMapProps = {
        center: { 
            lat: port_lat,
            lng: port_lng
        },
        zoom: 1,
        style: {        
            height: "100%",
            width: "100%"
        }
        };
    return(
         <Box bgcolor={'#f2f2f2'} ml={10} pt={'1px'} width={738} height={550}>
            <Box ml={5} mt={5} width="90%" height="85%">
                <GoogleMapReact
                    bootstrapURLKeys={"AIzaSyCXrLs_2cEYDE_X4vd7d_3E3xtyz49sfig"}
                    defaultCenter={defaultMapProps.center}
                    center={defaultMapProps.center}
                    defaultZoom={1}>
                    {
                        //removed  LAT-LNG/600000 - human readable
                        props.ships.map((each: IShipInterface)=>{
                            return <Ship lat={each.LATITUDE} lng={each.LONGITUDE} dest={each.DEST} eta={each.ETA} name={each.NAME} imo={each.IMO} idle={each.DEST==="" ? true : false}/>
                        })
                    }
                    <Port lat={port_lat} lng={port_lng} name={props.port.name} />
                </GoogleMapReact>
            </Box>
        </Box>
    )
}

export default Map;