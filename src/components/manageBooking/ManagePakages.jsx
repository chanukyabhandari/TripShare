import { Box, createTheme, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomTableComponent from '../../utils/CustomTablecomponent'
import * as yup from "yup";
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allBookingType, createBookingdata, getSingleBookingData, uniqueBookingType } from '../redox/reducer/bookingSlice';
import { Formik } from 'formik';
import TextFieldComponent from '../../utils/TextFieldComponent';
import BookingDropDown from '../../utils/BookigDropDown';
import CheckBoxComponent from '../../utils/CheckBoxComponent';

const UpdateBooking = () => {
  const { bid } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const bookingData = useSelector(uniqueBookingType)
  console.log("bookingData==>", bookingData)
  const allBookingData = useSelector(allBookingType)

  const [booking, setBooking] = useState();
  const [issubmit, setisSubmit] = useState(null);

  const initialValues = {
    booking_type_name: ""
  }
  const checkoutSchema = yup.object().shape({
    booking_type_name: yup.string().required("Required*")
  })


  const handleFormSubmit = async (values, { resetForm }) => {
    const data = {
      id: values.id,
      booking_type_name: booking.booking_type_name
    }
    const response = await dispatch(createBookingdata(data))
    if (response) {
      Swal.fire({
        title: "Booking Updated Successfully!",
        icon: "success",
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result) {
          navigate('/shareTrip/ManageBooking')
        }
      })

    }
  }

  const columns = [
    {
      field: "id",
      align: "center",
      headerAlign: "center",
      headerName: "Booking ID",
      width: 120,
    },
    {
      field: "package_name",
      align: "center",
      headerAlign: "center",
      headerName: "Package Name",
      width: 200,
    },
    {
      field: "limit_in_kms",
      align: "center",
      headerAlign: "center",
      headerName: "Limit Kilometers",
      width: 200,
    },
    {
      field: "hour_limit",
      align: "center",
      type: "string",
      headerAlign: "center",
      headerName: "Hour Limits",
      width: 180,
    },
    {
      field: "created_by",
      align: "center",
      type: "number",
      headerAlign: "center",
      headerName: "Created By",
      width: 200,
    }
  ]
  const handleback = () => {
    navigate(-1);
  }

  const handleSubmit = () => {
    setisSubmit(true)
  }

  const handleEdit = (id) => {
    navigate(`/shareTrip/UpdatePakages/${id}`)
  }
  const handlenewlocation = () => {
    navigate("/shareTrip/AddPakages")
  }
  useEffect(() => {
    dispatch(getSingleBookingData(bid))
  }, [dispatch])

  const buttheme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
            backgroundColor: "#0B63F8",
            "&:hover": {
              backgroundColor: "#0B63F8",
            },
          }
        }
      }
    }
  })
  return (
    <>
      <Box>
        <div>
          <Typography p={2} fontWeight={'bold'} >Manage pakage Details</Typography>
        </div>
        <Formik onSubmit={handleFormSubmit}
          initialValues={bookingData && bid ? bookingData : initialValues}
          validationSchema={checkoutSchema}
          enableReinitialize
        >{({
          values, errors, touched, handleBlur, handleChange, handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5} p="20px">
              <Grid item xs={6} >
                <TextFieldComponent
                  proId={bid}
                  label={"Bookin Type Id"}
                  name={"id"}
                  values={values.id}
                  errors={errors.id}
                  touched={touched.id}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldComponent
                  proId={bid}
                  label={"Bookin Type Name"}
                  name={"booking_type_name"}
                  values={bookingData.booking_type_name}
                // errors={errors.id}
                // touched={touched.id}
                // handleBlur={handleBlur}
                // handleChange={handleChange}
                />
              </Grid>
            </Grid>
          </form>
        )}
        </Formik>
      </Box>
      <Box sx={{ p: "0.1em" }}>
        <div>
          <CustomTableComponent
            butname={"Add package"}
            columns={columns}
            data={bookingData?.bookingTypePackageAsBookingType || []}
            handleEdit={handleEdit}
            handlenewlocation={handlenewlocation}

          />
        </div>
      </Box>
    </>
  )
}

export default UpdateBooking

const bookingName = [
  { booking_type_name: "LOCAL", values: "LOCAL" },
  { booking_type_name: "OUTSTATION", values: "OUTSTATION" },
  { booking_type_name: "TRANSFER", values: "TRANSFER" }

]