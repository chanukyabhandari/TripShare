import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import Swal from "sweetalert2";
import TextFieldComponent from '../../utils/TextFieldComponent';
import { Box, Button, createTheme, Divider, Grid, ThemeProvider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookingData, getSinglePakageData, uniquePakageData, updatePakageData } from '../redox/reducer/bookingSlice';
import { useNavigate, useParams } from 'react-router-dom';
import CheckBoxComponent from '../../utils/CheckBoxComponent';
const UpdatePakages = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PakageData = useSelector(uniquePakageData);
  console.log("PakageData", PakageData)

  const [selectedItems, setSelectedItems] = useState([]);
  console.log("selectedItems==>",selectedItems)
  const initialValues = {
    booking_type_id: "",
    package_name: "",
    package_details: "",
    limit_in_kms: "",
    hour_limit: ""
  }
  const checkoutSchema = yup.object().shape({
    // limit_in_kms: yup.number().typeError('Must be Number'),
    // hour_limit: yup.number().typeError('Must be Number'),
  })

  const handleFormSubmit = async (values, { resetForm }) => {
    data = {
      id: values.id,
      booking_type_id: PakageData.booking_type_id,
      package_name: values.package_name,
      package_details: values.package_details,
      limit_in_kms: values.limit_in_kms,
      hour_limit: values.hour_limit,
      packageInclusionDetails: selectedItems.map((item, index) => ({
        booking_type_packages_id: PakageData.id,
        field_dropdown_id: item.field_dropdown_id,
        display_order: index + 1,
        field_dropdown_value: item.field_dropdown_value
      })),
    }

    const response = await dispatch(updatePakageData(data))
    if (response) {
      Swal.fire({
        title: "Pakage Updated Succesfully!",
        icon: "success",
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
    navigate(-1);
  } 
  useEffect(() => {
    dispatch(getAllBookingData)
    dispatch(getSinglePakageData(pid))
  }, [dispatch]);

  useEffect(() => {
    if (PakageData && PakageData.packageInclusionAsBookingTypePackagesId) {
      const preSelectedItems = PakageData.packageInclusionAsBookingTypePackagesId.map((item) => ({
        field_dropdown_id: item.field_dropdown_id,
        field_dropdown_value: item.field_dropdown_value,
      }));
      setSelectedItems(preSelectedItems);
      console.log("preSelectedItems==>", preSelectedItems)
    }
  }, [PakageData]);

  return (
    <>
      <Box p={2} bgcolor={'white'}>
        <div>
          <Typography variant='h6' fontWeight={'bold'} color={'black'}>Update Pakage Details</Typography>
        </div>
      </Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={PakageData && pid ? PakageData : initialValues}
        validationSchema={checkoutSchema}
        enableReinitialize>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) =>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5} padding={'20px'}>
              <Grid item xs={6}>
                <TextFieldComponent
                  label={'Vehicle Type Id'}
                  name='id'
                  proId={true}
                  values={values.id}
                  errors={errors.id}
                  touched={touched.id}
                  handleBlur={handleBlur}
                  handleChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextFieldComponent
                  label={'Booking Type'}
                  name='booking_type_id'
                  proId={true}
                  values={values.booking_type_id}
                  errors={errors.booking_type_id}
                  touched={touched.booking_type_id}
                  handleBlur={handleBlur}
                  handleChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <Divider>Editable Fields</Divider>
              </Grid>
              <Grid item xs={6}>
                <TextFieldComponent
                  label={'Package Name'}
                  name='package_name'
                  values={values.package_name}
                  errors={errors.package_name}
                  touched={touched.package_name}
                  handleBlur={handleBlur}
                  handleChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextFieldComponent
                  label={'Package Details'}
                  name='package_details'
                  values={values.package_details}
                  errors={errors.package_details}
                  touched={touched.package_details}
                  handleBlur={handleBlur}
                  handleChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextFieldComponent
                  label={'Limit in kms'}
                  name='limit_in_kms'
                  values={values.limit_in_kms}
                  errors={errors.limit_in_kms}
                  touched={touched.limit_in_kms}
                  handleBlur={handleBlur}
                  handleChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextFieldComponent
                  label={'Hour Limit'}
                  name='hour_limit'
                  values={values.hour_limit}
                  errors={errors.hour_limit}
                  touched={touched.hour_limit}
                  handleBlur={handleBlur}
                  handleChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <CheckBoxComponent
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  // preSelectedItems={singleBookingTarrifData?.packageInclusionDetails || []}
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
        } </Formik>
    </>
  )
}

export default UpdatePakages