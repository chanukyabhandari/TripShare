import React from "react";
import { Box, Button, createTheme, ThemeProvider, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { Add } from "@mui/icons-material";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import DeleteIcon from "@mui/icons-material/Delete";
import { MdBusinessCenter, MdModeEdit, MdOutlineCreditCard, MdTimeToLeave } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";

const UserTableComponent = ({
    columns,
    data,
    handlenewlocation,
    handleEdit,
    handleVehicle,
    handleBusiness,
    handleSubscription,
    handleUserDoc,
    handleVehicleDoc,
    handleDelete,
    loader,
}) => {
    const viewbtntheme = createTheme({
        components: {
            // Name of the component
            MuiButton: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        fontSize: "1rem",
                        backgroundColor: "transparent",
                        padding: "4px 11px",
                        width: 'auto',
                        // fontSize:'0.85rem',
                        "&:hover": {
                            backgroundColor: "#ffff",
                        },
                    },
                },
            },
        },
    });
    const actionColumns = [
        {
            field: "action",
            headerName: "Action",
            textAlign: "center",
            width: "1000",
            // margin:`2em !important`,
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                            marginTop: ".5em"
                        }}
                    >
                        <ThemeProvider theme={viewbtntheme}>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={() => handleEdit(params.row.id)}
                                startIcon={<MdModeEdit />}
                            >
                                Profile
                            </Button>
                        </ThemeProvider>

                        {params.row.role_id !== 2000 && (
                            <ThemeProvider theme={viewbtntheme}>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    onClick={() => handleVehicle(params.row.id)}
                                    startIcon={<MdTimeToLeave />}
                                >
                                    Vehicle
                                </Button>
                            </ThemeProvider>
                        )}
                        {params.row.role_id !== 2000 && (
                            <ThemeProvider theme={viewbtntheme}>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    onClick={() => handleBusiness(params.row.id)}
                                    startIcon={<MdBusinessCenter />}
                                >
                                    Business
                                </Button>
                            </ThemeProvider>
                        )}

                        {params.row.role_id !== 2000 && (
                            <ThemeProvider theme={viewbtntheme}>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    onClick={() => handleSubscription(params.row.id)}
                                    startIcon={<MdOutlineCreditCard />}
                                >
                                    Subscription
                                </Button>
                            </ThemeProvider>
                        )}

                        {params.row.role_id !== 2000 && (
                            <ThemeProvider theme={viewbtntheme}>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    onClick={() => handleUserDoc(params.row.id)}
                                    startIcon={<IoMdDocument />}
                                >
                                    User Docs
                                </Button>
                            </ThemeProvider>
                        )}

                        {params.row.role_id !== 2000 && (
                            <ThemeProvider theme={viewbtntheme}>
                                <Button
                                    type="button"
                                    variant="outlined"
                                    onClick={() => handleVehicleDoc(params.row.id)}
                                    startIcon={<IoMdDocument />}
                                >
                                    Vehicle Docs
                                </Button>
                            </ThemeProvider>
                        )}

                        {/* <ThemeProvider theme={viewbtntheme}>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={() => handleDelete(params.row.id)}
                                startIcon={<MdDelete color="red" />}
                            >
                                
                            </Button>
                        </ThemeProvider> */}
                    </Box>
                );
            },
        },
    ];
    return (
        <>
            <Box marginTop={5}></Box>
            <Box
                width="auto"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                        fontSize: "15px",
                    },
                    "& .name-column--cell": {
                        color: "#3483eb",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#3483eb !important",
                        borderBottom: "none",
                        fontSize: "18px",
                        fontFamily: "Poppins",
                        fontWeight: 700,
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#FFFFFF",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: "#3483eb",
                    },
                    "& .MuiCheckbox-root": {
                        color: `green !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {

                        color: `#3483eb !important`,
                    },
                    "& .MuiDataGrid-overlay .MuiCircularProgress-root": {
                        color: "#3483eb",
                    },
                }}
            >
                <DataGrid
                    rows={data || []}
                    components={{ Toolbar: GridToolbar }}
                    columns={(columns || []).concat(actionColumns)}
                    disableSelectionOnClick
                    getRowId={(row) => row.id}
                    experimentalFeatures={{ newEditingApi: true }}
                    loading={loader}
                />
            </Box>

        </>
    )
}

export default UserTableComponent;