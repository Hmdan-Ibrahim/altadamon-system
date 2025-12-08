import SelectCom from "@/src/components/SelectCom";
import { useSearchParams } from "react-router-dom";

const groupBy = [
    { key: "transporter", label: "الموصلين" },
    { key: "school", label: "المدارس" }
]

function SelectGroupBy() {
    const [searchParams, setSearchParams] = useSearchParams();
    const reportType = searchParams.get("groupBy")
    if (!reportType) {
        searchParams.set("groupBy", groupBy[0].key);
        setSearchParams(searchParams);
    }
    const items = groupBy.map(type => ({ key: type.key, label: type.label })) || []

    function handleChange(value) {
        searchParams.set("groupBy", items.find(item => item.key === value).label);
        setSearchParams(searchParams);
    }

    return (
        <SelectCom value={searchParams.get("groupBy")} label={"تقرير حسب"} onValueChange={handleChange} selectItems={items} />
    );
}

export default SelectGroupBy;
