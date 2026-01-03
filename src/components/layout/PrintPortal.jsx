import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/src/hooks/useAuth";
import { Roles } from "@/src/lib/utils/Entities";
import { useProjects } from "@/src/features/projects/useProjects";
import { useSearchParams } from "react-router-dom";
import api from "@/src/services/api/api";

function PrintPortal({ children }) {
    const [printMode, setPrintMode] = useState(false);
    const { user: { name, role, imageSignature, project } } = useAuth()
    const [regionManager, setRegionManager] = useState(role === Roles.REGION_MANAGER ? { name, imageSignature } : null);
    const [projectManager, setProjectManager] = useState(role === Roles.PROJECT_MANAGER ? { name, imageSignature } : null);
    const elRef = useRef(null);

    const [searchParams, setSearchParams] = useSearchParams()
    const projectParam = searchParams.get("project")

    const { isLoading: loadingProjects, projects = [] } = useProjects()


    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        document.body.appendChild(elRef.current);

        const handleBeforePrint = () => {
            setPrintMode(true);
            console.log("setPrintMode(true)");
        };

        const handleAfterPrint = () => {
            setPrintMode(false);
            console.log("setPrintMode(false)");
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
        const fetchSignatures = async () => {
            try {
                if (!projects.length && !project) return;

                const matchedProject =
                    projects.find(p => p.name === projectParam)?._id || project;

                if (!matchedProject) return;

                const { data } = await api.get(
                    `/projects/${matchedProject}/signatures`
                );

                // المستخدم مدير مشروع
                if (role === Roles.PROJECT_MANAGER) {
                    setProjectManager({ name, imageSignature }); // من الهوك
                    setRegionManager(data.regionManager);        // من الباك
                }

                // المستخدم مدير منطقة
                if (role === Roles.REGION_MANAGER) {
                    setRegionManager({ name, imageSignature }); // من الهوك
                    setProjectManager(data.projectManager);     // من الباك
                }

            } catch (error) {
                console.error("Error fetching signatures", error);
            }
        };

        fetchSignatures();
    }, [projects, projectParam, project, role]);


    useEffect(() => {
        if (printMode) {
            setTimeout(() => window.print(), 50);
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
                <h4>{projectManager?.name}</h4>
                <img src={projectManager?.imageSignature} className="h-40 w-30" alt="لايوجد توقيع" />
            </div>
            <div className="">
                <h4>مدير المنطقة</h4>
                <h4>{regionManager?.name}</h4>
                <img src={regionManager?.imageSignature} className="w-30 h-40" alt="لايوجد توقيع" />
            </div>
        </div>
    </>, elRef.current);
}

export default PrintPortal;
