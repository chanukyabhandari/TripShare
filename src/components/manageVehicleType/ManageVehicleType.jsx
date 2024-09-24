import React, { useEffect } from 'react'
import CustomTableComponent from '../../utils/CustomTablecomponent'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getVehicleType, getallVehicleType } from '../redox/reducer/vehicleSlice'
import { MdHeight } from 'react-icons/md'

const ManageVehicleType = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const vehicleTypedata = useSelector(getVehicleType);

    const column = [
        {
            field: 'id',
            headerName: 'Vehicle ID',
            align: 'center',
            headerAlign: 'center',
            type: 'number',
            width: 150
        },
        {
            field: 'v_type',
            headerName: 'Vehicle Type',
            align: 'center',
            headerAlign: 'center',
            type: 'number',
            width: 150
        },
        {
            field: 'created_by',
            headerName: 'Created By',
            align: 'center',
            headerAlign: 'center',
            type: 'number',
            width: 150
        },
        {
            field: 'v_type_pic',
            headerName: 'Vehicle Icon',
            align: 'center',
            headerAlign: 'center',
            type: 'number',
            width: 150,
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center", // Center horizontally
                            alignItems: "center", // Center vertically
                            width: "100%",
                            height: "100%"
                        }}>
                        <Avatar
                            src={params.value}
                            alt={params.row.v_type}
                            sx={{ width: 50, height: 50 }}
                        />
                    </Box>
                )
            }
        },

    ]

    const handleEdit = (id) => {
        navigate(`/shareTrip/UpdateVehicleType/${id}`)
    }
    const handlenewlocation = () => {
        navigate(`/shareTrip/AddVehicleType`)
    }
    useEffect(() => { dispatch(getallVehicleType()) }, [dispatch])
    return (
        <>
            <Box p={2} bgcolor={"white"}>
                <div>
                    <Typography variant='h6' fontWeight={'bold'} color={"black"}>Manage Vehicle Type</Typography>
                    <CustomTableComponent
                        butname={'Add Button'}
                        columns={column}
                        data={vehicleTypedata}
                        handleEdit={handleEdit}
                        handlenewlocation={handlenewlocation}
                    />
                </div>
            </Box>

        </>
    )
}

export default ManageVehicleType