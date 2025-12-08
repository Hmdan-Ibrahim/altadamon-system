import SelectCom from "@/src/components/SelectCom";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const groupByItems = [
    { key: "transporter", label: "الموصلين" },
    { key: "school", label: "المدارس" }
]

function SelectGroupBy() {
    const [searchParams, setSearchParams] = useSearchParams();
    const groupByParam = searchParams.get("groupBy")

    useEffect(() => {
        if (!groupByParam) {
            searchParams.set("groupBy", groupByItems[0].label);
            setSearchParams(searchParams);
        }
    }, [searchParams, setSearchParams])

    const selected = groupByItems.find(item => item.label === groupByParam)?.key || "";

    function handleChange(value) {
        searchParams.set("groupBy", groupByItems.find(item => item.key === value).label);
        setSearchParams(searchParams);
    }

    return (
        <SelectCom value={selected} label={"تقرير حسب"} onValueChange={handleChange} selectItems={groupByItems} />
    );
}

export default SelectGroupBy;
