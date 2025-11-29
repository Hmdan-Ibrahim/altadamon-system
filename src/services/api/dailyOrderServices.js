import api from "./api"

export async function getOrders(filter) {
    // try {
    const res = await api.get(`/daily-orders`, { params: filter })
    console.log("getOrders", res.data);
    return res.data

    // } catch (error) {
    //     console.log("Error getOrders", error);
    //     return error
    // }
}

export async function getDailyOrdersByProject(projectId, filter) {
    // try {
    const res = await api.get(`/daily-orders/project/${projectId}`, { params: filter })
    console.log("getDailyOrdersByProject getDailyOrdersByProject getDailyOrdersByProject", res.data);
    return res.data

    // } catch (error) {
    //     console.log("Error getOrders", error);
    //     return error
    // }
}



export async function createOrder(order) {
    console.log("createOrder", order);
    // try {
    const res = await api.post(`/daily-orders`, order)
    console.log("createOrder", res.data);
    return res.data

    // } catch (error) {
    //     console.log("Error createOrder", error);
    //     return error
    // }
}

export async function updateOrder({ orderID, order }) {
    console.log("updateOrder", order);
    // try {
    const res = await api.patch(`/daily-orders/${orderID}`, order)
    console.log("updateOrder", res.data);
    return res.data

    // } catch (error) {
    //     console.log("Error updateOrder", error);
    //     return error
    // }
}

export async function deleteOrder(orderID) {
    console.log("deleteOrder", orderID);
    // try {
    const res = await api.delete(`/vehicls/${orderID}`)
    console.log("deleteOrder", res);
    return res

    // } catch (error) {
    //     console.log("Error deleteOrder", error);
    //     return error
    // }
}
