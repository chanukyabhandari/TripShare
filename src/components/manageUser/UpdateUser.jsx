import { ThemeProvider } from '@emotion/react';
import { Box, createTheme, Divider, Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Formik } from 'formik';
import { getUniqueUserData, getSingleUserData, updateuser } from '../redox/reducer/useSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from "yup";
import Swal from "sweetalert2";
import TextFieldComponent from '../../utils/TextFieldComponent';
import DropzoneExample from '../../utils/DropZoneExample';
import ImageHover from '../../utils/Imagehover';
import RadioComponent from '../../utils/RadioComponets';

const UpdateUser = () => {
  const { uid } = useParams()
  console.log("uid==>", uid)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userPhoto, setUserPhoto] = useState();
  const [isActive, setisActive] = useState(true);
  const userData = useSelector(getUniqueUserData)
  console.log("userData===>", userData)
  const initialValues = {
    id: "",
    u_name: "",
    u_email_id: "",
    u_mob_num: "",
    u_pswd: "",
  }
  const checkoutSchema = yup.object().shape({
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    const data = {
      id: values.id,
      u_name: values.u_name,
      u_email_id: values.u_email_id,
      u_mob_num: values.u_mob_num,
      is_active: isActive !== false ? isActive : values.is_active,
    }

    const formData = new FormData()
    formData.append('json', JSON.stringify(data))
    console.log(userPhoto)
    if (Array.isArray(userPhoto) && userPhoto.length > 0) {
      formData.append('profile', userPhoto[0])
    }
    // console.log('data', data)
    // console.log('formdata', formdata)
    const response = await dispatch(updateuser(formData))
    if (response) {
      Swal.fire({
        title: "User Updated Successfully!",
        icon: "success",
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/shareTrip/ManageUser')
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
  useEffect(() => {
    dispatch(getSingleUserData(uid))
  }, [dispatch])
  return (
    <>
      <Box p={2} bgcolor={'white'} >
        <div>
          <Typography variant='h6' fontWeight={'bold'} color={'black'}>Edit user Details</Typography>
        </div>
        <Box>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={userData && uid ? userData : initialValues}
            validationSchema={checkoutSchema}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={5} p='20px'>
                  <Grid item xs={6}>
                    <TextFieldComponent
                      label={'User ID'}
                      name={'id'}
                      proId={uid}
                      values={values.id}
                      errors={errors.id}
                      handleBlur={handleBlur}
                      handleChange={handleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider>Editable fields</Divider>
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldComponent
                      label={'User Name'}
                      name={'u_name'}
                      values={values.u_name}
                      errors={errors.u_name}
                      touched={touched.u_name}
                      handleBlur={handleBlur}
                      handleChange={handleChange} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldComponent
                      label={' User Email Id'}
                      name={'u_email_id'}
                      values={values.u_email_id}
                      errors={errors.u_email_id}
                      touched={touched.u_email_id}
                      handleBlur={handleBlur}
                      handleChange={handleChange} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldComponent
                      label={' User Mobile Number'}
                      name={'u_mob_nume'}
                      values={values.u_mob_num}
                      errors={errors.u_mob_num}
                      touched={touched.u_mob_num}
                      handleBlur={handleBlur}
                      handleChange={handleChange} />
                  </Grid>
                  <Grid item xs={6}>
                    {values.u_profile_pic && (

                      <ImageHover values={values.u_profile_pic} />
                    )
                    }
                    <DropzoneExample
                      title={"The User Photo must be in JPEG,JPG or PNG format Photo"}
                      content={"User Photo"}
                      setlocationimage={setUserPhoto}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider>Driver Emergency Details</Divider>
                  </Grid>
                  <Grid item xs={12}>
                    <Box border={"1px solid black"} padding={'2em'} borderRadius={'.5em'}>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <TextFieldComponent
                            label={'Emergency Mobile Number1'}
                            name={'u_emergency_num1'}
                            values={values.u_emergency_num1}
                            errors={errors.u_emergency_num1}
                            touched={touched.u_emergency_num1}
                            handleBlur={handleBlur}
                            handleChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                          <TextFieldComponent
                            label={'Emergency Mobile Number2'}
                            name={'u_emergency_num2'}
                            values={values.u_emergency_num2}
                            errors={errors.u_emergency_num2}
                            touched={touched.u_emergency_num2}
                            handleBlur={handleBlur}
                            handleChange={handleChange} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioComponent
                      label={"IS ACTIVE"}
                      data={isActive}
                      values={values.is_active}
                      setData={setisActive}
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
                      variant='contained' type='submit' color='primary' >Submit</Button>
                  </ThemeProvider>
                </Box>
              </form>
            )
            }
          </Formik>
        </Box>
      </Box>
    </>
  )
}

export default UpdateUser




// import {
//   Box,
//   Button,
//   createTheme,
//   Divider,
//   Grid,
//   ThemeProvider,
//   Typography,
// } from "@mui/material";
// import { Formik } from "formik";
// import React, { useEffect, useState } from "react";
// import * as yup from "yup";
// import { ArrowBack } from "@mui/icons-material";
// import { useNavigate, useParams } from "react-router-dom";
// import TextFieldComponent from "../../utils/TextFieldComponent";
// import { useDispatch, useSelector } from "react-redux";
// import DropzoneExample from "../../utils/DropZoneExample";
// import ImageHover from "../../utils/ImageHover";
// import { getSingleUserData, getUniqueUserData, updateSingleUserData } from "../../redux/reducer/userSlice";
// import Swal from "sweetalert2";

// const UpdateUser = () => {
//   const { uid } = useParams()
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [userPhoto, setUserPhoto] = useState()
//   const userData = useSelector(getUniqueUserData)
//   console.log("userData==>", userData)
//   const initialValues = {
//       id: "",
//       u_name: "",
//       u_email_id: "",
//       u_mob_num: "",
//       u_pswd: "",
//   };
//   const checkoutSchema = yup.object().shape({

//   });
//   const handleFormSubmit = async (values, { resetForm }) => {
//       const data = {
//           id: values.id,
//           u_name: values.u_name,
//           u_email_id: values.u_email_id,
//           u_mob_num: values.u_mob_num,
//       };
//       const formData = new FormData()
//       formData.append("json", JSON.stringify(data))
//       if (Array.isArray(userPhoto) && userPhoto.length > 0) {
//           formData.append("profile", userPhoto[0])
//       };
//       console.log("data==>", data)
//       console.log("formdata==>", formData)
//       const response = await dispatch(updateSingleUserData(formData))
//       if (response) {
//           Swal.fire({
//               title: "User Updated Successfully!",
//               icon: "success",
//               showConfirmButton: true,
//               allowOutsideClick: false,
//               allowEscapeKey: false,
//           }).then((result) => {
//               if (result.isConfirmed) {
//                   navigate("/shareTrip/ManageUser");
//               }
//           });
//       }
//   }
//   const handleback = () => {
//       navigate(-1);
//   };
//   const butttheme = createTheme({
//       components: {
//           // Name of the component
//           MuiButton: {
//               styleOverrides: {
//                   // Name of the slot
//                   root: {
//                       // Some CSS
//                       fontSize: "1rem",
//                       backgroundColor: "#08086b",
//                       "&:hover": {
//                           backgroundColor: "#08086b",
//                       },
//                   },
//               },
//           },
//       },
//   });

//   const backTheme = createTheme({
//       components: {
//           // Name of the component
//           MuiButton: {
//               styleOverrides: {
//                   // Name of the slot
//                   root: {
//                       // Some CSS
//                       fontSize: "1rem",
//                       backgroundColor: "#08086b",
//                       "&:hover": {
//                           backgroundColor: "#08086b",
//                       },
//                   },
//               },
//           },
//       },
//   });
//   useEffect(() => {
//       dispatch(getSingleUserData(uid))
//   }, [dispatch])
//   return (
//       <>
//           <Box padding={2} bgcolor={"white"}>
//               <div>
//                   <Typography variant="h6" color={"#010745"} fontWeight={"bold"}>
//                       Edit User Detail
//                   </Typography>
//               </div>
//               <Box>
//                   <Formik
//                       onSubmit={handleFormSubmit}
//                       initialValues={userData && uid ? userData : initialValues}
//                       validationSchema={checkoutSchema}
//                       enableReinitialize
//                   >
//                       {({
//                           values,
//                           errors,
//                           touched,
//                           handleBlur,
//                           handleChange,
//                           handleSubmit,
//                       }) => (
//                           <form onSubmit={handleSubmit}>
//                               <Grid container spacing={5} p="20px">
//                                   <Grid item xs={6}>
//                                       <TextFieldComponent
//                                           proId={uid}
//                                           name="id"
//                                           label={"User ID"}
//                                           values={values.id}
//                                           errors={errors.id}
//                                           touched={touched.id}
//                                           handleBlur={handleBlur}
//                                           handleChange={handleChange}
//                                       />
//                                   </Grid>
//                                   <Grid item xs={12}>
//                                       <Divider>Editable Fields</Divider>
//                                   </Grid>
//                                   <Grid item xs={6}>
//                                       <TextFieldComponent
//                                           name="u_name"
//                                           label={"User Name"}
//                                           values={values.u_name}
//                                           errors={errors.u_name}
//                                           touched={touched.u_name}
//                                           handleBlur={handleBlur}
//                                           handleChange={handleChange}
//                                       />
//                                   </Grid>
//                                   <Grid item xs={6}>
//                                       <TextFieldComponent
//                                           label="User Email"
//                                           name="u_email_id"
//                                           handleChange={handleChange}
//                                           handleBlur={handleBlur}
//                                           values={values.u_email_id}
//                                           errors={errors.u_email_id}
//                                           touched={touched.u_email_id}
//                                       />
//                                   </Grid>
//                                   <Grid item xs={6}>
//                                       <TextFieldComponent
//                                           label="User Phone Number"
//                                           name="u_mob_num"
//                                           handleChange={handleChange}
//                                           handleBlur={handleBlur}
//                                           values={values.u_mob_num}
//                                           errors={errors.u_mob_num}
//                                           touched={touched.u_mob_num}
//                                       />
//                                   </Grid>
//                                   <Grid item xs={6}>
//                                       {values.u_profile_pic && (

//                                           <ImageHover values={values.u_profile_pic} />
//                                       )
//                                       }
//                                       <DropzoneExample
//                                           title={"The User Photo must be in JPEG,JPG or PNG format Photo"}
//                                           content={"User Photo"}
//                                           setlocationimage={setUserPhoto}
//                                       />
//                                   </Grid>
//                               </Grid>
//                               <Box
//                                   sx={{
//                                       width: "100%",
//                                       display: "flex",
//                                       justifyContent: "space-between",
//                                       marginTop: "25px",
//                                       padding: "25px",
//                                   }}
//                               >
//                                   <ThemeProvider theme={backTheme}>
//                                       <Button
//                                           variant="contained"
//                                           icon={<ArrowBack />}
//                                           onClick={handleback}
//                                       >
//                                           Back
//                                       </Button>
//                                   </ThemeProvider>
//                                   <ThemeProvider theme={butttheme}>
//                                       <Button
//                                           variant="contained"
//                                           type="submit"
//                                           color="primary"
//                                           sx={{ fontSize: "15px", padding: "10px 60px" }}
//                                       >
//                                           Submit
//                                       </Button>
//                                   </ThemeProvider>
//                               </Box>
//                           </form>
//                       )}
//                   </Formik>
//               </Box >
//           </Box>
//       </>
//   )
// }

// export default UpdateUser