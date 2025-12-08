import api from "./api"

export async function getOrders(filter) {
    const res = await api.get(`/daily-orders`, { params: filter })
    console.log("getOrders", res.data);
    return res.data
}

export async function getDailyOrdersByProject(projectId, filter) {
    const res = await api.get(`/daily-orders/project/${projectId}`, { params: filter })
    console.log("getDailyOrdersByProject ge", res.data);
    return res.data
}



export async function createOrder(order) {
    console.log("createOrder", order);
    const res = await api.post(`/daily-orders`, order)
    console.log("createOrder", res.data);
    return res.data
}

export async function updateOrder({ orderID, order }) {
    const res = await api.patch(`/daily-orders/${orderID}`, order)
    return res.data
}

export async function deleteOrder(orderID) {
    const res = await api.delete(`/daily-orders/${orderID}`)
    console.log("deleteOrder", res);
    return res
}
