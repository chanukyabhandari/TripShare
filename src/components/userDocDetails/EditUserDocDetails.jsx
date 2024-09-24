import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { json, useNavigate, useParams } from 'react-router-dom';
import { getSingleUserDocDetailsById, getUniqueUserDocDetailsDataById, UpdateUserDocDetailsById } from '../redox/reducer/UserDetails';
import { Box, Button, createTheme, Divider, Grid, ThemeProvider, Typography } from '@mui/material';
import { Formik } from 'formik';
import Swal from "sweetalert2";
import TextFieldComponent from '../../utils/TextFieldComponent';
import RadioComponent from '../../utils/RadioComponets';
import DropzoneExample from '../../utils/DropZoneExample';
import ImageHover from '../../utils/Imagehover';

const EditUserDocDetails = () => {
    const { eudid } = useParams();
    console.log("eudid", eudid)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isActive, setisactive] = useState(true)
    const [docphoto, setdocphoto] = useState();
    const ObUserDocDetails = useSelector(getUniqueUserDocDetailsDataById);
    // const UserDocDetails = useSelector(getUniqueUserDocDetailsData);
    console.log("ObUserDocDetails==>", ObUserDocDetails)
        // console.log(ObSubscriptionData?.User?.u_name)

        const initialValues = {
            doc_name: "",
            doc_type: "",
            doc_type: "",
        }

        const handleFormSubmit = async (values) => {
            const data = {
                id: values.id,
                user_id:ObUserDocDetails.user_id,
                doc_name: values.doc_name,
                doc_type: values.doc_type,
                doc_number: values.doc_number,
                is_active: isActive !== false ? isActive : values.is_active
            }
            const formdata = new FormData()
            formdata.append("json", JSON.stringify(data))
            if (docphoto) {
                formdata.append("docUpload", docphoto[0])
            }
            console.log("data",data)
            console.log("formdata",formdata)
            const response = await (dispatch(UpdateUserDocDetailsById(formdata)))
            if (response) {
                Swal.fire({
                    title: "User Documents Updated Succesfully!",
                    icon: "success",
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate(-1)
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
            navigate(-1)
        }
    useEffect(() => { dispatch(getSingleUserDocDetailsById(eudid)) }, [dispatch])

    return (
        <>
            <Box p={2}>
                <div>
                    <Typography variant='h6' fontWeight={'bold'} >Edit Driver Documents</Typography>
                </div>
            </Box>
            <Box p={2}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={ObUserDocDetails && eudid ? ObUserDocDetails : initialValues}
                    // validationSchema={ }
                    enableReinitialize
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) =>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={5} >
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
                                        label={"Document Name"}
                                        name={"doc_name"}
                                        values={values.doc_name}
                                        errors={errors.doc_name}
                                        touched={touched.doc_name}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextFieldComponent
                                        label={"Document Type"}
                                        name={"doc_type"}
                                        values={values.doc_type}
                                        errors={errors.doc_type}
                                        touched={touched.doc_type}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextFieldComponent
                                        label={"Document Number"}
                                        name={"doc_number"}
                                        values={values.doc_number}
                                        errors={errors.doc_number}
                                        touched={touched.doc_number}
                                        handleBlur={handleBlur}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    {values.doc_upload && (

                                        <ImageHover values={values.doc_upload} />
                                    )
                                    }
                                    <DropzoneExample
                                        title={"The Document must be in JPEG,JPG or PNG format Photo"}
                                        content={"Document Photo"}
                                        setlocationimage={setdocphoto}
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

export default EditUserDocDetails