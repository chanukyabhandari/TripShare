import { Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const RadioComponent = ({ label, data, values, setData, disabled }) => {

    return (
        <>
            <ThemeProvider theme={radiobuton}>
                <Box sx={{ display: 'flex', justifyContent: "center", width: { xs: '70%', sm: '70%', xl: '50%' }, alignItems: 'center', borderRadius: '5px', backgroundColor: "#0B63F8" }}>
                    <FormControl >
                        <FormLabel id="demo-controlled-radio-buttons-group" sx={{ marginLeft: '10px', fontWeight: "bold" }}>{label}</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={data || false}
                            onChange={(v) => setData(v.target.value)}
                        >
                            <Box sx={{ display: 'flex' }}>
                                <FormControlLabel value="true" control={<Radio sx={{
                                    color: '#00000',
                                    '&.Mui-checked': {
                                        color: "#1E8700",
                                    },
                                }} />} label="YES" disabled={disabled} />
                                <FormControlLabel value="false" control={<Radio sx={{
                                    color: '#00000',
                                    '&.Mui-checked': {
                                        color: "#fa4b4b",
                                    },
                                }} />} label="NO" disabled={disabled} />
                            </Box>
                        </RadioGroup>
                    </FormControl>
                </Box>
            </ThemeProvider>
        </>
    )
}

const radiobuton = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: '#000000 !important',
                }
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                // Name of the slot
                root: {
                    checked: {
                        color: '#1976D2',
                    },
                    "&.MuiRadio-root": {
                        color: '#00000',
                    }
                },
            },
        },
    },
})

export default RadioComponent