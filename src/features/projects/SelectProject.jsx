import { useSearchParams } from "react-router-dom";
import SelectCom from "@/src/components/SelectCom";
import { useProjects } from "./useProjects";

function SelectProject() {
    const { isLoading, projects = [] } = useProjects()

    console.log("SelectProject project", projects);
    const [searchParams, setSearchParams] = useSearchParams();

    const items = projects.map(project => ({ key: project._id, label: project.name })) || []
    const projectName = items.find(item => item.label === searchParams.get("project"))?.key || "";

    function handleChange(value) {
        searchParams.set("project", items.find(item => item.key === value).label);
        setSearchParams(searchParams);
    }

    if (isLoading) return <h1>Loading....</h1>

    return (
        <SelectCom value={projectName} label={"المشروع"} onValueChange={handleChange} selectItems={items} />
    );
}

export default SelectProject;