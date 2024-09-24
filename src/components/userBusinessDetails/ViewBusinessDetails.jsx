import { Box, Button, createTheme, Divider, Grid, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextFieldComponent from '../../utils/TextFieldComponent'
import { json, useNavigate, useParams } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from "yup";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux'
import { getSingleBusinessDetails, getUniqueBuninessDetailsData, updateSingleBusinessDetails } from '../redox/reducer/UserDetails'
import DropzoneExample from '../../utils/DropZoneExample'

const ViewBusinessDetails = () => {
    const { bid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const BusinessDetails = useSelector(getUniqueBuninessDetailsData);
    const [VehiclePic, setVehiclePic] = useState();
    console.log("BusinessDetails==>", BusinessDetails)

    const initialValues = {
        u_name: "",
        role_name: "",
        u_mob_num: "",
        business_name: "",
        business_address: "",
        area: "",
        city: "",
        state: ""
    }

    const handleFormSubmit = async (values) => {
        const data = {
            business_name: values.business_name,
            business_address: values.business_address,
            area: values.area,
            city: values.city,
            state: values.state
        }
        const formdata = new FormData()
        formdata.append(json, JSON.stringify(data))
        if (VehiclePic) {
            formdata.append("Vehiclepic", VehiclePic[0])
        }
        console.log("data==>", data)
        console.log("formdata==>", formdata)
        const response = await dispatch(updateSingleBusinessDetails(formdata))
        if (response) {
            Swal.fire({
                title: "Business Details Updated Succesfully!",
                icon: "success",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/shareTrip/ManageUser')
                }
            })
        }
    }
    useEffect(() => {
        dispatch(getSingleBusinessDetails(bid))
    }, [dispatch])

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
        navigate(-1)
    }
    return (
        <>
            <Box p={5}>
                <Box p={2} bgcolor={'white'}>
                    <div>
                        <Typography variant='h6' fontWeight={'Bold'} >Business Details</Typography>
                    </div>
                </Box>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={BusinessDetails && bid ? BusinessDetails : initialValues}
                >{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) =>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={5}>
                            <Grid item xs={4}>
                                <TextFieldComponent
                                    label={'User Name'}
                                    name={"u_name"}
                                    proId={true}
                                    values={values.User?.u_name}
                                    errors={errors.User?.u_name}
                                    touched={touched.User?.u_name}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextFieldComponent
                                    label={'User Role'}
                                    name={"role_name"}
                                    proId={true}
                                    values={values.User?.roles.role_name}
                                    errors={errors.User?.roles.role_name}
                                    touched={touched.User?.roles.role_name}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextFieldComponent
                                    label={'User Phone Number'}
                                    name={"u_mob_num"}
                                    proId={true}
                                    values={values.User?.u_mob_num}
                                    errors={errors.User?.u_mob_num}
                                    touched={touched.User?.u_mob_num}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>Business Details</Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <Box border={'1px solid black'} p={5} borderRadius={3} >
                                    <Grid container spacing={5}>
                                        <Grid item xs={6}>
                                            <TextFieldComponent
                                                label={'Business Name'}
                                                name={"business_name"}
                                                values={values.business_name}
                                                errors={errors.business_name}
                                                touched={touched.business_name}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextFieldComponent
                                                label={'Address'}
                                                name={"business_address"}
                                                values={values.business_address}
                                                errors={errors.business_address}
                                                touched={touched.business_address}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextFieldComponent
                                                label={'Area'}
                                                name={"area"}
                                                values={values.area}
                                                errors={errors.area}
                                                touched={touched.area}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextFieldComponent
                                                label={'City'}
                                                name={"city"}
                                                values={values.city}
                                                errors={errors.city}
                                                touched={touched.city}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextFieldComponent
                                                label={'State'}
                                                name={"state"}
                                                values={values.state}
                                                errors={errors.state}
                                                touched={touched.state}
                                                handleBlur={handleBlur}
                                                handleChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <DropzoneExample
                                                title={"The Business Photo must be in JPEG,JPG or PNG format Photo"}
                                                content={"Business Photo"}
                                                setlocationimage={setVehiclePic}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "25px",
                                padding: "25px",
                            }}>
                                <ThemeProvider theme={btnTheme}>
                                    <Button
                                        variant='contained' onClick={handleback}>Back</Button>
                                </ThemeProvider>
                                <ThemeProvider theme={btnTheme}>
                                    <Button
                                        variant='contained' type='submit' color='primary' >Submit</Button>
                                </ThemeProvider>
                            </Box>
                        </Grid>
                    </form>
                    }
                </Formik>
            </Box>
        </>
    )
}

export default ViewBusinessDetails