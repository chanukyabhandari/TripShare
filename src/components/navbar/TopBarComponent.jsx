import { Typography, Grid, Avatar, Box, Stack, Badge } from '@mui/material'
import React from 'react'
import { IoNotifications } from "react-icons/io5";

const Topbarcomponent = () => {
    const styles = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItem: "center",
        position: "sticky",
        top: "0px",
        zIndex: 99,
        boxSadhow: "5px 0 10px black",
        p: 1,
    }
    return (
        <>
            <Box sx={styles}
                bgcolor={"white"}
                width={"100%"}
                borderBottom={"1px lightgrey solid"}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <Typography variant='h5' fontSize={'1.6em'} fontWeight='bold' color={"#0B63F8"}>Welcome to Share-Trip</Typography>
                </Box>

                <Grid
                    item
                    xs={2}
                    sm={2}
                    md={2}
                    xl={2}
                    sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "100%",
                    }}>
                        <Stack 
                        spacing={4}
                        direction={'row'}
                        sx={{
                            color:'action.active',
                            mr:2,
                            justifyContent:'flex-start'
                        }}>

                            <Badge variant='dot' color='secondary' badgeContent={0}>
                                <IoNotifications />
                            </Badge>
                        </Stack>
                        <Avatar 
                        src=''
                        alt='not found'
                        // handleAccount={}
                        style={{ width: "35px", height: "35px", cursor: "pointer" }} />
                    </Box>
                </Grid>
            </Box>


        </>
    )
}

export default Topbarcomponent