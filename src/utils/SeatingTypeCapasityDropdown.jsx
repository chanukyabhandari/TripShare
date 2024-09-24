// import React, { useCallback, useEffect } from 'react';
// import Autocomplete from '@mui/material/Autocomplete';
// import { TextField } from '@mui/material';

// const SeatingTypeCapasityDropdown = ({ label, name, arrayData, stateData, setStateData, options, id, issubmit, inputerror, dropdown }) => {
//     const setcomp = useCallback((data) => {
//         if (data) {
//             const stat = options.find(s => s.v_seating_cpcty === data.field_value);
//             setStateData(stat || null);
//         }
//     }, [setStateData, options]);

//     useEffect(() => {
//         if (arrayData) {
//             setcomp(arrayData);
//         }
//     }, [setcomp, arrayData]);
//     return (
//         <>
//             <Autocomplete
//                 disablePortal
//                 onChange={(event, value) => setStateData(value || null)}
//                 id={id || "combo-box-demo"}
//                 options={options}
//                 isOptionEqualToValue={(option, value) => option?.field_value === value?.field_value}
//                 getOptionLabel={(option) => option?.field_value || ''}
//                 value={stateData || null}
//                 sx={{ width: '100%', marginTop: '7px' }}
//                 renderInput={(params) => (
//                     <TextField
//                         {...params}
//                         label={label}
//                         name={name}
//                         variant="outlined"
//                         error={issubmit && !stateData}
//                         helperText={issubmit && !stateData ? inputerror : ''}
//                     />
//                 )}
//             />
//         </>
//     );
// }

// export default SeatingTypeCapasityDropdown



import React, { useCallback, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';

const SeatingTypeCapasityDropdown = ({ label, name, arrayData, stateData, setStateData, options = [], id, issubmit, inputerror, dropdown }) => {
    const setcomp = useCallback((data) => {
        if (data && Array.isArray(options)) {
            const stat = options.find(s => s.v_seating_cpcty === data.field_value);
            setStateData(stat || null);
        }
    }, [setStateData, options]);

    useEffect(() => {
        if (arrayData) {
            setcomp(arrayData);
        }
    }, [setcomp, arrayData]);

    return (
        <>
            <Autocomplete
                disablePortal
                onChange={(event, value) => setStateData(value || null)}
                id={id || "combo-box-demo"}
                options={Array.isArray(options) ? options : []}
                isOptionEqualToValue={(option, value) => option?.field_value === value?.field_value}
                getOptionLabel={(option) => option?.field_value || ''}
                value={stateData || ''}
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

export default SeatingTypeCapasityDropdown;
