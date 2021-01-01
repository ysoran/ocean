import React, {useState, useEffect} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import styled from 'styled-components';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import {Box, TextField, Checkbox, FormControlLabel, Button} from '@material-ui/core';
import Moment from 'moment';
import axios from 'axios';
import Autocomplete, { AutocompleteRenderGroupParams } from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {ISearchPanel, IPort} from '../../interfaces/interfaces';
import ListSubheader from '@material-ui/core/ListSubheader';
import {ListboxComponent} from './list-box-component';

const StyledCloseButton = styled.span`
    cursor: pointer;
    background-color: white;
    font-size: 13px;
    float: right;
    padding:9px;
    margin-top: -8px;
`;

const StyledAlertBox = styled(Box)`
    margin-bottom: 10px;
`;

const StyledClear = styled(Button)`
    margin-left: 20px;
`;

const renderGroup = (params: AutocompleteRenderGroupParams) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];


const SearchPanel = (props: ISearchPanel) => {
    const [alert, setAlert] = useState(undefined as string | undefined);
    const [ports, setPorts] = useState([] as Array<IPort>);
    const [searchWarning, setSearchWarning] = useState(undefined as undefined | string);
    const [port, setPort] = useState(0);
    const [startDate, setStartDate] = useState(Moment().subtract(3,'d'));
    const [endDate, setEndDate] = useState(Moment());
    const [distance, setDistance] = useState('');
    const [includeIdleVessels, setIncludeIdleVessels] = useState(false);
    
    //auto complete loading
    const [open, setOpen] = React.useState(false);
    const [typeCheck, setTypeCheck] = React.useState(true);
    const loading = open && (ports!==undefined && ports.length === 0);

    const getPorts = async()=> {
        let data = await axios.get("http://localhost:4000/getPorts");
        setPorts(data.data);
    }

    useEffect(()=> {
        getPorts();
    },[]);

    const handleStartDateChange = (date: any) => {
        if(Moment(date).isSameOrAfter(endDate)){
            showAlert('Selected date should be smaller than end date');
        }else{
            showAlert(undefined);
            setStartDate(date);
        }
    };

    const handleEndDateChange = (date: any) => {
        if(Moment(startDate).isSameOrAfter(date)){
            showAlert('Selected date should be bigger than start date');
        }else{
            showAlert(undefined);
            setEndDate(date);
        }
    };

    const showAlert= (alert: string | undefined) => {
        setAlert(alert);
    }

    const handleVesselIdle = (e) => {
        setIncludeIdleVessels(e.target.checked);
    }

    const handlePort = (e) => {
        setPort(e.target.innerText);
    }

    const handleDistance = (e) => {
        setDistance(e.target.value);
    }

    const handleClear= () => {
        props.clear();
        setSearchWarning(undefined);
        setAlert(undefined);
        setDistance('');
    }

    const handleDistanceKeyDown = (e) => {
      let num =e.key;
        if(!(e.keyCode === 46 || e.keyCode === 8) && isNaN(parseInt(num) - 0)){
          setTypeCheck(false);
          e.preventDefault();
          return false;
        }
        setTypeCheck(true);
    }

    return(
        <React.Fragment>
            <Box><h1>Search Form</h1></Box>
            <Box display="flex">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-start"
                            label="Start date"
                            autoOk={true}
                            value={startDate}
                            onChange={handleStartDateChange}
                            />
                    <Box mr="10" p={5}>to</Box>
                    <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-end"
                            label="End date"
                            autoOk={true}
                            value={endDate}
                            onChange={handleEndDateChange}
                            />
                </MuiPickersUtilsProvider>
            </Box>
            {alert && <StyledAlertBox p={2} bgcolor={'#f2f2f2'}><strong>Warning: </strong> {alert} <StyledCloseButton onClick={()=> setAlert(undefined)}>Hide</StyledCloseButton></StyledAlertBox>}
            <Box display="flex">
                <Box width={226}>
                {loading ? (<Box><CircularProgress style={{marginTop:'20px', marginRight:'8px'}} color="inherit" size={20} /> Ports are loading</Box>) : <Autocomplete
                    id="portField"
                    onChange={handlePort}
                    ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
                    options={ports}
                    getOptionSelected={(option, value) => option.name===value.name }
                    renderGroup={renderGroup}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Port" InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                    <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                    </React.Fragment>
                    ),
                }} />}
                    />}
                </Box>
                <Box mr={11}></Box>
                <Box width={226}><TextField id="distance" onKeyDown={handleDistanceKeyDown} onChange={handleDistance} value={distance}  fullWidth={true} label="Distance (km)"/></Box>
            </Box>
            {!typeCheck && <StyledAlertBox mt={3} p={2} bgcolor={'#f2f2f2'}><strong>Warning: </strong> Distance field should be a number. <StyledCloseButton onClick={()=> setTypeCheck(true)}>Hide</StyledCloseButton></StyledAlertBox>}

            <Box mt={7}>
                <FormControlLabel
                    control={<Checkbox checked={includeIdleVessels} onChange={handleVesselIdle} name="checkedVessel" />}
                    label="Include Idle Vessels"
                />
            </Box>
            {searchWarning && <StyledAlertBox mt={3} p={2} bgcolor={'#f2f2f2'}><strong>Warning: </strong> <span className="searchWarning">{searchWarning}</span> <StyledCloseButton onClick={()=> setSearchWarning(undefined)}>Hide</StyledCloseButton></StyledAlertBox>}
            <Box mt={4} display="flex">
                <Button id="searchButton" onClick={()=>props.handleSearch(port,startDate.toString(),endDate.toString(),distance,includeIdleVessels, setSearchWarning)} variant="outlined" color="primary">SEARCH</Button>
                <StyledClear onClick={handleClear} variant="outlined" color="primary">CLEAR</StyledClear>
            </Box>
        </React.Fragment>
    )
}

export default SearchPanel;