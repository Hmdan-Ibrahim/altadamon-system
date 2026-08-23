import api from "./api"
import supabase from "./supabase";
import imageCompression from "browser-image-compression";


export async function getOrders(filter) {
    const res = await api.get(`/daily-orders`, { params: filter })
    return res.data
}

export async function getDailyOrdersByProject(projectId, filter) {
    const res = await api.get(`/daily-orders/project/${projectId}`, { params: filter })
    return res.data
}

export async function uploadImages(images = [], projectId, sendingDate) {
    const uploadedKeys = []
    try {
        const uploadedImages = await Promise.all(
            images.map(async (image, index) => {
                const compressed =
                    await imageCompression(image, {
                        maxSizeMB: 0.8,
                        maxWidthOrHeight: 1400,
                        initialQuality: 0.8,
                        useWebWorker: true,
                    });
                const { data } = await api.post("/storage/upload-url", {
                    projectId,
                    sendingDate,
                    contentType: compressed.type
                });

                const response = await fetch(data.data.uploadUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type": compressed.type
                    },
                    body: compressed
                });

                if (!response.ok)
                    throw new Error(`حدث خطأ أثناء رفع الصورة ${index + 1}`);

                uploadedKeys.push(data.data.key)
                return data.data.key;
            })
        );

        return uploadedImages
    }
    catch (err) {
        if (uploadedKeys.length) {
            try {
                await api.post("/storage/delete-many", {
                    keys: uploadedKeys,
                });
            } catch (e) {
                console.error(e);
            }
        }
        throw err;
    }
}

export async function deleteSubabaseImages(images = []) {
    images = images.filter(image => String(image).includes("supabase"))
    if (!images.length) return;
    const paths = images.map((url) => {

        return url.split(
            "/storage/v1/object/public/order-images/"
        )[1];

    });

    const { error } = await supabase.storage
        .from("order-images")
        .remove(paths);

    if (error) throw "error";
}

export async function createOrder({ projectId, order }) {
    let buildingImage;
    let images = [];

    try {
        if (order.buildingImage instanceof FileList) {
            const uploaded = await uploadImages([order.buildingImage[0]], projectId, order.sendingDate);
            buildingImage = uploaded[0];
        }
        if (order.images instanceof FileList) {
            images = await uploadImages(Array.from(order.images), projectId, order.sendingDate);
        }

        const res = await api.post(`/daily-orders`, { ...order, buildingImage, images })
        return res.data
    } catch (err) {
        const keys = [
            ...(images || []),
            ...(buildingImage ? [buildingImage] : [])
        ];

        if (keys.length) {
            try {
                await api.post("/storage/delete-many", {
                    keys,
                });
            } catch (e) {
                console.error(e);
            }
        }
        throw err;
    }
}

export async function updateOrder({ projectId, orderID, order }) {
    const updatedOrder = { ...order };
    delete updatedOrder.sendingDate
    delete updatedOrder.oldBuildingImage
    delete updatedOrder.oldImages
    try {
        if (updatedOrder.buildingImage instanceof FileList) {
            const uploaded = await uploadImages([order.buildingImage[0]], projectId, order.sendingDate);
            updatedOrder.buildingImage = uploaded[0];
        }

        if (order.images instanceof FileList) {
            updatedOrder.images = await uploadImages(Array.from(order.images), projectId, order.sendingDate);
        }

        const res = await api.patch(`/daily-orders/${orderID}`, updatedOrder)

        try {
            await deleteSubabaseImages([
                ...(order.oldImages || []),
                ...(order.oldBuildingImage ? [order.oldBuildingImage] : []),
            ]);
        } catch (err) {
            console.error(err);
        }
        return res.data
    }
    catch (err) {
        const keys = [
            ...(updatedOrder.buildingImage ? [updatedOrder.buildingImage] : []),
            ...updatedOrder.images
        ];

        if (keys.length) {
            try {
                await api.post("/storage/delete-many", {
                    keys
                });
            }
            catch (e) {
                console.error(e);
            }
        }
    }
}

export async function deleteOrder(order) {
    const { id: orderID, buildingImage, images = [] } = order
    const res = await api.delete(`/daily-orders/${orderID}`)

    try {
        await deleteSubabaseImages([
            ...(images || []),
            ...(buildingImage ? [buildingImage] : []),
        ]);
    } catch (err) {
        console.error(err);
    }

    return res.data
}

export async function downloadOrdersPptx(filter, socketId) {

    const res = await api.get(
        "/daily-orders/pptx",
        {
            params: {
                ...filter,
                socketId
            },
            responseType: "blob",
        }
    );

    return res.data;
}
