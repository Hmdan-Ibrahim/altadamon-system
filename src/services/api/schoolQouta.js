import api from "./api"

export async function createSchoolQouta(schoolQuota) {
    const res = await api.post(`/school-quota`, schoolQuota)
    return res.data
}