import { useSearchParams } from "react-router-dom";
import { useProjects } from "./useProjects";
import { FieldSelect } from "@/src/components/FieldSelect";

function SelectProject() {
    const { isLoading, projects = [] } = useProjects()
    const [searchParams, setSearchParams] = useSearchParams();

    const items = projects.map(project => ({ key: project._id, label: project.name })) || []
    const projectName = items.find(item => item.label === searchParams.get("project"))?.key || "";

    function handleChange(value) {
        searchParams.set("project", items.find(item => item.key === value).label);
        setSearchParams(searchParams);

    }

    if (isLoading) return <h1>جاري التحميل....</h1>

    return (
        <FieldSelect value={projectName} label={"المشروع"} onChange={handleChange} fields={items} />
    );
}

export default SelectProject;