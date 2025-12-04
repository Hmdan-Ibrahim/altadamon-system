import SelectRegion from "../regions/SelectRegion";
import SelectProject from "../projects/SelectProject";
import SelectDate from "@/src/components/SelectDate";
import ForRoles from "@/src/components/gards/AuthFeature";
import { Roles } from "@/src/lib/utils/Entities";
import SelectReportType from "./SelectReportType";

function ReportsTableOperations() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ForRoles roles={[Roles.MANAGER]}>
                <SelectRegion />
            </ForRoles>
            <ForRoles roles={[Roles.MANAGER, Roles.REGION_MANAGER]}>
                <SelectProject />
            </ForRoles>
            <SelectDate showDay={true} />
            <SelectReportType />
        </div>
    );
}

export default ReportsTableOperations;
