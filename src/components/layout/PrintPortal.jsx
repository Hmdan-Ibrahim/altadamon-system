import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "../ui/button";

function PrintPortal({ children }) {
    const [printMode, setPrintMode] = useState(false);
    const elRef = useRef(null);

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

    return ReactDOM.createPortal(children, elRef.current);
}

export default PrintPortal;
