import SelectRegion from "../regions/SelectRegion";
import SelectProject from "../projects/SelectProject";
import SelectDate from "@/src/components/SelectDate";
import ForRoles from "@/src/components/gards/AuthFeature";
import { Roles } from "@/src/lib/utils/Entities";
import SelectReportType from "./SelectReportType";

function ReportsTableOperations() {

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
            <ForRoles roles={[Roles.MANAGER]}>
                <SelectRegion />
            </ForRoles>
            <ForRoles roles={[Roles.MANAGER, Roles.REGION_MANAGER]}>
                <SelectProject />
            </ForRoles>
            <SelectDate showDay={true} />
            <SelectReportType />
            <SelectGroupBy />
        </div>
    );
}

export default ReportsTableOperations;
