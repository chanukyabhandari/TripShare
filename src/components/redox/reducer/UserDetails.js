import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../BaseURL";
import { getAuthHeader } from "./useSlice";

export const getSingleVehicleDetails = createAsyncThunk('getSingleVehicleDetails',
    async (id) => {
        console.log("id", id)
        try {
            const response = await baseURL.get(`user-vehicle-package/${id}`, getAuthHeader())
            console.log('getSingleVehicleDetails', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    });

export const updateSingleVehicleDetails = createAsyncThunk('updateSingleVehicleDetails',
    async (data) => {
        try {
            const response = await baseURL.patch(`vehicles`, data, getAuthHeader())
            console.log('updateSingleVehicleDetails', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    });

export const getSingleBusinessDetails = createAsyncThunk('getSingleBusinessDetails',
    async (id) => {
        try {
            const response = await baseURL.get(`/user-business/${id}`, getAuthHeader())
            console.log('getSingleBusinessDetails/user-business', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    });

export const updateSingleBusinessDetails = createAsyncThunk('updateSingleBusinessDetails',
    async (data) => {
        try {
            const response = await baseURL.patch(`user-business`, data, getAuthHeader())
            console.log('updateSingleBusinessDetails==>', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    });

export const getSingleSubscriptionDetails = createAsyncThunk('getSingleSubscriptionDetails/user-docs/array-format/4   ',
    async (id) => {
        try {
            const response = await baseURL.get(`user-subscription/array-format/${id}`, getAuthHeader())
            console.log('getSingleSubscriptionDetails==>', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    });

export const getSingleUserDocDetails = createAsyncThunk('getSingleUserDocDetails  ',
    async (id) => {
        try {
            const response = await baseURL.get(`/user-docs/array-format/${id}`, getAuthHeader())
            console.log('getSingleUserDocDetails==>', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    });

export const getSingleUserDocDetailsById = createAsyncThunk('getSingleUserDocDetailsById  ',
    async (id) => {
        try {
            const response = await baseURL.get(`/user-docs/${id}`, getAuthHeader())
            console.log('getSingleUserDocDetailsById==>', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    });

export const UpdateUserDocDetailsById = createAsyncThunk('UpdateUserDocDetailsById  ',
    async (data) => {
        try {
            const response = await baseURL.patch(`/user-docs/`, data, getAuthHeader())
            console.log('UpdateUserDocDetailsById==>', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    });

export const getsingleVehicleDocDetails = createAsyncThunk('getsingleVehicleDocDetails  ',
    async (id) => {
        try {
            const response = await baseURL.get(`/vehicle-docs/array-format/${id}`, getAuthHeader())
            console.log('getsingleVehicleDocDetails==>', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    });

export const getsingleVehicleDocDetailsByid = createAsyncThunk('getsingleVehicleDocDetailsByid  ',
    async (id) => {
        try {
            const response = await baseURL.get(`/vehicle-docs/${id}`, getAuthHeader())
            console.log('getsingleVehicleDocDetailsByid==>', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    });

export const updatesingleVehicleDocDetailsbyid = createAsyncThunk('updatesingleVehicleDocDetailsbyid  ',
    async (data) => {
        try {
            const response = await baseURL.patch("/vehicle-docs/", data, getAuthHeader())
            console.log('updatesingleVehicleDocDetailsbyid==>', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    });


export const VdetailsSlice = createSlice({
    name: "VDetails",
    initialState: {
        loading: false,
        VehicleDetails: {},
        BussinessDetails: {},
        SubscriptionDetails: [],
        ObjSubscriptionDetails: {},
        UserDocDetails: [],
        UserDocDetailsByd: {},
        VehicleDocDetails: [],
        ObVehicleDocDetails: {},
        VehicleDetailsByid: {},
        error: false
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSingleVehicleDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleVehicleDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.VehicleDetails = action.payload;
            })
            .addCase(getSingleVehicleDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
        builder
            .addCase(getSingleBusinessDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleBusinessDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.BussinessDetails = action.payload;
            })
            .addCase(getSingleBusinessDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
        builder
            .addCase(getSingleSubscriptionDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleSubscriptionDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.SubscriptionDetails = action.payload;
                state.ObjSubscriptionDetails = action.payload[0];
            })
            .addCase(getSingleSubscriptionDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
        builder
            .addCase(getSingleUserDocDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleUserDocDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.UserDocDetails = action.payload;
            })
            .addCase(getSingleUserDocDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
        builder
            .addCase(getSingleUserDocDetailsById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleUserDocDetailsById.fulfilled, (state, action) => {
                state.loading = false;
                state.UserDocDetailsByd = action.payload;
            })
            .addCase(getSingleUserDocDetailsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
        builder
            .addCase(getsingleVehicleDocDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getsingleVehicleDocDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.VehicleDocDetails = action.payload;
                state.ObVehicleDocDetails = action.payload[0];
            })
            .addCase(getsingleVehicleDocDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
        builder
            .addCase(getsingleVehicleDocDetailsByid.pending, (state) => {
                state.loading = true;
            })
            .addCase(getsingleVehicleDocDetailsByid.fulfilled, (state, action) => {
                state.loading = false;
                state.VehicleDetailsByid = action.payload;
            })
            .addCase(getsingleVehicleDocDetailsByid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
    }
})

export const getUniqueVehicleDetailsData = (state) => state.VDetails.VehicleDetails;
export const getUniqueBuninessDetailsData = (state) => state.VDetails.BussinessDetails;
export const getUniqueSubscriptionDetailsData = (state) => state.VDetails.SubscriptionDetails;
export const getUniqueObSubscriptionDetailsData = (state) => state.VDetails.ObjSubscriptionDetails;
export const getUniqueUserDocDetailsData = (state) => state.VDetails.UserDocDetails;
export const getUniqueUserDocDetailsDataById = (state) => state.VDetails.UserDocDetailsByd;
export const getUniqueVehicleDocDetailsDataById = (state) => state.VDetails.VehicleDocDetails;
export const getUniqueObVehicleDocDetailsDataById = (state) => state.VDetails.ObVehicleDocDetails;
export const getUniqueVehicleDocDetailsDataBy = (state) => state.VDetails.VehicleDetailsByid;




export default VdetailsSlice.reducer;