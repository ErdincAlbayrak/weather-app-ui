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

    async function getData() {
        const response = await axios.get("http://localhost:8080/weather");
        console.log("getting data");
        setData(response.data);
        setLoadingData(false);
    }

    async function dosth() {

        console.log("getting data");
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

    return (
        <div>
            <div>
                <TextField id="filled-search" label="Search field" type="search" variant="filled" />
            </div>
            <div>
                <TextField id="date" label="Date" type="date" class={useStyles.textField} InputLabelProps={{shrink: true,}}/>
            </div>
            <div>
                <Button id="searchButton" variant="outlined" color="primary" onClick={dosth()}>Search</Button>
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
