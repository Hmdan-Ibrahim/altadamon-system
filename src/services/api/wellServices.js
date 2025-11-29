import api from "./api";

export async function getWells() {
    return await api.get(`/wells`).data
}