import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import React from "react";
const useAuth = () => {
    const token = localStorage.getItem("shareTrip");
    if (!token) {
        return <Navigate to="/" />;
    }
    if (token) {
        try {
            const decode = jwtDecode(token);
            console.log("token===>", decode);
            const {
                area,
                city,
                driver_id_proof,
                driver_licence_numb,
                iat,
                is_active,
                state,
                u_emergency_num1,
                u_emergency_num2,
                u_id,
                u_mail,
                u_name,
                u_phone,
                u_profile_pic,
                u_role,
                user_type
            } = decode;
            return {
                area,
                city,
                driver_id_proof,
                driver_licence_numb,
                iat,
                is_active,
                state,
                u_emergency_num1,
                u_emergency_num2,
                u_id,
                u_mail,
                u_name,
                u_phone,
                u_profile_pic,
                u_role,
                user_type,
            };
        } catch (error) {
            console.error("error decoding token:", error);
        }
    }
};
export default useAuth;