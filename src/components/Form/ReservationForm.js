import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import apiService from 'services/ApiServices';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { toast } from 'react-hot-toast';

// Validation schema using Yup
const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
    phone: yup.string().matches(/^\d+$/, 'Phone number is invalid').required('Phone number is required'),
    date: yup.date().required('Date is required')
});

// Component function
function ReservationForm() {
    const userId = 1;
    const formik = useFormik({
        initialValues: {
            username: '',
            phone: '',
            date: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, actions) => {
            const order = await apiService.addReservation(values.username, values.phone, values.date, userId, 'Waiting');
            Object.keys(order).length !== 0 && toast.success('Reservation added successfully');
            actions.resetForm();
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2, mx: 'auto' }}>
                <TextField
                    id="username"
                    name="username"
                    label="Username"
                    variant="outlined"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    id="phone"
                    name="phone"
                    label="Phone number"
                    variant="outlined"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        id="date"
                        name="date"
                        label="Date"
                        type="date"
                        variant="outlined"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}
                        InputLabelProps={{ shrink: true }}
                    />
                </Box>
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </Box>
        </form>
    );
}

export default ReservationForm;
