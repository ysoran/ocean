import React,{useState} from 'react';
import styled from 'styled-components';
import {Box} from '@material-ui/core';
import {IShipProps} from '../../interfaces/interfaces';


const StyledBox = styled.span<IShipProps>`
    background-color: ${props => props.idle ? 'white' : 'orange'};
    border: 2px solid black;
    border-radius: 200% 60% 60% 200%;
    padding: 4px;
    white-space: nowrap !important;
    cursor: pointer;
`;

const StyledSpanRow = styled.span`
    font-size: 14px;
    padding: 3px;
    padding-top: 0px;
    width: 160px;
    display: inline-block;
    line-height: 16px;
    white-space: nowrap !important;
`;

const StyledUnderBox = styled.span`
    border-radius: 5%;
    padding: 10px;
    background-color: white !important;
    display: inline-block;
    cursor: pointer;
`;


//not using human readable format
/*
const calculateEta = (min: number) => {
    let month:any=Math.floor(min/(60*24*30));
    if(month>0){
        min= min-month*(60*24*30);
        if(month<10){
            month=String("0"+month);
        }
    }
    let day:any=Math.floor(min/(60*24));
    if(day>0){
        min= min-day*(60*24);
        if(day<10){
            day=String("0"+day);
        }
    }
    let hour:any=Math.floor(min/60);
    if(hour>0){
        min= min-hour*60;
        if(hour<10){
            hour=String("0"+hour);
        }
    }
    return month+"/"+day+" "+hour+":"+min;
}
*/

const Ship = (props: IShipProps) => {
    const [descVisible, setDescVisible] = useState(false);
    return(
        <React.Fragment>
            <StyledBox onClick={()=>setDescVisible(!descVisible)} {...props}>
                {props.name}
            </StyledBox>
            <Box mt={2} width={300} height={100} onClick={()=>setDescVisible(false)}>
                {descVisible && <StyledUnderBox><br/>
                    <StyledSpanRow><strong>Name:</strong> {props.name}</StyledSpanRow><br/>
                    <StyledSpanRow><strong>Imo:</strong> {props.imo}</StyledSpanRow><br/>
                    <StyledSpanRow><strong>Lng:</strong> {props.lng}</StyledSpanRow><br/>
                    <StyledSpanRow><strong>Lat:</strong> {props.lat}</StyledSpanRow><br/>
                    <StyledSpanRow><strong>Dest:</strong> {(props.dest && props.dest!=="" && props.dest!=="0") ? props.dest : 'No Info'}</StyledSpanRow><br/>
                    <StyledSpanRow><strong>Eta:</strong> {!props.idle ? props.eta : 'Idle'}</StyledSpanRow><br/>
                </StyledUnderBox>}
            </Box>
        </React.Fragment>
    )
}

export default Ship;