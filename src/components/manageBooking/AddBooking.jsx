// import React, { useEffect, useState } from 'react'
// import { Box, createTheme, Grid, Icon, Typography, Button, ThemeProvider } from '@mui/material'
// import * as yup from "yup";
// import Swal from "sweetalert2";
// import {createVehicleType } from '../redox/reducer/vehicleSlice'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import TextFieldComponent from '../../utils/TextFieldComponent';
// import { Formik } from 'formik';
// import ImageHover from '../../utils/Imagehover';
// import DropzoneExample from '../../utils/DropZoneExample';


// const AddBookingType = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch();
//   const [VehiclePhoto, setVehiclePhoto] = useState();

//   const initialValues = {
//     v_type: '',
//   }

//   const checkoutSchema = yup.object().shape({
//     v_type: yup.string().required("required")
//   });

//   const handleFormSubmit = async (values, { resetForm }) => {
//     const data = {
//       v_type: values.v_type,
//     }
//     const formdata = new FormData()
//     formdata.append('json', JSON.stringify(data))
//     formdata.append('vTypePic', VehiclePhoto)

//     const response = await dispatch(createVehicleType(formdata))
//     if (response) {
//       Swal.fire({
//         title: "Vehicle Type Added Successfully!",
//         icon: "success",
//         showConfirmButton: true,
//         allowOutsideClick: false,
//         allowEscapeKey: false,
//       }).then((result) => {
//         if (result.isConfirmed) { 
//           // navigate("shareTrip/ManageVehicleType")
//           navigate(-1)
//         }
//       })
//     }
//   }

//   const handleback = () => {
//     navigate(-1);
//   }
//   const btnTheme = createTheme({
//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             fontSize: '1rem',
//             backgroundColor: '#08086b',
//             color: 'white',
//             "&:hover": {
//               backgroundColor: '#09776b'
//             }
//           }
//         }
//       }
//     }
//   })
//   return (
//     <>
//       <Box p={'2'} bgcolor={'white'}>
//         <div>
//           <Typography variant='h6' color={'black'} fontWeight={'bold'}>Add Booking Type</Typography>
//         </div>
//       </Box>
//       <Formik
//         onSubmit={handleFormSubmit}
//         initialValues={initialValues}
//         validationSchema={checkoutSchema}
//         enableReinitialize
//       >{({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={5} padding={'20px'}>
//             <Grid item xs={6}>
//               <TextFieldComponent
//                 label={'Vehicle Type'}
//                 name={'v_type'}
//                 values={values.v_type}
//                 errors={errors.v_type}
//                 touched={touched.v_type}
//                 handleBlur={handleBlur}
//                 handleChange={handleChange} />
//             </Grid>
//             <Grid item xs={6}>
//               {values.v_logo && (<ImageHover values={values.v_logo} />)}
//               <DropzoneExample
//                 title={'The Vehicle Photo must be in JPEG,JPG or PNG format Photo'}
//                 content={"Vehicle Photo"}
//                 setlocationimage={setVehiclePhoto} />
//             </Grid>
//           </Grid>
//           <Box
//             sx={{
//               width: "100%",
//               display: "flex",
//               justifyContent: "space-between",
//               marginTop: "25px",
//               padding: "25px",
//             }}
//           >
//             <ThemeProvider theme={btnTheme}>
//               <Button
//                 variant="contained"
//                 // icon={<ArrowBack />}
//                 onClick={handleback}
//               >
//                 Back
//               </Button>
//             </ThemeProvider>
//             <ThemeProvider theme={btnTheme}>

//               <Button

//                 variant="contained"
//                 type="submit"
//                 color="primary"
//                 sx={{ fontSize: "15px", padding: "10px 60px" }}
//               >
//                 Submit
//               </Button>
//             </ThemeProvider>
//           </Box>
//         </form>
//       )}

//       </Formik>

//     </>
//   )
// }

// export default AddBookingType;