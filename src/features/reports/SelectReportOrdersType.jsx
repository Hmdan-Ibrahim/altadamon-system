import { FieldSelect } from "@/src/components/FieldSelect";
import SelectCom from "@/src/components/SelectBySearch";
import { useSearchParams } from "react-router-dom";

const ordersTypes = [
    { key: "توريد", label: "توريد" },
    { key: "نزح", label: "نزح" },
]

function SelectReportOrdersType() {
    const [searchParams, setSearchParams] = useSearchParams();
    const ordersType = searchParams.get("orders-type")

    if (!ordersType) {
        searchParams.set("orders-type", ordersTypes[0].key);
        setSearchParams(searchParams);
    }

    const selected = ordersTypes.find(item => item.label === ordersType)?.key || "";

    function handleChange(value) {
        searchParams.set("orders-type", ordersTypes.find(item => item.key === value).label);
        setSearchParams(searchParams);
    }

    return (
        <FieldSelect value={selected} label={"نوع طلبات التقرير"} onChange={handleChange} fields={ordersTypes} />
    );
}

export default SelectReportOrdersType;
