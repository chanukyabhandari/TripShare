import React from 'react'
import { createSubscription } from '../redox/reducer/subscription';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, createTheme, Grid, ThemeProvider, Typography } from '@mui/material';
import { Formik } from 'formik';
import TextFieldComponent from '../../utils/TextFieldComponent';
import * as yup from "yup";
import Swal from "sweetalert2";

const AddSubscription = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const initialValues = {
    plan_name: "",
    plan_price: "",
    plan_validity:"",
    plan_details:""
  }
  const checkoutSchema = yup.object().shape({
    plan_price: yup.number().typeError('Must be Number'),
    plan_validity: yup.number().typeError('Must be Number'),
  })
  const handleFormSubmit = async (values, { resetFrom }) => {
    const data = {
      plan_name: values.plan_name,
      plan_price: values.plan_price,
      plan_validity: values.plan_validity,
      plan_details: values.plan_details,
    }

    const response = await dispatch(createSubscription(data))
    if (response) {
      Swal.fire({
        title: "Subscription Added Succesfully!",
        icon: "success",
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/shareTrip/ManageSubscription')
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
                <TextFieldComponent
                  label={'Plan Name'}
                  name='plan_name'
                  values={values.plan_name}
                  errors={errors.plan_name}
                  touched={touched.plan_name}
                  handleBlur={handleBlur}
                  handleChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextFieldComponent
                  label={'Price in INR'}
                  name='plan_price'
                  values={values.plan_price}
                  errors={errors.plan_price}
                  touched={touched.plan_price}
                  handleBlur={handleBlur}
                  handleChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextFieldComponent
                  label={'Validity in Days'}
                  name='plan_validity'
                  values={values.plan_validity}
                  errors={errors.plan_validity}
                  touched={touched.plan_validity}
                  handleBlur={handleBlur}
                  handleChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextFieldComponent
                  desc={2}
                  label={'Plan Details'}
                  name='plan_details'
                  values={values.plan_details}
                  errors={errors.plan_details}
                  touched={touched.plan_details}
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

export default AddSubscription