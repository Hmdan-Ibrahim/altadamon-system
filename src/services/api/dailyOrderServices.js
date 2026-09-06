import api from "./api"
import supabase from "./supabase";
import imageCompression from "browser-image-compression";

const MAX_VIDEO_SIZE = 10 * 1024 * 1024;

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
export async function uploadVideo(video, projectId, sendingDate) {
    if (!(video instanceof File)) {
        throw new Error("الفيديو غير صالح");
    }

    if (!video.type.startsWith("video/")) {
        throw new Error("الملف يجب أن يكون فيديو");
    }


    // if (video.size > MAX_VIDEO_SIZE) {
    //     throw new Error("حجم الفيديو يجب ألا يتجاوز 10 ميجابايت");
    // }

    const { data } = await api.post("/storage/upload-url", {
        projectId,
        sendingDate,
        contentType: video.type,
        fileSize: video.size,
    });

    const response = await fetch(data.data.uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": video.type,
        },
        body: video,
    });

    if (!response.ok) {
        throw new Error("حدث خطأ أثناء رفع الفيديو");
    }

    return data.data.key;
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
    let video;

    try {
        if (order.buildingImage instanceof FileList) {
            const uploaded = await uploadImages([order.buildingImage[0]], projectId, order.sendingDate);
            buildingImage = uploaded[0];
        }
        if (order.images instanceof FileList) {
            images = await uploadImages(Array.from(order.images), projectId, order.sendingDate);
        }

        if (order.video instanceof FileList) {
            video = await uploadVideo(
                order.video[0],
                projectId,
                order.sendingDate
            );
        }

        const res = await api.post(`/daily-orders`, { ...order, buildingImage, images, video })
        return res.data
    } catch (err) {
        const keys = [
            ...(images || []),
            ...(buildingImage ? [buildingImage] : []),
            ...(video ? [video] : [])
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

        if (order.video instanceof FileList) {
            updatedOrder.video = await uploadVideo(order.video[0], projectId, order.sendingDate);
        }

        console.log(updatedOrder);

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
            ...updatedOrder.images,
            updatedOrder.video
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
    const { id: orderID, buildingImage, images = [], video } = order
    const res = await api.delete(`/daily-orders/${orderID}`)

    try {
        await deleteSubabaseImages([
            ...(images || []),
            ...(buildingImage ? [buildingImage] : []),
            ...(video ? [video] : []),
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

export async function ApprovalOrder({ orderID, approvalStatus: ApprovalStatus }) {
    console.log(orderID, ApprovalStatus);
    const res = await api.patch(`/daily-orders/${orderID}/approval`, { ApprovalStatus: ApprovalStatus });

    return res.data;
}
