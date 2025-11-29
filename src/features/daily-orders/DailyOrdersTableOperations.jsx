import SelectRegion from "../regions/SelectRegion";
import SelectProject from "../projects/SelectProject";
import SelectDate from "@/src/components/SelectDate";
import ForRoles from "@/src/components/gards/AuthFeature";
import { Roles } from "@/src/lib/utils/Entities";

function DailyOrdersTableOperations() {

    return (
        <div className="flex gap-3">
            <ForRoles roles={[Roles.MANAGER]}>
                <SelectRegion />
            </ForRoles>
            <ForRoles roles={[Roles.MANAGER, Roles.REGION_MANAGER]}>
                <SelectProject />
            </ForRoles>

            <SelectDate showDay={true} />
        </div>
    );
}

export default DailyOrdersTableOperations;