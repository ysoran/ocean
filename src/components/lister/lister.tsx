import React, { useState } from 'react';
import {Box} from '@material-ui/core';
import styled from 'styled-components';
import {IShipInterface, ILister} from '../../interfaces/interfaces';

const StyledBoxWrapper = styled(Box)`
    width: 1327px;
    padding: 16px;
    border-bottom: 1px solid #f2f2f2;
`;

const StyledSpan = styled.span` //make shared component
    padding: 9px;
    background-color: white;
    margin-left: 10px;
    font-size: 13px;
    margin-top: -8px;
    cursor: pointer;
`;

const StyledFloatSpan = styled.span`
    margin-left: auto;
`;

const StyledWordWrapBox = styled(Box)`
    &&&{
        word-break: break-word;
    }
`;

const renderList = (ships: Array<IShipInterface> | undefined) => {
    return (ships ? ships.map((each,i)=> <StyledBoxWrapper display="flex" key={i}>
                <StyledWordWrapBox ml={2} width={150}>{each.NAME}</StyledWordWrapBox>
                <StyledWordWrapBox ml={2} width={170}>{each.DEST}</StyledWordWrapBox>
                <StyledWordWrapBox ml={2} width={100}>{each.TYPE}</StyledWordWrapBox>
                <StyledWordWrapBox ml={2} width={100}>{each.LATITUDE}</StyledWordWrapBox>
                <Box ml={2} width={100}>{each.LONGITUDE}</Box>
                <Box ml={2} width={100}>{each.ETA}</Box>
                <Box ml={2} width={100}>{each.MMSI}</Box>
                <Box ml={2} width={100}>{each.COG}</Box>
                <Box ml={2} width={100}>{each.SOG}</Box>
                <Box ml={2} width={100}>{each.IMO}</Box>
                <Box ml={2} width={100}>{each.ROT}</Box>
            </StyledBoxWrapper>) : null)
}

const Lister = (props: ILister) =>{
    
    const [showList, setShowList] = useState(false);
    
    return(
        <React.Fragment>
            { props.port && props.port.name && <StyledBoxWrapper bgcolor={'#f2f2f2'} borderBottom={'1px solid black'} mt={3} pl={2}>
                    <Box display="flex">
                        <strong>Port Info: </strong>  
                        <Box ml={3}>{props.port.country_code}-{props.port.city_code}   {props.port.name} </Box>
                        <Box ml={2} color={'#666'}>{props.port.location}</Box>
                    </Box>
                </StyledBoxWrapper>}
            {props.showHeader && props.ships && <StyledBoxWrapper bgcolor={'#f2f2f2'} borderBottom={'1px solid black'} mt={3} pl={2}>
                    <Box display="flex"><strong>Search Info: </strong><Box ml={3}>{props.ships.length} results found.</Box> 
                        <StyledFloatSpan>
                            { props.ships.length>0 && <React.Fragment>
                                    <StyledSpan onClick={()=>{props.setShowHeader(false);setShowList(false);}}>Close</StyledSpan>
                                    <StyledSpan onClick={()=>setShowList(!showList)}>{!showList ? 'Show All' : 'Hide All'}</StyledSpan>
                                </React.Fragment>
                            }
                        </StyledFloatSpan>
                    </Box>
                </StyledBoxWrapper>}
            {showList && props.ships && props.ships.length>0 && (<React.Fragment>
                <StyledBoxWrapper fontWeight="bold" display="flex">
                    <Box ml={2} width={150}>NAME</Box>
                    <Box ml={2} width={170}>DEST</Box>
                    <Box ml={2} width={100}>TYPE</Box>
                    <Box ml={2} width={100}>LATITUDE</Box>
                    <Box ml={2} width={100}>LONGITUDE</Box>
                    <Box ml={2} width={100}>ETA</Box>
                    <Box ml={2} width={100}>MMSI</Box>
                    <Box ml={2} width={100}>COG</Box>
                    <Box ml={2} width={100}>SOG</Box>
                    <Box ml={2} width={100}>IMO</Box>
                    <Box ml={2} width={100}>ROT</Box>
                </StyledBoxWrapper>
                {renderList(props.ships)}
            </React.Fragment>)}
        </React.Fragment>
    );
}

export default Lister;