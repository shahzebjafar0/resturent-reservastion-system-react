import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import apiService from 'services/ApiServices';

const columns = [
    { id: 'id', label: 'Tracking No' },
    { id: 'username', label: 'Patron Name' },
    { id: 'phone', label: 'Phone' },
    { id: 'date', label: 'Date' },
    { id: 'status', label: 'Status' }
];

const PatronOrderTable = () => {
    const [loading, setLoading] = useState(true);
    const [patronOrder, setPatronOrder] = useState([]);

    const user_id = 1;

    useEffect(() => {
        const fetchData = async () => {
            const response = await apiService.getAllReservationByUser(user_id);
            setPatronOrder(response);
            setLoading(false);
        };
        fetchData();
    }, [user_id]);

    console.log(patronOrder);
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id}>{column.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} align="center">
                                Loading...
                            </TableCell>
                        </TableRow>
                    ) : (
                        patronOrder.map((row) => (
                            <TableRow key={row.trackingNo}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>{row[column.id]}</TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PatronOrderTable;
