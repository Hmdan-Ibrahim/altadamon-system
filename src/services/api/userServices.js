import api from "./api"

export async function getUsers(filters) {
    const res = await api.get(`/users`, { params: filters })
    return res.data
}