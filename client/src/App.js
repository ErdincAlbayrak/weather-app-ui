import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

function App() {

    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([]);
    const [queryParameters, setQueryParameters] = useState("");
    const [cityValue,setCityValue] = useState("");
    const [dateValue,setDateValue] = useState("");


    async function getData() {
        let address = "http://localhost:8080/weather" + queryParameters;
        console.log("address = " + address);
        const response = await axios.get(address);
        console.log("getting data");
        setData(response.data);
        setLoadingData(false);
    }


    useEffect(() => {
        if (loadingData) {
            // if the result is not ready so you make the axios call
            getData();
        }
    }, [loadingData]);


    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
        textField: {
            width: 200,
        }
    });



    function dosth() {
        // console.log("button functions");
        // console.log("city value = " + cityValue);
        // console.log("date value = " + dateValue);
        let tmpParameters = "";
        if(cityValue !==  "") {
            tmpParameters += "/city/" + cityValue;
        }
        if(dateValue !==  "") {
            tmpParameters += "/date/" + dateValue;
        }
        setQueryParameters(tmpParameters);
        setLoadingData(true);
    }
    //let queryParameters = "";
    //let cityValue = "";
    //let dateValue = "";

    return (
        <div>
            <div>
                <TextField id="search" label="Search by city" type="search" variant="outlined" onChange={e => {setCityValue(e.target.value)}}/>
            </div>
            <div>
                <TextField id="date" label="Search by Date" type="date" className={useStyles.textField} InputLabelProps={{shrink: true,}}
                           onChange={e => {setDateValue(e.target.value)}}/>
            </div>
            <div>
                <Button id="searchButton" variant="outlined" color="primary" onClick={dosth}>Search</Button>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table classes={useStyles.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">City</TableCell>
                                <TableCell align="left">Forecast</TableCell>
                                <TableCell align="left">High</TableCell>
                                <TableCell align="left">Low</TableCell>
                                <TableCell align="left">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.city+"-"+row.wdate}>
                                    <TableCell component="th" scope="row">
                                        {row.city}
                                    </TableCell>
                                    <TableCell align="right">{row.forecast}</TableCell>
                                    <TableCell align="right">{row.high}</TableCell>
                                    <TableCell align="right">{row.low}</TableCell>
                                    <TableCell align="right">{row.wdate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default App;
