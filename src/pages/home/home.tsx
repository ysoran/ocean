import React, {useState, Dispatch, SetStateAction} from 'react';
import axios, {AxiosResponse} from 'axios';
import {Box} from '@material-ui/core';
import Lister from '../../components/lister/lister';
import Map from '../../components/map/map';
import SearchPanel from '../../components/search-panel/search-panel';
import {IShipInterface, IPort} from '../../interfaces/interfaces';

const isAvailable = (field: any) => {
    return field && field.length>0 && field!=="";
}

const Home = () => {
    
    const [shipData, setShipData] = useState(undefined as Array<IShipInterface> | undefined);
    const [port,setPort] = useState({location:""} as IPort);
    const [showHeader, setShowHeader] = useState(true); //for list
    
    const handleSearch = (port: number,startDate: string, endDate: string,distance:number | string,includeIdleVessels:boolean, setSearchWarning: Dispatch<SetStateAction<string | undefined>>) => {
        let allAvailable = true;
        setSearchWarning(undefined);
        setShowHeader(true);
        [port, startDate, endDate, distance].forEach((each)=>{
            if(!isAvailable(each)){
                allAvailable=false;
            }
        })
        !allAvailable && setSearchWarning("Please be sure you filled all fields");
        allAvailable && axios.post("http://localhost:4000/getShips",{ 
             params: {
                port: port,
                startDate: startDate,
                endDate: endDate,
                distance: distance,
                includeIdleVessels: includeIdleVessels
            }
        }).then((data: AxiosResponse)=>{
            if(data.data.ships && data.data.ships.length>100){
                setSearchWarning("Too many results! Please narrow your search criteria.");
                setShipData(undefined);
            }else{
                setShipData(data.data.ships);
                setPort(data.data.port);
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    const clear = () => {
        setShipData([]);
        setShowHeader(false);
        setPort({location:""} as IPort);
    }

    return (
    <Box p={5}>
        <Box display="flex">
            <Box>
                <SearchPanel handleSearch={handleSearch} clear={clear} />
            </Box>
            <Box width={100}>
                { shipData && shipData.length>0 && <Map ships={shipData} port={port}/>}
            </Box>
            
        </Box>
        <Box>
            <Lister port={port} showHeader={showHeader} setShowHeader={setShowHeader} ships={shipData} />
        </Box>
    </Box>);
}

export default Home;