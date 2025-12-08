import api from "./api"

export async function getVehicles(filter) {
    const res = await api.get(`/vehicles`, { params: filter })
    console.log("getVehicles", res.data);
    return res.data
}

export async function createVehicle(vehicle) {
    const res = await api.post(`/vehicles`, vehicle)
    console.log("createVehicle", res.data);
    return res.data
}

export async function updateVehicle({ vehicleID, vehicle }) {
    const res = await api.patch(`/vehicles/${vehicleID}`, vehicle)
    console.log("updateVehicle", res.data);
    return res.data
}

export async function deleteVehicle(vehicleID) {
    const res = await api.delete(`/vehicls/${vehicleID}`)
    console.log("deleteVehicle", res);
    return res
}
