import SelectRegion from "../regions/SelectRegion";
import SelectProject from "../projects/SelectProject";
import SelectDate from "@/src/components/SelectDate";
import AuthFeature from "@/src/components/gards/AuthFeature";
import { Roles } from "@/src/lib/utils/Entities";

function ScheduleTableOperations() {

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AuthFeature roles={[Roles.MANAGER]}>
                <SelectRegion />
            </AuthFeature>
            <AuthFeature roles={[Roles.MANAGER, Roles.REGION_MANAGER]}>
                <SelectProject />
            </AuthFeature>
            <SelectDate />
        </div>
    );
}

export default ScheduleTableOperations;