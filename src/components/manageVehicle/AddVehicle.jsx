import { Typography, Box, Grid, ThemeProvider, Button, createTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextFieldComponent from '../../utils/TextFieldComponent'
import { Formik } from 'formik'
import VehicleTypeDropDown from '../../utils/VehicleTypeDropdown'
import SeatingCapacityDropDown from '../../utils/SeatingCapacityDrop'
import DropzoneExample from '../../utils/DropZoneExample'
import * as yup from "yup";
import createVehicleName, { getallVehicleType, getseatingcapasitydropdown, getUniqueSeatingDropdown, getVehicleType } from '../redox/reducer/vehicleSlice'
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SeatingTypeCapasityDropdown from '../../utils/SeatingTypeCapasityDropdown'

const AddVehicle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const seatingcapdropdown = useSelector(getUniqueSeatingDropdown)
  const VehicleTypeData = useSelector(getVehicleType)

  console.log("seatingcapdropdown==>", seatingcapdropdown)

  const [issubmit, setissubmit] = useState(null);
  const [vehicleType, setVehicleType] = useState();
  const [seatingType, setSeatingType] = useState();
  const [vehiclepic, setVehiclePic] = useState();
  const [vehicleicon, setVehicleIcon] = useState();

  const initialValues = {
    v_name: "",
    vehicle_dropdown: "",
    seating_capacity: "",
    v_make: ""
  }

  const checkoutSchema = yup.object().shape({
    v_name: yup.string().required('Required'),
  })

  const handleFormSubmit = async (values, { resetForm }) => {
    const data = {
      v_name: values.v_name,
      vehicle_dropdown: vehicleType ? vehicleType.id : null,
      seating_capacity: seatingType.seating_capacity,
      v_make: values.v_make
    }

    const formdata = new FormData()
    form.append("json", JSON.stringify(data))
    if (Array.isArray(vehiclepic) && vehiclepic.length > 0) {
      form.append("v_pic", vehiclepic[0])
    }
    if (Array.isArray(vehicleicon) && vehicleicon.length > 0) {
      form.append("v_logo", vehicleicon[0])
    }

    const response = await dispatch(createVehicleName(formdata))
    if (response) {
      Swal.fire({
        title: "Vehicle Added Successfully!",
        icon: "success",
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,

      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/shareTrip/ManageVehicle")
        }
      })
    }
  }

  const butttheme = createTheme({
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: "1rem",
            backgroundColor: "#08086b",
            "&:hover": {
              backgroundColor: "#08086b",
            },
          },
        },
      },
    },
  });

  const SEATING_CAPACITY_FIELD_NAME = "v_seating_cpcty";
  useEffect(() => {
    dispatch(getallVehicleType())
    dispatch(getseatingcapasitydropdown(SEATING_CAPACITY_FIELD_NAME))
  }, [dispatch])
  const handleback = () => {
    navigate(-1)
  }
  const handleClick = () => {
    setissubmit(true)
  }
  return (
    <>
      <Box p={2} bgcolor={'white'}>
        <div>
          <Typography variant='h6' color={'black'} fontWeight={'bold'}>Add Vehicle Details</Typography>
        </div>
      </Box>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit
          }) =>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={5} padding={'20px'}>
                <Grid item xs={6} >
                  <TextFieldComponent
                    label={'Vehicle Name'}
                    name={'vehicle_name'}
                    values={values.vehicle_name}
                    errors={errors.vehicle_name}
                    touched={touched.vehicle_name}
                    handleBlur={handleBlur}
                    handleChange={handleChange} />
                </Grid>
                <Grid item xs={6} >
                  <VehicleTypeDropDown
                    label={'Vehicle DropDown'}
                    name={'vehicle_type'}
                    options={VehicleTypeData}
                    stateData={vehicleType}
                    setStateData={setVehicleType}
                    issubmit={issubmit}
                    inputerror={"please selact the vehicle type"}
                  />
                </Grid>
                <Grid item xs={6}>
                  
                  <SeatingTypeCapasityDropdown
                    label={'Seating_capacity DropDown'}
                    name={'seating_capacity'}
                    options={seatingcapdropdown}
                    stateData={seatingType}
                    setStateData={setSeatingType}
                    issubmit={issubmit}
                    inputerror={"please selact the seating type"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldComponent
                    label="Vehicle Make"
                    name="v_make"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values.v_make}
                    errors={errors.v_make}
                    touched={touched.v_make}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DropzoneExample
                    title={"The Vehicle Photo must be in JPEG,JPG or PNG format Photo"}
                    content={"vehicle Photo"}
                    setlocationimage={setVehiclePic} />
                </Grid>
                <Grid item xs={6}>
                  <DropzoneExample
                    title={"The Vehicle Icon must be in JPEG,JPG or PNG format Photo"}
                    content={"vehicle Icon"}
                    setlocationimage={setVehicleIcon} />
                </Grid>
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
                <ThemeProvider theme={butttheme}>
                  <Button
                    variant="contained"
                    // icon={<ArrowBack />}
                    onClick={handleback}
                  >
                    Back
                  </Button>
                </ThemeProvider>
                <ThemeProvider theme={butttheme}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    onClick={handleClick}
                    sx={{ fontSize: "15px", padding: "10px 60px" }}
                  >
                    Submit
                  </Button>
                </ThemeProvider>
              </Box>
            </form>}
        </Formik>
      </Box>
    </>
  )
}

export default AddVehicle
