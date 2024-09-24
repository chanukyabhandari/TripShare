import { Box, Button, createTheme, Divider, Grid, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TextFieldComponent from '../../utils/TextFieldComponent'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleSubscriptionDetails, getUniqueObSubscriptionDetailsData } from '../redox/reducer/UserDetails'
import { TbRubberStampOff } from 'react-icons/tb'
import RadioComponent from '../../utils/RadioComponets'

const EditSubscription = () => {
    const { suid } = useParams();
    console.log("suid", suid)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isActive, setisactive] = useState(true)
    const ObSubscriptionData = useSelector(getUniqueObSubscriptionDetailsData);
    console.log("ObSubscriptionData==>", ObSubscriptionData)
    // console.log(ObSubscriptionData?.User?.u_name)

    const initialValues = {

    }

    const handleFormSubmit = async (values) => {
        data = {

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
        navigate(-1)
    }

    useEffect(() => { dispatch(getSingleSubscriptionDetails(suid)) }, [dispatch])
    return (
        <>
            <Box p={2}>
                <Typography variant='h6' fontWeight={'bold'} >Edit User Subscription</Typography>
            </Box>
            <Box p={2}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={ObSubscriptionData && suid ? ObSubscriptionData : initialValues}
                    // validationSchema={ }
                    enableReinitialize
                >{({ values, errors, touched, handleBlur, handleChange, handlesubmit }) =>
                    <form onSubmit={handlesubmit}>
                        <Grid container spacing={5}>
                            <Grid item xs={4}>
                                <TextFieldComponent
                                    label={"User Name"}
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
                                    label={"User Role"}
                                    name={"role_name"}
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
                                    label={"User Phone Number"}
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
                                <Divider></Divider>
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldComponent
                                    label={"Plan Name"}
                                    name={"plan_name"}
                                    values={values.subscriptionPlan?.plan_name}
                                    errors={errors.subscriptionPlan?.plan_name}
                                    touched={touched.subscriptionPlan?.plan_name}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldComponent
                                    label={"Payment Type"}
                                    name={"payment_type"}
                                    proId={true}
                                    values={values.payments?.payment_type}
                                    errors={errors.payments?.payment_type}
                                    touched={touched.payments?.payment_type}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldComponent
                                    label={"Plan Validity"}
                                    name={"plan_validity"}
                                    proId={true}
                                    values={values.subscriptionPlan?.plan_validity}
                                    errors={errors.subscriptionPlan?.plan_validity}
                                    touched={touched.subscriptionPlan?.plan_validity}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldComponent
                                    label={"Plan Price"}
                                    name={"plan_price"}
                                    proId={true}
                                    values={values.subscriptionPlan?.plan_price}
                                    errors={errors.subscriptionPlan?.plan_price}
                                    touched={touched.subscriptionPlan?.plan_price}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldComponent
                                    label={"Subscription start Date"}
                                    name={"subscription_start_date"}
                                    proId={true}
                                    values={values.subscription_start_date}
                                    errors={errors.subscription_start_date}
                                    touched={touched.subscription_start_date}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldComponent
                                    label={"Subscription End Date"}
                                    name={"subscription_end_date"}
                                    proId={true}
                                    values={values.subscription_end_date}
                                    errors={errors.subscription_end_date}
                                    touched={touched.subscription_end_date}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextFieldComponent
                                    label={"Subscription Status"}
                                    name={"subscription_status"}
                                    values={values.subscription_status}
                                    errors={errors.subscription_status}
                                    touched={touched.subscription_status}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <RadioComponent
                                    label={"IS ACTIVE"}
                                    data={isActive}
                                    values={values.is_active}
                                    setData={setisactive}
                                />
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
                    }  </Formik>
            </Box>
        </>
    )
}

export default EditSubscription