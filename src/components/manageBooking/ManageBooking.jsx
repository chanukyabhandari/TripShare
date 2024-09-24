import React, { useEffect } from 'react'
import CustomTableComponent from '../../utils/CustomTablecomponent'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { MdHeight } from 'react-icons/md'
import { allBookingType, getAllBookingData } from '../redox/reducer/bookingSlice'

const ManageVehicleType = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const bookingTypedata = useSelector(allBookingType)
    console.log("bookingTypedata",bookingTypedata)

    const column = [
        {
            field: 'id',
            headerName: 'Booking ID',
            align: 'center',
            headerAlign: 'center',
            type: 'number',
            width: 150
        },
        {
            field: 'booking_type_name',
            headerName: 'Booking Name',
            align: 'center',
            headerAlign: 'center',
            type: 'number',
            width: 200
        },
        {
            field: 'created_by',
            headerName: 'Created By',
            align: 'center',
            headerAlign: 'center',
            type: 'number',
            width: 150
        },
    ]
    const handleEdit = (id) => {
        navigate(`/shareTrip/UpdateBookingType/${id}`)
    }
    // const handlenewlocation = () => {
    //     navigate(`/shareTrip/AddBookingType`)
    // }
    useEffect(() => {
        dispatch(getAllBookingData())
    }, [dispatch])
    return (
        <>
            <Box p={2} bgcolor={"white"}>
                <div>
                    <Typography variant='h6' fontWeight={'bold'} color={"black"}>Manage Booking Type</Typography>
                    <CustomTableComponent
                        // butname={'Add Button'}
                        columns={column}
                        data={bookingTypedata}
                        handleEdit={handleEdit}
                        // handlenewlocation={handlenewlocation}
                    />
                </div>
            </Box>

        </>
    )
}

export default ManageVehicleType