import api from "./api"

export async function getRegions(params) {
    const res = await api.get(`/regions`)
    return res.data
}

export async function createRegion(region) {
    const res = await api.post(`/regions`, region)
    return res.data
}

export async function updateRegion({ regionID, region }) {
    const res = await api.patch(`/regions/${regionID}`, region)
    return res.data
}

export async function deleteRegion(regionID) {
    const res = await api.delete(`/regions/${regionID}`)
    return res
}

