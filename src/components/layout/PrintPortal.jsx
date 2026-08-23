import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/src/hooks/useAuth";
import { useProjects } from "@/src/features/projects/useProjects";
import { useSearchParams } from "react-router-dom";
import api from "@/src/services/api/api";
import { useQuery } from "@tanstack/react-query";

const preloadImage = (src) =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
    });

function PrintPortal({ children }) {
    const [printMode, setPrintMode] = useState(false);
    const { user: { project } } = useAuth()

    const [searchParams] = useSearchParams()
    const projectParam = searchParams.get("project")

    const { projects = [] } = useProjects()
    const matchedProject = useMemo(() => project || projects.find(p => p.name === projectParam)?._id, [project, projectParam])

    const { data: signatures, isSuccess } = useQuery({
        queryKey: ["project-signatures", matchedProject],
        queryFn: async () => {
            const { data } = await api.get(
                `/projects/${matchedProject}/signatures`
            );
            return data;
        },

        enabled: !!matchedProject && printMode,
        staleTime: Infinity,
    });

    useEffect(() => {
        const handleAfterPrint = () => {
            setPrintMode(false);
            document.body.classList.remove("print-report");
        };

        window.addEventListener("afterprint", handleAfterPrint);

        return () => {
            window.removeEventListener("afterprint", handleAfterPrint);
        };
    }, []);

    useEffect(() => {
        if (!printMode || !isSuccess) return;
        requestAnimationFrame(() => {
            window.print();
        });
    }, [printMode, isSuccess]);

    function handlePrint() {
        setPrintMode(true)
        document.body.classList.add("print-report");
    }

    if (!printMode) return <>
        {children}
        <Button
            className="ml-4"
            onClick={handlePrint}
        >
            طباعة
        </Button >
    </>

    return <div className='print-area'>
        {children}
        {printMode && isSuccess && <div className="flex h-50 text-center justify-between">
            <div className="">
                <h4>مدير المشروع</h4>
                <h4>{signatures?.projectManager?.name}</h4>
                <img src={signatures?.projectManager?.imageSignature} className="h-30 w-60" alt="لايوجد توقيع" />
            </div>
            <div className="">
                <h4>مدير المنطقة</h4>
                <h4>{signatures?.regionManager?.name}</h4>
                <img src={signatures?.regionManager?.imageSignature} className="h-30 w-60" alt="لايوجد توقيع" />
            </div>
        </div>}
    </div>;
}

export default PrintPortal;
