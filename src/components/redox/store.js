import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/authslicer";
import vehicleSlice from "./reducer/vehicleSlice";
import bookingSlice from "./reducer/bookingSlice";
import userSlice from "./reducer/useSlice";
import subscriptionSlice from "./reducer/subscription";
import VdetailsSlice from "./reducer/UserDetails";

export default configureStore({
    reducer: {
        login: authSlice,
        user: userSlice,
        vehicle: vehicleSlice,
        booking: bookingSlice,
        subscription: subscriptionSlice,
        VDetails: VdetailsSlice,
    },
})