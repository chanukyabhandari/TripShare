import { Avatar, Box, Button, createTheme, Divider, Grid, ThemeProvider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import TextFieldComponent from '../../utils/TextFieldComponent'
import { useNavigate, useParams } from 'react-router-dom'
import TableWithoutAdd from '../../utils/TableWithoutAdd'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUserDocDetails, getUniqueUserDocDetailsData, getUniqueUserDocDetailsDataById } from '../redox/reducer/UserDetails'

const ViewUserDocDetails = () => {
    const { udid } = useParams();
    console.log(udid)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const UserDocDetails = useSelector(getUniqueUserDocDetailsData)
    const ObUserDocDetails = useSelector(getUniqueUserDocDetailsDataById);
    console.log("ObUserDocDetails==>", ObUserDocDetails)
    console.log("UserDocDetails==>", UserDocDetails)
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
            field: 'doc_name',
            headerName: 'Document Name',
            align: 'center',
            headerAlign: 'center',
            width: 200,
        },
        {
            field: 'doc_type',
            headerName: 'Document Type',
            align: 'center',
            headerAlign: 'center',
            width: 150,
        },
        {
            field: 'doc_number',
            headerName: 'Document Photo',
            align: 'center',
            headerAlign: 'center',
            type: 'number',
            width: 150,
            renderCell: (params) => {
                return (
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center", // Center horizontally
                        alignItems: "center", // Center vertically
                        width: "100%",
                        height: "100%"
                    }}>
                        <Avatar
                            src={params.value}
                            alt={params.row.doc_upload}
                            sx={{ width: 50, height: 50 }}
                        />
                    </Box>

                )

            }
        },
    ]

    const initialValues = {
    }
    const handleFormSubmit = () => {
        const data = {
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

    const handleEdit = (id) => {
        navigate(`/ShareTrip/EditUserDocDetails/${id}`)
    }
    useEffect(() => { dispatch(getSingleUserDocDetails(udid)) }, [dispatch])
    return (
        <>
            <Box p={2} bgcolor={'white'}>
                <div>
                    <Typography variant='h6' fontWeight={'Bold'} >User Document Details</Typography>
                </div>
            </Box>
            <Box p={5}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={ObUserDocDetails && udid ? ObUserDocDetails : initialValues}
                    enableReinitialize
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) =>
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
                                        handleChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextFieldComponent
                                        label={'User Role'}
                                        name={"role"}
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
                                    <Divider>User Document Details</Divider>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box border={'1px solid black'} p={5} borderRadius={3} >
                                        <TableWithoutAdd
                                            columns={column}
                                            data={UserDocDetails}
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
                                        <Button variant='contained' onClick={handleback}>Back</Button>
                                    </ThemeProvider>
                                    <ThemeProvider theme={btnTheme}>
                                        <Button variant='contained' type='submit' color='primary'>Submit</Button>
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

export default ViewUserDocDetails