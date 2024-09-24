import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../BaseURL";
import { getAuthHeader } from "./useSlice";

// vehicleType 

export const getallVehicleType = createAsyncThunk('getallVehicleType',
    async () => {
        try {
            const response = await baseURL.get('vehicle-types/admin', getAuthHeader())
            console.log('response.allvehicletype', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const getSingleVehicleType = createAsyncThunk('getSingleVehicleType',
    async (id) => {
        try {
            const response = await baseURL.get(`/vehicle-types/${id}`, getAuthHeader())
            console.log('single vehicle type', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const createVehicleType = createAsyncThunk('createVehicleType',
    async (data) => {
        try {
            const response = await baseURL.post('/vehicle-types', data, getAuthHeader())
            console.log('response.data', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const updateVehicleType = createAsyncThunk('updateVehicleType',
    async (data) => {
        try {
            const response = await baseURL.patch(`/vehicle-types`, data, getAuthHeader())
            console.log('response.data', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const createallVehicleName = createAsyncThunk('createallVehicleName',
    async (data) => {
        try {
            const response = await baseURL.post('/vehicle-names', data, getAuthHeader())
            console.log('response.data', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const updateallVehicleName = createAsyncThunk('updateallVehicleName',
    async (data) => {
        try {
            const response = await baseURL.patch('/vehicle-names', data, getAuthHeader())
            console.log('response.data', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const getallVehicleName = createAsyncThunk('getallVehicleName',
    async () => {
        try {
            const response = await baseURL.get('/vehicle-names/admin', getAuthHeader())
            console.log('allvehicle name', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const getSingleVehicleName = createAsyncThunk('getSingleVehicleName',
    async (id) => {
        try {
            const response = await baseURL.get(`/vehicle-names/${id}`, getAuthHeader())
            console.log('VehicleName', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const getseatingcapasitydropdown = createAsyncThunk('getseatingcapasitydropdown',
    async (v_seating_cpcty) => {
        console.log("v_seating_cpcty==>", v_seating_cpcty)
        try {
            const response = await baseURL.get(`/field-dropdown/seating-capacity?field_name=${v_seating_cpcty}`, getAuthHeader())
            console.log('getseatingcapasitydropdown', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)



export const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState: {
        loading: false,
        vehicleData: [],
        singlevehicleData: {},
        vehicletypeData: [],
        singlevehicletypeData: {},
        seatingdropdown: {},
        error: false
    },
    reducers: {},
    extraReducers: (builder) => {
        // getallVehicleName
        builder
            .addCase(getallVehicleName.pending, (state) => {
                state.loading = true
            })
            .addCase(getallVehicleName.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicleData = action.payload
            })
            .addCase(getallVehicleName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
            })
        // getSingleVehicleName
        builder
            .addCase(getSingleVehicleName.pending, (state) => {
                state.loading = true
            })
            .addCase(getSingleVehicleName.fulfilled, (state, action) => {
                state.loading = false;
                state.singlevehicleData = action.payload
            })
            .addCase(getSingleVehicleName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
            })
        // getallVehicleType    
        builder
            .addCase(getallVehicleType.pending, (state) => {
                state.loading = true
            })
            .addCase(getallVehicleType.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicletypeData = action.payload
            })
            .addCase(getallVehicleType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
            })
        // getSingleVehicleType
        builder
            .addCase(getSingleVehicleType.pending, (state) => {
                state.loading = true
            })
            .addCase(getSingleVehicleType.fulfilled, (state, action) => {
                state.loading = false;
                state.singlevehicletypeData = action.payload
            })
            .addCase(getSingleVehicleType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
            })
        builder
            .addCase(getseatingcapasitydropdown.pending, (state) => {
                state.loading = true
            })
            .addCase(getseatingcapasitydropdown.fulfilled, (state, action) => {
                state.loading = false;
                state.seatingdropdown = action.payload
            })
            .addCase(getseatingcapasitydropdown.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
            })
    }
})

export const getVehicleName = (state) => state.vehicle.vehicleData;
export const getUniqueVehicleName = (state) => state.vehicle.singlevehicleData;
export const getVehicleType = (state) => state.vehicle.vehicletypeData;
export const getUniqueVehicleType = (state) => state.vehicle.singlevehicletypeData;
export const getUniqueSeatingDropdown = (state) => state.vehicle.seatingdropdown;

export default vehicleSlice.reducer;
