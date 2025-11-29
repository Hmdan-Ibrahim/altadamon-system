import SelectRegion from "../regions/SelectRegion";
import SelectProject from "../projects/SelectProject";
import ForRoles from "@/src/components/gards/AuthFeature";
import { Roles } from "@/src/lib/utils/Entities";

function SchoolsTableOperations() {

    return (
        <div className="flex flex-wrap gap-3">
            <ForRoles roles={[Roles.MANAGER]}>
                <SelectRegion />
            </ForRoles>
            <SelectProject />
        </div>
    );
}

export default SchoolsTableOperations;