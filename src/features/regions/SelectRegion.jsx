import { useSearchParams } from "react-router-dom";
import { useRegions } from "./useRegions";
import SelectBySearch from "@/src/components/SelectBySearch";
import { FieldSelect } from "@/src/components/FieldSelect";

function SelectRegion() {
    const { isLoading, regions = [] } = useRegions()
    const [searchParams, setSearchParams] = useSearchParams();

    const items = regions.map(region => ({ key: region._id, label: region.name })) || []
    const regionName = items.find(item => item.label === searchParams.get("region"))?.key || "";

    function handleChange(value) {
        searchParams.set("region", items.find(item => item.key === value).label);
        setSearchParams(searchParams);
    }

    if (isLoading) return <h1>جاري التحميل....</h1>

    return (
        <FieldSelect value={regionName} label={"المنطقة"} onChange={handleChange} fields={items} />
    );
}

export default SelectRegion;