import React, { useEffect, useState } from 'react'
import { Box, createTheme, Divider, Grid, Icon, Typography, Button, ThemeProvider } from '@mui/material'
import * as yup from "yup";
import Swal from "sweetalert2";
import { getallVehicleType, getVehicleType, getUniqueVehicleName, getSingleVehicleName, updateallVehicleName, getUniqueSeatingDropdown, getseatingcapasitydropdown } from '../redox/reducer/vehicleSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import TextFieldComponent from '../../utils/TextFieldComponent';
import { Formik } from 'formik';
import SeatingCapacityDropDown from '../../utils/SeatingCapacityDrop';
import VehicleTypeDropDown from '../../utils/VehicleTypeDropdown';
import ImageHover from '../../utils/Imagehover';
import DropzoneExample from '../../utils/DropZoneExample';
import SeatingTypeCapasityDropdown from '../../utils/SeatingTypeCapasityDropdown';


const UpdateVehicle = () => {
  const { vid } = useParams();
  console.log("vid==>", vid)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [userPhoto, setUserPhoto] = useState();

  const singleVehicledata = useSelector(getUniqueVehicleName)
  const VehicleTypeData = useSelector(getVehicleType)
  // console.log("VehicleTypeData", VehicleTypeData)
  const seatingcapdropdown = useSelector(getUniqueSeatingDropdown)
  console.log("seatingcapdropdown", seatingcapdropdown)

  console.log("singleVehicledata==>", singleVehicledata)
  const [seatingType, setseatingType] = useState();
  console.log("seatingType==>", seatingType)
  const [vehicleType, setvehicleType] = useState();
  const [VehiclePic, setVehiclePic] = useState();
  const [VehicleIcon, setVehicleIcon] = useState();


  const [issubmit, setissubmit] = useState(null);

  const handleClick = () => {
    setissubmit(true)
  }
  useEffect(() => {
    if (singleVehicledata && singleVehicledata.vehicleType?.v_type) {
      setvehicleType(singleVehicledata.vehicleType?.v_type)
    }
  }, [dispatch, singleVehicledata])
  const initialValues = {
    v_name: '',
    vehicle_types_id: '',
    v_make: '',
    seating_capacity: ''
  }

  const checkoutSchema = yup.object().shape({
    v_name: yup.string().required("required")
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    const data = {
      id: values.id,
      v_name: values._name,
      vehicle_types_id: vehicleType ? vehicleType.id : singleVehicledata.vehicle_types_id,
      v_make: values.v_make,
      seating_capacity: seatingType.seating_capacity

    }
    const formdata = new FormData()
    formdata.append('json', JSON.stringify(data))
    // console.log('userPhoto')
    if (Array.isArray(userPhoto) && userPhoto.length > 0) {
      formdata.append('profile', userPhoto[0])
    }

    const response = await dispatch(updateallVehicleName(formdata))
    if (response) {
      Swal.fire({
        title: "Vehicle Updated Successfully!",
        icon: "success",
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          // navigate("shareTrip/ManageVehicle")
          navigate(-1)
        }
      })
    }
  }

  const handleback = () => {
    navigate(-1);
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
  const SEATING_CAPACITY_FIELD_NAME = "v_seating_cpcty";
  useEffect(() => {
    dispatch(getSingleVehicleName(vid))
    dispatch(getallVehicleType())
    dispatch(getseatingcapasitydropdown(SEATING_CAPACITY_FIELD_NAME))
  }, [dispatch])
  useEffect(() => {
    if (singleVehicledata && seatingcapdropdown.length > 0) {
      const matchingseatingcap = seatingcapdropdown.find(
        (cap) => cap.field_value === singleVehicledata.seating_capacity
      );
      if (matchingseatingcap) {
        setseatingType(matchingseatingcap)
      }
      else {
        setseatingType(null);
      }
    }
  }, [singleVehicledata, seatingcapdropdown])
  return (
    <>
      <Box p={'2'} bgcolor={'white'}>
        <div>
          <Typography variant='h6' color={'black'} fontWeight={'bold'}>Update Vehicle</Typography>
        </div>
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={singleVehicledata && vid ? singleVehicledata : initialValues}
        validationSchema={checkoutSchema}
        enableReinitialize
      >{({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5} padding={'20px'}>
            <Grid item xs={6}>
              <TextFieldComponent
                label={'Vehicle id'}
                name={'id'}
                proId={vid}
                values={values.id}
                errors={errors.id}
                handleBlur={handleBlur}
                handleChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <Divider>Editable Fields</Divider>
            </Grid>
            <Grid item xs={6}>
              <TextFieldComponent
                label={'Vehicle Name'}
                name={'v_name'}
                values={values.v_name}
                errors={errors.v_name}
                touched={touched.v_name}
                handleBlur={handleBlur}
                handleChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextFieldComponent
                label={'Vehicle make'}
                name={'v_make'}
                values={values.v_make}
                errors={errors.v_make}
                touched={touched.v_make}
                handleBlur={handleBlur}
                handleChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <VehicleTypeDropDown
                name={'v_type'}
                label={'Select the Vehicle Type'}
                stateData={vehicleType}
                setStateData={setvehicleType}
                options={VehicleTypeData}
                arrayData={singleVehicledata.vehicleType}
                issubmit={issubmit}
                inputerror={'Please select the vehicle type'}
              />
            </Grid>
            <Grid item xs={6}>
              <SeatingTypeCapasityDropdown
                name={'seating_capacity'}
                label={'Select the Seating Capacity'}
                stateData={seatingType}
                setStateData={setseatingType}
                options={seatingcapdropdown}
                arrayData={singleVehicledata}
                issubmit={issubmit}
                inputerror={'Please select the seating capacity'}
              />
            </Grid>
            <Grid item xs={6}>
              {values.v_pic && (<ImageHover values={values.v_pic} />)}
              <DropzoneExample
                title={'The Vehicle Photo must be in JPEG,JPG or PNG format Photo'}
                content={"Vehicle Photo"}
                setlocationimage={setVehiclePic} />
            </Grid>
            <Grid item xs={6}>
              {values.v_logo && (<ImageHover values={values.v_logo} />)}
              <DropzoneExample
                title={'The Vehicle Icon Photo must be in JPEG,JPG or PNG format Photo'}
                content={"Vehicle Icon"}
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
                onClick={handleClick}
                sx={{ fontSize: "15px", padding: "10px 60px" }}
              >
                Submit
              </Button>
            </ThemeProvider>
          </Box>
        </form>
      )}

      </Formik>

    </>
  )
}

export default UpdateVehicle

const Seating = [
  { seating_capacity: '4+1', label: '4+1', value: '4+1' },
  { seating_capacity: '6+1', label: '6+1', value: '6+1' },
  { seating_capacity: '7+1', label: '7+1', value: '7+1' }
]