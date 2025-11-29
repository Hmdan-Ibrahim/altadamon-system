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
        <SelectCom value={searchParams.get("report")} label={"نوع التقرير"} onValueChange={handleChange} selectItems={items} />
    );
}

export default SelectReportType;