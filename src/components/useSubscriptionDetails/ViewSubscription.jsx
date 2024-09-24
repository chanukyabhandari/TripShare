import { Box, Button, createTheme, Divider, Grid, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import * as yup from "yup";
import Swal from "sweetalert2";
import TextFieldComponent from '../../utils/TextFieldComponent'
import { useNavigate, useParams } from 'react-router-dom'
import TableWithoutAdd from '../../utils/TableWithoutAdd'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik';
import { getSingleSubscriptionDetails, getUniqueObSubscriptionDetailsData, getUniqueSubscriptionDetailsData } from '../redox/reducer/UserDetails';

const ViewSubscription = () => {
    const { sid } = useParams();
    console.log("sid", sid)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ObSubscriptionData = useSelector(getUniqueObSubscriptionDetailsData);
    const SubscriptionData = useSelector(getUniqueSubscriptionDetailsData);
    console.log("ObSubscriptionData==>", ObSubscriptionData?.User?.u_name)
    console.log("SubscriptionData==>", SubscriptionData)

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
    const column = [
        {
            field: 'id',
            headerName: 'ID',
            align: 'center',
            headerAlign: 'center',
            type: 'number',
            width: 50
        },
        {
            field: 'plan_name',
            headerName: 'Plan Name',
            align: 'center',
            headerAlign: 'center',
            type: 'number',
            width: 200,
            renderCell: (params) => {
                return (
                    <Typography>{params.row.subscriptionPlan?.plan_name} </Typography>
                )

            }
        },
        {
            field: 'plan_price',
            headerName: 'Plan Type',
            align: 'center',
            headerAlign: 'center',
            type: 'number',
            width: 150,
            renderCell: (params) => {
                return (
                    <Typography>{params.row.subscriptionPlan?.plan_price} </Typography>
                )

            }
        },
        {
            field: 'plan_validity',
            headerName: 'Validity',
            align: 'center',
            headerAlign: 'center',
            type: 'number',
            width: 150,
            renderCell: (params) => {
                return (
                    <Typography>{params.row.subscriptionPlan?.plan_validity} </Typography>
                )

            }
        },
        {
            field: 'subscription_start_date',
            headerName: 'Start Date',
            align: 'center',
            headerAlign: 'center',
            width: 150,

        },
        {
            field: 'subscription_end_date',
            headerName: 'End Date',
            align: 'center',
            headerAlign: 'center',
            width: 150
        },
        {
            field: 'subscription_status',
            headerName: 'Over',
            align: 'center',
            headerAlign: 'center',
            width: 150
        },

    ]
    const handleEdit = (id) => {
        navigate(`/shareTrip/EditSubscription/${id}`)
    }

    const handleFormSubmit = async (values, { resetFrom }) => {
        const data = {
            id: values.id,
            plan_name: values.plan_name,
            plan_price: values.plan_price,
            plan_validity: values.plan_validity,
            plan_details: values.plan_details,
            is_active: isActive !== false ? isActive : values.is_active
        }

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
    useEffect(() => { dispatch(getSingleSubscriptionDetails(sid)) }, [dispatch])

    const handleback = () => {
        navigate(-1)
    }
    return (
        <>
            <Box p={2} bgcolor={'white'}>
                <div>
                    <Typography variant='h6' fontWeight={'Bold'} >Subscription Details</Typography>
                </div>
            </Box>
            <Box p={5}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={ObSubscriptionData && sid ? ObSubscriptionData : initialValues}

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
                                    handleChange={handleChange} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextFieldComponent
                                    label={'User Role'}
                                    name={"role_name"}
                                    proId={true}
                                    values={values.User?.roles?.role_name}
                                    errors={errors.User?.roles?.role_name}
                                    touched={touched.User?.roles?.role_name}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange} />
                            </Grid>
                            <Grid item xs={4}>
                                <TextFieldComponent
                                    label={'User Number'}
                                    name={"u_mob_num"}
                                    proId={true}
                                    values={values.User?.u_mob_num}
                                    errors={errors.u_mob_num}
                                    touched={touched.u_mob_num}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>Subscription Details</Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <Box border={'1px solid black'} p={5} borderRadius={3} >
                                    <TableWithoutAdd
                                        columns={column}
                                        data={SubscriptionData}
                                        handleEdit={handleEdit}
                                    />
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

export default ViewSubscription