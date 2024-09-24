import React, { useCallback, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

const VehicleNameDropDown = ({ label, name, arrayData, stateData, setStateData, options, id, issubmit, inputerror, dropdown }) => {
    const setcomp = useCallback((data) => {
        if (data) {
            const stat = options.find(s => s.v_name === data.v_name);
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
                onChange={(event, value) => setStateData(value || '')}
                id="combo-box-demo"
                options={options}
                isOptionEqualToValue={(option, value) => option?.v_name === value?.v_name}
                getOptionLabel={(option) => option?.v_name || ''}
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

export default VehicleNameDropDown;