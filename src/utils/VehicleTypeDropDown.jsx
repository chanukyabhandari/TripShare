import React, { useCallback, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

const VehicleTypeDropDown = ({ label, name, arrayData, stateData, setStateData, options = [], id, issubmit, inputerror, dropdown }) => {
    const setcomp = useCallback((data) => {
        if (data && Array.isArray(options)) {
            const stat = options.find(s => s.v_type === data.v_type);
            setStateData(stat || null);
        }
    }, [setStateData, options]);

    useEffect(() => {
        if (arrayData) {
            setcomp(arrayData);
        }
    }, [setcomp, arrayData]);
    // console.log(Array.isArray(options));
    return (
        <>
            <Autocomplete
                disablePortal
                onChange={(event, value) => setStateData(value || null)}
                id={id || "combo-box-demo"}
                options={Array.isArray(options) ? options : []}
                isOptionEqualToValue={(option, value) => option?.v_type === value?.v_type}
                getOptionLabel={(option) => option?.v_type || ''}
                value={stateData || null}
                sx={{ width: '100%', marginTop: '7px' }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        name={name}
                        variant="outlined"
                        error={issubmit && !stateData}
                        helperText={issubmit && !stateData ? inputerror : ''}
                    />
                )}
            />
        </>
    );
}

export default VehicleTypeDropDown;