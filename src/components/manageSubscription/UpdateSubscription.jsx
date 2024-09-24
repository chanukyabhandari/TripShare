import React, { useEffect, useState } from 'react'
import { getSingleSubscription, getUniqueSubscriptionData, updateSubscription } from '../redox/reducer/subscription';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from "yup";
import Swal from "sweetalert2";
import { Box, Button, createTheme, Divider, Grid, ThemeProvider, Typography } from '@mui/material';
import { Formik } from 'formik';
import TextFieldComponent from '../../utils/TextFieldComponent';
import RadioComponent from '../../utils/RadioComponets';

const UpdateSubscription = () => {
  const { sid } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const SubscriptionData = useSelector(getUniqueSubscriptionData)
  const [isActive, setisactive] = useState(true);
  console.log("SubscriptionData", SubscriptionData)

  const initialValues = {
    plan_name: "",
    plan_price: "",
    plan_validity: "",
    plan_details: ""
  }
  const checkoutSchema = yup.object().shape({
    plan_price: yup.number().typeError('Must be Number'),
    plan_validity: yup.number().typeError('Must be Number'),
  })
  const handleFormSubmit = async (values, { resetFrom }) => {
    const data = {
      id: values.id,
      plan_name: values.plan_name,
      plan_price: values.plan_price,
      plan_validity: values.plan_validity,
      plan_details: values.plan_details,
      is_active: isActive !== false ? isActive : values.is_active
    }
console.log("data==>",data)
    const response = await dispatch(updateSubscription(data))
    if (response) {
      Swal.fire({
        title: "Subscription Updated Succesfully!",
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

  useEffect(() => {
    dispatch(getSingleSubscription(sid))
  }, [dispatch])

  useEffect(() => {
    if (SubscriptionData) {
      setisactive(SubscriptionData.is_active)
    }
  }, [SubscriptionData])

  return (
    <>
      <Box p={2} bgcolor={'white'} >
        <div>
          <Typography variant='h6' fontWeight={'bold'} color={'black'}>Update Subscription</Typography>
        </div>
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={SubscriptionData && sid ? SubscriptionData : initialValues}
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
                  proId={sid}
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
              <Grid item xs={6}>
                <RadioComponent
                  label={"Is Active"}
                  data={isActive}
                  values={values.is_active}
                  setData={setisactive}
                />
              </Grid >
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

export default UpdateSubscription