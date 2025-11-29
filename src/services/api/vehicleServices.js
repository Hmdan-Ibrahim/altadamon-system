import api from "./api"

export async function getVehicles(filter) {
    try {
        const res = await api.get(`/vehicles`, { params: filter })
        console.log("getVehicles", res.data);
        return res.data

    } catch (error) {
        console.log("Error getVehicles", error);
        return error
    }
}

export async function createVehicle(vehicle) {
    console.log("createVehicle", vehicle);
    try {
        const res = await api.post(`/vehicles`, vehicle)
        console.log("createVehicle", res.data);
        return res.data

    } catch (error) {
        console.log("Error createVehicle", error);
        return error
    }
}

export async function updateVehicle({ vehicleID, vehicle }) {
    console.log("updateVehicle", vehicle);
    try {
        const res = await api.patch(`/vehicles/${vehicleID}`, vehicle)
        console.log("updateVehicle", res.data);
        return res.data

    } catch (error) {
        console.log("Error updateVehicle", error);
        return error
    }
}

export async function deleteVehicle(vehicleID) {
    console.log("deleteVehicle", vehicleID);
    try {
        const res = await api.delete(`/vehicls/${vehicleID}`)
        console.log("deleteVehicle", res);
        return res

    } catch (error) {
        console.log("Error deleteVehicle", error);
        return error
    }
}
