import { useSearchParams } from "react-router-dom";
import { useRegions } from "./useRegions";
import SelectCom from "@/src/components/SelectCom";

function SelectRegion() {
    const { isLoading, regions = [] } = useRegions()
    const [searchParams, setSearchParams] = useSearchParams();

    const items = regions.map(region => ({ key: region._id, label: region.name })) || []
    const regionName = items.find(item => item.label === searchParams.get("region"))?.key || "";

    function handleChange(value) {
        searchParams.set("region", items.find(item => item.key === value).label);
        setSearchParams(searchParams);
    }

    if (isLoading) return <h1>Loading....</h1>

    return (
        <SelectCom value={regionName} label={"المنطقة"} onValueChange={handleChange} selectItems={items} />
    );
}

export default SelectRegion;