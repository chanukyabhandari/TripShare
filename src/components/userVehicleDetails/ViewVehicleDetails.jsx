import { Box, Button, createTheme, Divider, Grid, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextFieldComponent from '../../utils/TextFieldComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllUserdata, getUserData } from '../redox/reducer/useSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as yup from "yup";
import Swal from "sweetalert2";
import { getSingleVehicleDetails, getUniqueVehicleDetailsData, updateSingleVehicleDetails } from '../redox/reducer/UserDetails'
import VehicleTypeDropDown from '../../utils/VehicleTypeDropdown'
import VehicleNameDropDown from '../../utils/VehicleNameDropDown'
import { getallVehicleName, getallVehicleType, getVehicleName, getVehicleType } from '../redox/reducer/vehicleSlice'
import NewSeatingCapasityDropDown from '../../utils/NewSeatingCapasityDropDown'
import RadioComponent from '../../utils/RadioComponets'

const ViewVehicleDetails = () => {
    const { uid } = useParams();
    console.log("uid", uid)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Vehicledetails = useSelector(getUniqueVehicleDetailsData);
    console.log("Vehicledetails==>", Vehicledetails)
    const VehicleTypeData = useSelector(getVehicleType)
    const VehicleName = useSelector(getVehicleName)
    //  State and setState for dropdowns
    const [vehicleType, setVehicleType] = useState();
    const [seatingtype, setseatingtype] = useState();
    const [Vname, setVname] = useState();
    const [issubmit, setissubmit] = useState(false);
    const [isActive, setIsactive] = useState(true);
    console.log("vehicleType", vehicleType)
    console.log("seatingtype", seatingtype)
    console.log("Vname", Vname)


    const initialValues = {
        v_registration_number: "",
        v_model: ""
    }
    // const checkoutSchema = yup.object().shape({
    //     v_registration_number: yup.string().required('Required*')
    // })
    const handleFormSubmit = async (values) => {
        const data = {
            id: Vehicledetails?.st_vehicles_id,
            v_registration_number: values.vehicles?.v_registration_number,
            v_model: values.vehicles?.v_model,
            vehicle_types_id: vehicleType.id,
            vehicle_names_id: Vname.id,
            v_seating_cpcty: seatingtype.v_seating_cpcty,
            is_active: isActive !== false ? isActive : values.is_active
        }
        console.log("data==>", data)
        const response = await dispatch(updateSingleVehicleDetails(data))
        if (response) {
            Swal.fire({
                title: "Vehicle Details Updated Succesfully!",
                icon: "success",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/shareTrip/ManageUser')
                }
            })
        }
    }


    useEffect(() => {
        dispatch(getSingleVehicleDetails(uid))
        dispatch(getallVehicleType())
        dispatch(getallVehicleName())
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
    const handleclick = () => {
        setissubmit(true)
    }
    return (
        <>
            <Box p={5}>
                <Box p={2} bgcolor={'white'}>
                    <div>
                        <Typography variant='h6' fontWeight={'Bold'} >Vehicle Details</Typography>
                    </div>
                </Box>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={Vehicledetails && uid ? Vehicledetails : initialValues}
                    // validationSchema={checkoutSchema}
                    enableReinitialize
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) =>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={5}>
                                <Grid item xs={4}>
                                    <TextFieldComponent
                                        label={'User Name'}
                                        name={"u_name"}
                                        proId={true}
                                        values={values.User?.u_name}
                                        errors={errors.u_name}
                                        touched={touched.u_name}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextFieldComponent
                                        label={"User Role"}
                                        name={'role_name'}
                                        proId={true}
                                        values={values.User?.roles?.role_name}
                                        errors={errors.User?.roles?.role_name}
                                        touched={touched.User?.roles?.role_name}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
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
                                        handleChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider>Vehicle Details</Divider>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box border={'1px solid black'} p={5} borderRadius={3} >
                                        <Grid container spacing={5}>
                                            <Grid item xs={6}>
                                                <TextFieldComponent
                                                    label={'Vehicle Registration'}
                                                    name={"v_registration_number"}
                                                    values={values.vehicles?.v_registration_number}
                                                    errors={errors.vehicles?.v_registration_number}
                                                    touched={touched.vehicles?.v_registration_number}
                                                    handleBlur={handleBlur}
                                                    handleChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextFieldComponent
                                                    label={'Vehicle Model'}
                                                    name={'v_model'}
                                                    values={values.vehicles?.v_model}
                                                    errors={errors.vehicles?.v_model}
                                                    touched={touched.vehicles?.v_model}
                                                    handleBlur={handleBlur}
                                                    handleChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <VehicleTypeDropDown
                                                    label={'Select the Vehicle Type'}
                                                    name={'v_type'}
                                                    stateData={vehicleType}
                                                    setStateData={setVehicleType}
                                                    options={VehicleTypeData}
                                                    arrayData={Vehicledetails?.vehicles?.VehicleTypes}
                                                    issubmit={issubmit}
                                                    inputerror={"please select the vehicle type"}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <VehicleNameDropDown
                                                    label={'Select The vehicle Name'}
                                                    name={"v_name"}
                                                    stateData={Vname}
                                                    setStateData={setVname}
                                                    options={VehicleName}
                                                    arrayData={Vehicledetails?.vehicles?.VehicleNames}
                                                    issubmit={issubmit}
                                                    inputerror={"Please select the Vehicle Name"} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <NewSeatingCapasityDropDown
                                                    label={'Select The Seating Capacity'}
                                                    name={"v_seating_cpcty"}
                                                    stateData={seatingtype}
                                                    setStateData={setseatingtype}
                                                    options={Seating}
                                                    arrayData={Vehicledetails?.vehicles}
                                                    issubmit={issubmit}
                                                    inputerror={"Please select the seating capasity"}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Grid item xs={5} sx={{ marginTop: "2em" }}>
                                        <RadioComponent
                                            label={"IS ACTIVE"}
                                            data={isActive}
                                            values={values.is_active}
                                            setData={setIsactive}
                                        />

                                    </Grid>
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
                                            variant='contained' type='submit' color='primary' onClick={handleclick}>Submit</Button>
                                    </ThemeProvider>
                                </Box>
                            </Grid>
                        </form>
                    } </Formik>
            </Box>
        </>
    )
}

export default ViewVehicleDetails

const Seating = [
    { v_seating_cpcty: '4', label: '4', value: '4' },
    { v_seating_cpcty: '6', label: '6', value: '6' },
    { v_seating_cpcty: '7', label: '7', value: '7' }
]