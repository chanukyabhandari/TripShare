import { Box, Button, createTheme, Divider, Grid, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import Swal from "sweetalert2";
import TextFieldComponent from '../../utils/TextFieldComponent'
import { Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom';
import DropzoneExample from '../../utils/DropZoneExample';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleVehicleType, getUniqueVehicleType, updateVehicleType } from '../redox/reducer/vehicleSlice';
import ImageHover from '../../utils/Imagehover';

const UpdateVehicleType = () => {
    const { vtid } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const vehicleData = useSelector(getUniqueVehicleType)
    const [vehiclephoto, setVehiclePhoto] = useState();

    const initialValues = {
        v_type: "",
    }
    const checkoutSchema = yup.object().shape({
        v_type: yup.string().required('Required*')
    })
    const handleFormSubmit = async (values, { resetFrom }) => {
        const data = {
            id: values.id,
            v_type: values.v_type
        }
        const formdata = new FormData()
        formdata.append('json', JSON.stringify(data))
        // if (Array.isArray(vehiclephoto) && vehiclephoto.length > 0) {
        //     formdata.append("vTypePic", vehiclephoto[0])
        // }

        const response = await dispatch(updateVehicleType(formdata))
        if (response) {
            Swal.fire({
                title: "Vehicle Type Updated Succesfully!",
                icon: "success",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/shareTrip/ManageVehicleType')
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

    useEffect(() => {
        dispatch(getSingleVehicleType(vtid))
    }, [dispatch])

    return (
        <>
            <Box p={2} bgcolor={'white'} >
                <div>
                    <Typography variant='h6' fontWeight={'bold'} color={'black'}>Update Vehicle Type</Typography>
                </div>
            </Box>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={vehicleData && vtid ? vehicleData : initialValues}
                validationSchema={checkoutSchema}
                enableReinitialize
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={5} padding={'20px'}>
                            <Grid item xs={6}>
                                <TextFieldComponent
                                    label={'Vehicle Type Id'}
                                    name='id'
                                    proId={vtid}
                                    values={values.id}
                                    errors={errors.id}
                                    touched={touched.id}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>Editable Fields</Divider>
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldComponent
                                    label={'Vehicle Type'}
                                    name='v_type'
                                    values={values.v_type}
                                    errors={errors.v_type}
                                    touched={touched.v_type}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange} />
                            </Grid>
                            <Grid item xs={6}>
                                {values.v_type_pic && (<ImageHover values={values.v_type_pic} />)}
                                <DropzoneExample
                                    title={'The Vehicle Photo must be in JPEG,JPG or PNG format Photo'}
                                    content={"Vehicle Photo"}
                                    setlocationimage={setVehiclePhoto} />
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

export default UpdateVehicleType