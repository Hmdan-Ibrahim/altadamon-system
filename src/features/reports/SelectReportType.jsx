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
    
    if (!reportType) {
        searchParams.set("report", reportsTypes[0].key);
        setSearchParams(searchParams);
    }
    const items = reportsTypes.map(type => ({ key: type.key, label: type.label })) || []

    function handleChange(value) {
        searchParams.set("report", items.find(item => item.key === value).label);
        setSearchParams(searchParams);
    }

    return (
        <SelectCom value={isNotTransporter ? reportType : reportsTypes[0].label} label={"نوع التقرير"} disabled={isNotTransporter} onValueChange={handleChange} selectItems={items} />
    );
}

export default SelectReportType;
