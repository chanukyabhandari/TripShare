import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../BaseURL";

export const getToken = localStorage.getItem('shareTrip');

export const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken}`
    }
})

export const getAllBookingData = createAsyncThunk('getAllUserdata',
    async () => {
        try {
            const response = await baseURL.get('booking-types/admin', getAuthHeader());
            console.log('response.data', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const getSingleBookingData = createAsyncThunk('getBookingData',
    async (id) => {
        try {
            const response = await baseURL.get(`booking-types/${id}`, getAuthHeader());
            console.log('response.data', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const createBookingdata = createAsyncThunk('user/createBookingdata',
    async (data) => {
        try {
            const response = await baseURL.post('booking-types/admin/', data, getAuthHeader());
            console.log('response.data', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const updateBookingdata = createAsyncThunk('user/updateBookingdata',
    async (data) => {
        try {
            const response = await baseURL.patch('booking-types/admin/', data, getAuthHeader());
            console.log('response.data', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const createPackageData = createAsyncThunk('createPackageData',
    async (data) => {
        try {
            const response = await baseURL.post('booking-type-package', data, getAuthHeader());
            console.log('response.data', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const updatePakageData = createAsyncThunk('updatePakageData',
    async (data) => {
        try {
            const response = await baseURL.patch('booking-type-package', data, getAuthHeader());
            console.log('response.data', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const getSinglePakageData = createAsyncThunk('getSinglePakageData',
    async (id) => {
        try {
            const response = await baseURL.get(`booking-type-package/${id}`, getAuthHeader());
            console.log('getSinglePakageData', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const getAllDropDownData = createAsyncThunk(
    "booking/getAllDropDownData",
    async () => {
        try {
            const response = await baseURL.get(`/field-dropdown`, getAuthHeader());
            console.log("response.data", response.data);
            return response.data.data;
        } catch (error) {
            // alert(`${error.response.data.message}`)
            throw error; // Ensure the error is propagated
        }
    }
);

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookingData: [],
        singleBookingData: {},
        singlePakageData: {},
        dropData: [],
        error: false,
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        // getallbookingdata
        builder
            .addCase(getAllBookingData.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllBookingData.fulfilled, (state, action) => {
                state.loading = false;
                state.bookingData = action.payload
            })
            .addCase(getAllBookingData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
            })
        builder
            .addCase(getSingleBookingData.pending, (state) => {
                state.loading = true
            })
            .addCase(getSingleBookingData.fulfilled, (state, action) => {
                state.loading = false;
                state.singleBookingData = action.payload
            })
            .addCase(getSingleBookingData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
            })
        builder
            .addCase(getSinglePakageData.pending, (state) => {
                state.loading = true
            })
            .addCase(getSinglePakageData.fulfilled, (state, action) => {
                state.loading = false;
                state.singlePakageData = action.payload
            })
            .addCase(getSinglePakageData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error
            })
        builder
            .addCase(getAllDropDownData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllDropDownData.fulfilled, (state, action) => {
                state.loading = false;
                state.dropData = action.payload;
            })
            .addCase(getAllDropDownData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });

    }
});

export const allBookingType = (state) => state.booking.bookingData
export const uniqueBookingType = (state) => state.booking.singleBookingData
export const uniquePakageData = (state) => state.booking.singlePakageData
export const getDropdata = (state) => state.booking.dropData

export default bookingSlice.reducer;