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

export async function uploadImages(images = []) {

    const uploadedImages = await Promise.all(

        images.map(async (image) => {
            const compressed =
                await imageCompression(image, {
                    maxSizeMB: 0.8,
                    maxWidthOrHeight: 1400,
                    initialQuality: 0.8,
                    useWebWorker: true,
                });

            const fileName =
                `${Date.now()}`;

            const { data, error } = await supabase.storage
                .from("order-images")
                .upload(fileName, compressed);

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage
                .from("order-images")
                .getPublicUrl(fileName);

            return publicUrlData.publicUrl;
        })
    );

    return uploadedImages;
}

export async function deleteImages(images = []) {

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


export async function createOrder(order) {
    let buildingImage;
    let images = [];

    if (order.buildingImage instanceof FileList) {
        const uploaded = await uploadImages([order.buildingImage[0]]);
        buildingImage = uploaded[0];
    }
    if (order.images instanceof FileList) {
        images = await uploadImages(Array.from(order.images));
    }

    const res = await api.post(`/daily-orders`, { ...order, buildingImage, images })
    return res.data
}

export async function updateOrder({ orderID, order }) {
    const updatedOrder = { ...order };

    if (updatedOrder.buildingImage instanceof FileList) {
        if (order.oldBuildingImage) {
            await deleteImages([order.oldBuildingImage]);
        }
        const uploaded = await uploadImages([order.buildingImage[0]]);
        updatedOrder.buildingImage = uploaded[0];
    }

    if (order.images instanceof FileList) {
        if (order.oldImages?.length > 0) {
            await deleteImages(order.oldImages);
        }
        updatedOrder.images = await uploadImages(Array.from(order.images));
    }

    const res = await api.patch(`/daily-orders/${orderID}`, updatedOrder)
    return res.data
}

export async function deleteOrder(order) {
    const { id: orderID, buildingImage, images = [] } = order

    if (buildingImage) {
        await deleteImages([buildingImage]);
    }
    if (images) {
        await deleteImages(images);
    }

    const res = await api.delete(`/daily-orders/${orderID}`)
    return res
}

export async function downloadOrdersPptx(filter) {

    const res = await api.get(
        "/daily-orders/pptx",
        {
            params: filter,
            responseType: "blob",
        }
    );

    return res.data;
}
