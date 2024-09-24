import { Box, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDropDownData, getDropdata } from '../components/redox/reducer/bookingSlice';
const CheckBoxComponent = ({selectedItems,setSelectedItems}) => {
    const dispatch = useDispatch()
    const data = useSelector(getDropdata);
    console.log("data==>", data)
    const [isLoaded, setIsLoaded] = useState(false);
    // console.log("isLoaded==>", isLoaded)
    useEffect(() => {
       dispatch(getAllDropDownData())
    }, [dispatch]);

    const handleCheckboxChange = (checked, ele) => {
        if (checked) {
            setSelectedItems(prevState => [
                ...prevState,
                {
                    display_order: prevState.length + 1,
                    field_dropdown_value: ele?.field_value,
                    field_dropdown_id: ele?.id,
                }
            ]);
        } else {
            setSelectedItems(prevState =>
                prevState.filter(item => item.field_dropdown_value !== ele?.field_value)
            );
        }
    };
    const isChecked = (ele) => {
        return selectedItems?.some(
            (item) => item.field_dropdown_value === ele?.field_value
        );
    };
    const filteredData = data.filter(ele => ele.field_name === "booking_require_fieds");
  return (
    <>
     <Grid container spacing={2} direction="column">
            <Box sx={{ width: "100%", display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                {filteredData.map((ele, index) => (
                    <Grid item xs={12} sm={6} md={4} 
                    key={index}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isChecked(ele)}
                                    onChange={(e) => handleCheckboxChange(e.target.checked, ele, index)}
                                />
                            }
                            label={
                                <TextField
                                    placeholder="Enter text here"
                                    variant="filled"
                                    value={ele?.field_value}
                                    InputProps={{ disableUnderline: false }}
                                    sx={{ ml: 1, width: '100%', mt: 1 }}
                                />
                            }
                        />
                    </Grid>
              ))} 
            </Box>
        </Grid>
    </>
  )
}

export default CheckBoxComponent