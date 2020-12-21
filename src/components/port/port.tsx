import React from 'react';
import styled from 'styled-components';
import {IPortProps} from '../../interfaces/interfaces';

const StyledBox = styled.span`
    background-color: yellow;
    border: 2px solid white;
    border-radius: 100%;
    width:0px;
    height:0px;
    padding:4px;
    margin-left: -2px;
    margin-top: -2px;
    display: inline-block;
    cursor: pointer;
`;

const Port = (props: IPortProps) => {
    return(
        <StyledBox>
        </StyledBox>
    )
}

export default Port;