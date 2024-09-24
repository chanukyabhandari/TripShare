import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseURL } from "../../../BaseURL";

export const getToken = localStorage.getItem('shareTrip');

export const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${getToken}`
    }
})

export const getAllUserdata = createAsyncThunk('user/getAllUserdata',
    async () => {
        try {
            const response = await baseURL.get('auth/users', getAuthHeader());
            console.log('response.data', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)
export const getSingleUserData = createAsyncThunk('user/getSingleUserData',
    async (id) => {
        try {
            const response = await baseURL.get(`auth/users/${id}`, getAuthHeader());
            console.log('response.data', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }

    }
)

export const updateuser = createAsyncThunk('user/updateuse',
    async (data) => {
        try {
            const response = await baseURL.patch(`/auth/users/`, data, getAuthHeader())
            console.log('response.data', response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: [],
        //  creater builders 
        singleUserData: {},
        // create builders
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUserdata.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUserdata.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(getAllUserdata.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
        builder
            .addCase(getSingleUserData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleUserData.fulfilled, (state, action) => {
                state.loading = false;
                state.singleUserData = action.payload;
            })
            .addCase(getSingleUserData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    }
})

export const getUserData = (state) => state.user.userData
export const getUniqueUserData = (state) => state.user.singleUserData

export default userSlice.reducer;