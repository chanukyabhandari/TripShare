import React from "react";
import { Box, Button, createTheme, ThemeProvider, Tooltip } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { Add } from "@mui/icons-material";
// import EditRoundedIcon from "@mui/icons-material/EditRounded";
// import DeleteIcon from "@mui/icons-material/Delete";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";

const CustomTableComponent = ({
    butname,
    columns,
    data,
    handlenewlocation,
    handleEdit,
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
                        width:'auto',
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
            width: "300",
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center",
                            marginTop: "0.5em",
                            width:'auto'
                        }}
                    >

                        <ThemeProvider theme={viewbtntheme}>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={() => handleEdit(params.row.id)}
                                startIcon={<MdModeEdit />}
                            >
                                Edit
                            </Button>
                        </ThemeProvider>


                        
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
            <Box sx={{ textAlign: "right", margin: "1em 0" }}>
                <Button
                    sx={{ backgroundColor: "white" }}
                    variant="outlined"
                    startIcon={<MdAdd />}
                    onClick={handlenewlocation}
                >
                    {butname}
                </Button>
            </Box>

            <Box
                width="auto"
                height="73vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                        fontSize: "15px",
                    },
                    "& .name-column--cell": {
                        color: "grey",
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
                        color: `black !important`,
                    },
                    "& .MuiDataGrid-overlay .MuiCircularProgress-root": {
                        color: "black",
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

export default CustomTableComponent