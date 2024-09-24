import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllUserdata, getUserData } from '../redox/reducer/useSlice'
import { Box, Typography } from '@mui/material'
import CustomTableComponent from '../../utils/CustomTablecomponent'
import UserTableComponent from '../../utils/UserTableComponent'

const ManageUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userdata = useSelector(getUserData)
  console.log('userData', userdata)
  const colums = [
    {
      field: 'id',
      headerName: 'Id',
      align: 'center',
      headerAlign: 'center',
      type: 'number',
      width: 150
    },
    {
      field: 'u_name',
      headerName: 'Name',
      align: 'center',
      headerAlign: 'center',
      type: 'number',
      width: 150
    },
    {
      field: 'u_mob_num',
      headerName: 'Phone No',
      align: 'center',
      headerAlign: 'center',
      type: 'number',
      width: 150
    },
    {
      field: 'role_name',
      headerName: 'Role',
      align: 'center',
      headerAlign: 'center',
      type: 'number',
      width: 150,
      renderCell:(params)=>{
        return(
          <Typography>{params.row.roles?.role_name || "N/A"}</Typography>
        )
      }
    }]
  // const handleEdit = (id) => {
  //   console.log("id==>", id)
  //   navigate(`/shareTrip/UpdateUser/${id}`)
  // }

  useEffect(() => { dispatch(getAllUserdata()) }, [dispatch])

  return (
    <>
      <Box sx={{ p: 2 }} height={'100%'} width={'100%'}>
        <div>
          <Typography variant='h6' color={'black'} fontWeight={'bold'}>Manage user details</Typography>
          <UserTableComponent
            columns={colums}
            data={userdata}
            handleEdit={(id) => { navigate(`/shareTrip/UpdateUser/${id}`) }}
            handleVehicle={(id) => { navigate(`/shareTrip/ViewVehicleDetails/${id}`) }}
            handleBusiness={(id) => { navigate(`/shareTrip/ViewBusinessDetails/${id}`) }}
            handleSubscription={(id) => { navigate(`/shareTrip/ViewSubscription/${id}`) }}
            handleUserDoc={(id) => { navigate(`/shareTrip/ViewUserDocDetails/${id}`) }}
            handleVehicleDoc={(id) => { navigate(`/shareTrip/ViewVehicleDocDetails/${id}`) }}
            
          />
        </div>
      </Box>
    </>
  )
}

export default ManageUser