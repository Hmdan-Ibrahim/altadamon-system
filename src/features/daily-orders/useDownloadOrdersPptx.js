import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { downloadOrdersPptx } from "@/src/services/api/dailyOrderServices";
import { socket } from "@/src/services/api/socket";

import { useProjects } from "../projects/useProjects";
import toast from "react-hot-toast";

export function useDownloadOrdersPptx() {
    const [socketData, setSocketData] = useState();
    const [searchParams] = useSearchParams();

    const { projects = [] } = useProjects();

    const project = searchParams.get("project");
    const date = searchParams.get("date");

    const matchedProject =
        projects.find((p) => p.name === project)?._id;

    const filter = {
        sendingDate: date,
        projectId: matchedProject,
    };

    useEffect(() => {
        const handleProgress = (data) => {
            setSocketData(data);
        };

        socket.on("pptx-progress", handleProgress);

        return () => {
            socket.off("pptx-progress", handleProgress);
        };
    }, []);

    const {
        isPending,
        mutate: downloadPptx,
    } = useMutation({
        mutationFn: async () => {
            toast.loading("جاري تحميل التقرير ...")
            setSocketData(null);

            return await downloadOrdersPptx(
                filter,
                socket.id
            );
        },

        onSuccess: (data) => {
            toast.success("تم تحميل النقرير بنجاح")

            const url = URL.createObjectURL(
                new Blob([data])
            );

            const a =
                document.createElement("a");

            a.href = url;
            a.download =
                `orders-${Date.now()}.pptx`;

            document.body.appendChild(a);
            a.click();
            a.remove();

            URL.revokeObjectURL(url);
        },

        onError: () => {
            setSocketData(null);
        },
    });

    return {
        downloadPptx,
        isPending,
        socketData,
    };
}