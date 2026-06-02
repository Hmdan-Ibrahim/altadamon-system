import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/src/hooks/useAuth";
import { useProjects } from "@/src/features/projects/useProjects";
import { useSearchParams } from "react-router-dom";
import api from "@/src/services/api/api";
import { useQuery } from "@tanstack/react-query";

function PrintPortal({ children }) {
    const [printMode, setPrintMode] = useState(false);
    const { user: { project } } = useAuth()
    const elRef = useRef(null);

    const [searchParams] = useSearchParams()
    const projectParam = searchParams.get("project")

    const { projects = [] } = useProjects()
    const matchedProject = useMemo(() => project || projects.find(p => p.name === projectParam)?._id, [project, projectParam])

    const { data: signatures } = useQuery({
        queryKey: ["project-signatures", matchedProject],
        queryFn: async () => {
            const { data } = await api.get(
                `/projects/${matchedProject}/signatures`
            );
            return data;
        },
        enabled: !!matchedProject,
    });

    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        document.body.appendChild(elRef.current);

        const handleBeforePrint = () => {
            setPrintMode(true);
        };

        const handleAfterPrint = () => {
            setPrintMode(false);
        };

        window.addEventListener("beforeprint", handleBeforePrint);
        window.addEventListener("afterprint", handleAfterPrint);

        return () => {
            window.removeEventListener("beforeprint", handleBeforePrint);
            window.removeEventListener("afterprint", handleAfterPrint);
            document.body.removeChild(elRef.current);
        };
    }, []);

    useEffect(() => {
        if (printMode) {
            window.print();
        }
    }, [printMode]);

    if (!printMode) return <>
        {children}
        <Button
            className="mt-4"
            onClick={() => setPrintMode(true)}
        >
            طباعة
        </Button >
    </>;

    return ReactDOM.createPortal(<>
        {children}
        <div className="flex h-50 text-center justify-between">
            <div className="">
                <h4>مدير المشروع</h4>
                <h4>{signatures?.projectManager?.name}</h4>
                <img src={signatures?.projectManager?.imageSignature} className="h-40 w-30" alt="لايوجد توقيع" />
            </div>
            <div className="">
                <h4>مدير المنطقة</h4>
                <h4>{signatures?.regionManager?.name}</h4>
                <img src={signatures?.regionManager?.imageSignature} className="w-30 h-40" alt="لايوجد توقيع" />
            </div>
        </div>
    </>, elRef.current);
}

export default PrintPortal;
