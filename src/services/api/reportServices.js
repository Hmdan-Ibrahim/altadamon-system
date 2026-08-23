import api from "./api"

export async function getReports(filter) {
    try {
        const res = await api.get(`/reports`, { params: filter })
        return res.data

    } catch (error) {
        console.error("Error Reports", error);
        throw error
    }
}