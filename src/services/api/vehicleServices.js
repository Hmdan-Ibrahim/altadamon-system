import api from "./api"

export async function getVehicles(filter) {
    const res = await api.get(`/vehicles`, { params: filter })
    return res.data
}

export async function createVehicle(vehicle) {
    const res = await api.post(`/vehicles`, vehicle)
    return res.data
}

export async function updateVehicle({ vehicleID, vehicle }) {
    const res = await api.patch(`/vehicles/${vehicleID}`, vehicle)
    return res.data
}

export async function deleteVehicle(vehicleID) {
    const res = await api.delete(`/vehicls/${vehicleID}`)
    return res
}
