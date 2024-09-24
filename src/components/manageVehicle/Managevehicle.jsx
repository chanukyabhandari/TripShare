import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getallVehicleName, getVehicleName } from '../redox/reducer/vehicleSlice'
import { Avatar, Box, Typography } from '@mui/material'
import CustomTableComponent from '../../utils/CustomTablecomponent'

const ManageUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const vehicleName = useSelector(getVehicleName)
  // console.log('userData', userdata)
  const colums = [
    {
      field: 'id',
      headerName: 'Vehicle id',
      align: 'center',
      headerAlign: 'center',
      type: 'number',
      width: 150
    },
    {
      field: 'v_name',
      headerName: 'Vehicle name',
      align: 'center',
      headerAlign: 'center',
      type: 'number',
      width: 150
    },
    {
      field: 'v_type',
      headerName: 'Vehicle type',
      align: 'center',
      headerAlign: 'center',
      type: 'number',
      width: 180,
      renderCell: (params) => {
        return (
          <Typography>{params.row.vehicleType?.v_type || "N/A"}</Typography>
        )
      }
    },
    {
      field: 'v_make',
      headerName: 'Vehicle Make',
      align: 'center',
      headerAlign: 'center',
      type: 'number',
      width: 150
    },
    {
      field: 'seating_capacity',
      headerName: 'Seating Capasity',
      align: 'center',
      headerAlign: 'center',
      type: 'number',
      width: 150
    },
    {
      field: 'v_pic',
      headerName: 'Vehicle Pic',
      align: 'center',
      headerAlign: 'center',
      type: 'number',
      width: 150,
      renderCell: (params) => {
        return (
          <Box sx={{
            width: '100%',
            height: "100%",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Avatar
              src={params.value}
              alt='param.row.v_logo'
              sx={{ width: '50', height: '50' }} />
          </Box>
        )
      }
    },
    {
      field: 'v_logo',
      headerName: 'Vehicle Logo',
      align: 'center',
      headerAlign: 'center',
      type: 'number',
      width: 150,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              width: '100%',
              height: "100%",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Avatar
              src={params.value}
              alt={params.row.v_logo}
              sx={{ width: '50', height: "50" }}
            />
          </Box>
        )
      }
    }
  ]
  const handleEdit = (id) => {
    console.log("id==>", id)
    navigate(`/shareTrip/UpdateVehicle/${id}`)
  }
  const handlenewlocation = () => {
    navigate('/shareTrip/AddVehicle')
  }
  useEffect(() => { dispatch(getallVehicleName()) }, [dispatch])

  return (
    <>
      <Box sx={{ p: 2 }}>
        <div>
          <Typography variant='h6' color={'black'} fontWeight={'bold'}>Manage Vehicle details</Typography>
          <CustomTableComponent
            butname={"Add vehicle"}
            columns={colums}
            data={vehicleName}
            handlenewlocation={handlenewlocation}
            handleEdit={handleEdit} />
        </div>
      </Box>
    </>
  )
}

export default ManageUser