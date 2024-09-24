import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthHeader } from "./bookingSlice";
import { baseURL } from "../../../BaseURL";

export const getAllSubscription = createAsyncThunk("getAllSubscription",
    async () => {
        try {
            const response = await baseURL.get("/subscription-plan/admin", getAuthHeader())
            console.log("response.data", response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const getSingleSubscription = createAsyncThunk("getSingleSubscription",
    async (id) => {
        try {
            const response = await baseURL.get(`subscription-plan/${id}`, getAuthHeader())
            console.log("getSingleSubscription", response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const updateSubscription = createAsyncThunk("updateSubscription",
    async (data) => {
        try {
            const response = await baseURL.patch('subscription-plan/',data, getAuthHeader())
            console.log("updateSubscription", response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const createSubscription = createAsyncThunk("createSubscription",
    async (data) => {
        try {
            const response = await baseURL.post('subscription-plan/',data, getAuthHeader())
            console.log("createSubscription", response.data)
            return response.data.data
        }
        catch (error) {
            throw error
        }
    }
)

export const subscriptionSlice = createSlice({
    name: "subscription",
    initialState: {
        subscriptionData: [],
        singleSubscriptionData: {},
        loading: false,
        error: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllSubscription.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllSubscription.fulfilled, (state, action) => {
                state.loading = false;
                state.subscriptionData = action.payload
            })
            .addCase(getAllSubscription.rejected, (state, action) => {
                state.loading = false;
                state.loading = action.error

            })
        builder
            .addCase(getSingleSubscription.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleSubscription.fulfilled, (state, action) => {
                state.loading = false;
                state.singleSubscriptionData = action.payload
            })
            .addCase(getSingleSubscription.rejected, (state, action) => {
                state.loading = false;
                state.loading = action.error

            })
    }
})

export const getSubscriptionData = (state) => state.subscription.subscriptionData;
export const getUniqueSubscriptionData=(state)=>state.subscription.singleSubscriptionData;

export default subscriptionSlice.reducer;