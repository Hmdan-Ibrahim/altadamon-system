import api from "./api"

export async function login({ userName, password }) {
    const res = await api.post(`/users/auth/login`, { userName, password })
    localStorage.token = res.data.data.token
    localStorage.user = JSON.stringify(res.data.data.user)
    return res.data
}

export async function logout() {
    const res = await api.post(`/users/auth/logout`)
    return res.data
}
