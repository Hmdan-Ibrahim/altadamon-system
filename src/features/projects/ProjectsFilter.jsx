import { useSearchParams } from "react-router-dom";
import SelectCom from "./SelectCom";

function ProjectsFilter({ filterField, options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const regionId = searchParams.get(filterField) || "";

    function handleChange(e) {
        searchParams.set(filterField, e.target.value);
        setSearchParams(searchParams);
    }

    return (
        <SelectCom label={filterField} value={regionId} onValueChange={handleChange} selectItems={options} />
    );
}

export default ProjectsFilter;