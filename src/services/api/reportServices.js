import api from "./api"

export async function getReports(filter) {
    try {
        const res = await api.get(`/reports`, { params: filter })
        console.log("getReports", res.data);
        return res.data

    } catch (error) {
        console.log("Error getReports", error);
        return error
    }
}