import api from "./api"

export async function getSchools(filter) {
    const res = await api.get(`/schools`, { params: filter })
    return res.data
}

export async function createSchool(school) {
    const res = await api.post(`/schools`, school)
    return res.data
}

export async function updateSchool({ schoolID, school }) {
    const res = await api.patch(`/schools/${schoolID}`, school)
    return res.data
}

export async function deleteSchool(schoolID) {
    const res = await api.delete(`/schools/${schoolID}`)
    return res
}
