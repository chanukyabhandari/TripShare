import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CustomTableComponent from '../../utils/CustomTablecomponent'
import { Avatar, Box, Typography } from '@mui/material'
import { getAllSubscription, getSubscriptionData } from '../redox/reducer/subscription'

const ManageSubscription = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const SubscriptionData = useSelector(getSubscriptionData)
    
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
            width: 200
        },
        {
            field: 'plan_price',
            headerName: 'Plan in INR',
            align: 'center',
            headerAlign: 'center',
            type: 'number',
            width: 150
        },
        {
          field: 'plan_validity',
          headerName: 'Validity in days',
          align: 'center',
          headerAlign: 'center',
          type: 'number',
          width: 150
      },
        {
            field: 'is_active',
            headerName: 'isActive',
            align: 'center',
            headerAlign: 'center',
            width: 150,
        },

    ]

    const handleEdit = (id) => {
        navigate(`/shareTrip/UpdateSubscription/${id}`)
    }
    const handlenewlocation = () => {
        navigate(`/shareTrip/AddSubscription`)
    }
    useEffect(() => 
        { dispatch(getAllSubscription()) }, [dispatch])
  return (
    <Box p={2} bgcolor={"white"}>
    <div>
        <Typography variant='h6' fontWeight={'bold'} color={"black"}>Manage Subscription</Typography>
        <CustomTableComponent
            butname={'Add Subscription-Plan'}
            columns={column}
            data={SubscriptionData}
            handleEdit={handleEdit}
            handlenewlocation={handlenewlocation}
        />
    </div>
</Box>
  )
}

export default ManageSubscription