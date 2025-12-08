import SelectCom from "@/src/components/SelectCom";
import { useSearchParams } from "react-router-dom";

const reportsTypes = [
    { key: "تقرير شهري", label: "تقرير شهري" },
    { key: "ايرادات المشروع", label: "ايرادات المشروع" },
    { key: "استحقاق المشروع", label: "استحقاق المشروع" }
]

function SelectReportType() {
    const [searchParams, setSearchParams] = useSearchParams();
    const reportType = searchParams.get("report")
    const isNotTransporter = searchParams.get("groupBy") !== "الموصلين"

    if (!reportType || isNotTransporter) {
        searchParams.set("report", reportsTypes[0].key);
        setSearchParams(searchParams);
    }

    const selected = reportsTypes.find(item => item.label === reportType)?.key || "";

    function handleChange(value) {
        searchParams.set("report", reportsTypes.find(item => item.key === value).label);
        setSearchParams(searchParams);
    }

    return (
        <SelectCom value={selected} label={"نوع التقرير"} disabled={isNotTransporter} onValueChange={handleChange} selectItems={reportsTypes} />
    );
}

export default SelectReportType;
