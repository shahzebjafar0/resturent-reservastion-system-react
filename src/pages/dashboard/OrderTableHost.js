import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, Select, MenuItem } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide the select component's focus outline
    '&:focus-within': {
        '& .MuiSelect-root': {
            '&:focus': {
                outline: 'none'
            }
        }
    }
}));

function MyTable() {
    const [rows, setRows] = useState([]);

    const [statusOptions, setStatusOptions] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/tableStatus`)
            .then((response) => setStatusOptions(response.data))
            .catch((error) => console.log(error));

        axios
            .get(`${process.env.REACT_APP_BASE_URL}/orders`)
            .then((response) => setRows(response.data))
            .catch((error) => console.log(error));
    }, []);

    const handleStatusChange = (event, row) => {
        console.log(row);

        const updatedRow = { ...row, status: event.target.value };
        axios
            .put(`${process.env.REACT_APP_BASE_URL}/orders/${row.id}`, updatedRow, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) =>
                setRows((prevState) => prevState.map((prevRow) => (prevRow.id === response.data.id ? response.data : prevRow)))
            )
            .catch((error) => console.log(error));
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="My Table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Id</StyledTableCell>
                        <StyledTableCell>Patron Name</StyledTableCell>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {row.id}
                            </StyledTableCell>
                            <StyledTableCell>{row.username}</StyledTableCell>
                            <StyledTableCell>{row.date}</StyledTableCell>
                            <StyledTableCell>
                                <FormControl>
                                    <Select value={row.status} onChange={(event) => handleStatusChange(event, row)}>
                                        {statusOptions.map((statusOption) => (
                                            <MenuItem key={statusOption.value} value={statusOption.status}>
                                                {statusOption.status}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MyTable;
