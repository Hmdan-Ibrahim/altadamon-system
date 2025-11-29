import api from "./api"

export async function login({ userName, password }) {
    const res = await api.post(`/users/auth/login`, { userName, password })
    console.log("Login User", res.data);
    localStorage.token = res.data.data.token
    localStorage.user = JSON.stringify(res.data.data.user)
    return res.data
}

export async function logout() {
    const res = await api.post(`/users/auth/logout`)
    console.log("logout response", res.data);
    return res.data
}

// export async function getUsers(filters) {
//     console.log("getUsers api", filters);

//     try {
//         const res = await api.get(`/users`, { params: filters })
//         console.log("getUsers", res.data);
//         return res.data

//     } catch (error) {
//         console.log("Error getUsers", error);
//         return error
//     }
// }