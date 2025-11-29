import api from "./api"

export async function login({ userName, password }) {
    const res = await api.get(`/users/auth/login`, { userName, password })
    return res.data
}

export async function getUsers(filters) {
    const res = await api.get(`/users`, { params: filters })
    return res.data
}