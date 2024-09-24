import axios from "axios";
export const baseURL = axios.create({
    baseURL: `https://stapi.sbittravels.com/share-trip/`,
});