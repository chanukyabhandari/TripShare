import { Box, Button, createTheme, Grid, ThemeProvider, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as yup from "yup";
import Swal from "sweetalert2";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TextFieldComponent from '../../utils/TextFieldComponent';
import { createPackageData, uniqueBookingType } from '../redox/reducer/bookingSlice';

const AddPakages = () => {
    const { bid } = useParams
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const bookingData = useSelector(uniqueBookingType)
    const selectedOption = bookingData.booking_type_name
    // const location=useLocation();

    // const selectedBookingType = JSON.parse(localStorage.getItem('selectedBookingType'));

    // console.log('selectedBookingType',selectedBookingType)

    const initialValues = {
        booking_type_id: "",
        package_name: "",
        package_details: "",
        limit_in_kms: "",
        hour_limit: ""
    }
    const checkoutSchema = yup.object().shape({
        limit_in_kms: yup.number().typeError('Must be Number'),
        hour_limit: yup.number().typeError('Must be Number'),
    })
    const handleFormSubmit = async (values, { resetFrom }) => {
        const data = {
            booking_type_id: values.booking_type_id,
            package_name: values.package_name,
            package_details: values.package_details,
            limit_in_kms: values.limit_in_kms,
            hour_limit: values.hour_limit
        }

        const response = await dispatch(createPackageData(data))
        if (response) {
            Swal.fire({
                title: "Pakage Added Succesfully!",
                icon: "success",
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(-1)
                }
            })
        }
    }
    const btnTheme = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        fontSize: '1rem',
                        backgroundColor: '#08086b',
                        color: 'white',
                        "&:hover": {
                            backgroundColor: '#09776b'
                        }
                    }
                }
            }
        }
    })
    const handleback = () => {
        navigate(-1);
    }
    return (
        <>
            <Box p={2} bgcolor={'white'} >
                <div>
                    <Typography variant='h6' fontWeight={'bold'} color={'black'}>Add Subscription</Typography>
                </div>
            </Box>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
                enableReinitialize
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={5} padding={'20px'}>
                            <Grid item xs={6}>
                                {/* <BookingDropDown
                                    // proID={bid}
                                    label={"Select the Booking type"}
                                    name={"booking_type_name"}
                                    options={bookingName}
                                    arrayData={bookingData}
                                    stateData={booking}
                                    setStateData={setBooking}
                                    issubmit={handleSubmit}
                                /> */}
                                <TextFieldComponent
                                    proId={true}
                                    label={'Booking Type Id'}
                                    name='booking_type_id'
                                    values={selectedOption}
                                    errors={errors.booking_type_id}
                                    touched={touched.booking_type_id}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldComponent
                                    label={'Package Name'}
                                    name='package_name'
                                    values={values.package_name}
                                    errors={errors.package_name}
                                    touched={touched.package_name}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldComponent
                                    label={'Package Details'}
                                    name='package_details'
                                    values={values.package_details}
                                    errors={errors.package_details}
                                    touched={touched.package_details}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldComponent
                                    label={'Limit in kms'}
                                    name='limit_in_kms'
                                    values={values.limit_in_kms}
                                    errors={errors.limit_in_kms}
                                    touched={touched.limit_in_kms}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldComponent
                                    label={'Hour Limit'}
                                    name='hour_limit'
                                    values={values.hour_limit}
                                    errors={errors.hour_limit}
                                    touched={touched.hour_limit}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "25px",
                                    padding: "25px",
                                }}
                            >
                                <ThemeProvider theme={btnTheme}>
                                    <Button
                                        variant="contained"
                                        // icon={<ArrowBack />}
                                        onClick={handleback}
                                    >
                                        Back
                                    </Button>
                                </ThemeProvider>
                                <ThemeProvider theme={btnTheme}>

                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        sx={{ fontSize: "15px", padding: "10px 60px" }}
                                    >
                                        Submit
                                    </Button>
                                </ThemeProvider>
                            </Box>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default AddPakages