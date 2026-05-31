import { downloadOrdersPptx } from "@/src/services/api/dailyOrderServices";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useProjects } from "../projects/useProjects";

export function useDownloadOrdersPptx() {
    const [searchParams, setSearchParams] = useSearchParams()
    const { isLoading: loadingProjects, projects = [] } = useProjects()

    const project = searchParams.get("project")
    const date = searchParams.get("date")

    const matchedProject = projects.find(p => p.name === project)?._id;
    const filter = { sendingDate: date, projectId: matchedProject };

    const {
        mutate: downloadPptx,
        isPending,
    } = useMutation({

        mutationFn: async () => {
            const data = await downloadOrdersPptx(filter)
            return data
        },

        onSuccess: (data) => {

            const url =
                window.URL.createObjectURL(
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

            window.URL.revokeObjectURL(url);
        },
    });

    return {
        downloadPptx,
        isPending,
    };
}