import SelectRegion from "../regions/SelectRegion";
import SelectProject from "../projects/SelectProject";
import SelectDate from "@/src/components/SelectDate";
import ForRoles from "@/src/components/gards/AuthFeature";
import { Roles } from "@/src/lib/utils/Entities";

function ScheduleTableOperations() {

    return (
        <div className="flex gap-3 flex-wrap">
            <ForRoles roles={[Roles.MANAGER]}>
                <SelectRegion />
            </ForRoles>
            <SelectProject />
            <SelectDate />
        </div>
    );
}

export default ScheduleTableOperations;