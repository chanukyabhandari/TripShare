
import { Box, TextField, Typography, Button, InputLabel, checkboxClasses, InputAdornment, IconButton } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import React from 'react'
import TextFieldComponent from '../../utils/TextFieldComponent'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup";
import { loginAPI } from '../redox/reducer/authslicer'
import Swal from 'sweetalert2';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const passwordhideshow = () => {
    setShow(!show);
  };
  const initialValues = {
    u_mob_num: "",
    u_pswd: "",
  }
  const CheckOutSchema = yup.object().shape({
    u_mob_num: yup.number().typeError('Must be a number')
      .min(1000000000, "Not Valid Phone Number!")
      .max(9999999999, "Not Valid Phone Number!")
      .required("Required*"),
    u_pswd: yup.string().required("Required*")
  });
  const handleFormSubmit = async (values, { resetForm }) => {
    const data = {
      u_mob_num: values.u_mob_num,
      u_pswd: values.u_pswd,
    };
    // if (data) {
    //   Swal.fire({
    //     title: 'Login failed!',
    //     text: `hello user`,
    //     icon: 'success',
    //     showConfirmButton: true,
    //     allowOutsideClick: false,
    //     allowEscapeKey: false,

    //   })
    //   navigate("./Dashboard")
    // }

    const response = await dispatch(loginAPI(data))
    if (response.payload) {
      if (response.payload.success === "false") {
        Swal.fire({
          title: 'Login failed!',
          text: `${response.payload.message}`,
          icon: 'error',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } else
        await localStorage.setItem("shareTrip", response.payload.token);
      Swal.fire({
        title: 'Login succesfull',
        text: "Welcome to shareTrip application",
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/shareTrip')
        }
      });
    }
  }
  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={CheckOutSchema}
          enableReinitialize
        >{({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "2em",
              p: 1,
              position: "sticky",
              top: "2.7em",
              bottom: "2.5em",
              // zIndex: 99,
              bgcolor: "white",
              marginBottom: "2em",
            }}>
              <Typography sx={{ color: "#08086b", fontFamily: "serif", fontSize: "1.5em" }}>Welcome to Share-trip</Typography>
            </Box>
            <Box sx={{
              boxShadow: "0px 0px 16px 11px rgba(169, 169, 169, 0.27)",
              border: '1px solid #ddd',
              borderRadius: "3%",
              width: "450px",
              height: "330px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{
                marginTop: "22px",
                width: "380px",
                height: "35px",
              }}>
                <TextFieldComponent
                  label={"Phone Number*"}
                  placeholder={"Enter your phone number"}
                  name="u_mob_num"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values.u_mob_num}
                  errors={errors.u_mob_num}
                  touched={touched.u_mob_num} />
              </div>
              <div style={{
                width: "380px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "3em",
              }}>
                <TextField
                  label="Password*"
                  margin='dense'
                  name='u_pswd'
                  autoComplete='on'
                  type={show ? "text" : "password"}
                  id='u_pswd'
                  placeholder='your password'
                  value={values.u_pswd}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.u_pswd && !!errors.u_pswd}
                  helperText={touched.u_pswd && errors.u_pswd}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={passwordhideshow}>
                          {show ? <MdVisibility /> : <MdVisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                ></TextField>
              </div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                  style={{
                    background: "#08086b",
                    width: "150px",
                    marginLeft: "22px",
                  }}
                >
                  Log in
                </Button>
              </Box>
            </Box>
          </form>
        )}

        </Formik>
      </Box>
    </>
  )
}

export default Login